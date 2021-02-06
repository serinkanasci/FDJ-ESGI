<template>
          <div class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="../../../assets/football.jpg" alt="">
              <div class="pl-4">
                <p class="text-xl">Choisissez votre camp !</p>
               </div>
            </div>
            <p class="leading-loose text-blueGray-400">La mise doit être supérieur à 1 ether :</p>
            <br/>
            <textarea
                v-model="mise"
                class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                type="text"
                placeholder="Mise (<1 Ether svp)"
            ></textarea>
            <a  v-on:click="participateTeamA" class="flex items-center mb-4 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                {{data[0]}}
            </a>
            <a  v-on:click="participateTeamB" class="flex items-center mb-4 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                {{data[1]}}
            </a>
          </div>
        </div>
</template>


<script>
export default {
  name: "renderBet",
  props: ['data', 'account', 'betAbi','betsWin','web3'],
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
    async PickWinner(){
      // await this.props.loteryAbi.methods.pickWinnerForLotery(i).send({ from: this.props.account })
    }
  }
};
</script>