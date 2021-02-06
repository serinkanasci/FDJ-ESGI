<template>
  <section class="py-20">
    <div class="container px-4 mx-auto">
      <div class="max-w-xl mx-auto text-center">
        <h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading">
          <span>User actual money : {{ currentBalance }} </span>
          <span class="text-blue-600">Ether</span>
        </h2>
        <p class="mb-8 text-blueGray-400">Adresse courante : {{ account }}</p>
        <p class="mb-8 text-blueGray-400">Adresse admin : {{ admin }}</p>
        <div v-if="account == admin" class="flex flex-wrap max-w-lg mx-auto">
          <div
              class="flex w-full md:w-2/3 px-3 mb-3 md:mb-0 md:mr-6 bg-blueGray-100 rounded"
          >
            <textarea
                v-model="newBetNameA"
                class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                type="text"
                placeholder="Nom de l'équipe 1"
            ></textarea>
            <img class="h-16 w-16 rounded-full object-cover" src="../assets/vs.png" alt="">
            <textarea
                v-model="newBetNameB"
                class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                type="text"
                placeholder="Nom de l'équipe 2"
            ></textarea>
          </div>
          <button 
              v-on:click="addBets"
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

    <h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading">
      <span class="text-blue-600">Les paris en cours ...</span>
    </h2>
    <div v-for="bet in loadedBets" :key="bet[0]" class="flex flex-wrap max-w-5xl mx-auto mb-6">
      <RenderBet :account="account" :admin="admin" :betAbi="betAbi" :data="bet" :betWins="betsWin" :web3="web3" />
    </div>

    <h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading">
    <span class="text-blue-600">Les paris terminés</span>
    </h2>
    <div v-for="bet in loadedBets" :key="bet[0] + 'x'" class="flex flex-wrap max-w-5xl mx-auto mb-6">
      <RenderBetOver :account="account" :admin="admin" :betAbi="betAbi" :data="bet" :betWins="betsWin" :web3="web3" />
    </div>


    </div>
    </section>
  </section>
</template>

<script>

import RenderBet from "@/views/components/Pari/renderPari";
import RenderBetOver from "@/views/components/Pari/renderPariOver";
import BetsContract from '../abis/Bets.json';
import Web3 from 'web3';

export default {
  name: "Bets",
  components: {RenderBet, RenderBetOver},

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
      newBetNameA : "",
      newBetNameB : "",
      web3: []
    };
  },
  async beforeMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
    console.log(this.betAbi)

  },
  methods: {
    async addBets(){
      await this.betAbi.methods.createBet(this.newBetNameA, this.newBetNameB).send({ from: this.account })
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
      this.web3 = web3;
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0]
      
      web3.eth.handleRevert = true

      //On récupère l'ID du réseau : 5777 provenant de ganache
      const netId = await web3.eth.net.getId()

      // On va chercher le contrat déployé sur le réseau 5777
      const betsContractData = BetsContract.networks[netId]

      // Si on récupère quelque chose de non-vide, on créer le contrat sur web3 avec l'abi (présent dans le .json du contrat une fois compilé) et son adresse, puis on l'enregistre dans le state
      if(betsContractData){
        const betContract = new web3.eth.Contract(BetsContract.abi, betsContractData.address)
        this.betAbi = betContract
        
      }else{
        window.alert('Bets smart contract has not been deployed to detected network')
      }
      try{  
        
        // On récupère la balance de la personne connectée
        let currentBalance = await web3.eth.getBalance(this.account);
        currentBalance = web3.utils.fromWei(currentBalance, 'ether')
        this.currentBalance = currentBalance

        let admin = await this.betAbi.methods.getAdmin().call()
        this.admin = admin

        //On récupère combien il y a de bet en cours
        var res = await this.betAbi.methods.getAllBets().call()
        this.numberOfBets = res


        /* Renvoie ID + nom d'un bet */

        for (let i=0 ; i < this.numberOfBets; i++) {
          var listBets = await this.betAbi.methods.getBetById(i).call()
          this.loadedBets.push(listBets)
          }
     

        this.loading = false // Me permet de gérer le front tant que les données sont pas arrivées
      }catch(e){
        
        console.log(e.message)
      }
    }
  }
};
</script>

