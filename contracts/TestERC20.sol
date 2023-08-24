// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '@openzeppelin/contracts/drafts/ERC20Permit.sol';

contract TestERC20 is ERC20Permit {
    constructor(uint256 amountToMint, string memory symbol) ERC20('Test ERC20', symbol) ERC20Permit('Test ERC20') {
        _mint(msg.sender, amountToMint);
    }
}
