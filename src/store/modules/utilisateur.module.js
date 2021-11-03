import { utilisateurApi } from "@/_api/utilisateur.api.js";

export const utilisateur = {
    state: {
        utilisateur: {
            id: null,
            login: null,
            password: null,
            prenom: null,
            nom: null,
            civilite:null,
            dateDeNaissance:null,
            telephone:null,
            adresseDto:null,
            entrepriseDto: null,
            rolesDto: [],
            etudiantDto: null,
            formateurDto: null,
            cefDto: null,
        },
    },
    getters: {
        getUtilisateur: state => {
            return state.utilisateur;
        },
    },
    mutations: {
        SET_UTILISATEUR( state, data){
            state.utilisateur = data;

            //Si referent, on lui ajoute le role
            utilisateurApi.isReferent(data.id).then( response => {
                if(response) state.utilisateur.rolesDto.push({id: 999, intitule: "REFERENT"});
                
            })
        },
    },
    actions: {
        setUtilisateur({ commit }, data){
            commit('SET_UTILISATEUR', data);
          }
    }
}



