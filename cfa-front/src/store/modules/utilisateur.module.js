import { utilisateurApi } from "@/_api/utilisateur.api.js";

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

            //Si referent, on lui ajoute le role
            utilisateurApi.isReferent(data.id).then( response => {
                if(response) state.utilisateur.rolesDto.push({id: 999, intitule: "REFERENT"});
                
            })

          }
    },
    actions: {
        setUtilisateur({ commit }, data){
            // console.log("action utilisateur = ", data);
            commit('SET_UTILISATEUR', data);
          }
    }
}


