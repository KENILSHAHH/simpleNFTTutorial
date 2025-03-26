---
title: Simple NFT Minting DApp on Flow
description: Minimalistic NFT DApp on Flow Testnet with React & Solidity
keywords:
   ERC721,
   Flow Testnet Blockchain,
   Solidity & OpenZeppelin,
   React and Solidity Fullstack Dapp,
   Non Fungible Tokens (NFTs)
   Fullstack NFT Dapp
---

# Fullstack NFT Dapp on Flow EVM Testnet

Building a Fullstack NFT Dapp on Flow EVM Testnet from scratch using Solidity and Hardhat for Smart Contracts, EthersJS & ReactJS

# Description

This tutorial will guide you through building a fullstack NFT DApp on the Flow EVM testnet. You will learn how to deploy smart contracts using Hardhat, interact with them using Ethers.js, and build a frontend using ReactJS. By the end of this tutorial, you will have a working NFT DApp that allows users to mint and manage their NFTs.

## Objectives

After completing this guide, you'll be able to:

- Deploy and interact with smart contracts on the Flow EVM testnet using Hardhat.
- Use Ethers.js to interact with the blockchain from a ReactJS frontend.
- Build a simple frontend to display and interact with NFTs.
- Implement wallet connectivity and transactions.
- Understand the basics of NFT standards and smart contract development.

## Prerequisites

