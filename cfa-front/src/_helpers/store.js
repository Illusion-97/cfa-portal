import Vue from 'vue'
import Vuex from 'vuex'

import {Role} from '@/_helpers/role.js';
//import Utilisateur from '@/_entities/utilisateur.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateur: {id: 1, rolesDto: [Role.Etudiant]},
    //utilisateur: typeof Utilisateur,
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
