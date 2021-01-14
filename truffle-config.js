//var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'next swim net dragon pizza sister common hero hard poet snow mixture';

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
