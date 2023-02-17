import { expect } from "chai";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { ConstantFlowAgreementV1 } from "@superfluid-finance/sdk-core";

import {
  CourseManagerInstance,
  IBTInstance,
  ISuperTokenInstance,
} from "../types/truffle-contracts";
import { Snapshot } from "./utils/snapshot";

import * as times from "./utils/times";
import { CHAIN_ID } from "../lib/config";
import { parseUnits } from "ethers/lib/utils";

const { expectRevert } = require("@openzeppelin/test-helpers");

const ethersProvider = new ethers.providers.Web3Provider(
  web3.currentProvider as any
);

const { toBN } = web3.utils;

contract("CourseManager", (accounts: Truffle.Accounts) => {
  const [deployer, lecturer, student0, student1] = accounts;

  const Factory = artifacts.require("Factory");
  const CourseManager = artifacts.require("CourseManager");
  const IBT = artifacts.require("IBT");
  const ISuperToken = artifacts.require("ISuperToken");

  let courseManager: CourseManagerInstance;
  let ibt: IBTInstance;
  let ibtx: ISuperTokenInstance;

  beforeEach("load contracts", async function () {
    const factory = await Factory.deployed();
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
              0,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            ),
            "NOT_STUDENT"
          );
        });

        it("students can enroll a course", async function () {
          await courseManager.enrollCourse(0, false, { from: student0 });
          expect(await courseManager.isStudent(0, student0)).to.be.true;
          await courseManager.enrollCourse(0, false, { from: student1 });
          expect(await courseManager.isStudent(0, student1)).to.be.true;

          expect(await courseManager.isActive(0, student0)).to.be.true;
          expect(await courseManager.isActive(0, student1)).to.be.true;
        });

        describe("After students enroll a course", function () {
          beforeEach("enroll the first course by students", async function () {
            await courseManager.enrollCourse(0, false, { from: student0 });
            await courseManager.enrollCourse(0, false, { from: student1 });
          });

          it("students can submit answers", async function () {
            // cannot submit wrong answer
            await expectRevert(
              courseManager.submitAnswer(
                0,
                0,
                1, // wrong answer
                { from: student0 }
              ),
              "WRONG_ANSWER"
            );

            // cannot submit 2nd week answer before submit 1st week answer
            await expectRevert(
              courseManager.submitAnswer(
                0,
                1,
                courseData.week[1].answerBigEndian,
                { from: student0 }
              ),
              "INVALID_WEEK"
            );

            // can submit 1st week answer
            await courseManager.submitAnswer(
              0,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              0,
              0,
              courseData.week[0].answerBigEndian,
              { from: student1 }
            );

            // can submit 2nd week answer
            await courseManager.submitAnswer(
              0,
              1,
              courseData.week[1].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              0,
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
          enrollmentFee: "100000000",
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
              0,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            ),
            "NOT_STUDENT"
          );
        });

        // set superfluid permission from user
        async function _setupPermission() {
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
          const st1Data0 = await ibtxst.getFlowOperatorData({
            sender: student1,
            flowOperator: courseManager.address,
            providerOrSigner: ethersProvider,
          });
          expect(st0Data0.permissions).to.be.eq("0"); // NO PERMISSION
          expect(st1Data0.permissions).to.be.eq("0"); // NO PERMISSION

          await op.exec(ethersProvider.getSigner(student0));
          await op.exec(ethersProvider.getSigner(student1));
          const st0Data1 = await ibtxst.getFlowOperatorData({
            sender: student0,
            flowOperator: courseManager.address,
            providerOrSigner: ethersProvider,
          });
          const st1Data1 = await ibtxst.getFlowOperatorData({
            sender: student1,
            flowOperator: courseManager.address,
            providerOrSigner: ethersProvider,
          });

          expect(st0Data1.permissions).to.be.eq("7"); // CREATE / UPDATE / DELETE PERMISSION
          expect(st1Data1.permissions).to.be.eq("7"); // CREATE / UPDATE / DELETE PERMISSION
        }

        it("students can enroll a course", async function () {
          await _setupPermission();

          await courseManager.enrollCourse(0, false, { from: student0 });
          expect(await courseManager.isStudent(0, student0)).to.be.true;
          await courseManager.enrollCourse(0, false, { from: student1 });
          expect(await courseManager.isStudent(0, student1)).to.be.true;

          expect(await courseManager.isActive(0, student0)).to.be.true;
          expect(await courseManager.isActive(0, student1)).to.be.true;
        });

        describe("After students enroll a course", function () {
          beforeEach("enroll the first course by students", async function () {
            await _setupPermission();

            await courseManager.enrollCourse(0, false, { from: student0 });
            await courseManager.enrollCourse(0, false, { from: student1 });
          });

          it("students can submit answers", async function () {
            // cannot submit wrong answer
            await expectRevert(
              courseManager.submitAnswer(
                0,
                0,
                1, // wrong answer
                { from: student0 }
              ),
              "WRONG_ANSWER"
            );

            // cannot submit 2nd week answer before submit 1st week answer
            await expectRevert(
              courseManager.submitAnswer(
                0,
                1,
                courseData.week[1].answerBigEndian,
                { from: student0 }
              ),
              "INVALID_WEEK"
            );

            // can submit 1st week answer
            await courseManager.submitAnswer(
              0,
              0,
              courseData.week[0].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              0,
              0,
              courseData.week[0].answerBigEndian,
              { from: student1 }
            );

            // can submit 2nd week answer
            await courseManager.submitAnswer(
              0,
              1,
              courseData.week[1].answerBigEndian,
              { from: student0 }
            );

            await courseManager.submitAnswer(
              0,
              1,
              courseData.week[1].answerBigEndian,
              { from: student1 }
            );
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
