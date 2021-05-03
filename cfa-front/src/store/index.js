import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateur: {
      id: 1,
      login: "login@dawan.fr",
      password: "pwd_1",
      prenom: "Pierre Paul",
      nom: "Jacques",
      adresseDto: null,
      entrepriseDto: null,
      roleDtos: null
    },
    planning: []
  },
  getters: { 
    getUtilisateur: state => {
      return state.utilisateur;
    },
    getPlanning: state => {
      return state.planning;
    }
  },
  mutations: {
    SET_PLANNING(state, data){
      state.planning = data;
    }
  },
  actions: {
    setPlanning({ commit }, data){
      commit('SET_PLANNING', data);
    }
  },
  modules: {
  }
})
