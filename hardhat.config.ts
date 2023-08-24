import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers'

const config: HardhatUserConfig = {
  defaultNetwork: 'localhost',
  solidity: {
    compilers: [
      {
        version: '0.7.6'
      }
    ]
  },
};

export default config;
