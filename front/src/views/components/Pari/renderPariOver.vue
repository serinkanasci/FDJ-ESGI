<template>
          <div v-if="this.data[3] == 2 || this.data[3] == 3" class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="../../../assets/football.jpg" alt="">
              <div class="pl-4">
                <p class="text-xl">{{data[0]}} VS {{data[1]}} !</p>
               </div>
            </div>
            <a v-if="this.data[3] == 2"> WINNER : {{data[1]}}</a>
            <a v-if="this.data[4] == 2"> WINNER : {{data[0]}}</a>
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
      await this.betAbi.methods.setWinner(this.data[2], _winner, 1).send({ from: this.account, value: this.miseToWei})
    }
  }
};
</script>