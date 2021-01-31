<template>
          <div class="w-full md:w-1/2 px-3 mb-6">
          <div class="p-8 bg-white shadow rounded">
            <div class="flex items-center mb-4">
              <img class="h-16 w-16 rounded-full object-cover" src="https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="">
              <div class="pl-4">
                <p class="text-xl">{{this.data[1]}}</p>
                <p class="text-blue-600">ID loterie : {{this.data[0]}}</p>
                <p class="text-blue-600">Gain loterie : {{this.loteryWin[this.data[0]]}}</p>
              </div>
            </div>
            <p class="leading-loose text-blueGray-400">Description                                                                   </p>
            <br/>
            <a  v-on:click="participate" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
              Participer !
            </a>
            <a  v-on:click="PickWinner" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
              Choisir gagnant !
            </a>
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
    async participate(){
      await this.loteryAbi.methods.participateToLotery(this.data[0]).send({ from: this.account, value: 1000000000000000000})
    },
    async PickWinner(){
      // await this.props.loteryAbi.methods.pickWinnerForLotery(i).send({ from: this.props.account })
    }
  }
};
</script>