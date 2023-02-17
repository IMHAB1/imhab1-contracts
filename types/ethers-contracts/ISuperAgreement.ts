/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ISuperAgreementInterface extends utils.Interface {
  functions: {
    "agreementType()": FunctionFragment;
    "realtimeBalanceOf(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "agreementType" | "realtimeBalanceOf"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "agreementType",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "realtimeBalanceOf",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "agreementType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "realtimeBalanceOf",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ISuperAgreement extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISuperAgreementInterface;

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
    /**
     * Get the type of the agreement class
     */
    agreementType(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Calculate the real-time balance for the account of this agreement class
     * @param account Account the state belongs to
     * @param time Time used for the calculation
     */
    realtimeBalanceOf(
      token: PromiseOrValue<string>,
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        dynamicBalance: BigNumber;
        deposit: BigNumber;
        owedDeposit: BigNumber;
      }
    >;
  };

  /**
   * Get the type of the agreement class
   */
  agreementType(overrides?: CallOverrides): Promise<string>;

  /**
   * Calculate the real-time balance for the account of this agreement class
   * @param account Account the state belongs to
   * @param time Time used for the calculation
   */
  realtimeBalanceOf(
    token: PromiseOrValue<string>,
    account: PromiseOrValue<string>,
    time: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      dynamicBalance: BigNumber;
      deposit: BigNumber;
      owedDeposit: BigNumber;
    }
  >;

  callStatic: {
    /**
     * Get the type of the agreement class
     */
    agreementType(overrides?: CallOverrides): Promise<string>;

    /**
     * Calculate the real-time balance for the account of this agreement class
     * @param account Account the state belongs to
     * @param time Time used for the calculation
     */
    realtimeBalanceOf(
      token: PromiseOrValue<string>,
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        dynamicBalance: BigNumber;
        deposit: BigNumber;
        owedDeposit: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    /**
     * Get the type of the agreement class
     */
    agreementType(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Calculate the real-time balance for the account of this agreement class
     * @param account Account the state belongs to
     * @param time Time used for the calculation
     */
    realtimeBalanceOf(
      token: PromiseOrValue<string>,
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Get the type of the agreement class
     */
    agreementType(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Calculate the real-time balance for the account of this agreement class
     * @param account Account the state belongs to
     * @param time Time used for the calculation
     */
    realtimeBalanceOf(
      token: PromiseOrValue<string>,
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}