pragma solidity >=0.5.0 <0.8.0;

contract Bets {
    uint256 idBet;
    address payable admin;
    address payable[] winners;
    uint256[] betsBySide;

    event error(string _error);

    // Status
    uint256 constant WIN = 1;
    uint256 constant LOSE = 2;
    uint256 constant TIE = 3;
    uint256 constant PENDING = 4;

    // Side
    struct Side {
        string name;
        uint256 status;
        uint256 amount;
        address payable[] players;
    }

    // Bet
    struct Bet {
        uint256 id;
        Side side1;
        Side side2;
    }

    // All bets
    Bet[] bets;

    constructor() public {
        idBet = 0;
        admin = msg.sender;
    }

    // Both sides names req.
    function createBet(string memory name1, string memory name2) public {
        address payable[] memory players;

        // Set sides of bet and add it to all bets
        Side memory side1 = Side(name1, PENDING, 0, players);
        Side memory side2 = Side(name2, PENDING, 0, players);
        bets.push(Bet(idBet, side1, side2));
        idBet++;
    }

    // Verify if bet exists
    function existingBet(uint256 _id) public view returns(bool) {
        for(uint i = 0; i < bets.length; i++)
            if(_id == bets[i].id) return true;
        return false;
    }

    // Get all players in one side of bet
    function getPlayersBySide(uint256 _id, uint256 _side) public view returns(address payable[] memory) {
        if(!existingBet(_id)){
            address payable[] memory blank;
           // emit error("Bet doesn't exist.");
            return blank;
        }

        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                if(_side == 1) return bets[i].side1.players;
                if(_side == 2) return bets[i].side2.players;
            }
        }
    }

    // Verify if player is in bet
    function getPlayerByBet(uint256 _id, address _addr) public view returns(bool) {
        address payable[] memory players;

        // Check side 1
        players = getPlayersBySide(_id, 1);
        for(uint i = 0; i < players.length; i++)
            if(players[i] == _addr) return true;

        // Check side 2
        players = getPlayersBySide(_id, 2);
        for(uint i = 0; i < players.length; i++)
            if(players[i] == _addr) return true;

        return false;
    }

    // Get all bets containing named side
    function getBetsBySide(string memory _side) public {
        delete betsBySide;

        for(uint i = 0; i < bets.length; i++) {
            if(keccak256(abi.encodePacked(bets[i].side1.name)) == keccak256(abi.encodePacked(_side)) || 
               keccak256(abi.encodePacked(bets[i].side2.name)) == keccak256(abi.encodePacked(_side))) {
                betsBySide.push(bets[i].id);
            }
        }
    }
    
    // Get bet sides names with id
    function getBetById(uint256 _id) public view returns(string memory, string memory, uint256) {
        return(bets[_id].side1.name, bets[_id].side2.name,_id);
    }
    
    // Get all bets
    function getAllBets() public view returns(uint256) {
        uint256 countBets = 0;
        
        for(uint i = 0; i < bets.length; i++)
            countBets++;
            
        return countBets;
    }

    // Add player to bet
    function participateToBet(uint256 _id, uint256 _side) public payable returns(bool) {
        /*if(msg.value <= 1000000000000000000) {
            emit error("Wrong entry price.");
            return false;
        }*/
        require(msg.value <= 1 wei, "Wrong entry price.");

        // Verify if bet exists
        /*if(!existingBet(_id)){
            emit error("Bet doesn't exists.");
            return false;
        }*/
        require(!existingBet(_id), "Bet doesn't exists.");

        // Verify if player is in bet
        /*if(!getPlayerByBet(_id, msg.sender)){
            emit error("Already in.");
            return false;
        }*/
        require(!getPlayerByBet(_id, msg.sender), "Already in.");

        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                if(bets[i].side1.status == PENDING) {
                    if(_side == 1) {
                        bets[i].side1.players.push(msg.sender);
                        bets[i].side1.amount += msg.value;
                    } else if(_side == 2) {
                        bets[i].side2.players.push(msg.sender);
                        bets[i].side2.amount += msg.value;
                    }
                }
            }
        }
        return true;
    }

    // Set winners
    function setWinner(uint256 _id, uint256 _side, uint256 _status) public payable returns(bool) {
        // Verify if the sender is admin
        if(msg.sender != admin) {
            emit error("You're not admin.");
            return false;
        }

        // Verify side
        if(_side != 1 && _side != 2) {
            emit error("Wrong side.");
            return false;
        }

        //verify status
        if(_status != 1 && _status != 2){
            emit error("Wrong status.");
            return false;
        }

        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                // Verify if bet is pending
                if(bets[i].side1.status == PENDING && bets[i].side1.status == PENDING){

                    // Side 1
                    if(_side == 1) {
                        bets[i].side1.status = _status;
                        if(_status == 1){
                            bets[i].side2.status = 2;
                            winners = bets[i].side1.players;
                        } else if(_status == 2) {
                            bets[i].side1.status = 2;
                            winners = bets[i].side2.players;
                        }
                    }

                    // Side 2
                    if(_side == 2) {
                        bets[i].side2.status = _status;
                        if(_status == 1) {
                            bets[i].side1.status = 2;
                            winners = bets[i].side2.players;
                        } else if(_status == 2) {
                            bets[i].side2.status = 2;
                            winners = bets[i].side1.players;
                        }
                    }
                }
            }
        }
        return true;
    }

    // Pay winners
    function payWinners(uint256 _id) public payable returns(bool) {
        uint256 totalAmount = 0;
        uint256 winnerAmount;

        // Verify if there is winners
        if(winners.length == 0) {
            emit error("No winners.");
            return false;
        }

        // Total amount
        for(uint i = 0; i < bets.length; i++) {
            if(bets[i].id == _id) {
                totalAmount += bets[i].side1.amount;
                totalAmount += bets[i].side2.amount;
            }
        }

        // Calc amount / winner
        winnerAmount = totalAmount / winners.length;

        // Reward winners
        for(uint i = 0; i < winners.length; i++)
            winners[i].transfer(winnerAmount);

        delete winners;

        return true;
    }
}