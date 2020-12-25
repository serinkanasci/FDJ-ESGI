pragma solidity >=0.5.0 <0.8.0;

contract Lotery {
    
    //lotery structure
    struct FDJ_Lotery {
        uint256 id;
        string name;
    }
    //mapping(uint => FDJ_Lotery)public Loteries;
    
    FDJ_Lotery[] public Loteries;

    address payable admin;
    uint256 public idLotery;
    uint256 private gains;

    mapping(uint256 => address payable[]) public participantIdLotery;
    mapping(uint256 => uint256) public LoteryGain;


    constructor () public {
        idLotery = 0;
        admin = msg.sender;
    }

    function participateToLotery(uint256 idLot) public payable returns(uint256) {
        require(msg.value > 0.2 ether, "Mise minimum non respestee!");
        require(existingLoteryById(idLot), "La loterie n'existe pas bg");
        require(!existingPlayerInLotery(idLot, msg.sender), "Tu participes deja enfoireuh");
        participantIdLotery[idLot].push(msg.sender);
        gains = msg.value;
        LoteryGain[idLot] += msg.value;
        return gains;
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
        Loteries.push(FDJ_Lotery(idLotery, _name));
        idLotery ++;
    }
    
    function listLoteries(uint256 _id) public view returns (uint256, string memory){
        return (Loteries[_id].id, Loteries[_id].name);
    }

    function pickWinnerForLotery(uint256 idLot) public payable restricted{
        require(participantIdLotery[idLot].length > 1, "Minimum 2 joueurs");
        uint256 winner = (uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participantIdLotery[idLot])))) % participantIdLotery[idLot].length;
        gains = uint256(LoteryGain[idLot])* uint256(90)/uint256(100);
        participantIdLotery[idLot][winner].transfer(gains);
        admin.transfer(LoteryGain[idLot]);
        participantIdLotery[idLot] = new address payable[](0);
    }
    
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    modifier restricted(){
        require(msg.sender == admin, "Vous n'etes pas admin !");
        _;
    }
    
}
