/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace CourseManager {
  export type WeekStruct = {
    nAnswers: PromiseOrValue<BigNumberish>;
    answerBigEndian: PromiseOrValue<BigNumberish>;
  };

  export type WeekStructOutput = [BigNumber, BigNumber] & {
    nAnswers: BigNumber;
    answerBigEndian: BigNumber;
  };

  export type EnrollmentStruct = {
    student: PromiseOrValue<string>;
    currentWeekIndex: PromiseOrValue<BigNumberish>;
    flowRate: PromiseOrValue<BigNumberish>;
    enrolledAt: PromiseOrValue<BigNumberish>;
    finishedAt: PromiseOrValue<BigNumberish>;
    paymentReceiver: PromiseOrValue<string>;
    finished: PromiseOrValue<boolean>;
    prepaid: PromiseOrValue<boolean>;
  };

  export type EnrollmentStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    boolean,
    boolean
  ] & {
    student: string;
    currentWeekIndex: BigNumber;
    flowRate: BigNumber;
    enrolledAt: BigNumber;
    finishedAt: BigNumber;
    paymentReceiver: string;
    finished: boolean;
    prepaid: boolean;
  };
}

export interface CourseManagerInterface extends utils.Interface {
  functions: {
    "PAYMENT_DURATION()": FunctionFragment;
    "courses(uint256)": FunctionFragment;
    "enrollmentIndice(uint256,address)": FunctionFragment;
    "isStudent(uint256,address)": FunctionFragment;
    "nCourses()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "addCourse(uint256,(uint256,uint256)[])": FunctionFragment;
    "enrollCourse(uint256,bool)": FunctionFragment;
    "submitAnswer(uint256,uint256,uint256)": FunctionFragment;
    "isActive(uint256,address)": FunctionFragment;
    "encodeAnswers(uint256[])": FunctionFragment;
    "decodeAnswers(uint256,uint256)": FunctionFragment;
    "getLecturer(uint256)": FunctionFragment;
    "getEnrollmentFee(uint256)": FunctionFragment;
    "getEnrollments(uint256)": FunctionFragment;
    "getEnrollmentOf(uint256,address)": FunctionFragment;
    "getStreamedAmount(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "PAYMENT_DURATION"
      | "courses"
      | "enrollmentIndice"
      | "isStudent"
      | "nCourses"
      | "owner"
      | "renounceOwnership"
      | "token"
      | "transferOwnership"
      | "addCourse"
      | "enrollCourse"
      | "submitAnswer"
      | "isActive"
      | "encodeAnswers"
      | "decodeAnswers"
      | "getLecturer"
      | "getEnrollmentFee"
      | "getEnrollments"
      | "getEnrollmentOf"
      | "getStreamedAmount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "PAYMENT_DURATION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "courses",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "enrollmentIndice",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isStudent",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "nCourses", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addCourse",
    values: [PromiseOrValue<BigNumberish>, CourseManager.WeekStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "enrollCourse",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitAnswer",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isActive",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeAnswers",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeAnswers",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLecturer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEnrollmentFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEnrollments",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEnrollmentOf",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getStreamedAmount",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "PAYMENT_DURATION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "courses", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enrollmentIndice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isStudent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nCourses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addCourse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enrollCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitAnswer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "encodeAnswers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeAnswers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLecturer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnrollmentFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnrollments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnrollmentOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStreamedAmount",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface CourseManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CourseManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    PAYMENT_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;

    courses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { lecturer: string; enrollmentFee: BigNumber }
    >;

    enrollmentIndice(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isStudent(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    nCourses(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addCourse(
      enrollmentFee: PromiseOrValue<BigNumberish>,
      week: CourseManager.WeekStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Enroll a course by student
     */
    enrollCourse(
      courseId: PromiseOrValue<BigNumberish>,
      isPrepay: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Submit an answer for a week by student
     */
    submitAnswer(
      courseId: PromiseOrValue<BigNumberish>,
      weekIndex: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isActive(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    encodeAnswers(
      answers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decodeAnswers(
      nAnswers: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { answers: BigNumber[] }>;

    getLecturer(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getEnrollmentFee(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getEnrollments(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[CourseManager.EnrollmentStructOutput[]]>;

    getEnrollmentOf(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[CourseManager.EnrollmentStructOutput]>;

    getStreamedAmount(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, boolean, BigNumber] & {
        isFreeCourse: boolean;
        prepaid: boolean;
        paidAll: boolean;
        streamedAmount: BigNumber;
      }
    >;
  };

  PAYMENT_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

  courses(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { lecturer: string; enrollmentFee: BigNumber }
  >;

  enrollmentIndice(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isStudent(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  nCourses(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addCourse(
    enrollmentFee: PromiseOrValue<BigNumberish>,
    week: CourseManager.WeekStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Enroll a course by student
   */
  enrollCourse(
    courseId: PromiseOrValue<BigNumberish>,
    isPrepay: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Submit an answer for a week by student
   */
  submitAnswer(
    courseId: PromiseOrValue<BigNumberish>,
    weekIndex: PromiseOrValue<BigNumberish>,
    answerBigEndian: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isActive(
    courseId: PromiseOrValue<BigNumberish>,
    student: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  encodeAnswers(
    answers: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  decodeAnswers(
    nAnswers: PromiseOrValue<BigNumberish>,
    answerBigEndian: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getLecturer(
    courseId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getEnrollmentFee(
    courseId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getEnrollments(
    courseId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<CourseManager.EnrollmentStructOutput[]>;

  getEnrollmentOf(
    courseId: PromiseOrValue<BigNumberish>,
    student: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<CourseManager.EnrollmentStructOutput>;

  getStreamedAmount(
    courseId: PromiseOrValue<BigNumberish>,
    student: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, boolean, boolean, BigNumber] & {
      isFreeCourse: boolean;
      prepaid: boolean;
      paidAll: boolean;
      streamedAmount: BigNumber;
    }
  >;

  callStatic: {
    PAYMENT_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    courses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { lecturer: string; enrollmentFee: BigNumber }
    >;

    enrollmentIndice(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isStudent(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    nCourses(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addCourse(
      enrollmentFee: PromiseOrValue<BigNumberish>,
      week: CourseManager.WeekStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Enroll a course by student
     */
    enrollCourse(
      courseId: PromiseOrValue<BigNumberish>,
      isPrepay: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Submit an answer for a week by student
     */
    submitAnswer(
      courseId: PromiseOrValue<BigNumberish>,
      weekIndex: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isActive(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    encodeAnswers(
      answers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decodeAnswers(
      nAnswers: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getLecturer(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getEnrollmentFee(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEnrollments(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<CourseManager.EnrollmentStructOutput[]>;

    getEnrollmentOf(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<CourseManager.EnrollmentStructOutput>;

    getStreamedAmount(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, boolean, BigNumber] & {
        isFreeCourse: boolean;
        prepaid: boolean;
        paidAll: boolean;
        streamedAmount: BigNumber;
      }
    >;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    PAYMENT_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    courses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    enrollmentIndice(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isStudent(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nCourses(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addCourse(
      enrollmentFee: PromiseOrValue<BigNumberish>,
      week: CourseManager.WeekStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Enroll a course by student
     */
    enrollCourse(
      courseId: PromiseOrValue<BigNumberish>,
      isPrepay: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Submit an answer for a week by student
     */
    submitAnswer(
      courseId: PromiseOrValue<BigNumberish>,
      weekIndex: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isActive(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeAnswers(
      answers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decodeAnswers(
      nAnswers: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLecturer(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEnrollmentFee(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEnrollments(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEnrollmentOf(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStreamedAmount(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PAYMENT_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    courses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    enrollmentIndice(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isStudent(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nCourses(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addCourse(
      enrollmentFee: PromiseOrValue<BigNumberish>,
      week: CourseManager.WeekStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Enroll a course by student
     */
    enrollCourse(
      courseId: PromiseOrValue<BigNumberish>,
      isPrepay: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Submit an answer for a week by student
     */
    submitAnswer(
      courseId: PromiseOrValue<BigNumberish>,
      weekIndex: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isActive(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeAnswers(
      answers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeAnswers(
      nAnswers: PromiseOrValue<BigNumberish>,
      answerBigEndian: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLecturer(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEnrollmentFee(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEnrollments(
      courseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEnrollmentOf(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStreamedAmount(
      courseId: PromiseOrValue<BigNumberish>,
      student: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
