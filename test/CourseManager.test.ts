import { expect } from "chai";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { ConstantFlowAgreementV1 } from "@superfluid-finance/sdk-core";

import {
  CourseManagerInstance,
  FactoryInstance,
  IBTInstance,
  ISuperTokenInstance,
} from "../types/truffle-contracts";
import { Snapshot } from "./utils/snapshot";

import * as times from "./utils/times";
import { CHAIN_ID } from "../lib/config";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { LECTURE_DATA } from "../resources";
import invariant from "invariant";
import { last } from "lodash";

const { expectRevert } = require("@openzeppelin/test-helpers");

const ethersProvider = new ethers.providers.Web3Provider(
  web3.currentProvider as any
);

const { toBN, toWei } = web3.utils;

const ENROLLMENT_FEE = toBN(parseUnits("90", 18).toString()); // 1 IBTx/day
const TINY_ERROR = toBN(parseUnits("0.001", 18).toString());

const COURSE_ID = LECTURE_DATA.length;

contract("CourseManager", (accounts: Truffle.Accounts) => {
  const [deployer, lecturer, student0, student1, student2] = accounts;

  const Factory = artifacts.require("Factory");
  const CourseManager = artifacts.require("CourseManager");
  const IBT = artifacts.require("IBT");
  const ISuperToken = artifacts.require("ISuperToken");
  const PaymentReceiver = artifacts.require("PaymentReceiver");

  let factory: FactoryInstance;
  let courseManager: CourseManagerInstance;
  let ibt: IBTInstance;
  let ibtx: ISuperTokenInstance;

  beforeEach("load contracts", async function () {
    factory = await Factory.deployed();

    // // re-deploy contracts for test env
    // await factory.deployContracts();

    courseManager = await CourseManager.at(await factory.courseManager());
    ibt = await IBT.at(await factory.ibt());
    ibtx = await ISuperToken.at(await factory.ibtx());
  });

  let _snapshot: Snapshot;
  beforeEach("take a snapshot", async function () {
    if (!_snapshot) {
      _snapshot = new Snapshot(ethersProvider);
      await _snapshot.takeSnapshot();
    } else {
      await _snapshot.rollback();
    }
  });

  //////////////////////////////////////////////////
  // PERMISSION HELPERS
  //////////////////////////////////////////////////
  async function _setupPermission_superfluid(student: string) {
    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider: ethersProvider,
    });

    const ibtxst = await sf.loadSuperToken(ibtx.address);

    const op = ibtxst.authorizeFlowOperatorWithFullControl({
      flowOperator: courseManager.address,
    });

    // check permission is not granted yet
    const st0Data0 = await ibtxst.getFlowOperatorData({
      sender: student,
      flowOperator: courseManager.address,
      providerOrSigner: ethersProvider,
    });
    expect(st0Data0.permissions).to.be.eq("0"); // NO PERMISSION

    await op.exec(ethersProvider.getSigner(student));

    // check permission is correctly granted
    const st0Data1 = await ibtxst.getFlowOperatorData({
      sender: student,
      flowOperator: courseManager.address,
      providerOrSigner: ethersProvider,
    });
    expect(st0Data1.permissions).to.be.eq("7"); // CREATE / UPDATE / DELETE PERMISSION
  }

  async function _setupPermission_prepaid(student: string) {
    await ibtx.approve(
      courseManager.address,
      ethers.constants.MaxUint256.toString(),
      { from: student }
    );
  }

  async function _setupPermission() {
    await _setupPermission_superfluid(student0);
    await _setupPermission_prepaid(student1);
    await _setupPermission_prepaid(student2);
  }

  describe("IBTx", function () {
    beforeEach("mint IBT to deployer", async function () {
      await ibt.mint(deployer, "1000000000000");
    });

    it("should upgrade from IBT and downgrade to IBT", async function () {
      const amount = "100";
      await ibt.approve(ibtx.address, amount);

      // test upgrade
      await ibtx.upgrade(amount);
      expect((await ibtx.balanceOf(accounts[0])).toString()).to.be.eq("100");

      // test downgrade
      await ibtx.downgrade(amount);
      expect((await ibtx.balanceOf(accounts[0])).toString()).to.be.eq("0");
    });
  });

  describe("CourseManager", function () {
    describe("For pre-registered courses", function () {
      function shouldBehaveLikeFreeCourese(
        course: (typeof LECTURE_DATA)[0],
        courseId: number
      ) {
        invariant(course.free, "non-free");

        it(`Course#${courseId + 1} - free`, async function () {
          // student0 registers the course
          await courseManager.enrollCourse(courseId, false, { from: student0 });

          expect(await courseManager.isStudent(courseId, student0)).to.be.true;

          // check enrollment
          let e = await courseManager.getEnrollmentOf(courseId, student0);
          expect(e.currentWeekIndex.toString()).to.be.eq("0");
          expect(e.flowRate.toString()).to.be.eq("0");
          expect(e.student).to.be.eq(student0);
          expect(e.paymentReceiver).to.be.eq(ethers.constants.AddressZero);
          expect(e.prepaid).to.be.false;
          expect(e.finished).to.be.false;
          expect(await courseManager.isActive(courseId, student0)).to.be.true;

          // iterate weeks
          let weekIndex = 0;
          for (const week of course.weeks) {
            expect(await courseManager.isActive(courseId, student0)).to.be.true;
            e = await courseManager.getEnrollmentOf(courseId, student0);
            expect(e.currentWeekIndex.toString()).to.be.eq(
              weekIndex.toString()
            );

            const quiz = last(week.lectures)?.quiz!;
            const answers = await quiz.map((q) => q.solution);
            const answerBigEndian = await courseManager
              .encodeAnswers(answers)
              .then((res) => "0x" + res.toString());

            await courseManager.submitAnswer(
              courseId,
              weekIndex,
              answerBigEndian,
              {
                from: student0,
              }
            );

            weekIndex++;
          }

          // check last
          e = await courseManager.getEnrollmentOf(courseId, student0);
          expect(e.currentWeekIndex.toString()).to.be.eq(weekIndex.toString());
          expect(e.finished).to.be.true;
        });
      }

      function shouldBehaveLikePaidCourese(
        course: (typeof LECTURE_DATA)[0],
        courseId: number
      ) {
        invariant(!course.free, "non-paid");

        it(`Course#${courseId + 1} - paid`, async function () {
          // transfer IBTx to students
          await factory.mint({ from: student0 });
          await factory.mint({ from: student1 });
          await factory.mint({ from: student2 });

          const lecturer = await courseManager.getLecturer(courseId);
          const enrollmentFee = await courseManager.getEnrollmentFee(courseId);

          const lecturerBalanceBefore = await ibtx.balanceOf(lecturer);
          const student0BalanceBefore = await ibtx.balanceOf(student0);
          const student1BalanceBefore = await ibtx.balanceOf(student1);
          const student2BalanceBefore = await ibtx.balanceOf(student2);

          // student0 registers the course with superfluid token
          {
            await _setupPermission_superfluid(student0);
            await courseManager.enrollCourse(courseId, false, {
              from: student0,
            });
          }

          // student1 registers the course with prepaid payment
          {
            const lecturerBalanceBefore = await ibtx.balanceOf(lecturer);
            const student1BalanceBefore = await ibtx.balanceOf(student1);
            await _setupPermission_prepaid(student1);
            await courseManager.enrollCourse(courseId, true, {
              from: student1,
            });
            const lecturerBalanceAfter = await ibtx.balanceOf(lecturer);
            const student1BalanceAfter = await ibtx.balanceOf(student1);

            const lecturerBalanceDiff = toBN(
              lecturerBalanceAfter.sub(lecturerBalanceBefore).toString()
            );
            const student1BalanceDiff = toBN(
              student1BalanceAfter.sub(student1BalanceBefore).toString()
            );

            expect(lecturerBalanceDiff.toString()).to.be.eq(
              enrollmentFee.toString()
            );
            expect(student1BalanceDiff.toString()).to.be.eq(
              enrollmentFee.neg().toString()
            );
          }
          // student2 registers the course with superfluid payment
          {
            await _setupPermission_superfluid(student2);
            await courseManager.enrollCourse(courseId, false, {
              from: student2,
            });
          }

          expect(await courseManager.isStudent(courseId, student0)).to.be.true;
          expect(await courseManager.isStudent(courseId, student1)).to.be.true;
          expect(await courseManager.isStudent(courseId, student2)).to.be.true;

          // check enrollment
          let e0 = await courseManager.getEnrollmentOf(courseId, student0);
          let e1 = await courseManager.getEnrollmentOf(courseId, student1);
          let e2 = await courseManager.getEnrollmentOf(courseId, student2);

          {
            expect(e0.currentWeekIndex.toString()).to.be.eq("0");
            expect(e0.flowRate.toString()).to.be.not.eq("0");
            expect(e0.student).to.be.eq(student0);
            expect(e0.paymentReceiver).to.be.not.eq(
              ethers.constants.AddressZero
            );
            expect(e0.prepaid).to.be.false;
            expect(e0.finished).to.be.false;
            expect(await courseManager.isActive(courseId, student0)).to.be.true;
          }

          {
            expect(e1.currentWeekIndex.toString()).to.be.eq("0");
            expect(e1.flowRate.toString()).to.be.eq("0");
            expect(e1.student).to.be.eq(student1);
            expect(e1.paymentReceiver).to.be.eq(ethers.constants.AddressZero);
            expect(e1.prepaid).to.be.true;
            expect(e1.finished).to.be.false;
            expect(await courseManager.isActive(courseId, student1)).to.be.true;
          }

          {
            expect(e2.currentWeekIndex.toString()).to.be.eq("0");
            expect(e2.flowRate.toString()).to.be.not.eq("0");
            expect(e2.student).to.be.eq(student2);
            expect(e2.paymentReceiver).to.be.not.eq(
              ethers.constants.AddressZero
            );
            expect(e2.prepaid).to.be.false;
            expect(e2.finished).to.be.false;
            expect(await courseManager.isActive(courseId, student2)).to.be.true;
          }

          // iterate weeks: student0 and student1 submit every week
          let weekIndex = 0;
          for (const week of course.weeks) {
            await times.increase(times.duration.weeks(1));
            const { 3: streamdAmount0 } = await courseManager.getStreamedAmount(
              courseId,
              student0
            );

            const prepaidPayment0Percent = streamdAmount0
              .mul(toBN(100))
              .div(enrollmentFee);

            const expectPrepaidPercent = toBN((weekIndex + 1) * 7)
              .mul(toBN(100))
              .div(toBN(90));

            expect(prepaidPayment0Percent.toString()).to.be.eq(
              expectPrepaidPercent.toString()
            );

            expect(await courseManager.isActive(courseId, student0)).to.be.true;
            expect(await courseManager.isActive(courseId, student1)).to.be.true;

            e0 = await courseManager.getEnrollmentOf(courseId, student0);
            e1 = await courseManager.getEnrollmentOf(courseId, student1);

            expect(e1.currentWeekIndex.toString()).to.be.eq(
              weekIndex.toString()
            );
            expect(e0.currentWeekIndex.toString()).to.be.eq(
              weekIndex.toString()
            );

            const quiz = last(week.lectures)?.quiz!;
            const answers = await quiz.map((q) => q.solution);
            const answerBigEndian = await courseManager
              .encodeAnswers(answers)
              .then((res) => "0x" + res.toString());

            await courseManager.submitAnswer(
              courseId,
              weekIndex,
              answerBigEndian,
              {
                from: student0,
              }
            );

            await courseManager.submitAnswer(
              courseId,
              weekIndex,
              answerBigEndian,
              {
                from: student1,
              }
            );

            weekIndex++;
          }

          // student2 submits all answer after more than 1 year
          await times.increase(times.duration.days(365));

          weekIndex = 0;
          for (const week of course.weeks) {
            await times.increase(times.duration.weeks(1));
            expect(await courseManager.isActive(courseId, student2)).to.be.true;

            e2 = await courseManager.getEnrollmentOf(courseId, student2);

            expect(e2.currentWeekIndex.toString()).to.be.eq(
              weekIndex.toString()
            );

            const quiz = last(week.lectures)?.quiz!;
            const answers = await quiz.map((q) => q.solution);
            const answerBigEndian = await courseManager
              .encodeAnswers(answers)
              .then((res) => "0x" + res.toString());

            await courseManager.submitAnswer(
              courseId,
              weekIndex,
              answerBigEndian,
              {
                from: student2,
              }
            );

            const { 2: paidAll } = await courseManager.getStreamedAmount(
              courseId,
              student2
            );

            expect(paidAll).to.be.true;

            weekIndex++;
          }

          // check last
          e0 = await courseManager.getEnrollmentOf(courseId, student0);
          e1 = await courseManager.getEnrollmentOf(courseId, student1);
          e2 = await courseManager.getEnrollmentOf(courseId, student2);

          expect(e0.currentWeekIndex.toString()).to.be.eq(weekIndex.toString());
          expect(e0.finished).to.be.true;
          expect(e1.currentWeekIndex.toString()).to.be.eq(weekIndex.toString());
          expect(e1.finished).to.be.true;
          expect(e2.currentWeekIndex.toString()).to.be.eq(weekIndex.toString());
          expect(e2.finished).to.be.true;

          // check payment
          const lecturerBalanceAfter = await ibtx.balanceOf(lecturer);
          const student0BalanceAfter = await ibtx.balanceOf(student0);
          const student1BalanceAfter = await ibtx.balanceOf(student1);
          const student2BalanceAfter = await ibtx.balanceOf(student2);

          const lecturerBalanceDiff = lecturerBalanceAfter.sub(
            lecturerBalanceBefore
          );
          const student0BalanceDiff = student0BalanceAfter.sub(
            student0BalanceBefore
          );
          const student1BalanceDiff = student1BalanceAfter.sub(
            student1BalanceBefore
          );
          const student2BalanceDiff = student2BalanceAfter.sub(
            student2BalanceBefore
          );

          // lecturer receives sum of fees from students
          expect(lecturerBalanceDiff.toString()).to.be.eq(
            student0BalanceDiff
              .add(student1BalanceDiff)
              .add(student2BalanceDiff)
              .neg()
              .toString()
          );

          // student0 should pay partial fee
          expect(student0BalanceDiff.toString()).to.be.eq(
            toBN(e0.finishedAt.toString())
              .sub(toBN(e0.enrolledAt.toString()))
              .mul(toBN(e0.flowRate.toString()))
              .neg()
              .toString()
          );
          // student1 should pay all fee
          expect(student1BalanceDiff.toString()).to.be.eq(
            enrollmentFee.neg().toString()
          );
          // student1 should pay all fee
          expect(student2BalanceDiff.toString()).to.be.eq(
            enrollmentFee.neg().toString()
          );
        });
      }

      LECTURE_DATA.forEach((lecture, index) => {
        if (lecture.free) shouldBehaveLikeFreeCourese(lecture, index);
        else shouldBehaveLikePaidCourese(lecture, index);
      });
    });

    describe("For a 2-weeks free course", function () {
      let courseData: {
        enrollmentFee: number | BN | string;
        week: {
          nAnswers: number | BN | string;
          answerBigEndian: number | BN | string;
        }[];
      };

      beforeEach("load course data", async function () {
        const weekData = [
          {
            nAnswers: 2,
            answers: [1, 3],
          },
          {
            nAnswers: 1,
            answers: [4],
          },
        ];
        const week = await Promise.all(
          weekData.map(async (d) => ({
            ...d,
            answerBigEndian:
              "0x" + (await courseManager.encodeAnswers(d.answers)), // TODO: change return type of `encodeAnswers` to bytes32 and
          }))
        );

        courseData = {
          enrollmentFee: 0,
          week,
        };
      });

      it("lecturer can create course", async function () {
        await courseManager.addCourse(
          courseData.enrollmentFee,
          courseData.week,
          {
            from: lecturer,
          }
        );
      });

      describe("After course is added", async function () {
        beforeEach("add a course by lecturer", async function () {
          await courseManager.addCourse(
            courseData.enrollmentFee,
            courseData.week,
            {
              from: lecturer,
            }
          );
        });

        it("students cannot submit answer before enroll", async function () {
          await expectRevert(
            courseManager.submitAnswer(
              COURSE_ID,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            ),
            "NOT_STUDENT"
          );
        });

        it("students can enroll a course", async function () {
          await courseManager.enrollCourse(COURSE_ID, false, {
            from: student0,
          });
          expect(await courseManager.isStudent(COURSE_ID, student0)).to.be.true;
          await courseManager.enrollCourse(COURSE_ID, false, {
            from: student1,
          });
          expect(await courseManager.isStudent(COURSE_ID, student1)).to.be.true;

          expect(await courseManager.isActive(COURSE_ID, student0)).to.be.true;
          expect(await courseManager.isActive(COURSE_ID, student1)).to.be.true;
        });

        describe("After students enroll a course", function () {
          beforeEach("enroll the first course by students", async function () {
            await courseManager.enrollCourse(COURSE_ID, false, {
              from: student0,
            });
            await courseManager.enrollCourse(COURSE_ID, false, {
              from: student1,
            });
          });

          it("students can submit answers", async function () {
            // cannot submit wrong answer
            await expectRevert(
              courseManager.submitAnswer(
                COURSE_ID,
                0,
                1, // wrong answer
                { from: student0 }
              ),
              "WRONG_ANSWER"
            );

            // cannot submit 2nd week answer before submit 1st week answer
            await expectRevert(
              courseManager.submitAnswer(
                COURSE_ID,
                1,
                courseData.week[1].answerBigEndian,
                { from: student0 }
              ),
              "INVALID_WEEK"
            );

            // can submit 1st week answer
            await courseManager.submitAnswer(
              COURSE_ID,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              COURSE_ID,
              0,
              courseData.week[0].answerBigEndian,
              { from: student1 }
            );

            // can submit 2nd week answer
            await courseManager.submitAnswer(
              COURSE_ID,
              1,
              courseData.week[1].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              COURSE_ID,
              1,
              courseData.week[1].answerBigEndian,
              { from: student1 }
            );
          });
        });
      });
    });

    describe("For a 2-weeks paid course", function () {
      beforeEach("setup tokens", async function () {
        const value = parseUnits("1000000000", 18);
        await ibt.mint(deployer, value.toString());
        await ibt.approve(ibtx.address, value.toString());
        await ibtx.upgradeTo(student0, value.div(2).toString(), "0x");
        await ibtx.upgradeTo(student1, value.div(2).toString(), "0x");
      });

      let courseData: {
        enrollmentFee: number | BN | string;
        week: {
          nAnswers: number | BN | string;
          answerBigEndian: number | BN | string;
        }[];
      };

      beforeEach("load course data", async function () {
        const weekData = [
          {
            nAnswers: 2,
            answers: [1, 3],
          },
          {
            nAnswers: 1,
            answers: [4],
          },
        ];
        const week = await Promise.all(
          weekData.map(async (d) => ({
            ...d,
            answerBigEndian:
              "0x" + (await courseManager.encodeAnswers(d.answers)), // TODO: change return type of `encodeAnswers` to bytes32 and
          }))
        );

        courseData = {
          enrollmentFee: ENROLLMENT_FEE,
          week,
        };
      });

      it("lecturer can create course", async function () {
        await courseManager.addCourse(
          courseData.enrollmentFee,

          courseData.week,
          {
            from: lecturer,
          }
        );
      });

      describe("After course is added (student0: superfluid, student1: prepay)", async function () {
        beforeEach("add a course by lecturer", async function () {
          await courseManager.addCourse(
            courseData.enrollmentFee,

            courseData.week,
            {
              from: lecturer,
            }
          );
        });

        it("students cannot submit answer before enroll", async function () {
          await expectRevert(
            courseManager.submitAnswer(
              COURSE_ID,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            ),
            "NOT_STUDENT"
          );
        });

        // set superfluid permission from user
        //  - student0: superfluid
        //  - student1: prepay
        async function _setupPermission() {
          // set permission from student0 (superfluid - superfluid's sdk)
          {
            const sf = await Framework.create({
              chainId: CHAIN_ID,
              provider: ethersProvider,
            });

            const ibtxst = await sf.loadSuperToken(ibtx.address);

            const op = ibtxst.authorizeFlowOperatorWithFullControl({
              flowOperator: courseManager.address,
            });
            const st0Data0 = await ibtxst.getFlowOperatorData({
              sender: student0,
              flowOperator: courseManager.address,
              providerOrSigner: ethersProvider,
            });
            expect(st0Data0.permissions).to.be.eq("0"); // NO PERMISSION

            await op.exec(ethersProvider.getSigner(student0));
            const st0Data1 = await ibtxst.getFlowOperatorData({
              sender: student0,
              flowOperator: courseManager.address,
              providerOrSigner: ethersProvider,
            });
            expect(st0Data1.permissions).to.be.eq("7"); // CREATE / UPDATE / DELETE PERMISSION
          }

          // set permission from student1 (prepay - ERC20#approve)
          {
            await ibtx.approve(
              courseManager.address,
              ethers.constants.MaxUint256.toString(),
              { from: student1 }
            );
          }
        }

        it("students can enroll a course", async function () {
          await _setupPermission();

          await courseManager.enrollCourse(COURSE_ID, false, {
            from: student0,
          });
          expect(await courseManager.isStudent(COURSE_ID, student0)).to.be.true;
          await courseManager.enrollCourse(COURSE_ID, true, { from: student1 });
          expect(await courseManager.isStudent(COURSE_ID, student1)).to.be.true;

          expect(await courseManager.isActive(COURSE_ID, student0)).to.be.true;
          expect(await courseManager.isActive(COURSE_ID, student1)).to.be.true;

          const {
            0: isFreeCourse0,
            1: prepaid0,
            2: paidAll0,
            3: streamedAmount0,
          } = await courseManager.getStreamedAmount(COURSE_ID, student0);
          const {
            0: isFreeCourse1,
            1: prepaid1,
            2: paidAll1,
            3: streamedAmount1,
          } = await courseManager.getStreamedAmount(COURSE_ID, student1);

          expect(isFreeCourse0).to.be.false;
          expect(isFreeCourse1).to.be.false;

          // check prepaid
          expect(prepaid0).to.be.false;
          expect(prepaid1).to.be.true;
          expect(paidAll0).to.be.false;
          expect(paidAll1).to.be.true;

          // check streamd amount
          expect(streamedAmount0.gt(toBN(0))).to.be.true; // pay some wei
          expect(streamedAmount1.toString()).to.be.eq("0");

          const enrollment0 = await courseManager.getEnrollmentOf(
            COURSE_ID,
            student0
          );
          const enrollment1 = await courseManager.getEnrollmentOf(
            COURSE_ID,
            student1
          );

          expect(enrollment0.finished).to.be.false;
          expect(enrollment1.finished).to.be.false;

          expect(enrollment0.prepaid).to.be.false;
          expect(enrollment1.prepaid).to.be.true;

          // check enrollment0.flowRate == courseData.enrollmentFee / 90 days
          expect(enrollment0.flowRate.toString()).to.be.eq(
            toBN(courseData.enrollmentFee.toString())
              .div(times.duration.days(90))
              .toString()
          );
        });

        describe("After students enroll a course", function () {
          beforeEach("enroll the first course by students", async function () {
            await _setupPermission();

            await courseManager.enrollCourse(COURSE_ID, false, {
              from: student0,
            });
            await courseManager.enrollCourse(COURSE_ID, true, {
              from: student1,
            });
          });

          it("students can submit answers", async function () {
            // cannot submit wrong answer
            await expectRevert(
              courseManager.submitAnswer(
                COURSE_ID,
                0,
                1, // wrong answer
                { from: student0 }
              ),
              "WRONG_ANSWER"
            );

            // cannot submit 2nd week answer before submit 1st week answer
            await expectRevert(
              courseManager.submitAnswer(
                COURSE_ID,
                1,
                courseData.week[1].answerBigEndian,
                { from: student0 }
              ),
              "INVALID_WEEK"
            );

            // can submit 1st week answer
            await courseManager.submitAnswer(
              COURSE_ID,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              COURSE_ID,
              0,
              courseData.week[0].answerBigEndian,
              { from: student1 }
            );

            // can submit 2nd week answer
            await courseManager.submitAnswer(
              COURSE_ID,
              1,
              courseData.week[1].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              COURSE_ID,
              1,
              courseData.week[1].answerBigEndian,
              { from: student1 }
            );
          });

          describe("After 1.5 month later", function () {
            beforeEach("increase time 1.5 month", async function () {
              const e = await courseManager.getEnrollmentOf(
                COURSE_ID,
                student0
              );
              await times.increaseTo(
                // WTF... `e.enrolledAt` is string in runtime... not BN
                toBN(e.enrolledAt.toString()).add(times.duration.days(45))
              );
            });

            it("students are active", async function () {
              expect(await courseManager.isActive(COURSE_ID, student0)).to.be
                .true;
              expect(await courseManager.isActive(COURSE_ID, student1)).to.be
                .true;
            });

            it("student0 paid a half of enrollment fee to payment receiver", async function () {
              const expectedStreamedAmount0 = toBN(
                courseData.enrollmentFee.toString()
              )
                .mul(toBN(45))
                .div(toBN(90));
              const { 2: paidAll0, 3: actualStreamedAmount0 } =
                await courseManager.getStreamedAmount(COURSE_ID, student0);

              expect(paidAll0).to.be.false;

              // NOTE: tiny math error (≤1e5) may occur so we just calc diff
              const diff = expectedStreamedAmount0
                .sub(actualStreamedAmount0)
                .abs();

              expect(
                diff.lt(TINY_ERROR),
                `diff: ${formatUnits(
                  diff.toString(),
                  18
                )} (expected: ${formatUnits(
                  expectedStreamedAmount0.toString(),
                  18
                )} actual: ${formatUnits(
                  actualStreamedAmount0.toString(),
                  18
                )})`
              ).to.be.true;
            });

            it("student0 pay up to a half of enrollment fee if he submits all answer now", async function () {
              const beforeLecturerBalance = await ibtx.balanceOf(lecturer);

              await courseManager.submitAnswer(
                COURSE_ID,
                0,
                courseData.week[0].answerBigEndian,
                { from: student0 }
              );

              await courseManager.submitAnswer(
                COURSE_ID,
                1,
                courseData.week[1].answerBigEndian,
                { from: student0 }
              );

              const { 2: paidAll } = await courseManager.getStreamedAmount(
                COURSE_ID,
                student0
              );

              expect(paidAll).to.be.true;

              const afterLecturerBalance = await ibtx.balanceOf(lecturer);

              const e = await courseManager.getEnrollmentOf(
                COURSE_ID,
                student0
              );
              expect(e.finished).to.be.true;

              const paymentReceiver = await PaymentReceiver.at(
                e.paymentReceiver
              );

              expect(await paymentReceiver.finished()).to.be.true;

              const actualLecturerTokenGain = afterLecturerBalance.sub(
                beforeLecturerBalance
              );
              const expectedLecturerTokenGain = toBN(
                courseData.enrollmentFee.toString()
              ).div(toBN(2));
              const lecturerTokenGainDiff = expectedLecturerTokenGain
                .sub(actualLecturerTokenGain)
                .abs();

              expect(
                lecturerTokenGainDiff.lt(TINY_ERROR),
                `diff: ${formatUnits(
                  lecturerTokenGainDiff.toString(),
                  18
                )} (expected: ${formatUnits(
                  expectedLecturerTokenGain.toString(),
                  18
                )} actual: ${formatUnits(
                  actualLecturerTokenGain.toString(),
                  18
                )})`
              ).to.be.true;

              expect(
                (await ibtx.balanceOf(e.paymentReceiver)).toString()
              ).to.be.eq("0");
            });

            it("student1 can submits all answers", async function () {
              await courseManager.submitAnswer(
                COURSE_ID,
                0,
                courseData.week[0].answerBigEndian,
                { from: student1 }
              );

              await courseManager.submitAnswer(
                COURSE_ID,
                1,
                courseData.week[1].answerBigEndian,
                { from: student1 }
              );
            });
          });

          describe("After 4 month later", function () {
            beforeEach("increase time 4 month", async function () {
              const e = await courseManager.getEnrollmentOf(
                COURSE_ID,
                student0
              );
              await times.increaseTo(
                // WTF... `e.enrolledAt` is string in runtime... not BN
                toBN(e.enrolledAt.toString()).add(times.duration.days(120))
              );
            });

            it("student0 is still active", async function () {
              expect(await courseManager.isActive(COURSE_ID, student0)).to.be
                .true;
            });

            it("student0 pay up to enrollment fee if he submits all answer now", async function () {
              const beforeLecturerBalance = await ibtx.balanceOf(lecturer);

              await courseManager.submitAnswer(
                COURSE_ID,
                0,
                courseData.week[0].answerBigEndian,
                { from: student0 }
              );

              await courseManager.submitAnswer(
                COURSE_ID,
                1,
                courseData.week[1].answerBigEndian,
                { from: student0 }
              );

              const afterLecturerBalance = await ibtx.balanceOf(lecturer);

              const e = await courseManager.getEnrollmentOf(
                COURSE_ID,
                student0
              );
              expect(e.finished).to.be.true;

              const paymentReceiver = await PaymentReceiver.at(
                e.paymentReceiver
              );

              expect(await paymentReceiver.finished()).to.be.true;

              const actualLecturerTokenGain = afterLecturerBalance.sub(
                beforeLecturerBalance
              );
              const expectedLecturerTokenGain = toBN(
                courseData.enrollmentFee.toString()
              );
              const lecturerTokenGainDiff = expectedLecturerTokenGain
                .sub(actualLecturerTokenGain)
                .abs();

              expect(
                lecturerTokenGainDiff.lt(toBN("100000000")),
                `diff: ${formatUnits(
                  lecturerTokenGainDiff.toString(),
                  18
                )} (expected: ${formatUnits(
                  expectedLecturerTokenGain.toString(),
                  18
                )} actual: ${formatUnits(
                  actualLecturerTokenGain.toString(),
                  18
                )})`
              ).to.be.true;

              expect(
                (await ibtx.balanceOf(e.paymentReceiver)).toString()
              ).to.be.eq("0");
            });
          });
        });
      });
    });
  });

  describe("MISC", function () {
    it("should encode and decode answers", async function () {
      const answers = [1, 4, 15];

      const encoded = await courseManager.encodeAnswers(answers);

      const decoded = await courseManager.decodeAnswers(
        answers.length,
        encoded
      );

      expect(decoded.map((bn) => bn.toNumber())).to.be.deep.eq(answers);
    });
  });
});
