<template>
  <div id="main-cr-prj">
    <div>
      <nav>

        <v-card-title>Nom du Dossier : {{dossierModif.nom}} <br> {{dossierModif.annexeDossierProjetDtos}}</v-card-title>
      </nav>
    </div>
    <div>
      <!-- ****Composants Importer Un Dossier ****-->
      <section>
        <div class="comp-doss">
          <p>Importer un dossier :</p>
        </div>

        <section v-if="dossierModif.dossierImport != null">
            <v-card id="listImportDoss" class="mb-10" >
              <v-simple-table>
                <thead>
                <tr>
                  <th>test</th>
                  <th>actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td >
                    {{dossierModif.dossierImport}}
                  </td>
                  <td><v-btn>supprimer</v-btn><v-btn>modifier</v-btn></td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </section>
        <section v-else>
          <v-file-input v-model="dossierModif.dossierImport" accept="image/*"></v-file-input>
        </section>
      </section>
      <!-- ******************************************************** -->
      <v-card-title>Ou</v-card-title>
      <!-- Composants Créer Un Dossier Projet -->
      <section>
        <div class="comp-doss">
          <p>Créer un dossier :</p>
        </div>
        <v-expand-transition>
          <div>
            <div>
              <section>
                <nav >
                  <section class="fill-width">
                    <v-btn-toggle role="group">
                      <v-btn block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Info</v-btn>
                      <v-btn block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Compétences Couvertes</v-btn>
                      <v-btn block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Résumé</v-btn>
                      <v-btn block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Contenu</v-btn>
                      <v-btn block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Annexe</v-btn>
                    </v-btn-toggle>
                  </section>
                </nav>
                <section>
                  <v-card>
                    <div v-show="active === 1">
                      <v-card>
                        <v-card-text disabled>
                          <v-card-subtitle>Projet : {{ DossierProjet.projet.nom }}</v-card-subtitle>
                          <v-card-subtitle>Dossier : {{ DossierProjet.nom }}</v-card-subtitle>
                        </v-card-text>
                        <vue-editor v-model="DossierProjet.infoDossierProjets.information_projet"
                                    id="exp1"  placeholder="Informations du Projet" readonly />
                      </v-card>
                    </div>

                    <div v-show="active === 2" >
                      <v-card>
                        <div>
                          <div class="card-body">
                            <v-list v-for="activites in activiteTypes" :key="activites.id">
                              <div class="row align-items-center">
                                <v-col>
                                  <v-col style="width: 50vw">
                                    <v-list-item-title class="">{{ activites.libelle }}</v-list-item-title>
                                  </v-col>
                                </v-col>
                                <v-col class="col-md-15">
                                  <ul class="list-unstyled">
                                    <v-list-item v-for="competences in activites.competencesProfessionnellesDto" :key="competences.id"
                                                 @click="toggleSelectedComp(competences.id)" :style="selectedComp(competences.id)">
                                      <li>
                                        {{competences.id + ". " + competences.libelle }}
                                      </li >
                                    </v-list-item>
                                  </ul>
                                </v-col>
                              </div>
                            </v-list>
                          </div>
                        </div>
                      </v-card>
                    </div>
                    <div v-show="active === 3">
                      <b-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                        <div>
                          <vue-editor h-auto v-model="DossierProjet.resumeDossierProjets.resume_projet" id="exp1" placeholder="Résumé du Projet" readonly />
                        </div>
                      </b-collapse>
                    </div>
                    <div v-show="active === 4" >
                      <b-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                        <div>
                          <vue-editor v-model="DossierProjet.contenuDossierProjets.contenu_projet" id="exp1"  placeholder="Contenu du Projet"></vue-editor>
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
                        <tr v-for="(annexe, index) in dossierModif.annexeDossierProjetDtos" :key="annexe.id">
                          <td>
                            {{annexe.pieceJointe}}
                            <v-btn class="mb-4" @click="deleteAnnexe(index)">Supprimer</v-btn>
                          </td>
                        </tr>
                        </tbody>
                      </v-simple-table>
                    </div>
                  </v-card>
                  <div class="d-flex justify-content-center">
                    <div class="text-left" style="width:15%">
                      <button class="btn btn-secondary" @click="clear()">Annuler</button>
                    </div>
                    <div class="text-right" style="width:15%">
                      <button class="btn btn-success" @click="submit()">Sauvegarder</button>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </v-expand-transition>
        <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
          <p>
            Votre Dossier Projet "{{ DossierProjet.nom }} a été correctement créer"
          </p>
          <div class="div-ok">
            <router-link class="nav-item first" :to="'/etudiant/dossierprojets'">
              <button @click="$bvModal.hide('modal-delete-success')">
                Continuer
              </button>
            </router-link>
          </div>
        </b-modal>
      </section>
    </div>
  </div>
</template>
<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { etudiantApi } from "@/_api/etudiant.api.js";
import { VueEditor } from "vue2-editor";
import { activiteTypeApi } from "@/_api/activiteType.api.js";


