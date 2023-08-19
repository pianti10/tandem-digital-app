import Vue from 'vue'
import App from './App.vue'
import router from './router' // Asegúrate de que el nombre del archivo sea "router.js"

Vue.config.productionTip = false

new Vue({
  router, // Agrega el enrutador a la instancia de Vue
  render: h => h(App),
}).$mount('#app')
