const Lotery = artifacts.require("Lotery");

contract("Lotery Creation Test", accounts => {
    it("Should create Lotery LoterieDeTest with Lotery ID 0", async () => {
        let instance = await Lotery.deployed({from: accounts[0]});

        //Creation de la loterie
        instance.addLotery("LoterieDeTest");

        //Comparer le nom de la loterie
        let loteryCreatedName = await instance.existingLoteryByName.call("LoterieDeTest");
        assert.equal(loteryCreatedName, true);

        //Comparer l'ID de la loterie créer, premier loterie toujours a 0
        let loteryCreatedID = await instance.existingLoteryById.call(0);
        assert.equal(loteryCreatedID, true);
    });

    it("Should not have any participants", async () => {
        let instance = await Lotery.deployed({from: accounts[0]});
        //Comparer la liste de participants
        let aucunParticipants = []
        let loteryParticipants = await instance.listParticipantsForLot.call(0);
        var is_same = aucunParticipants.length == loteryParticipants.length && aucunParticipants.every(function(element, index) {
            return element === loteryParticipants[index]; 
        });
        assert.equal(is_same, true);
    });

    it("Shouldn't pick any wwinner", async () => {
        let instance = await Lotery.deployed({from: accounts[0]});
        // Test le lancement qui ne s'effectue pas avant 2 joueurs minimum
        let errored = false; 
        try {
            let pickWinner = await instance.pickWinnerForLotery.call(0);
        } catch (error) {
            errored = true;
        }
        assert.equal(errored, true);
    });

    it("Should participate with 1 player and try to pick winner, then create 2 and pick winner ", async () => {
        let instance = await Lotery.deployed({from: accounts[0]});
        //Comparer les valeurs insérer pour les participants et les valeurs retourner
        // let balanceBefore = accounts[1].balance;
        instance.participateToLotery(0, {from: accounts[1], value: 10});
        // let balanceAfter = accounts[1].balance;
        // let valueLotery = instance.LoteryGain[0];
        // assert.equal(firstParticipantValue, 10);
        // console.log(accounts[1]);
        // console.log(balanceAfter);
        // console.log(balanceAfter);
        let errored = false; 
        try {
            let pickWinner = await instance.pickWinnerForLotery.call(0);
        } catch (error) {
            errored = true;
        }
        assert.equal(errored, true);

        instance.participateToLotery(0, {from: accounts[2], value: 30});
        





        // let errored = false; 
        // try {
        //     let pickWinner = await instance.pickWinnerForLotery.call(0);
        // } catch (error) {
        //     errored = true;
        // }
        // assert.equal(errored, false);
    });
})



// participateToLotery
// listParticipantsForLot
// existingPlayerInLotery
// listLoteries
// pickWinnerForLotery