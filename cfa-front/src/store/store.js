import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from "vuex-persistedstate";
import {authentication} from './modules/authentication.module.js'
import {utilisateur} from './modules/utilisateur.module.js'
import {planning} from './modules/planning.module.js'

Vue.use(Vuex)

export default new Vuex.Store({  
  modules: {
    authentication,
    utilisateur,
    planning,
  },/*
  plugins: [createPersistedState({
    key: 'vuex',              
    reducer (val) {                                
      if(val.authentication.isUserLoggedIn === false) { // return empty state when user logged out                
        return {}
      }
      return val
    }
  })]*/
})
