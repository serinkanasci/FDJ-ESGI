// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.8.0;

contract Bets {

    //bet status
    uint constant WIN = 1;
    uint constant LOSE = 2;
    uint constant TIE = 3;
    uint constant PENDING = 4;

    //game status
    uint constant NOT_STARTED = 1;
    uint constant STARTED = 2;
    uint constant COMPLETE = 3;
    uint constant ERROR = 4;

    //better struct
    struct Better {
        uint guess;
        address payable addr;
        uint status;
    }

    //game struct
    struct Game {
        uint256 betAmount;
        uint outcome;
        uint status;
        Better creator;
        Better taker;
    }

    //game
    Game game;

    //fallback function
    receive() external payable {}

    function createBet(uint _guess) public payable {
        game = Game(msg.value, 0, STARTED, Better(_guess, msg.sender, PENDING), Better(0, address(0), NOT_STARTED));
        game.creator = Better(_guess, msg.sender, PENDING);
    }

    function takeBet(uint _guess) public payable {
        //same bet amount plz
        require(msg.value == game.betAmount);
        game.taker = Better(_guess, msg.sender, PENDING);
        generateBetOutcome();
    }

    function payout() public payable {

        checkPermissions(msg.sender);

        if (game.creator.status == TIE && game.taker.status == TIE) {
            game.creator.addr.transfer(game.betAmount);
            game.taker.addr.transfer(game.betAmount);
        } else {
            if (game.creator.status == WIN) {
                game.creator.addr.transfer(game.betAmount * 2);
            } else if (game.taker.status == WIN) {
                game.taker.addr.transfer(game.betAmount * 2);
            } else {
                game.creator.addr.transfer(game.betAmount);
                game.taker.addr.transfer(game.betAmount);
            }
        }
    }

    function checkPermissions(address sender) view private {
        //only the creator or taker can call this function
        require(sender == game.creator.addr || sender == game.taker.addr);
    }

    function getBetAmount() public view returns(uint) {
        checkPermissions(msg.sender);
        return game.betAmount;
    }

    function getCreatorGuess() public view returns(uint) {
        checkPermissions(msg.sender);
        return game.creator.guess;
    }

    function getTakerGuess() public view returns(uint) {
        checkPermissions(msg.sender);
        return game.taker.guess;
    }

    function getPot() public view returns(uint256) {
        checkPermissions(msg.sender);
        return address(this).balance;
    }

    function generateBetOutcome() private {
        //todo - not a great way to generate a random number but ok for now
        game.outcome = uint(blockhash(block.number - 1)) % 10 + 1;
        game.status = COMPLETE;

        if (game.creator.guess == game.taker.guess) {
            game.creator.status = TIE;
            game.taker.status = TIE;
        } else if (game.creator.guess > game.outcome && game.taker.guess > game.outcome) {
            game.creator.status = TIE;
            game.taker.status = TIE;
        } else {
            if ((game.outcome - game.creator.guess) < (game.outcome - game.taker.guess)) {
                game.creator.status = WIN;
                game.taker.status = LOSE;
            } else if ((game.outcome - game.taker.guess) < (game.outcome - game.creator.guess)) {
                game.creator.status = LOSE;
                game.taker.status = WIN;
            } else {
                game.creator.status = ERROR;
                game.taker.status = ERROR;
                game.status = ERROR;
            }
        }
    }

    function getBetOutcome() public view returns(string memory description, string memory creatorKey, uint creatorStatus, string memory takerKey, uint takerStatus) {
        if (game.creator.status == TIE || game.taker.status == TIE) {
            description = "Both bets were the same or were over the number, the pot will be split";
        } else {
            if (game.creator.status == WIN) {
                description = "Bet creator guess was closer to the number and will receive the pot";
            } else if (game.taker.status == WIN) {
                description = "Bet taker guess was closer to the number and will receive the pot";
            } else {
                description = "Unknown Bet Outcome";
            }
        }
        creatorKey = "creator";
        creatorStatus = game.creator.status;
        takerKey = "taker";
        takerStatus = game.taker.status;
    }
}