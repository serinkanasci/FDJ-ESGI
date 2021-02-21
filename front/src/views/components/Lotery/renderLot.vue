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
            <div class="flex flex-wrap max-w-lg mx-auto">
              <div
                class="flex w-full md:w-2/3 px-3 mb-3 md:mb-0 md:mr-6 bg-blueGray-100 rounded"
              >
              <textarea
                  v-model="participationValue"
                  class="w-full pl-3 py-4 text-xs text-blueGray-400 font-semibold leading-none bg-blueGray-100 outline-none"
                  type="text"
                  placeholder="Nom de la lotterie"
              ></textarea>
              </div>

              <button 
                  v-on:click="participate"
                  class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6"
                  type="submit"
              > Participer !
              </button>

              <a v-if="account == admin" v-on:click="PickWinner" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                Choisir gagnant !
              </a>
            </div>
            <!-- <a v-on:click="participate" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
              Participer !
            </a> -->
          </div>
        </div>
</template>


<script>
export default {
  name: "renderLot",
  props: ['data', 'account', 'loteryAbi', 'loteryWin', 'admin'],
  data() {
    return {
      participationValue: "0 wei"
    };
  },
  methods: {
    async participate(){
      await this.loteryAbi.methods.participateToLotery(this.data[0]).send({ from: this.account, value: this.participationValue})
    },
    async PickWinner(){
      await this.loteryAbi.methods.pickWinnerForLotery(this.data[0]).send({ from: this.account , value: this.loteryWin[this.data[0]]})
    },
    // async created() {
    //   this.interval = setInterval(() => this.pickWInner(), 10000);
    // }
  }
};
</script>