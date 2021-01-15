//var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'upon chair current filter orchard lizard reflect dance basic prize robust parade';

module.exports = {
  networks: {
    development: {
	    host: "127.0.0.1",     // LOCALHOST (DEFAULT: NONE)
	    port: 7545,            // STANDARD ETHEREUM PORT (DEFAULT: NONE)
	    network_id: 5777       // ANY NETWORK (DEFAULT: NONE)
    }
  },
  ///contracts_directory: '.front/src/contracts/',
  contracts_build_directory: './front/src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
};
