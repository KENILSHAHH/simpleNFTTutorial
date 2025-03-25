/** @format */

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
