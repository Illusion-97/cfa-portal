<template>
   <div id="main-cr-prj">
      <div>
         <nav class="d-inline" id="navproj">
           <v-btn @click="consoleTEST">CONSOLE</v-btn>
            <v-card-title>Nouveau dossier projet</v-card-title>

            <v-row>
               <!-- Ajout du nom au dossier projet -->
               <v-col md="5">
                  <v-text-field v-model="DossierProjet.nom" variant="filled" 
                     icon="mdi-close-circle" clearable label="Nom du dossier projet" type="text" @click:clear="clearMessage"></v-text-field>
               </v-col>
               <!-- Ajout du projet au dossier projet -->
               <v-col md="5">
                  <b-form-select v-model="DossierProjet.projet">
                     <option :value="null" disabled>
                        -- Choisissez un projet existant --
                     </option>
                     <option v-for="projet in projets" :key="projet.id" :value="projet">
                        {{ projet.nom }}
                     </option>
                  </b-form-select>
               </v-col>
               <v-col>
                  <!-- Bouton retour en arrière -->
                  <b-button  @click="retour()">
                      Retour
                  </b-button>
               </v-col>
            </v-row>
         </nav>
      </div>
      <div>
         <!-- ****Composants Importer Un Dossier ****-->
         <section id="comp-doss-prjt">
            <div class="comp-doss">
               <p>Importer un dossier :</p>
               <v-btn class="btn mr-2" type="button" id="btn1" @click="showSection2">
                  <v-icon class="mr-2"> {{ buttonIcon }} </v-icon>
               </v-btn>
            </div>
            <v-expand-transition>
               <section v-show="showSec2">
               <v-card id="listImportDoss" >
                  <section class="comp-imp">
                   
                     <v-card class="mb-10">
                       <v-card-subtitle>Importer un Dossier Projet : pdf,png ... taille max : 500 mo</v-card-subtitle>
                        <v-file-input id="inputImport" show-size v-model="fileImport" @change="onSelectedImport" type="file" />
                      </v-card>
                  </section>
                </v-card>
               </section>
            </v-expand-transition>
         </section>
         <!-- ******************************************************** -->
         <v-card-title>Ou</v-card-title>
         <!-- Composants Créer Un Dossier Projet -->
         <section>
            <div class="comp-doss">
               <p>Créer un dossier :</p>
               <v-btn class="btn mr-2" background-color="none" type="button" id="btn2" @click="showSection1">
                  <v-icon class="ml-2"> {{ buttonIcon2 }} </v-icon>
               </v-btn>
            </div>
            <v-expand-transition>
               <div v-show="showSec1">
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
                                    <vue-editor v-model="DossierProjet.infoDossierProjets[0].information_projet"
                                       id="exp1"  placeholder="Informations du Projet" readonly />
                                 </v-card>
                              </div>
                              
                              <div v-show="active === 2" >
                                 <v-card>

                                       <div class="card-body">
                                          <v-list v-for="activites in activiteTypes" :key="activites.id">
                                             <div class="row align-items-center">
                                                <v-col>
                                                   <div class="col-">
                                                      <v-list-item-title style="background-color: #00A8C5">{{ activites.libelle }}</v-list-item-title>
                                                   </div>
                                                </v-col>
                                                <div class="col-sm-5">
                                                   <ul class="list-unstyled">
                                                      <v-list-item v-for="competences in activites.competencesProfessionnellesDto" :key="competences.id" 
                                                          @click="toggleSelectedComp(competences.id)" :style="selectedComp(competences.id)">
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
                                       <vue-editor h-auto v-model="DossierProjet.resumeDossierProjets[0].resume_projet" id="exp1" placeholder="Résumé du Projet" readonly />
                                    </div>
                                 </b-collapse>
                              </div>
                              <div v-show="active === 4" >
                                 <b-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                                    <div>
                                       <vue-editor v-model="DossierProjet.contenuDossierProjets[0].contenu_projet" id="exp1"  placeholder="Contenu du Projet"></vue-editor>
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
                                       <tr v-for="(file, index) in filesAnnexe" :key="file.id">
                                          <td>
                                             <v-file-input v-model="file.fichier" label="Annexes du Dossier Projet"
                                             accept="image/*" :id="'fileInput_' + index" @change="'onFileChange' + index"></v-file-input>
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
   import { projetApi } from "@/_api/projet.api.js";
   import { activiteTypeApi } from "@/_api/activiteType.api.js";
   export default {
     name: "DossierProjetCreer",
     components: { VueEditor },
     data() {
       return {
         marker: true,
         test:"",
         iconIndex: 0,
         showSec1: false,
         showSec2: false,
         active: 1,
         studentId:this.$store.getters.getUtilisateur.etudiantDto.id,
         etudiants: [],
         projets: [],
         activiteTypes: [],
         DossierProjet: {
           dossierImport:"",
           nom: "",
           projet: {
             id: 0,
             nom: "",
           },
           annexeDossierProjets: [{ pieceJointe: "" }],
           infoDossierProjets: [{ information_projet: "" }],
           competenceProfessionnelleIds: [],
           contenuDossierProjets: [{ contenu_projet: "" }],
           resumeDossierProjets: [{ resume_projet: "" }],
         },
         fileImport:{},
         filesAnnexe:[{id:0,fichier:null}]
       };
     },
     created() {
       this.getAllProject();
       this.getEtudiant();
       this.getActiviteTypeByCursus();
     },
     methods: {
       consoleTEST(){
         console.clear();
         console.log("Dossier Import : "+this.DossierProjet.dossierImport);
         console.log("Import Files : "+this.test)
         console.log("Dossier Info : "+this.DossierProjet.infoDossierProjets[0].information_projet);
         console.log("Dossier Contenu : "+this.DossierProjet.contenuDossierProjets[0].contenu_projet);
         console.log("Dossier Resume : "+this.DossierProjet.resumeDossierProjets[0].resume_projet);
         console.log("Dossier Annexes : "+this.DossierProjet.annexeDossierProjets);
         console.log("Competences Couvertes : " + this.DossierProjet.competenceProfessionnelleIds)
         console.log("filesAnnexe : " + this.filesAnnexe.values())
       },
       retour() {
         history.back();
       },
       //***Partie sur les competenceCouvertes du DossierProjet***
       toggleSelectedComp(compid){
 
         const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds;
         const index = CompetencesCouvertes.indexOf(compid)
 
         if(CompetencesCouvertes.includes(compid)){
           CompetencesCouvertes.splice(index, 1)
           console.log(CompetencesCouvertes)
         }else{
         CompetencesCouvertes.push(compid)
         console.log(this.DossierProjet.competenceProfessionnelleIds)
         }
       },
       //*******Partie sur les annexes du DossierProjet*******
       deleteAnnexe(index) {
         this.filesAnnexe.splice(index, 1);
       },
       addAnnexe() {
         this.filesAnnexe.unshift({
           id: this.filesAnnexe.length + 1,
         });
         const newAnnexe = {
           id: this.filesAnnexe.id,
           fichier: null,
         };
         console.log(newAnnexe)
       },
       onFileChange(index) {
         this.filesAnnexe[index] = event.target.files[0];
       },
       onSelectedImport() {
         var nameFile = document.getElementById('inputImport');
         this.test = nameFile.file.item().name;

       },
       async submit() {
         this.consoleTEST();
         const {
           dossierImport,
           nom,
           projet,
           annexeDossierProjets,
           infoDossierProjets,
           competenceProfessionnelleIds,
           contenuDossierProjets,
           resumeDossierProjets,
         } = this.DossierProjet;

         // Création de l'objet à envoyer
         const dpDto = {
           dossierImport,
           nom,
           projet: {
             id: projet.id,
             nom: projet.nom,
           },
           annexeDossierProjets,
           infoDossierProjets: [infoDossierProjets[0]],
           competenceProfessionnelleIds,
           contenuDossierProjets: contenuDossierProjets[0].contenu_projet,
           resumeDossierProjets: resumeDossierProjets[0].resume_projet,
         };

         let filesAnnexes = this.filesAnnexe
         // Ajout des fichiers d'annexes, s'ils existent
         for (let i = 0; i < annexeDossierProjets.length; i++) {
           const annexe = annexeDossierProjets[i];
           if (annexe.pieceJointe) {
             filesAnnexes.push(annexe.pieceJointe);
           }
         }

         try {
           const data = await dossierProjetApi.create(
               this.studentId,
               dpDto,
               filesAnnexes,
               this.fileImport
           );
           this.DossierProjet = data;
           console.log(data);
         } catch (error) {
           console.error("Upload error:", error);
           this.$emit("erreur", error);
         }
       },
        getEtudiant() {
          etudiantApi
            .getById(this.studentId)
            .then((response) => (this.etudiants = response));
        },
       getAllProject() {
         projetApi.getAll().then((response) => {this.projets = response});
       },
   
       getActiviteTypeByCursus(){
         activiteTypeApi
         .getActiviteTypesByCursus(7)
         .then((response) => {this.activiteTypes = response})
       },   
       //-----Style Input pour le nom du dp----
       clearMessage() {
         this.message = "";
       },
       //-------------------------

       clear() {
         this.DossierProjet.contenuDossierProjets.contenu_projet = "";
         this.DossierProjet.resumeDossierProjets.resume_projet = "";
         this.DossierProjet.infoDossierProjets.information_projet = "";
       },
       showSection1() {
         this.showSec1 = !this.showSec1;
       },
       showSection2() {
         this.showSec2 = !this.showSec2;
       },
     },
   

     computed: {
       //**** Style Déroulement des sections Importer et Creation ****
       buttonIcon2() {
         return this.showSec1 ? "mdi-chevron-up" : "mdi-chevron-down";
       },
       buttonIcon() {
         return this.showSec2 ? "mdi-chevron-up" : "mdi-chevron-down";
       },
       //*********************************************************** */
       
       /* Selection */
       selectedComp(){
          return (compid) => {
             const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleIds
             const bg = CompetencesCouvertes.includes(compid) ? 'green' : 'transparent'
             const txt = CompetencesCouvertes.includes(compid) ? 'white' : 'black'
          return { backgroundColor: bg, color: txt }
       }
        }
       /* *********************************************************** */
     },
     mounted:{

     }
   };
 </script>
 <style scoped>
   #main-cr-prj {
   background-color: transparent;
   padding: 20px;
   margin: 0 2% 10vh 2%;
   height: 5000px;
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
   .comp-imp {
   margin: 0;
   background-color: transparent;
   width: 100%;
   }
   #btn1, #btn2 {
   background-color: transparent;
   }

 </style>