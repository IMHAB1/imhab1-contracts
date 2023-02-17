import invariant from "invariant";
import { last } from "lodash";
import { forkNetwork } from "../lib/config";
import { DEFAULT_ENROLLMENT_FEE } from "../lib/constants";
import { LECTURE_DATA } from "../resources";

export default async function (deployer: Truffle.Deployer) {
  const Factory = artifacts.require("Factory");
  const CourseManager = artifacts.require("CourseManager");

  const factory = await Factory.deployed();
  const courseManager = await CourseManager.at(await factory.courseManager());

  for (const lecture of LECTURE_DATA) {
    const enrollmentFee = lecture.free ? "0" : DEFAULT_ENROLLMENT_FEE;
    const weeks = await Promise.all(
      lecture.weeks.map(async (week, i) => {
        const quiz = last(week.lectures)?.quiz;
        invariant(
          quiz !== undefined,
          "Quiz not found on last lecture of %sth week",
          i + 1
        );

        const nAnswers = quiz.length;
        const answers = quiz.map((q) => q.solution);
        const answerBigEndian = await courseManager
          .encodeAnswers(answers)
          .then((res) => "0x" + res.toString());

        return {
          nAnswers,
          answerBigEndian,
        };
      })
    );

    await courseManager.addCourse(enrollmentFee, weeks);
  }
}
