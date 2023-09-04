import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,  // Configura el enrutador de la aplicación
  vuetify,  // Configura Vuetify
  render: h => h(App)  // Renderiza el componente principal 'App'
}).$mount('#app')  // Monta la aplicación en el elemento con el id 'app'
