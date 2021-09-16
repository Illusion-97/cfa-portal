import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
// import Cookies from 'js-cookie'

import {authentication} from './modules/authentication.module.js'
import {utilisateur} from './modules/utilisateur.module.js'
import {planning} from './modules/planning.module.js'


Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  // storage: window.localStorage,
  // storage: Cookies,
});

export default new Vuex.Store({  
  modules: {
    authentication,
    utilisateur,
    planning,
  },
  plugins: [vuexLocal.plugin],
})

