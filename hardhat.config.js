/**
 * @format
 * @type import('hardhat/config').HardhatUserConfig
 */

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
