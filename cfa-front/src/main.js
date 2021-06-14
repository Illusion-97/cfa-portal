import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome-vue'
import './plugins/moment-vue'
import './_helpers/filters'
import App from './App.vue'
import router from './_helpers/router.js'
import store from './store/store.js'
import axios from 'axios';

Vue.config.productionTip = false

//axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/AppliCFABack/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
