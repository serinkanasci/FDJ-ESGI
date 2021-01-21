import './App.css';
import React from 'react';
import NavbarPerso from './components/Navbar.js';
import Web3 from 'web3';
import LoteryContract from './abis/Lotery.json';
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


      //   let addLotery2 = await this.state.loteryAbi.methods.addLotery("dsdsd").send({ from: this.state.account })
      //   console.log(addLotery2)
      // let addLotery3 = await this.state.loteryAbi.methods.addLotery("dsqdsqdqs").send({ from: this.state.account })
      // console.log(addLotery3)
     
      // Participer à la loterie

      /*** */
      // let participe1 = await this.state.loteryAbi.methods.participateToLotery(0).send({ from: this.state.account, value: 1000000000000000000 })
      // console.log("participe "+ web3.eth.abi.decodeLog(participe1))


      /**** Est censé renvoyer le nombre de trade afin de boucler et de tous les afficher mais bug alors que OK sur Remix */
     // let numberOfLoteries = await this.state.loteryAbi.methods.getLoteryLenght().call()
     // this.setState({numberOfLoteries: numberOfLoteries}
     /**** */

      /* Renvoie bien true si la loterie existe */
    //  let result2 = await this.state.loteryAbi.methods.existingLoteryByName("a").call()
    //  let test = await this.state.loteryAbi.methods.getLoteryGain(1).call()
    //  console.log("Here is the win", test)
    //  console.log("La loterie existe :" + result2)
     
     /* Renvoie la quantité d'ETH détenue dans le contrat */
    //  let result3 = await this.state.loteryAbi.methods.getContractBalance().call()
    //  console.log("Nombre d'ETH dans le contrat : " + result3)
     
     /* Renvoie la balance d'un compte, erreur s'il n'a pas encore été enregistré dans le SC */
    // let result4 = await this.state.loteryAbi.methods.getAccountBalance(this.state.address).call()
    // console.log(result4)

    /* Renvoie l'adresse de l'admin */
     let result5 = await this.state.loteryAbi.methods.getAdmin().call()
    //  console.log("L'adresse de l'administrateur est " + result5)

     /* Renvoie ID + nom d'une loterie */
     console.log(this.state.numberOfLoteries)
      for (let i=0 ; i < this.state.numberOfLoteries; i++) {
        let result6 = await this.state.loteryAbi.methods.listLoteries(i).call()
        this.setState({loadedLoteries: this.state.loadedLoteries.concat(result6)})

        let win = await this.state.loteryAbi.methods.getLoteryGain(i).call()
        this.setState({LoteriesWin: this.state.LoteriesWin.concat(win)})
        // this.setState({loadedLoteries : this.state.loadedLoteries.push(result6)})
      }
     
     /* Mise mini trop élevée */
     // let result7 = await this.state.loteryAbi.methods.participateToLotery(0).send({from: this.state.account})
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
      currentBalance: 0,
      loteryAbi: {},
      loadedLoteries: [],
      LoteriesWin: [],
      numberOfLoteries: 0,
      loading: true
    }
  }

  render(){
    let content
    if(this.state.loading){
      content  = <p id="loader" className="text-center">Loading...</p>
    }else{
      content = <Body loteries = {this.state.loadedLoteries} account = {this.state.account} loteriesLength = {this.state.numberOfLoteries} loteryAbi = {this.state.loteryAbi} LoteriesWin = {this.state.LoteriesWin}></Body>
      // content = <Body loteries = {this.state.loadedLoteries}></Body>
    }
    return (
      <>
        <NavbarPerso account = {this.state.account} currentBalance = {this.state.currentBalance}></NavbarPerso>
        {content}
      </>
      
    );
  }
}

export default App;
