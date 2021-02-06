<template>
          <div v-if="this.data[3] == 4" class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="../../../assets/football.jpg" alt="">
              <div class="pl-4">
                <p v-if="account != admin" class="text-xl">Choisissez votre camp !</p>
                <p v-if="account == admin" class="text-xl">{{data[0]}} VS {{data[1]}}</p>
               </div>
            </div>
            <p v-if="account != admin" class="leading-loose text-blueGray-400">La mise doit être supérieur à 1 ether :</p>
            <br/>
            <textarea
                v-if="account != admin"
                v-model="mise"
                class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                type="text"
                placeholder="Mise (<1 Ether svp)"
            ></textarea>
            <a  v-if="account != admin" v-on:click="participateTeamA" class="flex items-center mb-4 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                {{data[0]}}
            </a>
            <a  v-if="account != admin" v-on:click="participateTeamB" class="flex items-center mb-4 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                {{data[1]}}
            </a>
            <a v-if="account == admin" v-on:click="endBet(data[0])" class="flex items-center mb-4 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                Fin de pari {{data[0]}} a gagné
            </a>
            <a v-if="account == admin" v-on:click="endBet(data[1])" class="flex items-center mb-4 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                Fin de pari {{data[1]}} a gagné
            </a>
          </div>
        </div>
</template>


<script>
export default {
  name: "renderBet",
  props: ['data', 'account', 'admin', 'betAbi','betsWin','web3'],
  data() {
    return {
      mise: 0,
      miseToWei: 0
    };
  },
  methods: {
    async participateTeamA(){
      this.miseToWei = this.web3.utils.toWei(this.mise)
      await this.betAbi.methods.participateToBet(this.data[2], 1).send({ from: this.account, value: this.miseToWei})
       this.mise = 0
    },
    async participateTeamB(){
      this.miseToWei = this.web3.utils.toWei(this.mise)
      await this.betAbi.methods.participateToBet(this.data[2], 2).send({ from: this.account, value: this.miseToWei})
      this.mise = 0
    },
    async endBet(_winner){
      await this.betAbi.methods.setWinner(this.data[2], _winner, 1).send({ from: this.account })
      await this.betAbi.methods.payWinners(this.data[2]).send({ from: this.account})
    }
  }
};
</script>