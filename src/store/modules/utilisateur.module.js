import { utilisateurApi } from "@/_api/utilisateur.api.js";
import router from "@/router/router.js";

export const utilisateur = {
    state: {
        utilisateur: {
            id: null,
            login: null,
            password: null,
            prenom: null,
            nom: null,
            civilite: null,
            dateDeNaissance: null,
            telephone: null,
            adresseDto: null,
            entrepriseDto: null,
            rolesDto: [],
            etudiantDto: {
                id: null,
            },
            formateurDto: null,
            cefDto: null,
            maitreApprentissageDto:null,
        },
    },
    getters: {
        getUtilisateur: state => {
            return state.utilisateur;
        },
    },
    mutations: {
        SET_UTILISATEUR(state, data) {
            state.utilisateur = data;

            //Si referent, on lui ajoute le role
            utilisateurApi.isReferent(data.id).then(response => {
                if (response) state.utilisateur.rolesDto.push({ id: 999, intitule: "REFERENT" });

            })

            utilisateurApi.getByLogin(state.utilisateur.login).then(res => {
                for (let i = 0; i < res.rolesDto.length; i++) {
                    switch (res.rolesDto[i].intitule) {
                        case "ADMIN":
                            router.push({ name: "admin_dashboard" });
                            break;
                        case "CEF":
                            router.push({ name: "cef_dashboard" });
                            break;
                        default:
                            router.push({ name: "home" });
                            break;
                    }
                }
            })
        },
    },
    actions: {
        setUtilisateur({ commit }, data) {
            commit('SET_UTILISATEUR', data);
        }
    }
}



