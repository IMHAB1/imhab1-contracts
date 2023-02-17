// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "truffle/console.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import {PaymentReceiver} from "./PaymentReceiver.sol";

contract CourseManager is Ownable {
    using SuperTokenV1Library for ISuperToken;

    /// @dev We may not record answer contract to prevent cheating, but we do for simiple implementation...
    struct Week {
        uint256 nAnswers; // a number of answers
        uint256 answerBigEndian; // compacted answers in the unit of hex. e.g., if answers = [1, 4, 15], answerBigEndian = 0xf41
    }

    struct Enrollment {
        address student;
        uint256 currentWeekIndex;
        uint256 flowRate;
        uint256 enrolledAt;
        uint256 finishedAt;
        PaymentReceiver paymentReceiver;
        bool finished; // true if student submits all answer
        bool prepaid; // true if student pay the fee when enroll
    }

    struct Course {
        address lecturer;
        uint256 enrollmentFee;
        Week[] week; // NOTE: cannot use `weeks` because it is a reserved word in solidity....
        Enrollment[] enrollments;
    }

    uint256 public constant PAYMENT_DURATION = 90 days;

    ISuperToken public token;

    // courseId => Course
    mapping(uint256 => Course) public courses;

    // courseId => student => isStudent
    mapping(uint256 => mapping(address => bool)) public isStudent;

    // courseId => student => index
    mapping(uint256 => mapping(address => uint256)) public enrollmentIndice;

    uint256 public nCourses;

    ///////////////////////////////////////////////////////////////
    // Events
    ///////////////////////////////////////////////////////////////

    // no events for this contract.

    ///////////////////////////////////////////////////////////////
    // Modifiers
    ///////////////////////////////////////////////////////////////

    modifier nonZeroAccount(address account) {
        require(account != address(0), "ZERO_ADDRESS");
        _;
    }

    modifier onlyValidCourse(uint256 courseId) {
        require(courseId < nCourses, "OUT_OF_BOUND: COURSE_ID");
        _;
    }

    // Should check non-zero lecturer with `nonZeroAccount`
    // Should check valid course with `onlyValidCourse`
    modifier onlyLecturer(uint256 courseId, address lecturer) {
        require(courses[courseId].lecturer == lecturer, "NOT_LECTURER");
        _;
    }

    // Should check non-zero student with `nonZeroAccount`
    // Should check valid course with `onlyValidCourse`
    modifier onlyValidStudent(uint256 courseId, address student) {
        require(isStudent[courseId][student], "NOT_STUDENT");
        _;
    }

    // Should check non-zero student with `nonZeroAccount`
    // Should check valid course with `onlyValidCourse`
    // Should check valid student with `onlyValidStudent`
    modifier onlyActiveStudent(uint256 courseId, address student) {
        require(isActive(courseId, student), "NOT_ACTIVE");
        _;
    }

    // Should check valid course with `onlyValidCourse`
    modifier onlyValidWeek(uint256 courseId, uint256 weekIndex) {
        require(
            courses[courseId].week.length > weekIndex,
            "OUT_OF_BOUND: WEEK_INDEX"
        );
        _;
    }

    // Should check valid course with `onlyValidCourse`
    // Should check non-zero student with `nonZeroAccount`
    // Should check valid student with `onlyValidStudent`
    modifier updatePayment(uint256 courseId, address student) {
        PaymentReceiver paymentReceiver = courses[courseId]
            .enrollments[enrollmentIndice[courseId][student]]
            .paymentReceiver;

        if (address(paymentReceiver) != address(0)) {
            paymentReceiver.updatePayment();
        }
        _;
    }

    ///////////////////////////////////////////////////////////////
    // Constructor
    ///////////////////////////////////////////////////////////////

    constructor(ISuperToken _token) {
        token = _token;
    }

    ///////////////////////////////////////////////////////////////
    // Register
    ///////////////////////////////////////////////////////////////

    /// @dev Add a course by lecturer.
    /// @param enrollmentFee Enfronment fee that student pays. If 0, it's free.
    /// @param week A list of weeks. It can be empty now and updated later.
    function addCourse(uint256 enrollmentFee, Week[] calldata week) external {
        uint256 courseId = nCourses;
        nCourses = courseId + 1;

        Course storage course = courses[courseId];
        course.lecturer = msg.sender;
        course.enrollmentFee = enrollmentFee;

        for (uint256 i = 0; i < week.length; i++) {
            course.week.push(week[i]);
        }
    }

    /// @dev Enroll a course by student
    function enrollCourse(
        uint256 courseId,
        bool isPrepay
    ) external onlyValidCourse(courseId) {
        Course storage course = courses[courseId];

        require(!isStudent[courseId][msg.sender], "ALREADY_REGISTERED");

        isStudent[courseId][msg.sender] = true;
        enrollmentIndice[courseId][msg.sender] = course.enrollments.length;

        uint256 flowRate = isPrepay
            ? 0
            : course.enrollmentFee / PAYMENT_DURATION;
        PaymentReceiver paymentReceiver = flowRate > 0
            ? new PaymentReceiver(
                token,
                course.lecturer,
                msg.sender,
                course.enrollmentFee
            )
            : PaymentReceiver(address(0));

        course.enrollments.push(
            Enrollment({
                student: msg.sender,
                currentWeekIndex: 0,
                flowRate: flowRate,
                enrolledAt: block.timestamp,
                finishedAt: 0,
                paymentReceiver: paymentReceiver,
                finished: false,
                prepaid: isPrepay
            })
        );

        // pay fee to transfer if prepay
        if (isPrepay) {
            token.transferFrom(
                msg.sender,
                course.lecturer,
                course.enrollmentFee
            );
        }

        // create CFA from student to payment receiver
        if (flowRate > 0) {
            token.createFlowFrom(
                msg.sender,
                address(paymentReceiver),
                int96(uint96(flowRate))
            );
        }
    }

    /// @dev Submit an answer for a week by student
    function submitAnswer(
        uint256 courseId,
        uint256 weekIndex,
        uint256 answerBigEndian
    )
        external
        onlyValidCourse(courseId)
        onlyValidWeek(courseId, weekIndex)
        onlyValidStudent(courseId, msg.sender)
        onlyActiveStudent(courseId, msg.sender)
    {
        Course storage course = courses[courseId];

        require(isActive(courseId, msg.sender), "NOT_ACTIVE");

        Enrollment storage enrollment = course.enrollments[
            enrollmentIndice[courseId][msg.sender]
        ];

        // check student passed previous course
        require(enrollment.currentWeekIndex == weekIndex, "INVALID_WEEK");

        // check student's answer
        require(
            course.week[weekIndex].answerBigEndian == answerBigEndian,
            "WRONG_ANSWER"
        );

        // go to the next week
        enrollment.currentWeekIndex++;

        // update payment to check user to make sure that student pay up to the fee
        if (address(enrollment.paymentReceiver) != address(0)) {
            enrollment.paymentReceiver.updatePayment();
        }

        // mark finished if student submits all answers
        if (enrollment.currentWeekIndex == course.week.length) {
            enrollment.finished = true;
            enrollment.finishedAt = block.timestamp;

            if (address(enrollment.paymentReceiver) != address(0)) {
                // delete flow to stop paying more token
                token.deleteFlowFrom(
                    msg.sender,
                    address(enrollment.paymentReceiver)
                );

                // mark finished to payment receiver to transfer token to lecturer
                enrollment.paymentReceiver.forceFinish();
            }
        }
    }

    function isActive(
        uint256 courseId,
        address student
    ) public view returns (bool) {
        Course storage course = courses[courseId];

        // return false for non-student
        if (!isStudent[courseId][student]) return false;

        if (course.enrollmentFee > 0) {
            Enrollment storage enrollment = course.enrollments[
                enrollmentIndice[courseId][student]
            ];

            // return true for prepaid student
            if (enrollment.prepaid) return true;

            // delegate checks to payment receiver
            return
                course
                    .enrollments[enrollmentIndice[courseId][student]]
                    .paymentReceiver
                    .isActive();
        }

        return true;
    }

    ///////////////////////////////////////////////////////////////
    // Helper: Answer
    ///////////////////////////////////////////////////////////////

    function encodeAnswers(
        uint256[] memory answers
    ) public pure returns (uint256) {
        uint256 answerBigEndian;

        for (uint i = 0; i < answers.length; i++) {
            uint256 answer = answers[i];
            require(answer > 0, "Answer must be greater than 0");
            require(answer < 16, "Each answer must be less than 16");
            answerBigEndian = (answerBigEndian << 4) + answer;
        }

        return answerBigEndian;
    }

    function decodeAnswers(
        uint256 nAnswers,
        uint256 answerBigEndian
    ) public pure returns (uint256[] memory answers) {
        answers = new uint256[](nAnswers);

        for (uint256 i = 0; i < nAnswers; i++) {
            answers[answers.length - i - 1] = answerBigEndian & 0xf;
            answerBigEndian >>= 4;
        }

        return answers;
    }

    ///////////////////////////////////////////////////////////////
    // View
    ///////////////////////////////////////////////////////////////

    function getLecturer(
        uint256 courseId
    ) external view onlyValidCourse(courseId) returns (address) {
        return courses[courseId].lecturer;
    }

    function getEnrollmentFee(
        uint256 courseId
    ) external view onlyValidCourse(courseId) returns (uint256) {
        return courses[courseId].enrollmentFee;
    }

    function getEnrollments(
        uint256 courseId
    ) external view onlyValidCourse(courseId) returns (Enrollment[] memory) {
        return courses[courseId].enrollments;
    }

    function getEnrollmentOf(
        uint256 courseId,
        address student
    )
        external
        view
        onlyValidCourse(courseId)
        onlyValidStudent(courseId, student)
        returns (Enrollment memory)
    {
        return
            courses[courseId].enrollments[enrollmentIndice[courseId][student]];
    }

    function getStreamedAmount(
        uint256 courseId,
        address student
    )
        external
        view
        onlyValidCourse(courseId)
        onlyValidStudent(courseId, student)
        returns (
            bool isFreeCourse,
            bool prepaid,
            bool paidAll,
            uint256 streamedAmount
        )
    {
        Course storage course = courses[courseId];

        if (course.enrollmentFee == 0) {
            isFreeCourse = true;
            paidAll = true;
            return (isFreeCourse, prepaid, paidAll, streamedAmount);
        }

        Enrollment storage enrollment = course.enrollments[
            enrollmentIndice[courseId][student]
        ];

        if (enrollment.prepaid) {
            prepaid = true;
            paidAll = true;
            return (isFreeCourse, prepaid, paidAll, streamedAmount);
        }

        PaymentReceiver paymentReceiver = PaymentReceiver(
            enrollment.paymentReceiver
        );

        streamedAmount = paymentReceiver.getCurrentBalance();
        paidAll =
            streamedAmount >= course.enrollmentFee ||
            paymentReceiver.finished();

        return (isFreeCourse, prepaid, paidAll, streamedAmount);
    }
}
