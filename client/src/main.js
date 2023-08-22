import Vue from 'vue'
import App from './App.vue'
import router from './router' // Asegúrate de que el nombre del archivo sea "router.js"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  // Agrega el enrutador a la instancia de Vue
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
