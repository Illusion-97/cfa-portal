<template>
  <div class="main" v-if="DossierProjet">
  <section style="display: inline-block; width: 100%">
    <v-card-title class="nav-item">Nom du Dossier : {{DossierProjet.nom}}</v-card-title>
    <div style="float: right">
      <b-button  size="sm" class="mr-2" @click="retour()">
        Retour
      </b-button>
      <b-button size="sm" class="mr-2" variant="primary" @click="submit()">
        Sauvegarder
      </b-button>
    </div>
  </section>
  <!-- ****Composants Importer Un Dossier ****-->
  <section class="test-import">
    <div class="comp-doss">
      <p>Importer un dossier :</p>
    </div>
    <v-card id="listImportDoss" class="mb-10" >
      <v-simple-table>
        <thead>
        <tr>
          <th style="width: 80%">Import</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="DossierProjet.dossierImport">
          <td v-if="versionImport === 0">{{DossierProjet.dossierImport}}</td>
          <td v-else>{{DossierProjet.dossierImport.name}}</td>
          <v-btn  @click="$bvModal.show('modal-delete-import-confirmation')">Supprimer</v-btn>
          <!-- Modal Confirmation Suppression Annexe -->
          <b-modal :id="'modal-delete-import-confirmation' " centered size="lg" no-close-on-esc hide-footer>
            <p>
              Voulez-vous supprimer cette Import : <strong>{{DossierProjet.dossierImport}}</strong> ?
            </p>
            <div class="div-ok">
              <button class="btn btn-success" @click="deleteImport(DossierProjet.dossierImport); $bvModal.hide('modal-delete-import-confirmation')">Valider</button>
              <button class="btn btn-secondary" @click="$bvModal.hide('modal-delete-import-confirmation')">Annuler</button>
            </div>
          </b-modal>
        </tr>
        <tr v-else>
          <td><v-file-input v-model="fileImport" accept="*"></v-file-input></td>
          <td><v-btn @click="$bvModal.show('modal-import-confirmation')" v-if="DossierProjet.dossierImport === null">Envoyer</v-btn></td>
          <!-- Modal Confirmation Envoi Import -->
          <b-modal :id="'modal-import-confirmation'" centered size="lg" no-close-on-esc hide-footer>
            <p>
              Voulez-vous Ajouter cette Import : <strong>{{fileImport}}</strong> ?
            </p>
            <div class="div-ok">
              <button class="btn btn-success" @click="submitImport(fileImport); $bvModal.hide('modal-import-confirmation')">Valider</button>
              <button class="btn btn-secondary" @click="$bvModal.hide('modal-import-confirmation')">Annuler</button>
            </div>
          </b-modal>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card>
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
            <nav>
              <section class="fill-width">
                <div id="btn-toggle-selection" role="group">
                  <v-btn block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Info</v-btn>
                  <v-btn block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Compétences Couvertes</v-btn>
                  <v-btn block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Résumé</v-btn>
                  <v-btn block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Contenu</v-btn>
                  <v-btn block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Annexe</v-btn>
                </div>
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
                      <vue-editor h-auto  v-model="DossierProjet.resumeDossierProjets[0]" id="exp1" placeholder="Résumé du Projet" readonly />
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
                  <div >
                    <div >
                      <v-card-title>Liste des annexes</v-card-title>
                      <v-btn class="text-right ml-2" @click="addAnnexe">
                        Ajouter une annexe
                      </v-btn>
                      <v-simple-table>
                        <thead>
                        <tr>
                          <th style="width: 80%" class="text-left">File</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(files, index) in DossierProjet.annexeDossierProjets" :key="files.id">
                          <td>
                            <template>
                              {{ DossierProjet.annexeDossierProjets[index] }}
                            </template>
                          </td>
                          <!--td Pour la suppression des annexes-->
                          <td>
                            <v-btn class="mb-4" @click="$bvModal.show('modal-delete-confirmation-' + index)">Supprimer</v-btn>
                            <!-- Modal Confirmation Suppression Annexe -->
                            <b-modal :id="'modal-delete-confirmation-' + index" centered size="lg" no-close-on-esc hide-footer>
                              <p>
                                Voulez-vous supprimer cette Annexe : <strong>{{ DossierProjet.annexeDossierProjets[index]}}</strong> ?
                              </p>
                              <div class="div-ok">
                                <button class="btn btn-success" @click="confirmDeleteAnnexe(DossierProjet.annexeDossierProjets[index], index); $bvModal.hide('modal-delete-confirmation-' + index)">Valider</button>
                                <button class="btn btn-secondary" @click="$bvModal.hide('modal-delete-confirmation-' + index)">Annuler</button>
                              </div>
                            </b-modal>
                          </td>
                        </tr>
                        <tr v-for="(files,index) in paginatedFiles" :key="files.id">
                          <td class="col-md-9">
                            <v-file-input v-model="files.file" accept="image/*" :id="'fileInput_' + index" label="Annexes du Dossier Projet"></v-file-input>
                          </td>
                          <td>
                            <v-btn style="margin-top: 10px" class="mb-4" @click="deleteAnnexe(index)">Supprimer</v-btn>
                            <v-btn class="mb-4" @click="$bvModal.show('modal-annexe-confirmation-' + index)" v-if="files.file !== undefined">Envoyer</v-btn>
                            <!-- Modal Confirmation Envoi Annexe -->
                            <b-modal :id="'modal-annexe-confirmation-' + index" centered size="lg" no-close-on-esc hide-footer>
                              <p>
                                Voulez-vous Ajouter cette Annexe : <strong>{{files.file}}</strong> ?
                              </p>
                              <div class="div-ok">
                                <button class="btn btn-success" @click="submitAnnexe(files.file, index); $bvModal.hide('modal-annexe-confirmation-' + index)">Valider</button>
                                <button class="btn btn-secondary" @click="$bvModal.hide('modal-annexe-confirmation-' + index)">Annuler</button>
                              </div>
                            </b-modal>
                          </td>
                        </tr>
                        </tbody>
                      </v-simple-table>
                      <v-pagination v-model="annexePage" :length="Math.ceil(filesAnnexe.length / itemsPerPage)"
                                    v-if="filesAnnexe.length" @input="handlePageChange"></v-pagination>
                    </div>
                  </div>
                </div>
              </v-card>
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
</template>
<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { VueEditor } from "vue2-editor";
import {activiteTypeApi} from "@/_api/activiteType.api.js";
import {cursusApi} from "@/_api/cursus.api";

