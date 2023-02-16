// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20PresetMinterPauser} from "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

/// @dev IBT ERC20 Token
contract IBT is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("IMHAB1 Token", "IBT") {}
}
