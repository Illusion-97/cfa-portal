export default {
    state: () => ({
        id: null,
        login: null,
        password: null,
        prenom: null,
        entrepriseDto: null,
        rolesDto: null,
    }),
    getters: {
        getUtilisateur: state => {
            return state;
        }
    },
    mutations: {
        SET_UTILISATEUR(state, data){
            state = data;
          }
    },
    actions: {
        setUtilisateur({ commit }, data){
            commit('SET_UTILISATEUR', data);
          }
    }
}


