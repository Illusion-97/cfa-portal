import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import VueSimpleAlert from "vue-simple-alert";
// import Cookies from 'js-cookie'
import moment from "moment";

import {authentication} from './modules/authentication.module.js'
import {utilisateur} from './modules/utilisateur.module.js'
import {planning} from './modules/planning.module.js'
import centreFormation from './modules/centreFormation.module.js'


Vue.use(Vuex)
Vue.use(VueSimpleAlert)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

const vuexLocal = new VuexPersistence({
  // storage: window.localStorage,
  // storage: Cookies,
});

export default new Vuex.Store({  
  modules: {
    authentication,
    utilisateur,
    planning,
    centreFormation,
  },
  plugins: [vuexLocal.plugin],
});


