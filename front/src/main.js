import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "./Router";
require("./assets/css/Style.css")
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
