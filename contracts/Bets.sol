// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.8.0;

contract Bets {
    uint256 idBet;
    address payable admin;
    
    //status
    uint256 constant WIN = 1;
    uint256 constant LOSE = 2;
    uint256 constant TIE = 3;
    uint256 constant PENDING = 4;
    
    struct Side {
        string name;
        uint256 status;
        address payable[] players;
    }
    
    struct Bet {
        uint256 id;
        Side side1;
        Side side2;
    }
    
    Bet[] bets;
    
    constructor() public{
        idBet = 0;
        admin = msg.sender;
    }
    
    function createBet(string memory nameSide1, string memory nameSide2) public {
        address payable[] memory players;
        Side memory side1 = Side(nameSide1, PENDING, players);
        Side memory side2 = Side(nameSide2, PENDING, players);
        Bet memory bet = Bet(idBet, side1, side2);
        bets.push(bet);
        idBet++;
    }
    
    function existingBet(uint256 _id) public view returns(bool) {
        for(uint i = 0; i < bets.length; i++) {
            if(_id == bets[i].id) return true;
        } return false;
    }
    
    function getPlayersBySide(uint256 _id, uint256 _side) public view returns(address payable[] memory) {
        require(existingBet(_id), "Bet doesn't exist.");
        
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id)
                if(_side == 1)
                    return bets[i].side1.players;
                    
                if(_side == 2)
                    return bets[i].side2.players;
        }
    }
    
    function getPlayerByBet(uint256 _id, address _addr) public view returns(bool){
        address payable[] memory players;
        players = getPlayersBySide(_id, 1);
        
        for(uint i = 0; i < players.length; i++)
            if(players[i] == _addr)
                return true;
        
        players = getPlayersBySide(_id, 2);
        
        for(uint i = 0; i < players.length; i++)
            if(players[i] == _addr)
                return true;
            
        return false;
    }
    
    function getBetBySide(uint256 _side) public view returns(uint256) {
        for(uint i = 0; i < bets.length; i++) {
            if(_side == 1)
                return bets[i].id;
                    
            if(_side == 2)
                return bets[i].id;
        }
    }
    
    function participateToBet(uint256 _id, uint256 _side) public payable returns(uint256){
        require(msg.value == 1 ether, "Mise non respecté");
        require(existingBet(_id), "Bet doesn't exist.");
        require(!getPlayerByBet(_id, msg.sender), "vous avez déjà participé");
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                if(_side == 1)
                    bets[i].side1.players.push(msg.sender);
                
                if(_side == 2)
                    bets[i].side1.players.push(msg.sender);
            }
        }
    }
    
    function pickWinner() public payable returns(uint256) {
        
    }
}