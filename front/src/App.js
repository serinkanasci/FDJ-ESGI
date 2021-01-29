import './App.css';
import React from 'react';
import Web3 from 'web3';

// Import mon contrat compilé
import LoteryContract from './abis/Lotery.json';

// Import de mes compsants
import NavbarPerso from './components/Navbar.js';
import CreateLotery from './components/CreateLotery.js';
import Bet from './components/Bet.js';
import Lotery from './components/Lotery.js';


class App extends React.Component {

async componentDidMount(){
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadBlockchainData(){

      // URL Ganache
      const web3 = new Web3(window.ethereum);
      
      const accounts = await web3.eth.getAccounts();
      
      this.setState({account: accounts[0]});
      
      web3.eth.handleRevert = true

      //On récupère l'ID du réseau : 5777 provenant de ganache
      const netId = await web3.eth.net.getId()
      console.log(netId)

      // On va chercher le contrat déployé sur le réseau 5777
      const loteryContractData = LoteryContract.networks[netId]

      // Si on récupère quelque chose de non-vide, on créer le contrat sur web3 avec l'abi (présent dans le .json du contrat une fois compilé) et son adresse, puis on l'enregistre dans le state
      if(loteryContractData){
        const loteryContract = new web3.eth.Contract(LoteryContract.abi, loteryContractData.address)
        this.setState({ loteryAbi: loteryContract })
      }else{
        window.alert('Lotery smart contract has not been deployed to detected network')
      }

    //   var options = {
    //     fromBlock: 0,
    //     address: web3.eth.defaultAccount,
    //     topics: ["0x0000000000000000000000000000000000000000000000000000000000000000", null, null]
    // };
    
    //   // Permet d'écouter les events
    //   web3.eth.subscribe('logs', options, function (error, result) {
    //     if (!error)
    //         console.log(result);
    // })
    //     .on("data", function (log) {
    //         console.log(log);
    //     })
    //     .on("changed", function (log) {
    // });
      
      
      try{  
        
        // On récupère la balance de la personne connectée
        let currentBalance = await web3.eth.getBalance(this.state.account);
        currentBalance = web3.utils.fromWei(currentBalance, 'ether')
        this.setState({currentBalance})

        //On récupère combien il y a de loterie en cours
        let getLoteryCount = await this.state.loteryAbi.methods.getLoteriesCount().call()
        this.setState({ numberOfLoteries: getLoteryCount})

        /* Renvoie l'adresse de l'admin */
        let admin = await this.state.loteryAbi.methods.getAdmin().call()
        this.setState({admin})

        /* Renvoie ID + nom d'une loterie */
     

        for (let i=0 ; i < this.state.numberOfLoteries; i++) {
          let result6 = await this.state.loteryAbi.methods.listLoteries(i).call()
          this.setState({loadedLoteries: this.state.loadedLoteries.concat(result6)})

          let win = await this.state.loteryAbi.methods.getLoteryGain(i).call()
          this.setState({LoteriesWin: this.state.LoteriesWin.concat(win)})
          // this.setState({loadedLoteries : this.state.loadedLoteries.push(result6)})
        }
     
        this.setState({ loading: false }) // Me permet de gérer le front tant que les données sont pas arrivées
    }catch(e){
      console.log("Je suis l'erreur : " + e)
      console.log(e.message)
    }
       
}

async loadWeb3(){
   // Setup Web3 si Metask est présent
  if(window.ethereum){
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    
    // Pas sûr de ce que ça fait j'avoue
  } else if(window.web3){
    window.web3 = new Web3(window.web3.currentProvider)
    
  } else {
    // S'affiche s'il n'y a pas de Metamask
    window.alert('Non-Ethereum browser detected. Please download Metamask')
    
  }
}

// Ici mon state initialisé
  constructor(props){
    super(props)
    this.state = {
      account: '0x0',
      admin: '0x0',
      currentBalance: 0,
      loteryAbi: {},
      loadedLoteries: [],
      LoteriesWin: [],
      numberOfLoteries: 0,
      loading: true,
      createLoteryName : ""
    }
  }

  render(){
    // Tant que le state est en loading = true on affihce un Loading
    let content
     if(this.state.loading){
      content  = 
        <div>
          <p id="loader" className="text-center">Loading...</p>
        </div>
    }

    // Quand ça a fini de chargé on sort du if vu que Loading passe en false
    // Si le compte compte courant est parfaitement égal à l'adresse de l'admin on affiche le content avec la possibilité de créer une loterie

    // Pour "Comment passer le state aux composants? - exemple l.151-152-159"
    if (this.state.account === this.state.admin) {
      content  = 
        <div>
          <CreateLotery loteryAbi={this.state.loteryAbi} account={this.state.account}></CreateLotery> 
          <Lotery loteries = {this.state.loadedLoteries} LoteriesWin = {this.state.LoteriesWin} loteriesLength = {this.state.numberOfLoteries} loteryAbi={this.state.loteryAbi} account={this.state.account} admin={this.state.admin}></Lotery>
        </div>

        // Sinon on affiche que les loteries en cours
    }else{
      content  = 
        <div>
          <Lotery loteries = {this.state.loadedLoteries} LoteriesWin = {this.state.LoteriesWin} loteriesLength = {this.state.numberOfLoteries} loteryAbi={this.state.loteryAbi} account={this.state.account} admin={this.state.admin}></Lotery>
        </div>
    }
    // Et s'il n'y a pas de loterie on affiche ça !
      if (this.state.numberOfLoteries === 0){
        content = 
        <div>
         <p id="nothing" className="text-center">Oups...It looks like there's no active loteries</p>
        </div>
    }

       
// Enfin le return final qui nous permet de quoi qu'il arrive renvoyer la Navbar et le Content
    return (
      <>
        <NavbarPerso account = {this.state.account} currentBalance = {this.state.currentBalance}></NavbarPerso>

        <div className="container"> <h1> Loteries en cours ! </h1></div>
        {content}
      </>
      
    );
  }
}

export default App;
