import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar.js';
import Web3 from 'web3';
import LoteryContract from ''

class App extends React.Component {

async componentDidMount(){
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadBlockchainData(){

      // URL Ganache
      const web3 = new Web3(window.ethereum);
      const network = await web3.eth.net.getNetworkType();
      console.log("network:", network);
      const accounts = await web3.eth.getAccounts();
      console.log("accounts: ", accounts);
      this.setState({account: accounts[0]});
      //console.log("web3 :",web3);

      const netId = await web3.eth.net.getId()
      console.log(netId)

  
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
      loteryAbi: {},
      loading: true
    }
  }
  render(){
    return (
      <>
        <Navbar account = {this.state.account}></Navbar>
        
      </>
      
    );
  }
}

export default App;
