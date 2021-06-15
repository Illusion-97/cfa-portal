import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome-vue'
import './plugins/moment-vue'
import './_helpers/filters'
import App from './App.vue'

import router from './router/router.js'
import store from './store/store.js'
import axios from 'axios';
import Paginate from 'vuejs-paginate'


Vue.config.productionTip = false

Vue.component('paginate', Paginate)

axios.defaults.baseURL = "http://localhost:8080/AppliCFABack/";
//axios.defaults.baseURL = process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