- [NodeJS](https://nodejs.org/) installed on your machine.  
- [MetaMask](https://metamask.io/) or another [Ethereum wallet](https://ethereum.org/en/wallets/find-wallet/) installed in your browser for wallet connectivity.  
- Basic knowledge of [Solidity](https://soliditylang.org/), [Ethereum](https://ethereum.org/), and [ReactJS](https://reactjs.org/).  

## Tech Stack

| Technology | Description |  |
|------------|-------------|------|
| **[Hardhat](https://hardhat.org/)** | Smart contract development environment | <img src="https://hardhat.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhe-head.aed81bd1.svg&w=256&q=75" width="100"/> |
| **[Solidity](https://soliditylang.org/)** | Ethereum's smart contract programming language | <img src="https://docs.soliditylang.org/en/latest/_static/img/logo.svg" width="100"/> |
| **[ReactJS](https://reactjs.org/)** | Frontend framework for building UI | <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100"/> |
| **[Flow EVM Testnet](https://developers.flow.com/evm/about)** | Test environment for deploying Solidity smart contracts | <img src="https://cryptologos.cc/logos/flow-flow-logo.svg?v=026" width="100"/> |


## Part 1 - Building ERC721 smart contract using Solidity and Hardhat

In this part, you will learn how to create an ERC721 [Non Fungible Token Standard] smart contract using Solidity and Hardhat. You will deploy the smart contract to the Flow EVM testnet using Ethers.


### Installing And Initializing our Hardhat Project 

 Initialize a new Node.js project and install the required dependencies:

```bash
mkdir nftonflow
cd nftonflow
mkdir hardhat
cd hardhat
npm init -y
```

Install Hardhat and the required packages required for ERC721 contract deployment:

```bash
npm install --save-dev hardhat
npx hardhat init 
```

Create an empty *hardhat.config.js* file in the root directory of your project:


Create a new directory for your smart contracts and create a new Solidity file for your ERC721 contract:

```bash
mkdir contracts
cd contracts
touch SimpleNFT.sol
```

Add the following code to the SimpleNFT.sol file:

We would be creating a simple ERC721 contract that allows users to mint NFTs. 
- The contract will have a tokenCounter to keep track of the number of tokens minted,
- A baseURI to store the base URI for the token metadata
- A constructor to initialize the contract with the base URI,
- A getTokenURI function to return the base URI, and
- A mintNFT function to mint NFTs.

The NFT contract would have following features 
- Minting an NFT will require the user to send 0.01 ether,
- Only one NFT can be minted per wallet. 
- The contract will have a token limit of 5 NFTs.



```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Import the ERC721 contract from OpenZeppelin

contract SimpleNFT is ERC721 {
    uint256 public tokenCounter; // Keep track of the number of tokens minted
    string public baseURI; // Base URI for the token metadata

   // Constructor to initialize the contract with the base URI
    constructor(string memory _baseURI) ERC721("SimpleNFT", "SNFT") { 
        tokenCounter = 0;
        baseURI = _baseURI;
    }
   // Function to return the base URI 
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
```

Install the OpenZeppelin contracts library, ethers, hardhat-toolbox and dotenv packages:

```bash
cd ..
npm install @openzeppelin/contracts ethers dotenv @nomicfoundation/hardhat-toolbox
```

Set up the dotenv file to store your private key [  Warning! : Do not push this file to Github, add it to .gitignore before pushing as you might lose all your funds. Always use a testnet account for development purposes]

```bash
touch .env
```

Add your private key to the .env file:

```bash
FLOW_EVM_PRIVATE_KEY=YOUR_PRIVATE_KEY
```


Setup the hardhat.config.js file to configure the Flow EVM test network and import the required plugins:

```javascript
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
module.exports = {
  solidity: '0.8.26',
  networks: {
    flowEVM: {
      url: 'https://testnet.evm.nodes.onflow.org',
      accounts: [process.env.FLOW_EVM_PRIVATE_KEY],
    },
  },
};
```
Now lets write the deployment script for our ERC721 contract

Create a new directory for your scripts and create a new file named deploy.js:

```bash
mkdir scripts
cd scripts
touch deploy.js
```

Add the following code to the deploy.js file:

This will deploy the SimpleNFT contract to the Flow EVM testnet and log the contract address to the console.
It will also set the base URI for the contract to the Flow Logo URL.
```javascript
const { ethers } = require('hardhat');
require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contract with the account:', deployer.address);
  const NFTImage = 'https://cryptologos.cc/logos/flow-flow-logo.png';
  const SimpleNFT = await ethers.getContractFactory('SimpleNFT');
  const simpleNFT = await SimpleNFT.deploy(NFTImage);

  await simpleNFT.waitForDeployment();
  const contractAddres = await simpleNFT.getAddress();
  console.log(
    'SimpleNFT deployed to:',
    `https://evm-testnet.flowscan.io/address/${contractAddres}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
Its time to deploy our contract to the Flow EVM testnet

Before deploying grab some testnet FLOW tokens from the faucet - https://faucet.flow.com/fund-account 

<img src="/Users/kenil/code/simpleNftCOntract/simplenftcontract/image.png" alt="Flow Faucet" width="400">

Run the compilation and deployment script using Hardhat:

```bash
cd ..
npx hardhat compile
npx hardhat run scripts/deploy.js --network flowEVM
```

You should see the contract address logged to the console:

```bash
Deploying contract with the account: 0x...
SimpleNFT deployed to: https://evm-testnet.flowscan.io/address/0x...
```

Congratulations! You have successfully deployed an ERC721 smart contract to the Flow EVM testnet using Hardhat.


## Part 2 : Interacting with the ERC721 contract using Ethers.js and building a simple frontend with ReactJS

In this part, you will learn how to interact with the ERC721 smart contract deployed on the Flow EVM testnet using Ethers.js. You will build a simple frontend using ReactJS to display the NFTs and allow users to mint new NFTs.

### Setting up the ReactJS frontend

Create a ReactJS project using Create React App in the same directory as your Hardhat project:
install and setup tailwindcss, ethers, lucide-react for the frontend
```bash
cd ..
npx create-react-app frontend
cd frontend
npm install tailwindcss@3 ethers lucide-react
npx tailwindcss init -p
```



On the src/App.js file and replace the existing code with the following:

This code will connect the frontend to the wallet, allow users to mint NFTs, and display the user's NFT collection.
The contract address and ABI are hardcoded in the file for simplicity. You can replace them with your contract address and ABI.

```javascript


  const mintNFT = async () => {
    if (!contract) return;
    setIsMinting(true);
    setMintSuccess(false);
    try {
      const tx = await contract.mintNFT(account, {
        value: ethers.parseEther('0.01'),
      });
      await tx.wait();
      fetchNFTs(account, contract);
      setMintSuccess(true);
      setTimeout(() => setMintSuccess(false), 3000);
    } catch (error) {
      console.error('Minting failed', error);
    } finally {
      setIsMinting(false);
    }
  };


```




## Conclusion

In this tutorial, you learned how to build a fullstack NFT DApp on the Flow EVM testnet using Solidity, Hardhat, Ethers.js, and ReactJS. You deployed an ERC721 smart contract to the Flow EVM testnet, interacted with it using Ethers.js, and built a simple frontend to display and mint NFTs. You also learned about NFT standards, smart contract development, and wallet connectivity. You can now explore more advanced features and build your own NFT DApps on the Flow EVM testnet.

Now that you have completed the tutorial, you should be able to:

- Deploy and interact with smart contracts on the Flow EVM testnet using Hardhat.
- Use Ethers.js to interact with the blockchain from a ReactJS frontend.
- Build a simple frontend to display and interact with NFTs.
- Implement wallet connectivity and transactions.
- Understand the basics of NFT standards and smart contract development.


 Now that you've completed this tutorial, you're ready to...

- Explore more advanced features of the Flow EVM testnet and build more complex NFT DApps.
- Learn about other NFT standards like ERC1155 and ERC721.
- Experiment with different frontend frameworks and libraries to build more interactive UIs.


<!-- Relative links, will not render on page -->
[Flow]: https://docs.onflow.org/
[Flow EVM]: https://developers.onflow.org/docs/flow-evm
[Cadence]: https://cadence-lang.org/docs
[Next.js]: https://nextjs.org/docs/app/getting-started/installation
[Yarn]: https://yarnpkg.com
[Hardhat]: https://hardhat.org/getting-started/
[React]: https://reactjs.org/docs/getting-started.html
[OpenZeppelin]: https://docs.openzeppelin.com/contracts/4.x/
[Ethers.js]: https://docs.ethers.io/v5/

