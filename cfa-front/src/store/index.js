import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateur: {id: 10,},
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
    SET_UTILISATEUR(state, data){
      state.utilisateur = data;
    },
    SET_PLANNING(state, data){
      state.planning = data;
    }
  },
  actions: {
    setUtilisateur({ commit }, data){
      commit('SET_UTILISATEUR', data);
    },
    setPlanning({ commit }, data){
      commit('SET_PLANNING', data);
    }
  },
  modules: {
  }
})
