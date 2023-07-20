<template>
  <div class="main">
    <v-card-title>Nouveau dossier projet</v-card-title>
    <section class="section-input" style="width: 100%" >
      <div class="input-selection">
        <v-text-field v-model="nomDp" variant="filled" icon="mdi-close-circle" clearable label="Nom du dossier projet" type="text" @click:clear="clearMessage"></v-text-field>
        <b-form-select id="form-select-projet" v-model="DossierProjet.projet">
          <option :value="null" disabled>
            -Choisissez un projet existant-
          </option>
          <option v-for="projet in projets" :key="projet.id" :value="projet">
            {{ projet.nom }}
          </option>
        </b-form-select>
      </div>

      <div class="input-top-btn">
        <b-button  size="sm" class="mr-2" @click="retour()">
          Retour
        </b-button>
        <b-button id="submit" :disabled="isButtonDisabled" size="sm" class="mr-2" variant="primary" @click="submit()">
          Sauvegarder
        </b-button>
      </div>
    </section>
    <div>
      <!-- **** Composants Importer Un Dossier ****-->
      <section id="comp-doss-prjt">
        <div class="comp-doss">
          <p>Importer un dossier :</p>
          <div class="btn mr-2" type="button" id="btn1"></div>
        </div>
            <v-card id="listImportDoss" >
              <section class="comp-imp">
                <v-card class="mb-10">
                  <v-card-subtitle>Importer un Dossier Projet : pdf,png ... taille max : 500 mo</v-card-subtitle>
                  <v-file-input id="inputImport" show-size v-model="DossierProjet.fileImport" type="file" />
                </v-card>
              </section>
            </v-card>
      </section>
      <!-- ******************************************************** -->
      <v-card-title>Ou</v-card-title>
      <!-- Composants Créer Un Dossier Projet -->
      <section>
        <div class="comp-doss">
          <p>Créer un dossier :</p>
          <div class="btn mr-2" background-color="none" type="button" id="btn2">
          </div>
        </div>
          <section>
            <section class="fill-width">
              <div id="btn-toggle-selection" role="group">
                <v-btn block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Info</v-btn>
                <v-btn block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Compétences Couvertes</v-btn>
                <v-btn block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Résumé</v-btn>
                <v-btn block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Contenu</v-btn>
                <v-btn block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Annexe</v-btn>
              </div>
            </section>
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
                    <tr v-for="(files, index) in paginatedFiles" :key="files.id">
                      <td class="col-md-9">
                        <v-file-input v-model="files.file" label="Annexes du Dossier Projet"
                                      accept="image/*" :id="'fileInput_' + index" ></v-file-input>
                      </td>
                      <td style="padding-top: 30px">
                        <v-btn class="mb-4" @click="deleteAnnexe(index)">Supprimer</v-btn>
                      </td>
                    </tr>
                    </tbody>
                  </v-simple-table>
                  <v-pagination v-model="annexePage" :length="Math.ceil(DossierProjet.filesAnnexe.length / itemsPerPage)"
                                v-if="DossierProjet.filesAnnexe.length" @input="handlePageChange"></v-pagination>
                </div>
              </v-card>
            </section>
          </section>
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
 import {dossierProjetApi} from "@/_api/dossierProjet.api.js";
 import {etudiantApi} from "@/_api/etudiant.api.js";
 import {VueEditor} from "vue2-editor";
 import {projetApi} from "@/_api/projet.api.js";
 import {activiteTypeApi} from "@/_api/activiteType.api.js";
 import {cursusApi} from "@/_api/cursus.api";
 export default {
     name: "DossierProjetCreer",
     components: { VueEditor },
     data() {
       return {
         idDp: 0,
         active: 1,
         studentId:this.$store.getters.getUtilisateur.etudiantDto.id,
         annexePage:1,
         itemsPerPage: 4,
         etudiants: [],
         projets: [],
         activiteTypes: [],
         cursus:{id:0},
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
       this.getAllProject();
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
       handlePageChange(page) {
         this.annexePage = page
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
       async submit() {
         // élements de DossierProjet
         const {filesAnnexe, fileImport, nom, projet, infoDossierProjets, competenceProfessionnelleIds, contenuDossierProjets, resumeDossierProjets,
         } = this.DossierProjet;

         // Création de l'objet à envoyer
         const dpDto = {
           nom,
           etudiant: {id: this.etudiants.id },
           projet: {
             id: projet.id,
             nom: projet.nom,
           },
           infoDossierProjets: [infoDossierProjets[0]],
           competenceProfessionnelleIds,
           contenuDossierProjets: [contenuDossierProjets[0]],
           resumeDossierProjets: [resumeDossierProjets[0]],
         };
         await dossierProjetApi.save(dpDto).then((data) => {
           this.DossierProjet = data;
           this.$bvModal.show("modal-delete-success");
           this.idDp = data.id;
         })
         if (fileImport){
         await dossierProjetApi.saveImport(fileImport, this.idDp)
         }
         // Envoi de chaque fichier

         const annexeData = new FormData();
         for (let i = 0; i < filesAnnexe.length; i++) {
           const annexe = filesAnnexe[i];
           if(annexe) {
             annexeData.append("pieceJointe", annexe.file);
           }
         }
         await dossierProjetApi.saveAnnexe(annexeData, this.idDp)

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
       /* Nom Dossier Projet */
       nomDp(){
         let nom = this.DossierProjet.nom;
         return nom
       },
       selectedComp(){
          return (compid) => {
             const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds
             const bg = CompetencesCouvertes.includes(compid) ? 'green' : 'transparent'
             const txt = CompetencesCouvertes.includes(compid) ? 'white' : 'black'
          return { backgroundColor: bg, color: txt }
       }},
       isButtonDisabled() {
         return !this.DossierProjet.nom || !this.DossierProjet.projet || this.DossierProjet.nom.trim() === "" || this.DossierProjet.projet.nom.trim() === "";
       },
       paginatedFiles() {
         const startIndex = (this.annexePage - 1) * this.itemsPerPage;
         const endIndex = startIndex + this.itemsPerPage;
         return this.DossierProjet.filesAnnexe.slice(startIndex, endIndex);
       },
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
   .section-input{
     display: grid;
     grid-template-rows: 1fr;
     grid-template-columns: 1fr minmax(150px, 1fr);
   }

   .input-selection{
     display: grid;
     grid-template-rows: 1fr;
     grid-template-columns: 1fr 1fr;
     grid-gap: 50px;
   }
   #form-select-projet{
     margin: 6% 0 5% 0
   }
   .input-top-btn{
     text-align: right;
   }
   .v-btn-toggle {
     display: inline-flex;
     width: 20%;
   }
   #list-competence{
    width: 100%;

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
