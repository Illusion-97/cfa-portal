<template>
  <div id="main-cr-prj">
      <div>
          <nav class="d-inline" id="navproj">
              <p>Nouveau dossier projet</p>
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
                      <button class="btn btn-secondary" variant="flat" @click="retour()">
                          Retour
                      </button>
                  </v-col>
              </v-row>
          </nav>
      </div>
      <div>
          <!-- ****Composants Importer Un Dossier ****-->
          <section id="comp-doss-prjt">
              <div class="comp-doss">
                  <p>Importer un dossier :</p>
                  <button class="btn mr-2" type="button" id="btn1" @click="showSection2">
                      <v-icon class="mr-2"> {{ buttonIcon }} </v-icon>
                  </button>
              </div>

              <v-expand-transition>
                  <div id="test" v-show="showSec2">
                      <section class="comp-imp">
                          <div class="mb-3">
                              <label for="formFile" class="form-label"></label>
                              <v-file-input show-size placeholder="pdf,png ... taille max : 500 mo" class="form-control" type="file" id="formFile" />
                          </div>
                          <br />
                          <div class="imp-doss-btn">
                              <btn id="btn-annuler" class="btn btn-secondary">Annuler</btn>
                              <btn id="btn-save" class="btn btn-success" @click="submit">Sauvegarder</btn>
                          </div>
                      </section>
                  </div>
              </v-expand-transition>
          </section>
          <!-- ******************************************************** -->
          
          
          <p>Ou</p>
          
          
          <!-- Composants Créer Un Dossier Projet -->
          <section>
              <div class="comp-doss">
                  <p>Créer un dossier :</p>
                  <v-button class="btn mr-2" background-color="none" type="button" id="btn2" @click="showSection1">
                      <v-icon class="ml-2"> {{ buttonIcon2 }} </v-icon>
                  </v-button>
              </div>

              <v-expand-transition>
                  <div v-show="showSec1">
                      <!---->
                      <div>
                          <section id="marge">
                              <nav id="navbar-btn">
                                  <section>
                                      <v-btn-toggle role="group">
                                          <v-btn id="bt1" class="" block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Info</v-btn>
                                          <v-btn id="bt2" class="" block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Compétences Couvertes</v-btn>
                                          <v-btn id="bt3" class="" block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Résumé</v-btn>
                                          <v-btn id="bt4" class="" block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Contenu</v-btn>
                                          <v-btn id="bt5" class="" block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Annexe</v-btn>
                                      </v-btn-toggle>
                                  </section>
                              </nav>

                              <section>
                                  <v-card>
                                      <v-card-body v-show="active === 1" name="page Info">
                                          <v-card>
                                              <v-card-text disabled>
                                                    <v-card-title>  Candidat : {{ etudiants.utilisateurDto.prenom }}  {{ etudiants.utilisateurDto.nom }}</v-card-title> 
                                                  <v-card-subtitle>Projet : {{ DossierProjet.projet.nom }}</v-card-subtitle>
                                                      <v-card-subtitle>Dossier : {{ DossierProjet.nom }}</v-card-subtitle>
                                                   <v-card-title>  Année : {{ etudiants.promotionsDto[0].dateDebut}}/{{etudiants.promotionsDto[0].dateFin}}</v-card-title>
 
                                              </v-card-text>
                                              <vue-editor v-model="DossierProjet.infoDossierProjets.information_projet" 
                                              id="exp1"  placeholder="Informations du Projet" readonly />
                                          </v-card>
                                      </v-card-body>

                                      <v-card-body Disabled v-show="active === 2" name="page Compétences Couvertes">
                                        <v-card class="card-competences-couvertes">
                                          <v-card-body>
                                          <!-- @click="active_cp = i" pour les boutons -->
                                          <v-list v-for="activites in activiteTypes" :key="activites.id" >
                                            <v-btn>{{ activites.libelle }}</v-btn>
                                            <v-list-item v-for="competences in activites.competencesProfessionnellesDto" :key="competences.id"> {{ competences.id }}
                                            </v-list-item>
                                            <!-- <v-list-item 
                                            v-for="competences in activites.competencesProfessionnellesDto" :key="competences.id"> {{ competences.id }}
                                            </v-list-item> -->
                                          </v-list>
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
                                                          <v-file-input v-model="annexe.pieceJointe" label="Annexes du Dossier Projet" accept="image/*" :id="'fileInput_' + index" @change="'onFileChange' + index"></v-file-input>
                                                          {{ annexe }} + {{ annexe.id }}
                                                          <v-btn class="btn btn-secondary mb-4" @click="deleteAnnexe(index)">Supprimer</v-btn>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </v-simple-table>
                                      </v-card-body>
                                      <v-card>
                                          <v-card-body>
                                              <p></p>
                                              <button id="btn-annuler" class="btn btn-secondary" @click="clear()">Annuler</button>
                                              <button id="btn-save" class="btn btn-success" @click="submit()">Sauvegarder</button>
                                          </v-card-body>
                                      </v-card>
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
                          <b-button variant="primary" @click="$bvModal.hide('modal-delete-success')">
                              Continuer
                          </b-button>
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
  import { promotionApi } from "@/_api/promotion.api";
  import { projetApi } from "@/_api/projet.api.js";
  import { activiteTypeApi } from "@/_api/activiteType.api.js";


  export default {
    name: "DossierProjetCreer",
    components: { VueEditor },
    data() {
      return {
        marker: true,
        iconIndex: 0,
        showSec1: false,
        showSec2: false,
        active: undefined,
        active_cp:undefined,
        etudiants: [],
        promotions: [],
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
        this.annexeDossierProjets.unshift(newAnnexe);
      },
      onFileChange(index) {
        this.DossierProjet.annexeDossierProjets[index].pieceJointe =
          event.target.files[0];
      },
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
  
        const utilisateurId = this.$store.getters.getUtilisateur.etudiantDto.id;
  
        dossierProjetApi
          .create(dossierProjet, utilisateurId, annexeData)
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
           .getById(this.$store.getters.getUtilisateur.etudiantDto.id)
           .then((response) => (this.etudiants = response, console.log(this.etudiants)));
       },
       getPromotion() {
         promotionApi
           .getCursusByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
           .then((response) => (this.promotions = response));
       },
  
      getAllProject() {
        projetApi.getAll().then((response) => {this.projets = response});
      },
  
      getActiviteTypeByCursus(){
        activiteTypeApi
        .getActiviteTypesByCursus(7)
        .then((response) => {this.activiteTypes = response, console.log(this.activiteTypes)})
      },
      clear() {
        this.DossierProjet.contenuDossierProjets.contenu_projet = "";
        this.DossierProjet.resumeDossierProjets.resume_projet = "";
        this.DossierProjet.infoDossierProjets.information_projet = "";
      },
  

      //-----Style Input pour le nom do dp----
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
      this.getAllProject();
      this.getActiviteTypeByCursus();
      this.getEtudiant();
      this.getPromotion();
      console.log(this.$store.getters.getUtilisateur.etudiantDto.id);
    },
    computed: {
      //-----Style Déroulement
      buttonIcon2() {
        return this.showSec1 ? "mdi-chevron-up" : "mdi-chevron-down";
      },
      buttonIcon() {
        return this.showSec2 ? "mdi-chevron-up" : "mdi-chevron-down";
      },
      //----------------------
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
    margin: 0% 2% 500px 2%;
    min-width: 1170px;
    min-height: 100%;
  }
  
  #navproj {
    display: grid;
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
  #comp-doss-prjt {
    margin-bottom: 10px;
  }
  
  .comp-doss p {
    color: white;
    padding: 15px 0px 0px 15px;
  }
  
  .comp-doss button {
    background-color: #495057;
    color: white;
  }
  
  #container {
    background-color: black;
  
    display: flex;
  }
  
  #container2 {
    display: flex;
    min-width: 500px;
    padding-top: 10px;
  }
  
  #container2 p {
    padding-left: 10px;
  }
  
  .comp-imp {
    display: inline-block;
    margin: 10px 10px 20px 50px;
    background-color: none;
    width: 90%;
  }
  
  #imp-file {
    margin-left: 20%;
  }
  .imp-doss-btn {
    padding: 15px 0px 0px 15px;
    background-color: none;
  
    display: inline-block;
  }
  
  #btn-save {
    right: 34%;
    position: absolute;
  }
  
  #btn-annuler {
    text-align: left;
    color: #fffcfc;
    left: 34%;
    position: absolute;
  }
  #btn1 {
    background-color: transparent;
  }
  .card-competences-couvertes{
    height: 20vmax;
    display:grid;
    justify-items: center; /* Centre horizontalement */
  align-items: center; /* Centre verticalement */
  }

  .card-competences-couvertes .v-btn{
    height: 100vh; /* Hauteur de l'élément parent */
  }
</style>