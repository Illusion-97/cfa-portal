<template>
  <section>
    <p>qssdfsdfsdfdsfsdf</p>
    <section class="fill-width">
      <div id="btn-toggle-selection" role="group">
        <v-btn block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Info</v-btn>
        <v-btn block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Compétences Couvertes</v-btn>
        <v-btn block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Résumé</v-btn>
        <v-btn block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Contenu</v-btn>
        <v-btn block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Annexe</v-btn>
      </div>
    </section>
              <div v-show="active === 1">
                <v-card>
                  <v-card-text disabled>
                    <v-card-subtitle>Projet : {{ DossierProjet.projet.nom }}</v-card-subtitle>
                    <v-card-subtitle>Dossier : {{ DossierProjet.nom }}</v-card-subtitle>
                  </v-card-text>
                  <vue-editor v-model="DossierProjet.infoDossierProjets[0]"
                              id="exp1"  placeholder="Informations du Projet" readonly />
                </v-card>
              </div>
              <div v-show="active === 2" >
                <v-card>
                  <div class="card-body">
                    <v-list v-for="activites in activiteTypes" :key="activites.id">
                      <div class="row align-items-center">
                        <div class="col" id="bloc-activite">
                          <v-list-item-title class="text-wrap" style="word-wrap: break-word;">{{ activites.libelle }}</v-list-item-title>
                        </div>
                        <div class="col-sm-6">
                          <ul class="list-unstyled" id="bloc-competence">
                            <v-list-item v-for="competences in activites.competencesProfessionnellesDto" :key="competences.id" @click="toggleSelectedComp(competences.id)" id="list-competence" :style="selectedComp(competences.id)">
                              <li>
                                {{competences.id + ". " + competences.libelle }}
                              </li >
                            </v-list-item>
                          </ul>
                        </div>
                      </div>
                    </v-list>
                  </div>
                </v-card>
              </div>
              <div v-show="active === 3">
                <b-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                  <div>
                    <vue-editor h-auto v-model="DossierProjet.resumeDossierProjets[0]" id="exp1" placeholder="Résumé du Projet" readonly />
                  </div>
                </b-collapse>
              </div>
              <div v-show="active === 4" >
                <b-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                  <div>
                    <vue-editor v-model="DossierProjet.contenuDossierProjets[0]" id="exp1"  placeholder="Contenu du Projet"></vue-editor>
                  </div>
                </b-collapse>
              </div>
    <div v-show="active === 5">
      <v-card-title>Liste des annexes</v-card-title>
      <v-btn class="text-right ml-2" @click="addAnnexe">
        Ajouter une annexe
      </v-btn>
      <v-simple-table>
        <thead>
        <tr>
          <th class="text-left">File</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(files, index) in DossierProjet.filesAnnexe" :key="files.id">
          <td class="col-md-9">
            <v-file-input v-model="files.file" label="Annexes du Dossier Projet"
                          accept="image/*" :id="'fileInput_' + index" ></v-file-input>
          </td>
          <td>
            <v-btn class="mb-4" @click="deleteAnnexe(index)">Supprimer</v-btn>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </div>
  </section>
</template>
<script>
import {etudiantApi} from "@/_api/etudiant.api.js";
import {VueEditor} from "vue2-editor";
import {projetApi} from "@/_api/projet.api.js";
import {activiteTypeApi} from "@/_api/activiteType.api.js";
import {cursusApi} from "@/_api/cursus.api";
export default {
  name: "FormDossierProjet",
  components: { VueEditor },
  data() {
    return {
      idDp: 0,
      active: 1,
      studentId:this.$store.getters.getUtilisateur.etudiantDto.id,
      etudiants: [],
      projets: [],
      activiteTypes: [],
      DossierProjet: {
        id:0,
        nom: "",
        fileImport:undefined,
        etudiant: {id:0},
        projet: {
          id: 0,
          nom: "",
        },
        filesAnnexe: [{file:undefined}],
        annexeDossierProjets: [""],
        infoDossierProjets: [""],
        competenceProfessionnelleIds: [],
        contenuDossierProjets: [""],
        resumeDossierProjets: [""],
      },
    };
  },
  created() {
    console.clear();
    this.getEtudiant();
    this.getCursusEtudiant()
        .then((response) => {
          this.cursus = response;
          this.getActiviteTypeByCursus(this.cursus.id);
        })
        .catch((error) => {
          console.error(error);
        });
  },
  methods: {
    retour() {
      history.back();
    },
    //***Partie sur les competenceCouvertes du DossierProjet***
    toggleSelectedComp(compid){

      const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds;
      const index = CompetencesCouvertes.indexOf(compid)

      if(CompetencesCouvertes.includes(compid)){
        CompetencesCouvertes.splice(index, 1)
      }else{
        CompetencesCouvertes.push(compid)
      }
    },
    //*******Partie sur les annexes du DossierProjet*******
    deleteAnnexe(index) {
      this.DossierProjet.filesAnnexe.splice(index, 1);
    },
    addAnnexe() {
      this.DossierProjet.filesAnnexe.unshift({
        id: this.DossierProjet.filesAnnexe.length + 1,
      });
      const newAnnexe = {
      };
      return newAnnexe;
    },
    getEtudiant() {
      etudiantApi
          .getById(this.studentId)
          .then((response) => (this.etudiants = response));
    },
    getAllProject() {
      projetApi.getAll().then((response) => {this.projets = response});
    },
    getActiviteTypeByCursus(id){
      activiteTypeApi
          .getActiviteTypesByCursus(id)
          .then((response) => (this.activiteTypes = response))
    },
    getCursusEtudiant() {
      return cursusApi.getCurrentCursusByIdEtudiant(this.studentId);
    },
    clearMessage() {
      this.message = "";
    },
    clear() {
      this.DossierProjet.contenuDossierProjets.contenu_projet = "";
      this.DossierProjet.resumeDossierProjets.resume_projet = "";
      this.DossierProjet.infoDossierProjets.information_projet = "";
    }
  },


  computed: {
    selectedComp(){
      return (compid) => {
        const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds
        const bg = CompetencesCouvertes.includes(compid) ? 'green' : 'transparent'
        const txt = CompetencesCouvertes.includes(compid) ? 'white' : 'black'
        return { backgroundColor: bg, color: txt }
      }
    }
  }
};
</script>
<style scoped>

#list-competence{
  width: 100%;

}
#btn-toggle-selection{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-template-rows: 1fr;
}
.comp-doss {
  background-color: #e11b28;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px 20px 0 0;
  border-color: black;
  justify-content: space-between;
  width: 100%;
}

.comp-doss p {
  color: white;
  padding: 15px 0 0 15px;
}
.comp-doss button {
  background-color: #495057;
  color: white;
}
.comp-imp {
  margin: 0;
  background-color: transparent;
  width: 100%;
}
#btn1, #btn2 {
  background-color: transparent;
}
@media screen and (max-width: 1920px) {
  #bloc-competence {
    width: 100%;

  }
  #list-competence{
    width: 100%;
  }
  .row {
    flex-wrap: wrap;
  }
  #bloc-activite {
    width: 50%;
  }
}
</style>