var Lotery = artifacts.require("Lotery");
<<<<<<< HEAD
// var Main = artifacts.require("Main");
=======
>>>>>>> loterie

/*
	We used asymetric function to be sure to get the contract ABI in LoteryContract.
	In this way we can get LoteryContract address to set it in the Main.sol contract
 */

module.exports = async function(deployer, networks, accounts) {
	await deployer.deploy(Lotery);
	const LoteryContract = await Lotery.deployed();

<<<<<<< HEAD
	// await deployer.deploy(Main, LoteryContract.address);
	// const MainContract = await Main.deployed();
=======
>>>>>>> loterie
}
