<template>
          <div v-if="this.data[2]" class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="../../../assets/logo.png" alt="">
              <div class="pl-4">
                <p class="text-xl">{{this.data[1]}}</p>
                <p class="text-blue-600">ID loterie : {{this.data[0]}}</p>
                <p class="text-blue-600">Gain loterie : {{this.loteryWin[this.data[0]]}} Wei</p>
                <p class="text-blue-600">Status : {{this.data[2]}}</p>
              </div>
            </div>
            <br>
            <a v-on:click="participate" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
              Participer !
            </a>
            <a v-if="account == admin" v-on:click="PickWinner" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
              Choisir gagnant !
            </a>
          </div>
        </div>
</template>


<script>
export default {
  name: "renderLot",
  props: ['data', 'account', 'loteryAbi', 'loteryWin', 'admin'],
  data() {
    return {
    };
  },
  methods: {
    async participate(){
      await this.loteryAbi.methods.participateToLotery(this.data[0]).send({ from: this.account, value: 1000000000000000000})
    },
    async PickWinner(){
      await this.loteryAbi.methods.pickWinnerForLotery(this.data[0]).send({ from: this.account , value: this.loteryWin[this.data[0]]})
    }
  }
};
</script>