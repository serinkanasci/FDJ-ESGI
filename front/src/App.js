import './App.css';
import React from 'react';
import Web3 from 'web3';

import LoteryContract from './abis/Lotery.json';

import NavbarPerso from './components/Navbar.js';
import CreateLotery from './components/CreateLotery.js';
import Body from './components/Body.js';


class App extends React.Component {

async componentDidMount(){
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadBlockchainData(){

      // URL Ganache
      const web3 = new Web3(window.ethereum);
      //const network = await web3.eth.net.getNetworkType();
      //console.log("network:", network);
      const accounts = await web3.eth.getAccounts();
      // console.log("accounts: ", accounts);
      this.setState({account: accounts[0]});
      //console.log("web3 :",web3);
      web3.eth.handleRevert = true
      const netId = await web3.eth.net.getId()
      console.log(netId)

      const loteryContractData = LoteryContract.networks[netId]

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
      
      /* Créer une loterie avec un nom, renvoie une erreur si le nom existe déjà */
      try{  
        
        let currentBalance = await web3.eth.getBalance(this.state.account);
        currentBalance = web3.utils.fromWei(currentBalance, 'ether')
        this.setState({currentBalance})

        let getLoteryCount = await this.state.loteryAbi.methods.getLoteriesCount().call()
        this.setState({ numberOfLoteries: getLoteryCount})

      /* Renvoie l'adresse de l'admin */
      let admin = await this.state.loteryAbi.methods.getAdmin().call()
      this.setState({admin})
    //  console.log("L'adresse de l'administrateur est " + result5)

     /* Renvoie ID + nom d'une loterie */
     console.log("Nombre de loteries en cours: " + this.state.numberOfLoteries)

      for (let i=0 ; i < this.state.numberOfLoteries; i++) {
        let result6 = await this.state.loteryAbi.methods.listLoteries(i).call()
        this.setState({loadedLoteries: this.state.loadedLoteries.concat(result6)})

        let win = await this.state.loteryAbi.methods.getLoteryGain(i).call()
        this.setState({LoteriesWin: this.state.LoteriesWin.concat(win)})
        // this.setState({loadedLoteries : this.state.loadedLoteries.push(result6)})
      }
     
     this.setState({ loading: false })
    }catch(e){
      console.log("Je suis l'erreur : " + e)
      console.log(e.message)
    }
       
}

async loadWeb3(){
  if(window.ethereum){
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    console.log("stop1")
  } else if(window.web3){
    window.web3 = new Web3(window.web3.currentProvider)
    console.log("stop2")
  } else {
    window.alert('Non-Ethereum browser detected. Please download Metamask')
    console.log("stop3")
  }
}

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
    let content
     if(this.state.loading){
      content  = 
        <div>
          <p id="loader" className="text-center">Loading...</p>
        </div>
    }

    if (this.state.account === this.state.admin) {
      content  = 
        <div>
          <CreateLotery loteryAbi={this.state.loteryAbi} account={this.state.account}></CreateLotery>
          <Body loteries = {this.state.loadedLoteries} LoteriesWin = {this.state.LoteriesWin} loteriesLength = {this.state.numberOfLoteries} loteryAbi={this.state.loteryAbi} account={this.state.account}></Body>
        </div>
    }else{
      content  = 
        <div>
          <Body loteries = {this.state.loadedLoteries} LoteriesWin = {this.state.LoteriesWin} loteriesLength = {this.state.numberOfLoteries} loteryAbi={this.state.loteryAbi} account={this.state.account}></Body>
        </div>
    }
      if (this.state.numberOfLoteries === 0){
        content = 
        <div>
         <p id="nothing" className="text-center">Oups...It looks like there's no active loteries</p>
        </div>
    }
 /*     if (this.state.numberOfLoteries === 0 && this.state.account === this.state.admin) {
        content  = 
        <div>
          <CreateLotery></CreateLotery>
          <p id="nothing" className="text-center">Oups...It looks like there's no active loteries</p>
        </div>*/
      
  
     

    return (
      <>
        <NavbarPerso account = {this.state.account} currentBalance = {this.state.currentBalance}></NavbarPerso>
        {content}
      </>
      
    );
  }
}

export default App;
