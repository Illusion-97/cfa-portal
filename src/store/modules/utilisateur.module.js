import {utilisateurApi} from "@/_api/utilisateur.api.js";
import {mailSchedulerApi} from "@/store/modules/mail-scheduler";

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
      maitreApprentissageDto: null,
    },
  },
  getters: {
    getUtilisateur: (state) => {
      let isFormateur = false
      for (var i=0; i<state.utilisateur.rolesDto.length; i++ ){
        if (state.utilisateur.rolesDto[i].intitule == "FORMATEUR"){
            isFormateur = true;
            mailSchedulerApi.formateurSchedulerValisationFormation(state.utilisateur.id,isFormateur)
        }
      }
      return state.utilisateur;
    },
  },
  mutations: {
    SET_UTILISATEUR(state, data) {
      state.utilisateur = data;
      //Si referent, on lui ajoute le role
      if (data.id) {
        utilisateurApi.isReferent(data.id).then((response) => {
          if (response)
            state.utilisateur.rolesDto.push({
              id: 999,
              intitule: "REFERENT",
            });
        });
      }
    },
  },
  actions: {
    setUtilisateur({ commit }, data) {
      commit("SET_UTILISATEUR", data);
    },
  },
};
