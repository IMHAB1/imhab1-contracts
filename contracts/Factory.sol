// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import {SuperfluidFrameworkDeployer} from "@superfluid-finance/ethereum-contracts/contracts/utils/SuperfluidFrameworkDeployer.sol";
// import {TestGovernance} from "@superfluid-finance/ethereum-contracts/contracts/utils/TestGovernance.sol";
// import {Superfluid} from "@superfluid-finance/ethereum-contracts/contracts/superfluid/Superfluid.sol";
// import {ConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/agreements/ConstantFlowAgreementV1.sol";
// import {InstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/agreements/InstantDistributionAgreementV1.sol";
// import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";
// import {SuperTokenFactory} from "@superfluid-finance/ethereum-contracts/contracts/superfluid/SuperTokenFactory.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {ISuperTokenFactory} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";
import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import {CourseManager} from "./CourseManager.sol";
import {IBT} from "./IBT.sol";
import {IBTx} from "./IBTx.sol";

// don't care gas optimization due to L2.
contract Factory is Ownable {
    using SuperTokenV1Library for ISuperToken;

    // ISuperfluid public host;
    // IConstantFlowAgreementV1 public cfa;

    IBT public ibt;
    ISuperToken public ibtx;
    CourseManager public courseManager;

    ISuperTokenFactory private superTokenFactory;

    // struct Framework {
    //     TestGovernance governance;
    //     Superfluid host;
    //     ConstantFlowAgreementV1 cfa;
    //     InstantDistributionAgreementV1 ida;
    //     IDAv1Library.InitData idaLib;
    //     SuperTokenFactory superTokenFactory;
    // }
    // SuperfluidFrameworkDeployer.Framework sf;
    // SuperfluidFrameworkDeployer sfd;

    constructor(ISuperTokenFactory _superTokenFactory) {
        // sfd = new SuperfluidFrameworkDeployer();
        // sf = sfd.getFramework();

        // host = sf.host;
        // cfa = sf.cfa;

        superTokenFactory = _superTokenFactory;
        deployContracts();
    }

    function deployContracts() public onlyOwner {
        ibt = _deployIBT();
        ibtx = _deployIBTx();
        courseManager = _deployCourseManager();

        ibtx.setFlowPermissions(
            address(courseManager),
            true,
            true,
            true,
            type(int96).max
        );
        ibtx.setMaxFlowPermissions(address(courseManager));
        // ibtx.updateFlowOperatorPermissions()

        // (
        //     ISuperfluid host,
        //     IConstantFlowAgreementV1 cfa
        // ) = _getAndCacheHostAndCFA(ibtx);

        // cfa.updateFlowOperatorPermissions(
        //     ibtx,
        //     address(courseManager),
        //     7,
        //     type(int96).max,
        //     ""
        // );
    }

    function _deployIBT() internal returns (IBT _ibt) {
        _ibt = new IBT();

        _ibt.grantRole(_ibt.DEFAULT_ADMIN_ROLE(), msg.sender);
        _ibt.grantRole(_ibt.MINTER_ROLE(), msg.sender);
        _ibt.grantRole(_ibt.PAUSER_ROLE(), msg.sender);

        _ibt.revokeRole(_ibt.MINTER_ROLE(), address(this));
        _ibt.revokeRole(_ibt.PAUSER_ROLE(), address(this));
        _ibt.revokeRole(_ibt.DEFAULT_ADMIN_ROLE(), address(this));
    }

    function _deployIBTx() internal returns (ISuperToken _ibtx) {
        _ibtx = superTokenFactory.createERC20Wrapper(
            IERC20(ibt),
            18,
            // ISuperTokenFactory.Upgradability.SEMI_UPGRADABLE,
            ISuperTokenFactory.Upgradability.NON_UPGRADABLE,
            "Super IMHAB1 Token",
            "IBTx"
        );

        // (, _ibtx) = sfd.deployWrapperSuperToken(
        //     "Super IMHAB1 Token",
        //     "IBTx",
        //     18,
        //     1e25
        // );
    }

    function _deployCourseManager() internal returns (CourseManager _cm) {
        _cm = new CourseManager(ibtx);
    }

    // keccak256("org.superfluid-finance.apps.SuperTokenLibrary.v1.host")
    bytes32 private constant _HOST_SLOT =
        0x65599bf746e17a00ea62e3610586992d88101b78eec3cf380706621fb97ea837;
    // keccak256("org.superfluid-finance.apps.SuperTokenLibrary.v1.cfa")
    bytes32 private constant _CFA_SLOT =
        0xb969d79d88acd02d04ed7ee7d43b949e7daf093d363abcfbbc43dfdfd1ce969a;
    // keccak256("org.superfluid-finance.apps.SuperTokenLibrary.v1.ida");
    bytes32 private constant _IDA_SLOT =
        0xa832ee1924ea960211af2df07d65d166232018f613ac6708043cd8f8773eddeb;

    // gets the host and cfa addrs for the token and caches it in storage for gas efficiency
    // to be used in state changing methods
    function _getAndCacheHostAndCFA(
        ISuperToken token
    ) private returns (ISuperfluid host, IConstantFlowAgreementV1 cfa) {
        // check if already in contract storage...
        assembly {
            // solium-disable-line
            host := sload(_HOST_SLOT)
            cfa := sload(_CFA_SLOT)
        }
        if (address(cfa) == address(0)) {
            // framework contract addrs not yet cached, retrieving now...
            if (address(host) == address(0)) {
                host = ISuperfluid(token.getHost());
            }
            cfa = IConstantFlowAgreementV1(
                address(
                    ISuperfluid(host).getAgreementClass(
                        //keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                        0xa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd3
                    )
                )
            );
            // now that we got them and are in a transaction context, persist in storage
            assembly {
                // solium-disable-line
                sstore(_HOST_SLOT, host)
                sstore(_CFA_SLOT, cfa)
            }
        }
        assert(address(host) != address(0));
        assert(address(cfa) != address(0));
    }
}
