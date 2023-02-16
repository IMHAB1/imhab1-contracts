// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "truffle/console.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import {PaymentReceiver} from "./PaymentReceiver.sol";

// superfluid flow는 3개월동안

contract CourseManager is Ownable {
    using SuperTokenV1Library for ISuperToken;

    struct Week {
        uint256 nAnswers; // a number of answers
        uint256 answerBigEndian; // compacted answers in the unit of hex. e.g., if answers = [1, 4, 15], answerBigEndian = 0xf41
    }

    struct Enrollment {
        address student;
        uint256 currentWeekIndex;
        uint256 flowRate;
        uint256 enrolledAt;
        PaymentReceiver paymentReceiver;
    }

    struct Course {
        address lecturer;
        uint256 enrollmentFee;
        Week[] week; // NOTE: cannot use `weeks` because it is a reserved word in solidity....
        Enrollment[] enrollments;
        mapping(address => bool) isStudent;
        mapping(address => uint256) enrollmentIndice;
    }

    uint256 public constant PAYMENT_DURATION = 90 days;

    ISuperToken public token;

    // courseId => Course
    mapping(uint256 => Course) internal _courses;
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
        require(_courses[courseId].lecturer == lecturer, "NOT_LECTURER");
        _;
    }

    // Should check non-zero student with `nonZeroAccount`
    // Should check valid course with `onlyValidCourse`
    modifier onlyValidStudent(uint256 courseId, address student) {
        require(_courses[courseId].isStudent[student], "NOT_STUDENT");
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
            _courses[courseId].week.length > weekIndex,
            "OUT_OF_BOUND: WEEK_INDEX"
        );
        _;
    }

    // Should check valid course with `onlyValidCourse`
    // Should check non-zero student with `nonZeroAccount`
    // Should check valid student with `onlyValidStudent`
    modifier updatePayment(uint256 courseId, address student) {
        PaymentReceiver paymentReceiver = _courses[courseId]
            .enrollments[_courses[courseId].enrollmentIndice[student]]
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

        Course storage course = _courses[courseId];
        course.lecturer = msg.sender;
        course.enrollmentFee = enrollmentFee;

        for (uint256 i = 0; i < week.length; i++) {
            course.week.push(week[i]);
        }
    }

    // TODO: create CFA flow from student to lecturer
    /// @dev Enroll a course by student
    function enrollCourse(uint256 courseId) external onlyValidCourse(courseId) {
        Course storage course = _courses[courseId];

        require(!course.isStudent[msg.sender], "ALREADY_REGISTERED");

        course.isStudent[msg.sender] = true;
        course.enrollmentIndice[msg.sender] = course.enrollments.length;

        PaymentReceiver paymentReceiver;
        uint256 flowRate;
        if (course.enrollmentFee > 0) {
            flowRate = (course.enrollmentFee) / PAYMENT_DURATION;

            paymentReceiver = new PaymentReceiver(
                token,
                msg.sender,
                course.enrollmentFee
            );

            // token.createFlowFrom(
            //     msg.sender,
            //     address(paymentReceiver),
            //     int96(uint96(flowRate))
            // );
        }

        course.enrollments.push(
            Enrollment({
                student: msg.sender,
                currentWeekIndex: 0,
                flowRate: flowRate,
                enrolledAt: block.timestamp,
                paymentReceiver: paymentReceiver
            })
        );

        if (address(paymentReceiver) != address(0)) {
            paymentReceiver.updatePayment();
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
        Course storage course = _courses[courseId];

        require(isActive(courseId, msg.sender), "NOT_ACTIVE");

        // check student passed previous course
        require(
            course
                .enrollments[course.enrollmentIndice[msg.sender]]
                .currentWeekIndex == weekIndex,
            "INVALID_WEEK"
        );

        // check student's answer
        require(
            course.week[weekIndex].answerBigEndian == answerBigEndian,
            "WRONG_ANSWER"
        );

        // go to the next week
        course
            .enrollments[course.enrollmentIndice[msg.sender]]
            .currentWeekIndex++;
    }

    function isActive(
        uint256 courseId,
        address student
    ) public view returns (bool) {
        Course storage course = _courses[courseId];

        if (!course.isStudent[student]) return false;
        if (course.enrollmentFee > 0)
            return
                course
                    .enrollments[course.enrollmentIndice[student]]
                    .paymentReceiver
                    .isActive();

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

    function getProfessor(
        uint256 courseId
    ) external view onlyValidCourse(courseId) returns (address) {
        return _courses[courseId].lecturer;
    }

    function getEnrollFee(
        uint256 courseId
    ) external view onlyValidCourse(courseId) returns (uint256) {
        return _courses[courseId].enrollmentFee;
    }

    function getEnrollments(
        uint256 courseId
    ) external view onlyValidCourse(courseId) returns (Enrollment[] memory) {
        return _courses[courseId].enrollments;
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
            _courses[courseId].enrollments[
                _courses[courseId].enrollmentIndice[student]
            ];
    }

    function isStudent(
        uint256 courseId,
        address student
    ) external view onlyValidCourse(courseId) returns (bool) {
        require(courseId < nCourses, "OUT_OF_BOUND: COURSE_ID");
        return _courses[courseId].isStudent[student];
    }
}