export default {
  name: "DossierProjetCreer",
  components: { VueEditor },
  data() {
    return {
      active: 1,
      dossierProjetId: 0,
      studentId: this.$store.getters.getUtilisateur.etudiantDto.id,
      etudiants: [],
      activiteTypes: [],
      dossierModif:{},
      DossierProjet: {
        dossierImport:"",
        nom: "",
        projet: {
          id: 0,
          nom: "",
        },
        annexeDossierProjets: [{ pieceJointe: null }],
        infoDossierProjets: [{ information_projet: "" }],
        competenceProfessionnelleId: [],
        contenuDossierProjets: [{ contenu_projet: "" }],
        resumeDossierProjets: [{ resume_projet: "" }],
      }
    };
  },
  created() {
    console.clear()
    console.log(this.dossierModif)
    this.getIdFromUrl();
    this.getDossierProjetById();
    this.getEtudiant();
    this.getActiviteTypeByCursus();
  },
  methods: {
    retour() {
      history.back();
    },
    getIdFromUrl() {
      const url = window.location.href;
      const segments = url.split('/');
      this.dossierProjetId = segments[segments.length - 1];
      return console.log(this.dossierProjetId);
    },
    //***Partie sur les competenceCouvertes du DossierProjet***
    toggleSelectedComp(compid){

      const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleId;
      const index = CompetencesCouvertes.indexOf(compid)

      if(CompetencesCouvertes.includes(compid)){
        CompetencesCouvertes.splice(index, 1)
        console.log(CompetencesCouvertes)
      }else{
        CompetencesCouvertes.push(compid)
        console.log(CompetencesCouvertes)
      }
    },

    //*********************************************************


    //*******Partie sur les annexes du DossierProjet*******
    deleteAnnexe(index) {
      this.DossierProjet.annexeDossierProjets.splice(index, 1);
    },
    addAnnexe() {
      this.DossierProjet.annexeDossierProjets.unshift({
        id: this.DossierProjet.annexeDossierProjets.length + 1,
      });
      const newAnnexe = {
        id: this.DossierProjet.annexeDossierProjets.id,
        version: 0,
        pieceJointe: null,
        dossierProjetId: 0,
      };
      console.log(newAnnexe.pieceJointe)
    },
    onFileChange(index) {
      this.DossierProjet.annexeDossierProjets[index].pieceJointe = event.target.files[0];
    },
    //******************************************************
    submit() {
      const {
        dossierImport,
        nom,
        projet,
        annexeDossierProjets,
        infoDossierProjets,
        competenceProfessionnelleId,
        contenuDossierProjets,
        resumeDossierProjets,
      } = this.DossierProjet;

      // Envoi de chaque fichier
      const annexeData = new FormData();
      for (let i = 0; i < annexeDossierProjets.length; i++) {
        const annexe = annexeDossierProjets[i];
        if (annexe.pieceJointe) {
          annexeData.append("pieceJointe", annexe.pieceJointe);
        }
      }

      const dossierProjet = {
        dossierImport,
        nom,
        projet: {
          id: projet.id,
          nom: projet.nom,
        },
        annexeDossierProjets,
        infoDossierProjets: [
          {
            information_projet: infoDossierProjets.information_projet,
          },
        ],
        competenceProfessionnelleIds: [competenceProfessionnelleId],
        contenuDossierProjets: [
          {
            contenu_projet: contenuDossierProjets.contenu_projet,
          },
        ],
        resumeDossierProjets: [
          {
            resume_projet: resumeDossierProjets.resume_projet,
          },
        ],
      };

      dossierProjetApi
          .create(dossierProjet, this.idEtu, annexeData)
          .then(async (data) => {
            this.DossierProjet = data;
            this.clear();
            this.$bvModal.show("modal-delete-success");
            console.log(data);
          })
          .catch((error) => {
            console.error("Upload error:", error);
            this.$emit("erreur", error);
          });
    },
    getEtudiant() {
      etudiantApi
          .getById(this.studentId)
          .then((response) => (this.etudiants = response, console.log(response)));
    },
    getDossierProjetById(){
      dossierProjetApi.getById(this.dossierProjetId).then((response)=> {this.dossierModif = response, console.log( response)})
    },
    getActiviteTypeByCursus(){
      activiteTypeApi
          .getActiviteTypesByCursus(7)
          .then((response) => {this.activiteTypes = response})
    },
    clear() {
      this.DossierProjet.contenuDossierProjets.contenu_projet = "";
      this.DossierProjet.resumeDossierProjets.resume_projet = "";
      this.DossierProjet.infoDossierProjets.information_projet = "";
    }
  },


  computed: {
    /* Selection */
    selectedComp(){
      return (compid) => {
        const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleId
        const bg = CompetencesCouvertes.includes(compid) ? 'green' : 'transparent'
        const txt = CompetencesCouvertes.includes(compid) ? 'white' : 'black'
        return { backgroundColor: bg, color: txt }
      }
    }
  }
};
</script>
<style scoped>
#main-cr-prj {
  background-color: transparent;
  padding: 20px;
  margin: 0 2% 0 2%;
  height: 100vmin;
}
.v-btn-toggle {
  display: inline-flex;
  width: 20%;
}
.comp-doss {
  background-color: #e11b28 !important;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px 20px 0 0;
  border-color: black;
  justify-content: space-between;
  width: 100%;
}
button {
  border-radius: 50px;
}
.comp-doss p {
  color: white;
  padding: 15px 0 0 15px;
}
.comp-doss button {
  background-color: #495057;
  color: white;
}
</style>