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

import router from './router/router.js'
import store from './_helpers/store.js'

Vue.config.productionTip = false

//axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
