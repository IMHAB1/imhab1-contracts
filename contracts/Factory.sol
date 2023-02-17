// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {ISuperTokenFactory} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";
import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import {CourseManager} from "./CourseManager.sol";
import {IBT} from "./IBT.sol";

// don't care gas optimization due to L2.
contract Factory is Ownable {
    using SuperTokenV1Library for ISuperToken;

    IBT public ibt;
    ISuperToken public ibtx;
    CourseManager public courseManager;

    ISuperTokenFactory private superTokenFactory;

    constructor(ISuperTokenFactory _superTokenFactory) {
        superTokenFactory = _superTokenFactory;
        deployContracts();
    }

    function deployContracts() public onlyOwner {
        ibt = _deployIBT();
        ibtx = _deployIBTx();
        courseManager = _deployCourseManager();
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
            ISuperTokenFactory.Upgradability.NON_UPGRADABLE,
            "Super IMHAB1 Token",
            "IBTx"
        );
    }

    function _deployCourseManager() internal returns (CourseManager _cm) {
        _cm = new CourseManager(ibtx);
    }
}
