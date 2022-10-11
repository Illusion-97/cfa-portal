
export const centreFormation = {
  state: {
    centreFormation: {
      nom: null,
      adresseDto: {
      libelle: null,
      ville: null,
      codePostal: null,
      } 
    },
  },
  getters: {
    getCentreFormaion: (state) => {
      return state.centreFormation;
    }
  },
  mutations: {
    setCentre(state, data) {
      state.centreFormation = data;
    }
  },
  actions: {
    setCentreFormation({ commit }, data) {
      commit("setCentre", data)
    }
  }
}