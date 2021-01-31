<template>
          <div v-if="!this.data[2]" class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="../../../assets/logo.png" alt="">
              <div class="pl-4">
                <p class="text-xl">{{ this.data[1] }}</p>
                <p class="text-blue-600">ID loterie : {{ this.data[0] }}</p>
                <p class="text-blue-600">Gain loterie : {{ this.loteryWin[this.data[0]] }} Wei</p>
                <p class="text-blue-600">Status : {{ this.data[2] }}</p>
                <p class="text-blue-600">Winner address : {{ this.getWinner() }}</p>
              </div>
            </div>
          </div>
        </div>
</template>


<script>
export default {
  name: "renderLot",
  props: ['data', 'account', 'loteryAbi', 'loteryWin'],
  data() {
    return {
    };
  },
  methods: {
    async getWinner(){
      console.log(this.data)
      await this.loteryAbi.methods.getWinner(this.data[0]).send({ from: this.account })
    }
  }
};
</script>