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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ISuperfluidGovernanceInterface extends utils.Interface {
  functions: {
    "replaceGovernance(address,address)": FunctionFragment;
    "registerAgreementClass(address,address)": FunctionFragment;
    "updateContracts(address,address,address[],address)": FunctionFragment;
    "batchUpdateSuperTokenLogic(address,address[])": FunctionFragment;
    "setConfig(address,address,bytes32,address)": FunctionFragment;
    "setConfig(address,address,bytes32,uint256)": FunctionFragment;
    "clearConfig(address,address,bytes32)": FunctionFragment;
    "getConfigAsAddress(address,address,bytes32)": FunctionFragment;
    "getConfigAsUint256(address,address,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "replaceGovernance"
      | "registerAgreementClass"
      | "updateContracts"
      | "batchUpdateSuperTokenLogic"
      | "setConfig(address,address,bytes32,address)"
      | "setConfig(address,address,bytes32,uint256)"
      | "clearConfig"
      | "getConfigAsAddress"
      | "getConfigAsUint256"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "replaceGovernance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAgreementClass",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateContracts",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "batchUpdateSuperTokenLogic",
    values: [PromiseOrValue<string>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setConfig(address,address,bytes32,address)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setConfig(address,address,bytes32,uint256)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "clearConfig",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getConfigAsAddress",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getConfigAsUint256",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "replaceGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAgreementClass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchUpdateSuperTokenLogic",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setConfig(address,address,bytes32,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setConfig(address,address,bytes32,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "clearConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConfigAsAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConfigAsUint256",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ISuperfluidGovernance extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISuperfluidGovernanceInterface;

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
     * Replace the current governance with a new governance
     */
    replaceGovernance(
      host: PromiseOrValue<string>,
      newGov: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Register a new agreement class
     */
    registerAgreementClass(
      host: PromiseOrValue<string>,
      agreementClass: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Update logics of the contracts
     */
    updateContracts(
      host: PromiseOrValue<string>,
      hostNewLogic: PromiseOrValue<string>,
      agreementClassNewLogics: PromiseOrValue<string>[],
      superTokenFactoryNewLogic: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Update supertoken logic contract to the latest that is managed by the super token factory
     */
    batchUpdateSuperTokenLogic(
      host: PromiseOrValue<string>,
      tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Set configuration as address value
     */
    "setConfig(address,address,bytes32,address)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Set configuration as uint256 value
     */
    "setConfig(address,address,bytes32,uint256)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Clear configuration
     */
    clearConfig(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Get configuration as address value
     */
    getConfigAsAddress(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { value: string }>;

    /**
     * Get configuration as uint256 value
     */
    getConfigAsUint256(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { value: BigNumber }>;
  };

  /**
   * Replace the current governance with a new governance
   */
  replaceGovernance(
    host: PromiseOrValue<string>,
    newGov: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Register a new agreement class
   */
  registerAgreementClass(
    host: PromiseOrValue<string>,
    agreementClass: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Update logics of the contracts
   */
  updateContracts(
    host: PromiseOrValue<string>,
    hostNewLogic: PromiseOrValue<string>,
    agreementClassNewLogics: PromiseOrValue<string>[],
    superTokenFactoryNewLogic: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Update supertoken logic contract to the latest that is managed by the super token factory
   */
  batchUpdateSuperTokenLogic(
    host: PromiseOrValue<string>,
    tokens: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Set configuration as address value
   */
  "setConfig(address,address,bytes32,address)"(
    host: PromiseOrValue<string>,
    superToken: PromiseOrValue<string>,
    key: PromiseOrValue<BytesLike>,
    value: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Set configuration as uint256 value
   */
  "setConfig(address,address,bytes32,uint256)"(
    host: PromiseOrValue<string>,
    superToken: PromiseOrValue<string>,
    key: PromiseOrValue<BytesLike>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Clear configuration
   */
  clearConfig(
    host: PromiseOrValue<string>,
    superToken: PromiseOrValue<string>,
    key: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Get configuration as address value
   */
  getConfigAsAddress(
    host: PromiseOrValue<string>,
    superToken: PromiseOrValue<string>,
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  /**
   * Get configuration as uint256 value
   */
  getConfigAsUint256(
    host: PromiseOrValue<string>,
    superToken: PromiseOrValue<string>,
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    /**
     * Replace the current governance with a new governance
     */
    replaceGovernance(
      host: PromiseOrValue<string>,
      newGov: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Register a new agreement class
     */
    registerAgreementClass(
      host: PromiseOrValue<string>,
      agreementClass: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Update logics of the contracts
     */
    updateContracts(
      host: PromiseOrValue<string>,
      hostNewLogic: PromiseOrValue<string>,
      agreementClassNewLogics: PromiseOrValue<string>[],
      superTokenFactoryNewLogic: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Update supertoken logic contract to the latest that is managed by the super token factory
     */
    batchUpdateSuperTokenLogic(
      host: PromiseOrValue<string>,
      tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Set configuration as address value
     */
    "setConfig(address,address,bytes32,address)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Set configuration as uint256 value
     */
    "setConfig(address,address,bytes32,uint256)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Clear configuration
     */
    clearConfig(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Get configuration as address value
     */
    getConfigAsAddress(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Get configuration as uint256 value
     */
    getConfigAsUint256(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    /**
     * Replace the current governance with a new governance
     */
    replaceGovernance(
      host: PromiseOrValue<string>,
      newGov: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Register a new agreement class
     */
    registerAgreementClass(
      host: PromiseOrValue<string>,
      agreementClass: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Update logics of the contracts
     */
    updateContracts(
      host: PromiseOrValue<string>,
      hostNewLogic: PromiseOrValue<string>,
      agreementClassNewLogics: PromiseOrValue<string>[],
      superTokenFactoryNewLogic: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Update supertoken logic contract to the latest that is managed by the super token factory
     */
    batchUpdateSuperTokenLogic(
      host: PromiseOrValue<string>,
      tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Set configuration as address value
     */
    "setConfig(address,address,bytes32,address)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Set configuration as uint256 value
     */
    "setConfig(address,address,bytes32,uint256)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Clear configuration
     */
    clearConfig(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Get configuration as address value
     */
    getConfigAsAddress(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Get configuration as uint256 value
     */
    getConfigAsUint256(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Replace the current governance with a new governance
     */
    replaceGovernance(
      host: PromiseOrValue<string>,
      newGov: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Register a new agreement class
     */
    registerAgreementClass(
      host: PromiseOrValue<string>,
      agreementClass: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Update logics of the contracts
     */
    updateContracts(
      host: PromiseOrValue<string>,
      hostNewLogic: PromiseOrValue<string>,
      agreementClassNewLogics: PromiseOrValue<string>[],
      superTokenFactoryNewLogic: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Update supertoken logic contract to the latest that is managed by the super token factory
     */
    batchUpdateSuperTokenLogic(
      host: PromiseOrValue<string>,
      tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Set configuration as address value
     */
    "setConfig(address,address,bytes32,address)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Set configuration as uint256 value
     */
    "setConfig(address,address,bytes32,uint256)"(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Clear configuration
     */
    clearConfig(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Get configuration as address value
     */
    getConfigAsAddress(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Get configuration as uint256 value
     */
    getConfigAsUint256(
      host: PromiseOrValue<string>,
      superToken: PromiseOrValue<string>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
