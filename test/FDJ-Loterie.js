const { exception } = require("sjcl");

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

    it("Shouldn't pick any winner", async () => {
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

    it("Should participate with 2 players and try to pick winner, then create 2 and pick winner ", async () => {
        let instance = await Lotery.deployed({from: accounts[0]});
        // Comparer les valeurs insérer pour les participants et les valeurs retourner.
        // Il faudrait un un get balance pour le wallet eth, et un get LoteryGain selon ID de la loterie

        let balanceBefore = await instance.getAccountBalance.call(accounts[1]);
        instance.participateToLotery(0, {from: accounts[1], value: 1000000000000000000});
        let balanceAfter = await instance.getAccountBalance.call(accounts[1]);
        let valueLotery = await instance.getLoteryGain.call(0);
        // // assert.equal(firstParticipantValue, 10);
        //Recupere les valeurs puis les transforme en string (BigNumber to String)
        valueLotery = valueLotery.toString();
        balanceAfter = balanceAfter.toString();
        balanceBefore = balanceBefore.toString();

        //Recupere les valeurs puis les parse en entier (String to Int)
        valueLotery = parseInt(valueLotery);
        balanceAfter = parseInt(balanceAfter);
        balanceBefore = parseInt(balanceBefore);

        //Recupere les valeurs puis les transforme de wei en Ether (wei to Ether)
        valueLotery = (valueLotery/1000000000000000000).toFixed(0);
        balanceAfter = (balanceAfter/1000000000000000000).toFixed(0);
        balanceBefore = (balanceBefore/1000000000000000000).toFixed(0);

        //Recupere les valeurs puis les transforment en entier
        balanceAfter = Number(balanceAfter)
        balanceBefore = Number(balanceBefore)
        valueLotery = Number(valueLotery)

        assert.approximately(balanceAfter, (balanceBefore - valueLotery), 0.20, "The Lotery Value is not equivalent to balance before and after");

        let errored = false; 
        try {
            let pickWinner = await instance.pickWinnerForLotery.call(0);
        } catch (error) {
            errored = true;
        }
        assert.equal(errored, true);

        // Faire la meme choses pour un autre compte
        let sec_balanceBefore = await instance.getAccountBalance.call(accounts[2]);
        instance.participateToLotery(0, {from: accounts[2], value: 2000000000000000000});
        let sec_balanceAfter = await instance.getAccountBalance.call(accounts[2]);
        let sec_valueLotery = await instance.getLoteryGain.call(0);

        //Recupere les valeurs puis les transforme en string (BigNumber to String)
        sec_valueLotery = sec_valueLotery.toString();
        sec_balanceAfter = sec_balanceAfter.toString();
        sec_balanceBefore = sec_balanceBefore.toString();

        //Recupere les valeurs puis les parse en entier (String to Int)
        sec_valueLotery = parseInt(sec_valueLotery);
        sec_balanceAfter = parseInt(sec_balanceAfter);
        sec_balanceBefore = parseInt(sec_balanceBefore);

        //Recupere les valeurs puis les transforme de wei en Ether (wei to Ether)
        sec_valueLotery = (sec_valueLotery/1000000000000000000).toFixed(0);
        sec_balanceAfter = (sec_balanceAfter/1000000000000000000).toFixed(0);
        sec_balanceBefore = (sec_balanceBefore/1000000000000000000).toFixed(0);

        //Recupere les valeurs puis les transforment en entier
        sec_balanceAfter = Number(sec_balanceAfter)
        sec_balanceBefore = Number(sec_balanceBefore)
        sec_valueLotery = Number(sec_valueLotery)

        assert.approximately(sec_balanceAfter, sec_balanceBefore - (sec_valueLotery - valueLotery), 0.20,"The Lotery Value is not equivalent to balance before and after");
        
        // Test le lancement qui ne s'effectue pas avec autre que l'admin
        let errored1 = false; 
        try {
            let pickWinner = await instance.pickWinnerForLotery.call(0, {from: accounts[5]});
        } catch (error) {
            errored1 = true;
        }
        assert.equal(errored1, true);
        let admin = await instance.getAdmin.call();


        // Test le lancement qui s'effectue avec l'admin
        let errored2 = false; 
        try {
            let pickWinner2 = await instance.pickWinnerForLotery.call(0, {from: accounts[0]});
        } catch (error) {
            console.log(error);
            errored2 = true;
        }
        assert.equal(errored2, false);


        let acc_1 = await instance.getAccountBalance.call(accounts[1]);
        let acc_2 = await instance.getAccountBalance.call(accounts[2]);

        //Recupere les valeurs puis les transforme en string (BigNumber to String)
        acc_1 = acc_1.toString();
        acc_2 = acc_2.toString();

        //Recupere les valeurs puis les parse en entier (String to Int)
        acc_1 = parseInt(acc_1);
        acc_2 = parseInt(acc_2);

        //Recupere les valeurs puis les transforme de wei en Ether (wei to Ether)
        acc_1 = (acc_1/1000000000000000000).toFixed(0);
        acc_2 = (acc_2/1000000000000000000).toFixed(0);

        //Recupere les valeurs puis les transforment en entier
        acc_1 = Number(acc_1)
        acc_2 = Number(acc_2)

        // if(acc_1 != balanceAfter){
        //     assert.approximately(acc_1, (balanceAfter + sec_valueLotery), 0.20,"The account 1 didn't receive the lotery value");
        // }
        // else{
        //     assert.approximately(acc_2, (sec_balanceAfter + sec_valueLotery), 0.20,"The account 2 didn't receive the lotery value");
        // }

        try{
            assert.approximately(acc_1, (balanceAfter + sec_valueLotery), 0.20,"The account 1 didn't receive the lotery value"); 
        }catch (error){
            console.log(error)
            assert.approximately(acc_2, (sec_balanceAfter + sec_valueLotery), 0.20,"The account 2 didn't receive the lotery value");
        }
        

    });
})