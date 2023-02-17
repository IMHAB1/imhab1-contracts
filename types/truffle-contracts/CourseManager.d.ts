/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface CourseManagerContract
  extends Truffle.Contract<CourseManagerInstance> {
  "new"(
    _token: string,
    meta?: Truffle.TransactionDetails
  ): Promise<CourseManagerInstance>;
}

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

type AllEvents = OwnershipTransferred;

export interface CourseManagerInstance extends Truffle.ContractInstance {
  PAYMENT_DURATION(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  courses(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: BN }>;

  enrollmentIndice(
    arg0: number | BN | string,
    arg1: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  isStudent(
    arg0: number | BN | string,
    arg1: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  nCourses(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Returns the address of the current owner.
   */
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  token(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership: {
    (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addCourse: {
    (
      enrollmentFee: number | BN | string,
      week: {
        nAnswers: number | BN | string;
        answerBigEndian: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      enrollmentFee: number | BN | string,
      week: {
        nAnswers: number | BN | string;
        answerBigEndian: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      enrollmentFee: number | BN | string,
      week: {
        nAnswers: number | BN | string;
        answerBigEndian: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      enrollmentFee: number | BN | string,
      week: {
        nAnswers: number | BN | string;
        answerBigEndian: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Enroll a course by student
   */
  enrollCourse: {
    (
      courseId: number | BN | string,
      isPrepay: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      courseId: number | BN | string,
      isPrepay: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      courseId: number | BN | string,
      isPrepay: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      courseId: number | BN | string,
      isPrepay: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Submit an answer for a week by student
   */
  submitAnswer: {
    (
      courseId: number | BN | string,
      weekIndex: number | BN | string,
      answerBigEndian: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      courseId: number | BN | string,
      weekIndex: number | BN | string,
      answerBigEndian: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      courseId: number | BN | string,
      weekIndex: number | BN | string,
      answerBigEndian: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      courseId: number | BN | string,
      weekIndex: number | BN | string,
      answerBigEndian: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  isActive(
    courseId: number | BN | string,
    student: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  encodeAnswers(
    answers: (number | BN | string)[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  decodeAnswers(
    nAnswers: number | BN | string,
    answerBigEndian: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN[]>;

  getLecturer(
    courseId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getEnrollmentFee(
    courseId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getEnrollments(
    courseId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<
    {
      student: string;
      currentWeekIndex: BN;
      flowRate: BN;
      enrolledAt: BN;
      paymentReceiver: string;
      finished: boolean;
      prepaid: boolean;
    }[]
  >;

  getEnrollmentOf(
    courseId: number | BN | string,
    student: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    student: string;
    currentWeekIndex: BN;
    flowRate: BN;
    enrolledAt: BN;
    paymentReceiver: string;
    finished: boolean;
    prepaid: boolean;
  }>;

  getStreamedAmount(
    courseId: number | BN | string,
    student: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: boolean; 1: boolean; 2: BN }>;

  methods: {
    PAYMENT_DURATION(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    courses(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: BN }>;

    enrollmentIndice(
      arg0: number | BN | string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    isStudent(
      arg0: number | BN | string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    nCourses(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Returns the address of the current owner.
     */
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    token(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership: {
      (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    addCourse: {
      (
        enrollmentFee: number | BN | string,
        week: {
          nAnswers: number | BN | string;
          answerBigEndian: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        enrollmentFee: number | BN | string,
        week: {
          nAnswers: number | BN | string;
          answerBigEndian: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        enrollmentFee: number | BN | string,
        week: {
          nAnswers: number | BN | string;
          answerBigEndian: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        enrollmentFee: number | BN | string,
        week: {
          nAnswers: number | BN | string;
          answerBigEndian: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Enroll a course by student
     */
    enrollCourse: {
      (
        courseId: number | BN | string,
        isPrepay: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        courseId: number | BN | string,
        isPrepay: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        courseId: number | BN | string,
        isPrepay: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        courseId: number | BN | string,
        isPrepay: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Submit an answer for a week by student
     */
    submitAnswer: {
      (
        courseId: number | BN | string,
        weekIndex: number | BN | string,
        answerBigEndian: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        courseId: number | BN | string,
        weekIndex: number | BN | string,
        answerBigEndian: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        courseId: number | BN | string,
        weekIndex: number | BN | string,
        answerBigEndian: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        courseId: number | BN | string,
        weekIndex: number | BN | string,
        answerBigEndian: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    isActive(
      courseId: number | BN | string,
      student: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    encodeAnswers(
      answers: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    decodeAnswers(
      nAnswers: number | BN | string,
      answerBigEndian: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;

    getLecturer(
      courseId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getEnrollmentFee(
      courseId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getEnrollments(
      courseId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      {
        student: string;
        currentWeekIndex: BN;
        flowRate: BN;
        enrolledAt: BN;
        paymentReceiver: string;
        finished: boolean;
        prepaid: boolean;
      }[]
    >;

    getEnrollmentOf(
      courseId: number | BN | string,
      student: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      student: string;
      currentWeekIndex: BN;
      flowRate: BN;
      enrolledAt: BN;
      paymentReceiver: string;
      finished: boolean;
      prepaid: boolean;
    }>;

    getStreamedAmount(
      courseId: number | BN | string,
      student: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: boolean; 1: boolean; 2: BN }>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
