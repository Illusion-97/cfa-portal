import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import VueSimpleAlert from "vue-simple-alert";
// import Cookies from 'js-cookie'

import {authentication} from './modules/authentication.module.js'
import {utilisateur} from './modules/utilisateur.module.js'
import {planning} from './modules/planning.module.js'
import centreFormation from './modules/centreFormation.module.js'


Vue.use(Vuex)
Vue.use(VueSimpleAlert)

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
})

