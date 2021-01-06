pragma solidity >=0.5.0 <0.8.0;

import "./Lotery.sol";

contract Main {
    //player structure
    struct User {
        uint id;
        string username;
        string status;
        address addrUsr;
        uint money;
    }
    //store user that have signed
    mapping(uint => bool)public subscribedUserId;   
    //store user names that have signed
    mapping(string => bool)public subscribedUserName;   
    //store user adresses that have signed
    mapping(address => bool)public subscribedUserAddress;
    //store users
    mapping(uint => User)public users;
    //store candidate count
    uint public usersCount;
    //store hashed content
    bytes32 public hashedContent;
    address payable admin;

/////////////////// VARIABLES IMPORTEES DE LOTERIE.SOL ///////////////////////////

/*
    
    struct FDJ_Lotery {
        uint256 id;
        string name;
    }

    //mapping(uint => FDJ_Lotery)public Loteries;
    
    FDJ_Lotery[] public Loteries;

    uint256 public idLotery;
    uint256 private gains;

    mapping(uint256 => address payable[]) public participantIdLotery;
    mapping(uint256 => uint256) public LoteryGain;
*/

    Lotery public loteryContract;

     constructor (Lotery _loteryContract) public {
         loteryContract = _loteryContract;
         usersCount = 0;
         admin = msg.sender;
    }

    //voted event
    event subscribeUser (bytes32 _hashedContent);
    
    function getCounter() public view returns (uint) {
        return usersCount; 
    }
    
    function getMoney(uint _idUser) public view returns (uint256) {
        return users[_idUser].money;
    }

    function subUser (uint _userId, string memory _username, string memory _status, address _addrUsr, uint _money) public {
        //require the user is not approved.
        require(!subscribedUserId[_userId], "This id is already used !");
        //require the user with this address is not approved.
        require(!subscribedUserAddress[_addrUsr], "This address is already used !");        
        //require the user with this username is not approved.
        require(!subscribedUserName[_username], "This username is already used !");        
        //require the user with this username is not approved.
        require(_money > 100 , "You need at least 100 to subscribe !");
        //Add user
        users[usersCount] = User(usersCount, _username, _status, _addrUsr, _money);
        usersCount ++;
        //record the user id has been registred
        subscribedUserId[_userId] = true;   
        //record the user address has been registred
        subscribedUserAddress[_addrUsr] = true;  
        //record the user username has been registred
        subscribedUserName[_username] = true;
        hashedContent = sha256(abi.encodePacked(_userId, _username, _status, _addrUsr, _money));
        //trigger subscribeUser event
        emit subscribeUser(hashedContent);
    }
}