export default {
  name: "DossierProjetCreer",
  components: { VueEditor },
  data() {
    return {
      active: 1,
      versionImport:0,
      dossierProjetId: 0,
      studentId: this.$store.getters.getUtilisateur.etudiantDto.id,
      annexePage:1,
      itemsPerPage: 4,
      fileImport:undefined,
      activiteTypes: [],
      dossierModif:{},
      filesAnnexe: [{file:undefined}],
      DossierProjet: {nom:null},
    };
  },
  beforeMount() {
    this.getDossierProjetById();

  },
  created() {
    this.getCursusEtudiant()
        .then((response) => {
          this.cursus = response;
          this.getActiviteTypeByCursus(this.cursus.id);
        })
  },
  methods: {
    retour() {
      history.back();
    },
    getIdFromUrl() {
      const url = window.location.href;
      const segments = url.split('/');
      this.dossierProjetId = segments[segments.length - 1];
    },
    handlePageChange(page) {
      this.annexePage = page
    },
    toggleSelectedComp(compid){

      const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds;
      const index = CompetencesCouvertes.indexOf(compid)

      if(CompetencesCouvertes.includes(compid)){
        CompetencesCouvertes.splice(index, 1)
      }else{
        CompetencesCouvertes.push(compid)
      }
    },
    deleteImport(file){
      dossierProjetApi.deleteFile(file, this.dossierProjetId).then(() => {
        this.DossierProjet.dossierImport = null;
        this.versionImport++
      })

    },
    addAnnexe() {
      this.filesAnnexe.unshift({
        id: this.filesAnnexe.length + 1,
      });
      const newAnnexe = {
      };
      return newAnnexe;
    },
    submitAnnexe(file, index){
      dossierProjetApi.updateAnnexe(file, this.dossierProjetId)
          .then(() =>
              this.$bvModal.hide('modal-annexe-confirmation-' + index),
              this.DossierProjet.annexeDossierProjets.push(file),
              this.deleteAnnexe(index))
          .catch((error) => console.error(error));
    },
    confirmDeleteAnnexe(file, index) {
      dossierProjetApi.deleteFile(file, this.dossierProjetId).then(() => {
        this.DossierProjet.annexeDossierProjets.splice(index, 1);
      });
    },
    deleteAnnexe(index) {
      this.filesAnnexe.splice(index, 1);
    },

    submitImport(dossierImport, index){
      dossierProjetApi.saveImport(dossierImport, this.dossierProjetId)
          .then(() =>this.$bvModal.hide('modal-import-confirmation-' + index))
          .catch((error) => console.error(error));
    },

    async submit() {
      // élements de DossierProjet
      const {version, nom, projet, infoDossierProjets, competenceProfessionnelleIds, contenuDossierProjets, resumeDossierProjets} = this.DossierProjet;
      // Création de l'objet à envoyer
      const dpDto = {
        id:this.dossierProjetId,
        version,
        nom,
        etudiant: {id: this.studentId },
        projet: {
          id: projet.id,
          nom: projet.nom,
        },
        infoDossierProjets: [infoDossierProjets[0]],
        competenceProfessionnelleIds,
        contenuDossierProjets: [contenuDossierProjets[0]],
        resumeDossierProjets: [resumeDossierProjets[0]],
      };
      await dossierProjetApi.update(dpDto).then(async (data) => {
        this.DossierProjet = data;
        this.$bvModal.show("modal-delete-success");
      })
    },

    getDossierProjetById(){
      this.getIdFromUrl();
      dossierProjetApi.getById(this.dossierProjetId).then((response)=> {this.DossierProjet = response;})
    },
    getActiviteTypeByCursus(id){
      activiteTypeApi
          .getActiviteTypesByCursus(id)
          .then((response) => (this.activiteTypes = response))
    },
    getCursusEtudiant() {
      return cursusApi.getCurrentCursusByIdEtudiant(this.studentId);
    }
  },


  computed: {
    /* Selection */
    selectedComp(){
      return (compid) => {
        const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds
        const bg = CompetencesCouvertes.includes(compid) ? 'green' : 'transparent'
        const txt = CompetencesCouvertes.includes(compid) ? 'white' : 'black'
        return { backgroundColor: bg, color: txt }
      }},
    paginatedFiles() {
      const startIndex = (this.annexePage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filesAnnexe.slice(startIndex, endIndex);
    }
  }
};
</script>
<style scoped>
.main{
  margin: 0 2% 0 2%;
  height: 105vmin;
}

#btn-toggle-selection{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-template-rows: 1fr;
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

.comp-doss p {
  color: white;
  padding: 15px 0 0 15px;
}
.comp-doss button {
  background-color: #495057;
  color: white;
}

.nav-item{
  display: inline-block;
  margin: 0 10px; /* Ajouter des marges pour séparer les éléments */
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
  #main-cr-prj {
    background-color: transparent;
    padding: 20px;
    margin: 0 2% 10vh 2%;
    height: 130vh;
  }
}
</style>