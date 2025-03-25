/**
 * @format
 * @type import('hardhat/config').HardhatUserConfig
 */


require('dotenv').config();
module.exports = {
  solidity: '0.8.28',
  networks: {
    flowEVM: {
      url: 'https://testnet.evm.nodes.onflow.org',
      accounts: [process.env.FLOW_EVM_PRIVATE_KEY],
    },
  },
};
