pragma solidity ^0.5.16;
import "math.sol";

contract Bets_test {
    uint256 idBet;
    address payable admin;
    address payable[] winners;
    
    event error(string _error);
    
    //status
    uint256 constant WIN = 1;
    uint256 constant LOSE = 2;
    uint256 constant TIE = 3;
    uint256 constant PENDING = 4;
    
    //team
    struct Side {
        string name;
        uint256 status;
        uint256 amount;
        address payable[] players;
        
    }
    
    //bet
    struct Bet {
        uint256 id;
        Side side1;
        Side side2;
    }
    
    //all bets
    Bet[] bets;
    
    constructor() public{
        idBet = 0;
        admin = msg.sender;
    }
    
    
    //creating bet
    function createBet(string memory nameSide1, string memory nameSide2) public {
        address payable[] memory players;
        //creating teams
        Side memory side1 = Side(nameSide1, PENDING, 0, players);
        Side memory side2 = Side(nameSide2, PENDING, 0, players);
        //creation bet
        Bet memory bet = Bet(idBet, side1, side2);
        //add bet to all bets
        bets.push(bet);
        idBet++;
    }
    
    //verify if bet exists
    function existingBet(uint256 _id) public view returns(bool) {
        for(uint i = 0; i < bets.length; i++) {
            if(_id == bets[i].id) return true;
        } return false;
    }
    
    //get players by team
    function getPlayersBySide(uint256 _id, uint256 _side) public view returns(address payable[] memory) {
        //verify if bet exists
        if(!existingBet(_id)){
            emit error("Bet doesn't exist.");
            return [];
        }
        
        //looping on all bets
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id)
                if(_side == 1)
                    return bets[i].side1.players;
                    
                if(_side == 2)
                    return bets[i].side2.players;
        }
    }
    

    //verify if player already in bet
    function getPlayerByBet(uint256 _id, address _addr) public view returns(bool){
        address payable[] memory players;
        //get all players in bet
        players = getPlayersBySide(_id, 1);
        
        //verify if player is not in bet
        for(uint i = 0; i < players.length; i++)
            if(players[i] == _addr)
                return true;
        
        players = getPlayersBySide(_id, 2);
        
        for(uint i = 0; i < players.length; i++)
            if(players[i] == _addr)
                return true;
            
        return false;
    }
    
    //returns all bets with specific side
    function getBetBySide(uint256 _side) public view returns(uint256) {
        for(uint i = 0; i < bets.length; i++) {
                if(_side == 1)
                    return bets[i].id;
                if(_side == 2)
                    return bets[i].id;
        }
        //return null;
    }
    
    //add player to bet
    function participateToBet(uint256 _id, uint256 _side) public payable returns(uint256){
        //verify entry price
        if(msg.value <= 1000000000000000000){
            emit error("Mise non respecté");
            return 1;
        }    
        
        //verify if bet exists
        if(!existingBet(_id)){
            emit error("Bet doesn't exist.");
            return 1;
        }
        
        //verify if player doesn't already participate
        if(!getPlayerByBet(_id, msg.sender)){
            emit error("vous avez déjà participé.");
            return 1;
        }
        
        //loop into all bets to add the player in the right one
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                if(bets[i].side1.status == PENDING){
                    if(_side == 1)
                        bets[i].side1.players.push(msg.sender);
                        bets[i].side1.amount += msg.value;
                    
                    if(_side == 2)
                        bets[i].side2.players.push(msg.sender);
                        bets[i].side2.amount += msg.value;
                }
            }
        }
    }
    
    //get winners
    function SetWinner(uint256 _id, uint256 _side, uint256 _status) public {
        //verify if the sender is the admin
        /*if(msg.sender == admin){
            emit error("Vous n'etes pas administrateur");
            return 1;
        }*/
        
        //verify if the bet exists
        if(_side != 1 || _side != 2){
            emit error("L'équipe n'existe pas");
            return 1;
        }
        
        //verify if team
        if(_status != 1 || _status != 2){
            emit error("Le status n'existe pas");
            return 1;
        }
        
        //loop into all bets
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                //verify if the bet is not already finish
                if(bets[i].side1.status == PENDING && bets[i].side1.status == PENDING){
                    if(_side == 1){
                        
                        //change team status
                        bets[i].side1.status = _status;
                        
                        //set the winners array
                        if(_status == 1){
                            bets[i].side2.status = 2;
                            winners = bets[i].side1.players;
                        }
                        
                        bets[i].side1.status = 2;
                        winners = bets[i].side2.players;
                    }
                    
                    bets[i].side2.status = _status;
                    
                    if(_status == 1){
                        bets[i].side1.status = 2;
                        winners = bets[i].side2.players;
                    }
                    
                    bets[i].side2.status = 2;
                    winners =  bets[i].side1.players;
                }
            }
        }
    }
    
    //pay winners
    function payWinners(uint256 _id, uint256 _side) public{
        //verify if there is winners
        if(winners == []){
            emit error("Il n'y a pas de gagnants");
            return 1;
        }
        
        uint256 total;
        float256 toPay;
        
        //add the amount to distribute
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                total = bets[i].side1.amount;
                total = bets[i].side2.amount;
            }
        }
        
        //devide the total amout by the number of players
        toPay = total/winners.length;
        //send to the winners the reward
        for(uint i = 0; i < winners.length; i++) {
            winners[i].transfer(toPay);
        }
        delete winners;
    }
}