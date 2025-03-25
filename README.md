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

# Title

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



## Tech Stack

| Technology | Description |  |
|------------|-------------|------|
| **[Hardhat](https://hardhat.org/)** | Smart contract development environment | ![Hardhat](https://hardhat.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhe-head.aed81bd1.svg&w=256&q=75) |
| **[Solidity](https://soliditylang.org/)** | Ethereum's smart contract programming language | ![Solidity](data:image/png;base64,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) |
| **[ReactJS](https://reactjs.org/)** | Frontend framework for building UI | ![ReactJS](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) |
| **[Flow EVM Testnet](https://developers.flow.com/evm/about)** | Test environment for deploying Solidity smart contracts | ![Flow](https://cryptologos.cc/logos/flow-flow-logo.svg?v=026) |


## Part 1

Text can go here.  Usually it will be either an introduction to a long section with subsections, or a short section with no subsections that doesn't fit under a higher level.

### Subsection 1

Divide each part into appropriate categories.

**Avoid h4 and above**

## Part 2

More text goes here

## Conclusion

In this tutorial, you ...

Now that you have completed the tutorial, you should be able to:

- Copy/paste the Objectives from above here

(OPTIONAL) Now that you've completed this tutorial, you're ready to...

<!-- Relative links, will not render on page -->

[Cadence]: https://cadence-lang.org/docs
[Next.js]: https://nextjs.org/docs/app/getting-started/installation
[Yarn]: https://yarnpkg.com
