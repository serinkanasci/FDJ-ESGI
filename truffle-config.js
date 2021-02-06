var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'tank yard sunset again unveil morning black lottery polar absorb mix sight';

const mnemonicRopsten = 'type attend loan kite debate liar board actual symbol speak year tourist'

module.exports = {
  networks: {
    development: {
	    host: "127.0.0.1",     // LOCALHOST (DEFAULT: NONE)
	    port: 7545,            // STANDARD ETHEREUM PORT (DEFAULT: NONE)
	    network_id: 5777       // ANY NETWORK (DEFAULT: NONE)
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonicRopsten, "https://ropsten.infura.io/v3/990e0585b0d244059dfccaaaf98a74b5")
      },
      network_id: 3
    }
  },
  ///contracts_directory: '.front/src/contracts/',
  contracts_build_directory: './front/src/abis/', // Définit le répertoire où se sauvegarderont les contrats compilés
  compilers: {
    solc: { // Il existe aussi la possibilité d'utiliser Vyper ou des compilateurs externes
      optimizer: {
        enabled: true, // On active l'optimizer
        runs: 200 // Et on le fait tourner sur 200 runs, sur ces 200 solc va garder en mémoire la comilation qui aura été la plus efficace en termes de coût de déploiement
      },
      evmVersion: "petersburg" // Version de l'EVM (la dernière en date ici)
    }
  }
};
