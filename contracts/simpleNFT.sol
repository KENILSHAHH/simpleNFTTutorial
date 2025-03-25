// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    uint256 public tokenCounter;
    string public baseURI; // Keep it private to enforce controlled access

    constructor(string memory _baseURI) ERC721("SimpleNFT", "SNFT") {
        tokenCounter = 0;
        baseURI = _baseURI;
    }

    function getTokenURI() public view returns (string memory) {
        return baseURI;
    }

    function mintNFT(address recipient) public payable {
        require(tokenCounter < 5, "Token limit reached");
        require(msg.value == 0.01 ether, "Incorrect amount sent");
        require(balanceOf(recipient) == 0, "Only one NFT per wallet");
        _safeMint(recipient, tokenCounter);
        tokenCounter++;
    }
}
