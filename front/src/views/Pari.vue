<template>
  <section class="py-20">
    <div class="container px-4 mx-auto">
      <div class="max-w-xl mx-auto text-center">
        <h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading">
          <span>User actual money : {{ currentBalance }} </span>
          <span class="text-blue-600">Wei</span>
        </h2>
        <p class="mb-8 text-blueGray-400">Adresse courante : {{ account }}</p>
        <div class="flex flex-wrap max-w-lg mx-auto">
          <div
              class="flex w-full md:w-2/3 px-3 mb-3 md:mb-0 md:mr-6 bg-blueGray-100 rounded"
          >
            <textarea
                v-model="newLotName"
                class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                type="text"
                placeholder="Nom de l'équipe 1"
            ></textarea>
            <textarea
                v-model="newLotName"
                class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                type="text"
                placeholder="Nom de l'équipe 2"
            ></textarea>
          </div>
          <button 
              v-on:click="addLot"
              class="w-full md:w-auto py-4 px-8 text-xs text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
              type="submit"
          >
            Ajout pari
          </button>
        </div>
      </div>
    </div>
    <section class="py-20 xl:bg-contain bg-top bg-no-repeat" style="background-image: url('metis-assets/backgrounds/intersect.svg');">
      <div class="container px-4 mx-auto">

    <div v-for="bet in loadedLoteries" :key="bet[0]" class="flex flex-wrap max-w-5xl mx-auto mb-6">
      <RenderLot :account="account" :betAbi="betAbi" :data="bet" :betWin="betsWin"/>
    </div>
    </div>
    </section>
  </section>
</template>

<script>

import RenderLot from "@/views/components/Pari/renderPari";
import BetsContract from '../abis/Bets.json';
import Web3 from 'web3';

export default {
  name: "Bets",
  components: {RenderLot},

  data() {
    return {
      account: '0x0',
      admin: '0x0',
      currentBalance: 0,
      betAbi: [],
      loadedBets: [],
      betsWin: [],
      numberOfBets: 0,
      loading: true,
      isRendered: false,
      createBetsName : "",
      newBetName : ""
    };
  },
  async beforeMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  },
  methods: {
    async addLot(){
      await this.betAbi.methods.addBets(this.newLotName).send({ from: this.account })
    },
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
    },
    async loadBlockchainData(){
      // URL Ganache
      const web3 = new Web3(window.ethereum);
      
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0]
      
      web3.eth.handleRevert = true

      //On récupère l'ID du réseau : 5777 provenant de ganache
      const netId = await web3.eth.net.getId()

      // On va chercher le contrat déployé sur le réseau 5777
      const betsContractData = BetsContract.networks[netId]

      // Si on récupère quelque chose de non-vide, on créer le contrat sur web3 avec l'abi (présent dans le .json du contrat une fois compilé) et son adresse, puis on l'enregistre dans le state
      if(betsContractData){
        const betContract = new web3.eth.Contract(BetsContract.abi, betContractData.address)
        this.betAbi = betContract
      }else{
        window.alert('Bets smart contract has not been deployed to detected network')
      }
      try{  
        
        // On récupère la balance de la personne connectée
        let currentBalance = await web3.eth.getBalance(this.account);
        currentBalance = web3.utils.fromWei(currentBalance, 'ether')
        this.currentBalance = currentBalance

        //On récupère combien il y a de bet en cours
        var res = await this.betAbi.methods.getAllBets().call()
        this.numberOfBets = res

        /* Renvoie l'adresse de l'admin */
        let admin = await this.betAbi.methods.getAdmin().call()
        this.admin = admin

        /* Renvoie ID + nom d'un bet */
     

        for (let i=0 ; i < this.numberOfBets; i++) {
          var listLots = await this.betAbi.methods.listLoteries(i).call()
          this.loadedLoteries.push(listLots)

          // this.setState({loadedLoteries: this.loadedLoteries.concat(result6)})

          var lotWin = await this.betAbi.methods.getBetsGain(i).call()
          this.betsWin.push(lotWin)
          // this.setState({betsWin: this.betsWin.concat(win)})
          // this.setState({loadedLoteries : this.loadedLoteries.push(result6)})
        }
     
        this.loading = false // Me permet de gérer le front tant que les données sont pas arrivées
      }catch(e){
        console.log("Je suis l'erreur : " + e)
        console.log(e.message)
      }
    }
  }
};
</script>

