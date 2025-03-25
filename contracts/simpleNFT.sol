// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("SimpleNFT", "SNFT") {
        tokenCounter = 0;
    }

//   - Allow **public minting** (one NFT per wallet).
//   - Have a **fixed supply of 5 NFTs**.
//   - Cost **0.01 ETH per mint**.

    function mintNFT(address recipient) public payable {
        require(tokenCounter < 5, "Token limit reached");
        require(msg.value == 0.01 ether, "Incorrect amount sent");
        require(balanceOf(recipient) == 0, "Only one NFT per wallet");
        _safeMint(recipient, tokenCounter);
        tokenCounter++;
    }
}
