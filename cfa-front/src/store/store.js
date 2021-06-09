import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import utilisateur from './modules/utilisateur.module.js'
import planning from './modules/planning.module.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    utilisateur,
    planning,
  },
  plugins: [createPersistedState()]
})
