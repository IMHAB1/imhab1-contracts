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

// import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

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
            ISuperTokenFactory.Upgradability.SEMI_UPGRADABLE,
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
}
