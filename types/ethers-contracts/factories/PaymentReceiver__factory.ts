/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PaymentReceiver,
  PaymentReceiverInterface,
} from "../PaymentReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lecturer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_enrollmentFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "enrollmentFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lecturer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "student",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updatePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "returnRemainings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a3f380380610a3f83398101604081905261002f916100e5565b6100383361007d565b600180546001600160a01b03199081166001600160a01b0396871617909155600280548216948616949094179093556003805490931691909316179055600455610138565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146100e257600080fd5b50565b600080600080608085870312156100fb57600080fd5b8451610106816100cd565b6020860151909450610117816100cd565b6040860151909350610128816100cd565b6060959095015193969295505050565b6108f8806101476000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638da5cb5b116100715780638da5cb5b1461011b578063a57497101461012c578063bc8014c714610142578063e58590811461014a578063f2fde38b14610153578063fc0c546a1461016657600080fd5b806307d76c39146100ae57806322f3e2d4146100b857806343cb10aa146100d5578063699450e814610100578063715018a614610113575b600080fd5b6100b6610179565b005b6100c061029e565b60405190151581526020015b60405180910390f35b6002546100e8906001600160a01b031681565b6040516001600160a01b0390911681526020016100cc565b6003546100e8906001600160a01b031681565b6100b66102d4565b6000546001600160a01b03166100e8565b6101346102e6565b6040519081526020016100cc565b6100b661037d565b61013460045481565b6100b66101613660046107cf565b610477565b6001546100e8906001600160a01b031681565b6000546001600160a01b031633148061019c57506003546001600160a01b031633145b6101de5760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b60448201526064015b60405180910390fd5b60055460ff166102945760006101f26102e6565b90506004548110610291576005805460ff19166001908117909155546002546004805460405163a9059cbb60e01b81526001600160a01b0393841692810192909252602482015291169063a9059cbb906044016020604051808303816000875af1158015610264573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028891906107f3565b5061029161037d565b50565b61029c61037d565b565b60035460015460009182918291829182916102c6916001600160a01b039081169116306104ed565b501515979650505050505050565b6102dc61058f565b61029c60006105e9565b600154604051632ec8eec760e01b815230600482015260009182918291829182916001600160a01b031690632ec8eec790602401608060405180830381865afa158015610337573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035b9190610815565b935093509350935060008413610372576000610374565b835b94505050505090565b6000546001600160a01b03163314806103a057506003546001600160a01b031633145b6103dd5760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b60448201526064016101d5565b60055460ff161561029c5760006103f26102e6565b905080156102915760015460035460405163a9059cbb60e01b81526001600160a01b0391821660048201526024810184905291169063a9059cbb906044016020604051808303816000875af115801561044f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047391906107f3565b5050565b61047f61058f565b6001600160a01b0381166104e45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101d5565b610291816105e9565b60008060008060006104fe88610639565b604051631cd43d1160e31b81526001600160a01b038b811660048301528a811660248301528981166044830152919350908316915063e6a1e88890606401608060405180830381865afa158015610559573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057d919061084b565b929b919a509850909650945050505050565b6000546001600160a01b0316331461029c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101d5565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b7f65599bf746e17a00ea62e3610586992d88101b78eec3cf380706621fb97ea837547fb969d79d88acd02d04ed7ee7d43b949e7daf093d363abcfbbc43dfdfd1ce969a546001600160a01b038116610789576001600160a01b0382166106fe57826001600160a01b03166320bc44256040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fb919061088f565b91505b604051635b69006f60e11b81527fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd360048201526001600160a01b0383169063b6d200de90602401602060405180830381865afa158015610762573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610786919061088f565b90505b6001600160a01b03821661079f5761079f6108ac565b6001600160a01b0381166107b5576107b56108ac565b915091565b6001600160a01b038116811461029157600080fd5b6000602082840312156107e157600080fd5b81356107ec816107ba565b9392505050565b60006020828403121561080557600080fd5b815180151581146107ec57600080fd5b6000806000806080858703121561082b57600080fd5b505082516020840151604085015160609095015191969095509092509050565b6000806000806080858703121561086157600080fd5b84519350602085015180600b0b811461087957600080fd5b6040860151606090960151949790965092505050565b6000602082840312156108a157600080fd5b81516107ec816107ba565b634e487b7160e01b600052600160045260246000fdfea264697066735822122026d78a11b3b605d4432a061ec0e7f9e89df31ae667e8d6229a77dcfb6fa75f4c64736f6c63430008100033";

type PaymentReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PaymentReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PaymentReceiver__factory extends ContractFactory {
  constructor(...args: PaymentReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    _lecturer: PromiseOrValue<string>,
    _student: PromiseOrValue<string>,
    _enrollmentFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PaymentReceiver> {
    return super.deploy(
      _token,
      _lecturer,
      _student,
      _enrollmentFee,
      overrides || {}
    ) as Promise<PaymentReceiver>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    _lecturer: PromiseOrValue<string>,
    _student: PromiseOrValue<string>,
    _enrollmentFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token,
      _lecturer,
      _student,
      _enrollmentFee,
      overrides || {}
    );
  }
  override attach(address: string): PaymentReceiver {
    return super.attach(address) as PaymentReceiver;
  }
  override connect(signer: Signer): PaymentReceiver__factory {
    return super.connect(signer) as PaymentReceiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PaymentReceiverInterface {
    return new utils.Interface(_abi) as PaymentReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PaymentReceiver {
    return new Contract(address, _abi, signerOrProvider) as PaymentReceiver;
  }
}