import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome-vue'
import './plugins/moment-vue'
import './filters/filters'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$apiUrl = "http://localhost:8080/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
