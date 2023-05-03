<template>
  <div id="main-cr-proj">
    <!-- {{ this.dossierProjetImport }}   -->
    <div>
          <!-- Composants Créer Un Dossier Projet -->
          <section id="section-group" >
              <div id="btn-retour">
                  <b-button  @click="retour()">
                      Retour
                  </b-button>
              </div>
              <nav >
                  <v-btn-toggle role="group">
                      <v-btn block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Info</v-btn>
                      <v-btn block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Compétences Couvertes</v-btn>
                      <v-btn block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Résumé</v-btn>
                      <v-btn block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Contenu</v-btn>
                      <v-btn block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Annexe</v-btn>
                  </v-btn-toggle>
              </nav>
              <v-card>
                  <card-body v-show="active === 1" name="page Info">
                      <v-card>
                          <v-card-text disabled>
                              <v-card-title>  Candidat : {{ studentFullName }}</v-card-title>
                              <v-card-subtitle>Projet : {{ dossierProjetImport.projets.nom }}</v-card-subtitle>
                              <v-card-subtitle>Dossier : {{ dossierProjetImport.nom }}</v-card-subtitle>
                              <v-card-title>  Année : {{ this.dateInfo(0) +" - " + this.dateInfo(1)    }}</v-card-title>
                          </v-card-text>
                          <vue-editor  
                              editorStyle="height: 320px" id="exp1" readonly />
                      </v-card>
                  </card-body>
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
                              <vue-editor h-auto v-model="dossierProjetImport.resumeDossierProjets[0].resume_projet" :value="dossierProjetImport.resumeDossierProjets[0].resume_projet" id="exp1" placeholder="Résumé du Projet" readonly />
                          </v-card-body>
                      </v-collapse>
                  </v-card-body>
                  <v-card-body v-show="active === 4" name="formulaire contenu">
                      <v-collapse :id="'accordion-' + id" class="titre-details-modal volets" visible accordion="my-accordion">
                          <v-card-body>
                              <vue-editor v-model="dossierProjetImport.contenuDossierProjets[0].contenu_projet" :value="dossierProjetImport.contenuDossierProjets[0].contenu_projet" id="exp1"  placeholder="Contenu du Projet"></vue-editor>
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
                              <tr v-for="(annexe, index) in dossierProjetImport.annexeDossierProjets" :key="annexe.id">
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
              <div class="d-flex justify-content-center" style="margin-top: 1%">
                  <div class="text-left" style="width:15%">
                      <button class="btn btn-secondary" @click="clear()">Annuler</button>
                  </div>
                  <div class="text-right" style="width:15%">
                      <button class="btn btn-success" @click="submit()">Sauvegarder</button>
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
   import { VueEditor } from "vue2-editor";
   import { etudiantApi } from "@/_api/etudiant.api.js";
   import { activiteTypeApi } from "@/_api/activiteType.api.js";
   
   
   export default {
     name: "DossierProjetCreer",
     components: { VueEditor },
     data() {
       return {
         active: 1,
         studentId:this.$store.getters.getUtilisateur.etudiantDto.id,
         studentFullName: this.$store.getters.getUtilisateur.fullName,
         idDossierProjet: this.getUrl(),
         dossierProjetImport: [],
         activiteTypes: [],
         promotion: [],
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
      getUrl(){
        const url = window.location.href;
        const segments = url.split('/');
        const dernierParam = segments[segments.length - 1];
        return dernierParam;
      },
       retour() {
         history.back();
         
       },
       dateInfo(x){
        let date = new Date();
        let  yyyy = date.getFullYear();
        const year = yyyy + x
        return `${year}`
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
         this.dossierProjetImport.annexeDossierProjets.unshift({
           id: this.DossierProjet.annexeDossierProjets.length + 1,
         });
         const newAnnexe = {
           id: this.DossierProjet.annexeDossierProjets.id,
           version: 0,
           pieceJointe: null,
           dossierProjetId: this.dossierProjetImport.id,
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
       getActiviteTypeByCursus(){
         activiteTypeApi
         .getActiviteTypesByCursus(7)
         .then((response) => {this.activiteTypes = response, console.log(response)})
       },
       getDossierProjetById(){
        dossierProjetApi.getById(4).then((response)=> {this.dossierProjetImport = response, console.log( response)})
       },
       getPromotion(){
        etudiantApi
        .getPromotions(this.studentId)
        .then((response)=> {this.promotion = response, console.log(response)})
       }
     },
   
     created() {
      this.getUrl();
      this.getPromotion();
      this.getDossierProjetById();
      this.getActiviteTypeByCursus();
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
    display: inherit;
   background-color: transparent;
   padding: 20px;
   margin: 0% 2% 0% 2%;
   min-width: 100vw;
   height: 100vmin;
   }
  #section-group{
    margin: 0% 2% 0% 2%;
  }
   .v-btn-toggle {
   display: inline-flex;
   width: 20%;
   }

   button {
   border-radius: 50px;
   }
   #btn-save {
   right: 34%;
   position: absolute;
   }
   #btn-annuler {
   left: 34%;
   position: absolute;
   }
   #btn-retour{
    display: flex; 
    justify-content: flex-end;
    margin-bottom:1% ;
   }
 </style>