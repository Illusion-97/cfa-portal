export const utilisateur = {
    state: {
        utilisateur: {
            id: null,
            login: null,
            password: null,
            prenom: null,
            entrepriseDto: null,
            rolesDto: null,
        },
    },
    getters: {
        getUtilisateur: state => {
            return state.utilisateur;
        }
    },
    mutations: {
        SET_UTILISATEUR(state, data){
            state.utilisateur = data;
          }
    },
    actions: {
        setUtilisateur({ commit }, data){
            commit('SET_UTILISATEUR', data);
          }
    }
}


