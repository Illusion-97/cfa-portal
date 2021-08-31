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
            // return JSON.parse(localStorage.getItem('utilisateur'))
        }
    },
    mutations: {
        SET_UTILISATEUR( state, data){
            state.utilisateur = data;
            // console.log("new user :", data);
            // localStorage.setItem('utilisateur', JSON.stringify(data))
          }
    },
    actions: {
        setUtilisateur({ commit }, data){
            // console.log("action utilisateur = ", data);
            commit('SET_UTILISATEUR', data);
          }
    }
}


