pragma solidity >=0.5.0 <0.8.0;

contract Lotery {
    
    //lotery structure
    struct FDJ_Lotery {
        uint256 id;
        string name;
        bool status;
        uint256 gain;
        address winner;
    }

    //mapping(uint => FDJ_Lotery)public Loteries;
    
    FDJ_Lotery[] public Loteries;

    address payable admin;
    uint256 public idLotery;
    uint256 public gains;

    mapping(uint256 => address payable[]) public participantIdLotery;
    
    constructor () public {
        idLotery = 0;
        admin = msg.sender;
    }
    event error(string _error);

    function participateToLotery(uint256 idLot) public payable returns(uint256) {
        //require(msg.value > 0.00002 ether, "Mise minimum non respestee!");
        //require(existingLoteryById(idLot),"La loterie n'existe pas bg");
        //require(!existingPlayerInLotery(idLot, msg.sender), "Tu participes deja enfoireuh");

        if(existingLoteryById(idLot)){
            if(!existingPlayerInLotery(idLot, msg.sender)){
                participantIdLotery[idLot].push(msg.sender);
                Loteries[idLot].gain += msg.value;

                // address(this) = address contrat - on convertit l'address en address payable pour qu'elle puisse recevoir des ETHs
               // address payable tmp = address(uint160(address(this)));
               // tmp.transfer(msg.value);
                return Loteries[idLot].gain;
            }else{
                emit error("You're already participating !");
                return 1;
            }
        }else{
            emit error("This lotery doesn't exists !");
            return 2;
        }
        
    }

    function listParticipantsForLot(uint256 idLot) public view returns (address payable[] memory){
        return participantIdLotery[idLot];
    }
    
    function existingPlayerInLotery(uint256 _id, address _a) public view returns(bool){
        for(uint i = 0; i < participantIdLotery[_id].length; i++){
            if(_a == participantIdLotery[_id][i]){
                return true;
            }
        }
        return false;
    }
    
    function existingLoteryByName(string memory _name) public view returns(bool){
        for(uint i = 0; i < Loteries.length; i++){
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(Loteries[i].name))){
                return true;
            }
        }
        return false;
    }
    
    function existingLoteryById(uint256 _id) public view returns(bool){
        for(uint i = 0; i < Loteries.length; i++){
            if(_id == Loteries[i].id){
                return true;
            }
        }
        return false;
    }
    
    function addLotery(string memory _name) public restricted{
        require(!existingLoteryByName(_name), "Name already used !!");
        Loteries.push(FDJ_Lotery(idLotery, _name, true, 0, address(0)));
        idLotery ++;
    }
    
    function getWinner(uint256 _idLot)public view returns(address){
        return Loteries[_idLot].winner;
    }

    function getLoteryLenght() public view returns (uint256){
        return Loteries.length;
    }
    
    function listLoteries(uint256 _id) public view returns (uint256, string memory, bool){
        return (Loteries[_id].id, Loteries[_id].name, Loteries[_id].status);
    }

    function pickWinnerForLotery(uint256 idLot) public payable restricted{

        if(participantIdLotery[idLot].length > 1){
            uint256 winner = (uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participantIdLotery[idLot])))) % participantIdLotery[idLot].length;
            Loteries[idLot].winner = participantIdLotery[idLot][winner];
            gains = uint256(Loteries[idLot].gain)* uint256(90)/uint256(100);
            participantIdLotery[idLot][winner].transfer(gains);
            msg.sender.transfer(Loteries[idLot].gain * uint256(98)/uint256(100));
            participantIdLotery[idLot] = new address payable[](0);
            setStatus(idLot, false);
            Loteries[idLot].gain = 0;
        }else{
            emit error("Can't pick a winner because there's only 1 player!");
        }
       // require(participantIdLotery[idLot].length > 1, "Minimum 2 joueurs");
    }
    
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    function getAccountBalance(address _account) public view returns(uint256){
        return _account.balance;
    }

    function getLoteryGain(uint256 _idLot) public view returns(uint256){
        return Loteries[_idLot].gain;
    }

    function getAdmin() public view returns(address){
        return admin;
    }

    modifier restricted(){
        require(msg.sender == admin, "Vous n'etes pas admin !");
        _;
    }

    function getLoteriesCount() public view returns(uint) {
        return Loteries.length;
    }

    function setStatus(uint256 id, bool isUp) public returns (bool){
        Loteries[id].status = isUp;
        return true;
    }
    
}