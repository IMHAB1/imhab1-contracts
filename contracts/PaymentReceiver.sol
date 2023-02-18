// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "truffle/console.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

/// @dev We need PaymentReceiver to identify flow and to check the flow is finished or not.
contract PaymentReceiver is Ownable {
    using SuperTokenV1Library for ISuperToken;

    ISuperToken public token;

    address public lecturer;
    address public student;
    uint256 public enrollmentFee;

    bool public finished; // true if student pays all

    constructor(
        ISuperToken _token,
        address _lecturer,
        address _student,
        uint256 _enrollmentFee
    ) {
        token = _token;
        lecturer = _lecturer;
        student = _student;
        enrollmentFee = _enrollmentFee;
    }

    modifier onlyOwnerOrStudent() {
        require(
            msg.sender == owner() || msg.sender == student,
            "NOT_AUTHORIZED"
        );
        _;
    }

    function updatePayment() external onlyOwnerOrStudent {
        if (!finished) {
            uint256 balance = getCurrentBalance();

            if (balance >= enrollmentFee) {
                finished = true;
                token.transfer(lecturer, enrollmentFee);
                refundResidual();
            }
        } else {
            refundResidual();
        }
    }

    /// @dev return overflowed token to student
    function refundResidual() public onlyOwnerOrStudent {
        if (!finished) return;

        uint256 balance = getCurrentBalance();

        if (balance > 0) {
            token.transfer(student, balance);
        }
    }

    function getCurrentBalance() public view returns (uint256) {
        (
            int256 availableBalance,
            uint256 deposit,
            uint256 owedDeposit,
            uint256 timestamp
        ) = token.realtimeBalanceOfNow(address(this));

        owedDeposit;
        timestamp;

        return uint256(availableBalance) + deposit;
    }

    function isActive() public view returns (bool) {
        if (finished) return true;

        uint256 balance = getCurrentBalance();
        if (balance >= enrollmentFee) return true;

        (
            uint256 lastUpdated,
            int96 flowRate,
            uint256 deposit,
            uint256 owedDeposit
        ) = token.getFlowInfo(student, address(this));

        lastUpdated;
        flowRate;
        deposit;
        owedDeposit;

        return deposit > 0;
    }

    function getFlowInfo()
        public
        view
        returns (
            uint256 lastUpdated,
            int96 flowRate,
            uint256 deposit,
            uint256 owedDeposit
        )
    {
        (lastUpdated, flowRate, deposit, owedDeposit) = token.getFlowInfo(
            student,
            address(this)
        );

        return (lastUpdated, flowRate, deposit, owedDeposit);
    }

    function forceFinish() external onlyOwner {
        if (finished) return;

        uint256 received = getCurrentBalance();
        finished = true;
        token.transfer(lecturer, received);
    }
}
