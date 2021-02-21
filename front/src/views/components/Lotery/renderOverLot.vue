<template>
          <div v-if="!this.data[2]" class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="../../../assets/logo.png" alt="">
              <div class="pl-4">
                <p class="text-xl">
                  {{ this.data[1] }}
                </p>
                <p class="text-blue-600">
                  ID loterie : {{ this.data[0] }}
                </p>
                <!-- <p class="text-blue-600">
                  Gain loterie : {{ this.loteryWin[this.data[0]] }} Wei
                </p> -->
                <p class="text-blue-600">
                  Status : {{ this.data[2] }}
                </p>
                <br>
                <a v-if="account == admin" v-on:click="getWinner" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                  Afficher gagnant de la loterie
                </a>
                <!-- <p class="text-blue-600">
                  Winner address : {{ this.getWinner(this.data[0]) }}
                </p> -->
              </div>
            </div>
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
    async getWinner(){
      var winner = await this.loteryAbi.methods.getWinner(this.data[0]).call()      
      alert(winner)
    }
  }
};
</script>