<template>
  <div id="main-cr-proj">
    <!---->
    <div>
               <!-- Composants Créer Un Dossier Projet -->
               <section>
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
                              <v-card-body v-show="active === 1" name="page Info">
                                 <v-card>
                                    <v-card-text disabled>
                                       <!-- <v-card-title>  Candidat : {{ etudiants.utilisateurDto.prenom }}  {{ etudiants.utilisateurDto.nom }}</v-card-title> -->
                                       <v-card-subtitle>Projet : {{ DossierProjet.projet.nom }}</v-card-subtitle>
                                       <v-card-subtitle>Dossier : {{ DossierProjet.nom }}</v-card-subtitle>
                                       <!-- <v-card-title>  Année : {{ etudiants.promotionsDto[0].dateDebut}}/{{etudiants.promotionsDto[0].dateFin}}</v-card-title> -->
                                    </v-card-text>
                                    <vue-editor v-model="DossierProjet.infoDossierProjets.information_projet" 
                                       id="exp1"  placeholder="Informations du Projet" readonly />
                                 </v-card>
                              </v-card-body>
                              
                              <v-card-body Disabled v-show="active === 2" name="page Compétences Couvertes">
                                 <v-card>
                                    <v-card-body>                                
                                       <div class="card-body">
                                          <v-list v-for="activites in activiteTypes" :key="activites.id">
                                             <div class="row align-items-center">
                                                <v-col>
                                                   <v-col class="col-md-15">
                                                      <v-list-item-title class="">{{ activites.libelle }}</v-list-item-title>
                                                   </v-col>
                                                </v-col>
                                                <v-col class="col-md-5">
                                                   <ul class="list-unstyled">
                                                      <v-list-item v-for="competences in activites.competencesProfessionnellesDto" :key="competences.id" 
                                                          @click="toggleSelectedComp(competences.id)" :style="selectedComp(competences.id)">
                                                         <v-list-content disabled>
                                                             {{competences.id + ". " + competences.libelle }}
                                                         </v-list-content >
                                                      </v-list-item>
                                                   </ul>
                                                </v-col>
                                             </div>
                                          </v-list>
                                       </div>
                                    </v-card-body>
                                 </v-card>
                              </v-card-body>
                              <v-card-body v-show="active === 3" name="formulaire resume">
                                 <v-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                                    <v-card-body>
                                       <vue-editor h-auto v-model="DossierProjet.resumeDossierProjets.resume_projet" id="exp1" placeholder="Résumé du Projet" readonly />
                                    </v-card-body>
                                 </v-collapse>
                              </v-card-body>
                              <v-card-body v-show="active === 4" name="formulaire contenu">
                                 <v-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                                    <v-card-body>
                                       <vue-editor v-model="DossierProjet.contenuDossierProjets.contenu_projet" id="exp1"  placeholder="Contenu du Projet"></vue-editor>
                                    </v-card-body>
                                 </v-collapse>
                              </v-card-body>
                              <v-card-body v-show="active === 5" name="page Annexe">
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
                                       <tr v-for="(annexe, index) in DossierProjet.annexeDossierProjets" :key="annexe.id">
                                          <td>
                                             <v-file-input v-model="annexe.pieceJointe" label="Annexes du Dossier Projet" 
                                             accept="image/*" :id="'fileInput_' + index" @change="'onFileChange' + index"></v-file-input>
                                             <v-btn class="mb-4" @click="deleteAnnexe(index)">Supprimer</v-btn>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </v-simple-table>
                              </v-card-body>
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
            <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
               <p>
                  Votre Dossier Projet "{{ DossierProjet.nom }} a été correctement créer"
               </p>
               <div class="div-ok">
                  <router-link class="nav-item first" :to="'/etudiant/dossierprojets'">
                     <button variant="primary" @click="$bvModal.hide('modal-delete-success')">
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
         idEtu:this.$store.getters.getUtilisateur.etudiantDto.id,
         etudiants: [],
         infos: [],
         contenus: [],
         resumes: [],
         annexes: [],
         projets: [],
         activiteTypes: [],
         DossierProjet: {
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
     methods: {
       retour() {
         history.back();
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
           nom,
           projet,
           annexeDossierProjets,
           infoDossierProjets,
           competenceProfessionnelleIds,
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
           competenceProfessionnelleIds: [competenceProfessionnelleIds[0].competencesProfessionnellesDto[0].id],
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
             this.$bvModal.show("modal-delete-success");
             console.log(data);
           })
           .catch((error) => {
             console.error("Upload error:", error);
             this.$emit("erreur", error);
           });
       },
   
       //Récupération des infos de l'etudiant 
        getEtudiant() {
          etudiantApi
            .getById(this.idEtu)
            .then((response) => (this.etudiants = response));
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
       },
   
   
       //-----Style Input pour le nom du dp----
       toggleMarker() {
         this.marker = !this.marker;
       },
       sendMessage() {
         this.resetIcon();
         this.clearMessage();
       },
       clearMessage() {
         this.message = "";
       },
       resetIcon() {
         this.iconIndex = 0;
       },
       changeIcon() {
         this.iconIndex === this.icons.length - 1
           ? (this.iconIndex = 0)
           : this.iconIndex++;
       },
       //-------------------------
   
       showSection1() {
         this.showSec1 = !this.showSec1;
       },
       showSection2() {
         this.showSec2 = !this.showSec2;
       },
     },
   
     created() {
       this.getEtudiant();
       this.getActiviteTypeByCursus();
       this.getPromotion();
       console.log(this.idEtu);
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
             const CompetencesCouvertes = this.DossierProjet.competenceProfessionnelleId
             const bg = CompetencesCouvertes.includes(compid) ? 'green' : 'transparent'
             const txt = CompetencesCouvertes.includes(compid) ? 'white' : 'black'
          return { backgroundColor: bg, color: txt }
       }
        }
       /************************************************************ */
     },
     mounted:{
       clear() {
         this.DossierProjet.contenuDossierProjets.contenu_projet = "";
         this.DossierProjet.resumeDossierProjets.resume_projet = "";
         this.DossierProjet.infoDossierProjets.information_projet = "";
       }
     }
   };
 </script>
 <style scoped>
   /* margin : haut droit bas gauche */
   #main-cr-prj {
   background-color: none;
   padding: 20px;
   margin: 0% 2% 100vmin 2%;
   min-width: 100vm;
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
   border-radius: 20px 20px 0px 0px;
   border-color: black;
   justify-content: space-between;
   width: 100%;
   }
   button {
   border-radius: 50px;
   }
   .comp-doss p {
   color: white;
   padding: 15px 0px 0px 15px;
   }
   .comp-doss button {
   background-color: #495057;
   color: white;
   }
   .comp-imp {
   margin: 0%;
   background-color: none;
   width: 100%;
   }
   #btn-save {
   right: 34%;
   position: absolute;
   }
   #btn-annuler {
   left: 34%;
   position: absolute;
   }
   #btn1, #btn2 {
   background-color: transparent;
   width: 50vm;
   }
 
   #listImportDoss{
   }
 </style>