<template>

  <div class="container" v-if="data.item.cursus.dossierProfessionnel">
      <h5>
        Modifier le dossier professionnel :
        <span>{{ data.item.cursus.titre }}</span>
        <!-- <span>{{ data.item.cursus.dossierProfessionnel.cursus.activiteTypes }}</span> -->
      </h5>
  
      <!-- ACTIVITES TYPES SELECTEURS -->
    <div v-for="(item, index) in data.item.cursus.dossierProfessionnel.cursus.activiteTypes" :key="index">
        <h6>Activité type {{ index + 1 }} : {{ item.libelle }}</h6>
  
        <!--LISTE COMPETENCES PRO -->
        <b-form-select v-model="start" :options="optionsAT(item)" @change="getValue"></b-form-select>
        <br>
      </div>
  
     
      <!-- LAUCHN MODALE TEST -->
      <!-- <b-button v-b-modal.modal-success>test modale dossier créer</b-button>
      <br>
      <br>
      <b-button v-b-modal.modal-update-success>test modale dossier mis à jour</b-button> -->
  
      <!-- MODALE SUCCESS DOSSIER CREE -->
      <b-modal id="modal-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre dossier professionnel a correctement été crée.
        </p>
        <div class="div-ok">
          <b-button variant="primary">
            <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnel'">Ok</router-link>
          </b-button>
        </div>
      </b-modal>
  
      <!-- MODALE SUCCESS DOSSIER UPDATE -->
      <b-modal id="modal-update-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre expérience professionnelle à correctement été mis à jour.
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-update-success')">
            Continuer
          </b-button>
        </div>
      </b-modal>
  
      <!-- MODALE SUCCESS DOSSIER DELETE -->
      <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre expérience professionnelle à correctement supprimé.
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-delete-success')">
            Continuer
          </b-button>
        </div>
      </b-modal>
  
    </div>
  
    <!-- CONTAINER CREER DOSSIER -->
    <div class="container" v-else>
      <h5>
        Créer le dossier professionnel :
        <span>{{ data.item.cursus.titre }}</span>
      </h5>
  
      <v-col cols="12" sm="6"  md="4">
        <v-text-field  type="text" label="Nom du dossier professionnel" v-model="form.nom" variant="filled"  clearable >
  </v-text-field><br/>
      </v-col>
  
      <div v-for="(item, index) in data.item.cursus.activiteTypes" :key="index">
  
        <!-- ACTIVITES TYPES SELECTEURS -->
        <h6>Activité type {{ index + 1 }} : {{ item.libelle }}</h6>
  
        <b-form-select v-model="form.experienceProfessionnelleDtos" :options="optionsAT2(item)" @change="getValue2"></b-form-select>
        <!-- <b-form-select v-model="item[index]" :options="optionsAT(item)" @change="getValue"></b-form-select> -->
        <br />
      </div>
  
  
      <b-form @submit="onSubmit">
      
      <!-- ACTIVITES TYPES MODALE -->
    <b-modal id="exp-pro-modal" size="xl" :title="'Compétence professionnelle : ' + compInModal.libelle" centered
        scrollable no-close-on-esc @hidden="resetModal" hide-footer>
  
        <!-- FORMULAIRE -->
      <b-form @submit.prevent="addExp">
          <!-- ACCORDEON EXP 1 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="primary" class="titre-details-modal volets">1. Décrivez les
                tâches réalisées ou opérations que vous avez
                effectué et dans quelles conditions.
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
  
              <!-- INSERT EXP -->
              <b-card-body>
                <vue-editor v-model="expPro.tacheRealisee" id="exp1" name="tacheRealisee"
                  placeholder="Tâches réalisées" />
  
              </b-card-body>
  
            </b-collapse>
          </b-card>
  
          <!-- ACCORDEON EXP 2 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="primary" class="titre-details-modal volets">2. Précisez les
                moyens utilisés.
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
  
              <!-- INSERT EXP -->
              <b-card-body>
                <vue-editor v-model="expPro.moyenUtilise" id="exp2" name="moyenUtilise" placeholder="Moyens utilisés" />
  
              </b-card-body>
  
            </b-collapse>
          </b-card>
  
          <!-- ACCORDEON EXP 3 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="primary" class="titre-details-modal volets">3. Avec qui
                avez-vous travaillé ?
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
  
              <!-- INSERT EXP -->
              <b-card-body>
                <vue-editor v-model="expPro.collaborateur" id="exp3" name="collaborateur" placeholder="Collaborateurs" />
              </b-card-body>
            </b-collapse>
          </b-card>
  
          <!-- ACCORDEON EXP 4 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-4 variant="primary" class="titre-details-modal volets">4. Précisez le
                contexte.
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
  
              <!-- INSERT EXP -->
              <b-card-body>
                <vue-editor v-model="expPro.contexte" id="exp4" name="contexte" placeholder="Contexte" />
              </b-card-body>
  
            </b-collapse>
          </b-card>
  
          <!-- ACCORDEON EXP 5 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-5 variant="primary" class="titre-details-modal volets">5. Informations
                complémentaires (facultatif).
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
  
              <!-- INSERT EXP -->
              <b-card-body>
                <vue-editor v-model="expPro.information" id="exp5" name="collaborateur" placeholder="Collaborateurs" />
              </b-card-body>
            </b-collapse>
          </b-card>
  
     
          </b-form>
          <div v-if="hideDelete == true">
              <b-button size="sm" variant="danger" class="btn-delete" @click="deleteExp()">
                <font-awesome-icon :icon="['fas', 'trash']" />
                <span class="icon-right">Supprimer</span>
              </b-button>
            </div>
  
            <div>
              <!--BOUTON UPDATE-->
             <b-button v-b-modal.modal-update-success size="sm" variant="primary" @click="updateExperiencePro()" >
              <i class="fa-solid fa-square-pen"></i>
              <span class="icon-right">Mettre à jour</span>
            </b-button>
          </div>
     
            <div id="div-save">
            <!-- BOUTON SAVE EXP -->
            <b-button v-b-modal.modal-create-success size="sm" variant="success" type="submit"  >
              <font-awesome-icon :icon="['fas', 'check-circle']" />
              <span class="icon-right">Ajouter</span>
            </b-button>
  
          </div>
  
         </b-modal>
  
         
  
        <!--   MODALE SUCCESS expP CREE
      <b-modal  id="modal-create-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre Experience Professionnelle a correctement été ajoutées.s
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-create-success')">
            Continuer
          </b-button>
        </div>
      </b-modal> -->
  
      <!-- MODALE SUCCESS DOSSIER UPDATE -->
      <b-modal id="modal-update-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre expérience professionnelle à correctement été mis à jour.
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-update-success')">
            Continuer
          </b-button>
        </div>
      </b-modal>
  
      <!-- MODALE SUCCESS DOSSIER DELETE -->
      <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre expérience professionnelle à correctement supprimé.
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-delete-success')">
            Continuer
          </b-button>
        </div>
      </b-modal>
  
      <h6>Annexes</h6>
  <b-form-select id="select-file" v-model="selectedAnnexes" @change="getAnnexe" >
    <b-form-select-option v-for="annexe in annexes" :key="annexe.id" :value="annexe">
      {{ annexe.libelle }}
    </b-form-select-option>
    <b-form-select-option >
      <b-button  >+ Ajouter des annexes </b-button>
    </b-form-select-option>
  </b-form-select>
  
  <b-modal id="ddd" size="xl" title="Ajouter des annexes" centered scrollable no-close-on-esc hide-footer>
    <v-file-input id="fileA" v-model="newAnnexe.pieceJointe" ref="fileInput"></v-file-input>
    <input type="text" class="form-control" id="filename" v-model="newAnnexe.libelle" placeholder="Libelle" /><br/>
    <b-button type="submit" class="btn btn-success" @click.prevent="addAnnexe" >Ajouter</b-button>
  </b-modal>
      
  <br/>
      <h6>Facultatif</h6>
      <v-list-group v-model="form.facultatifDto" class="">
      
        <b-button block variant="danger"  >
                diplôme, titre, CQP, attestation de formation facultatif            
              </b-button>  
              <v-list-item>        
              <v-text-field v-model="newFacultatif.intitule" :error-messages="nameErrors" :counter="10" label="Intitulé" required
              @input="$v.name.$touch()" @blur="$v.name.$touch()" style="background-color: white;"></v-text-field>
            </v-list-item>
            <v-list-item> 
            <v-text-field v-model="newFacultatif.organisme" :error-messages="emailErrors" label="Organisme" required
              @input="$v.email.$touch()" @blur="$v.email.$touch()" style="background-color: white;"></v-text-field>
              </v-list-item>
              <v-list-item> 
              <v-text-field v-model="newFacultatif.date" :error-messages="dateErrors" label="date" required
              @input="$v.date.$touch()" @blur="$v.date.$touch()" style="background-color: white;"></v-text-field>
              
              </v-list-item> 
              <b-button block variant="danger" >document facultatif illustrant la pratique professionnelle</b-button>           
              <v-list-item>          
              <v-text-field v-model="newFacultatif.intitule" :error-messages="nameErrors" :counter="10" label="Intitulé" required
              @input="$v.name.$touch()" @blur="$v.name.$touch()" style="background-color: white;"></v-text-field>
            </v-list-item>  
  
        </v-list-group>
  
  <br/>
      
      <div id="div-save">
            <!-- BOUTON SAVE EXP -->
            <b-button size="sm" variant="success" type="submit">
              <font-awesome-icon :icon="['fas', 'check-circle']" />
              <span class="icon-right">Valider</span>
            </b-button>
  
            <b-button size="sm" variant="danger" type="submit" @click.prevent="goBack()" class="icon-right">
              <i class="fa-solid fa-circle-xmark"></i>
              <span class="icon-right">Annuler</span>
            </b-button>
  
          </div>
        </b-form>
  
      <!-- MODALE SUCCESS DOSSIER CREE -->
      <b-modal id="modal-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre dossier professionnel a correctement été crée.
        </p>
        <div class="div-ok">
          <b-button variant="primary">
            <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnel'">Ok</router-link>
          </b-button>
        </div>
      </b-modal>
  
      <!-- MODALE SUCCESS DOSSIER UPDATE -->
      <b-modal id="modal-update-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre expérience professionnelle à correctement été mis à jour.
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-update-success')">
            Continuer
          </b-button>
        </div>
      </b-modal>
  
      <!-- MODALE SUCCESS DOSSIER DELETE -->
      <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
        <p>
          <img src="@/assets/img/verifier.png" class="check" />
          Votre expérience professionnelle à correctement supprimé.
        </p>
        <div class="div-ok">
          <b-button variant="primary" @click="$bvModal.hide('modal-delete-success')">
            Continuer
          </b-button>
        </div>
      </b-modal>
    </div>
  
  
  </template>
  
  <script>
  import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
  import { experiencesApi } from "@/_api/experiences.api.js";
  import { cursusApi } from "@/_api/cursus.api.js";
  import { activiteTypeApi } from "@/_api/activiteType.api.js";
  import { VueEditor } from "vue2-editor";
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, date } from 'vuelidate/lib/validators'
  
  
  
  export default {
    name: "Selects",
    components: {
      VueEditor
    
    },
  
   
    data () {
      return {
        //DATA TRANSFERT DEPUIS ROUTER-LINK
        data: this.$route.query.data,
        text: "test",
        cursus: [],
        activites: [],
        options: [],
        selectActivite: [],
        compInModal: [],
        expPro: [],
        select1:null,
        activitesByCursus: [],
        hideDelete: false,
        start: null,
        diplomes: [
  
        ],
        annexes: [],// la liste des annexes existantes
        selectedAnnexes: [], // la liste des annexes sélectionnées dans le formulaire
      newAnnexes: [], // la liste des nouvelles annexes ajoutées dans le formulaire
      
    facultatif: [],
     
        tempActivite: [],
        tempCompetence: [],
        dpId: 0,
  
        form: {
          id: 0,
          nom: "",
  
          cursusDto: {
            id: 0,
            titre: "",
  
            activiteTypes: [{
              id: 0,
              libelle: "",
  
              competenceProfessionnelles: [{
                id: 0,
                libelle: ""
              }],
            }],
          },
  
          experienceProfessionnelleDtos: [{
            id: 0,
            tacheRealisee: "",
            moyenUtilise: "",
            collaborateur: "",
            contexte: "",
            information: "",
            competenceProfessionnelleId: 0
          }],
  
          annexeDtos : [],
  
          facultatifDto: []
        },
  
  
        formExp: {
          id: 0,
          tacheRealisee: "",
          moyenUtilise: "",
          collaborateur: "",
          contexte: "",
          information: "",
          competenceProfessionnelleId: 0,
        },
  
        // FORM DIPLOME
        name: '',
        email: '',
        date: '',
        select: "",
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
        ],
        checkbox: false,
        newFacultatif: {
               id:0,
               version:0,
               intitule: "",
               organisme: "",
               date: "",
               dossierProfessionnelId:0
              },
  
              newAnnexe: {
                id:0,
                version:0,
                libelle:'',
                pieceJointe:'',
                dossierProfessionnelId:0
                 
              }
      };
    },
  
    methods: {
      optionDiplome() {
        console.log("test");
        let tab = [
          {
            value: "",
            text: "Vos diplômes",
            disabled: false,
          },
        ];
        for (let i = 0; i < this.data.item.cursus.dossierProfessionnel.facultatif.length; i++) {
          tab.push(
            {
              value: this.data.item.cursus.dossierProfessionnel.facultatif[i],
              text: this.data.item.cursus.dossierProfessionnel.facultatif[i].intitule,
              disabled: true,
            }
          )
        }
        console.dir("tab > " + JSON.stringify(tab, null, 4));
        return tab;
      },
  
      // RESET MODALE
      resetModal: function () {
        this.annexesCDA = null;
        this.selectActivite = null;
        this.selectActivite = null;
      },
  
      // LANCE LA MODALE DE LA COMPETENCE CHOISIE
      getValue(value) {
        this.compInModal = value;
  
        // console.dir(
        //   "compInModal > " + JSON.stringify(this.compInModal, null, 4)
        // );
  
        this.$bvModal.show("exp-pro-modal");
        this.tempCompetence = value;
  
        // ENVOYER L'OBJET COMPETENCE PRO
        this.expPro;
        let res2 = {
          id: 0,
          tacheRealisee: "",
          moyenUtilise: "",
          collaborateur: "",
          contexte: "",
          information: "",
          competenceProfessionnelleId: 0
        }
  
        let res = this.compInModal.experienceProfessionnelles.find(e => e.competenceProfessionnelleId == this.compInModal.id)
  
        console.dir(
          "res > " + JSON.stringify(res, null, 4)
        );
  
        this.expPro = res || res2;
  
        // SWITCH DELETE EXP PRO
        if (this.expPro.tacheRealisee ||
          this.expPro.moyenUtilise ||
          this.expPro.collaborateur ||
          this.expPro.contexte ||
          this.expPro.information) {
          this.hideDelete = true;
        } else {
          this.hideDelete = false;
        }
  
      },
  
      // LANCE LA MODALE DE LA COMPETENCE CHOISIE
      getValue2(value) {
       this.compInModal = value;
  
        // console.dir(
        //   "compInModal > " + JSON.stringify(this.compInModal, null, 4)
        // );
  
        this.$bvModal.show("exp-pro-modal");
        this.tempCompetence = value;
        this.expPro = {
          id:0,
          tacheRealisee: "",
                moyenUtilise: "",
                collaborateur: "",
                contexte: "",
                information: "",
                competenceProfessionnelleId: value.id
  
        }
      },
  
      //LANCE LA MODALE DIPLOMES
      goDiplome() {
        this.$bvModal.show("bbb");
        console.log("launch");
      },
      gofacult() {
        this.$bvModal.show("cc");
        console.log("launch");
      },
  
      //LANCE LA MODALE ANNEXES
      getAnnexe() {
        this.$bvModal.show("ddd");
        console.log("launch");
      },
  
  
  
      addItems()
      {
        this.$bvModal.addItems("ddd");
      },
  
      /*goFacultafif() {
        this.$bvModal.show("bbb");
        console.log("launch");
      },*/
     
      // OPTIONS DES ACTIVITES TYPES - MODIFIER
      optionsAT(item) {
        let tab = [
          {
            value:"",
            text: "+ Ajouter une expérience professionnelle à la compétence :",
            disabled: true,
          },
        ];
  
        // console.dir(
        //   "item.competenceProfessionnelles > " +
        //   JSON.stringify(item.competenceProfessionnelles, null, 4)
        // );
  
        if (item.competenceProfessionnelles) {
          for (let i = 0; i < item.competenceProfessionnelles.length; i++) {
  
            let disableValue;
  
            //const found = item.competenceProfessionnelles[i].experienceProfessionnelles.find(e => e.competenceProfessionnelleId == item.competenceProfessionnelles[i].id)
  
            // SANS EXP PRO
            if (this.expPro == undefined) {
              disableValue = false;
  
              tab.push({
                value: item.competenceProfessionnelles[i],
                text: item.competenceProfessionnelles[i].libelle,
                disabled: disableValue,
  
              });
  
              // AVEC EXP PRO
            } else {
              disableValue = true;
  
              tab.push({
                value: item.competenceProfessionnelles[i],
                html: '<span>&#x2705</span> ' + item.competenceProfessionnelles[i].libelle
              });
            }
          }
        }
        return tab;
      },
  
      // OPTIONS DES ACTIVITES TYPES2
      optionsAT2(item) {
        let tab = [
          {
            value: "exp",
            text: "+ Ajouter une expérience professionnelle à :",
            disabled: true,
          },
        ];
  
       
  
        if (item.competenceProfessionnelles) {
          for (let i = 0; i < item.competenceProfessionnelles.length; i++) {
  
          let disableValue;
  
            //const found = item.competenceProfessionnelles[i].experienceProfessionnelles.find(e => e.competenceProfessionnelleId == item.competenceProfessionnelles[i].id)
  
            // SANS EXP PRO
            if (this.expPro == undefined) {
              disableValue = false;
  
              tab.push({
                value: item.competenceProfessionnelles[i],
                text: item.competenceProfessionnelles[i].libelle,
                disabled: disableValue,
  
              });
  
              // AVEC EXP PRO
            } else {
              disableValue = true;
  
              tab.push({
                value: item.competenceProfessionnelles[i],
                html: '<span>&#x2705</span> ' + item.competenceProfessionnelles[i].libelle,
  
              });
            }
  
            // <img src="@/assets/img/verifier.png" class="check" />
          }
        }
      
        return tab;
      },
  
      // ENVOIE FORMULAIRE
    onSubmit() {
        try{
     dossierProfessionnelApi
          .saveDossierProfessionnel(
            this.$store.getters.getUtilisateur.etudiantDto.id,
            {
              id: 0,
              nom: this.form.nom,
  
              cursusDto: {
                id: this.data.item.cursus.id,
                titre: this.data.item.cursus.titre,
  
                activiteTypes: [{
                  id: 0,
                  libelle: "",
  
                  competenceProfessionnelles: [{
                    id: this.tempCompetence.id,
                    libelle: this.tempCompetence.libelle
                  }],
                }],
              },
  
              experienceProfessionnelleDtos: [{
                id: 0,
                tacheRealisee: this.expPro.tacheRealisee,
                moyenUtilise: this.expPro.moyenUtilise,
                collaborateur: this.expPro.collaborateur,
                contexte: this.expPro.contexte,
                information: this.expPro.information,
                competenceProfessionnelleId: this.tempCompetence.id
              }],
  
            /* [
              {
                id:0,
                version:0,
                libelle:this.newAnnexe.libelle,
                pieceJointe:this.newAnnexe.pieceJointe,
                dossierProfessionnelId:0
              }
             ] ,*/
            annexeDtos:  [this.selectedAnnexes, this.annexes],
  
              facultatifDto: [{
                id:0,
                version:0,
                intitule: this.newFacultatif.intitule,
                organisme: this.newFacultatif.organisme,
                date: this.newFacultatif.date,
                dossierProfessionnelId:0
      }
               ]
       
            },
  
           // this.$store.getters.getUtilisateur.etudiantDto.id
  
          )
         
          // REDIRECTION
          .then((data) =>
           (this.form = data, console.log(data)),
           this.$bvModal.hide("exp-pro-modal"),
            this.$bvModal.show("modal-success"));
            
           
          
          }
          catch(error){
              console.error('Error:', error);
          }
  
  
      },
  
    addFacultatifs() {
      this.facultatif.push(this.newFacultatif);
        //console.log(this.facultatif);
        this.newFacultatif = {
                id:0,
                version:0,
                date:"",
                intitule:"",
                organisme:"",
                dossierProfessionnelId:0
              }
            },
  
     addAnnexe() {
      this.annexes.push({...this.newAnnexe});
      // vider les champs du formulaire
      this.newAnnexe = {
        id: 0,
        version: 0,
        libelle: "",
        pieceJointe: "",
        dossierProfessionnelId: 0
      };  
    
  },
      
  setup(){
        const color = 'red';
        const height = '18';
        const width = '18';
        return {color,width,height}
      },
  
      updateExp() {
  
        dossierProfessionnelApi
          .updateDossierProfessionnel(
            {
              id: this.data.item.cursus.dossierProfessionnel.id,
              nom: "",
              cursusDto: {
                id: this.data.item.cursus.id,
                titre: "",
                activiteTypes: [
                  {
                    id: "",
                    libelle: "",
                    numeroFiche: "",
                    competenceProfessionnelles: [
                      {
                        id: this.compInModal.id,
                        libelle: "",
                        numeroFiche: this.compInModal.numeroFiche,
                        version: 0,
                        experienceProfessionnelles: null
                      }
                    ],
                    version: 0
                  }
                ],
                version: 0
              },
              experienceProfessionnelleDtos: [
                {
                  id: this.expPro.id,
                  tacheRealisee: this.expPro.tacheRealisee,
                  moyenUtilise: this.expPro.moyenUtilise,
                  collaborateur: this.expPro.collaborateur,
                  contexte: this.expPro.contexte,
                  information: this.expPro.information,
                  competenceProfessionnelleId: this.tempCompetence.id,
                  dossierProfessionnelId: this.data.item.cursus.dossierProfessionnel.id,
                  version: this.expPro.version
                }
              ],
              annexeDtos :[{
                id:0,
                version:0,
                libelle:"",
                pieceJointe:"",
                dossierProfessionnelId:0,
                
              }],
  
              facultatifDto:[{
                id:0,
                version:0,
                date:"",
                intitule:"",
                organisme:"",
                dossierProfessionnelId:0
              }],
  
              version: 0
            },
  
             this.$store.getters.getUtilisateur.etudiantDto.id
  
          )
  
          // REDIRECTION
          .then(() =>
            this.$bvModal.hide("exp-pro-modal"),
            this.$bvModal.show("modal-update-success"),
          );
      },
  
      deleteExp() {
        experiencesApi
          .deleteById(this.expPro.id)
  
          // REDIRECTION
          .then(() =>
            this.$bvModal.hide("exp-pro-modal"),
            this.$bvModal.show("modal-delete-success"),
  
            // TEST MARCHE PAS 
            // this.optionsAT()
          );
      },
  
      updateExperiencePro()
      {
        experiencesApi.update({
            
             id: this.expPro.id,
             tacheRealisee: this.expPro.tacheRealisee,
             moyenUtilise: this.expPro.moyenUtilise,
             collaborateur: this.expPro.collaborateur,
             contexte: this.expPro.contexte,
             information: this.expPro.information,
             competenceProfessionnelleId: this.tempCompetence.id,
             dossierProfessionnelId: this.data.item.cursus.dossierProfessionnel.id,
             version: this.expPro.version
        },
             this.$store.getters.getUtilisateur.etudiantDto.id
  
  )
  
  // REDIRECTION
  .then(() =>
    this.$bvModal.hide("exp-pro-modal"),
    this.$bvModal.show("modal-update-success"),
  );
  },
  
      addExp() {        
          experiencesApi.save(
            this.expPro,
             this.$store.getters.getUtilisateur.etudiantDto.id,
             
            
  )
  // REDIRECTION
  .then(() =>
    this.$bvModal.hide("exp-pro-modal"),
    this.$bvModal.show("modal-create-success")
  );
  
  },
  
     
      // FORM DIPLOME
      submit() {
        this.$v.$touch()
      },
      clear() {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.form.nom = ''
        this.data = ''
        this.checkbox = false
      },
  
    
  
      goBack() {
        window.history.back();
      },
    },
  
  
  
    created() {
      cursusApi
        .getAllCursus().then((data) => (this.cursus = data));
  
      activiteTypeApi
        .getAllByIdPromotion(this.data.item.id)
        .then((data) => (this.activites = data));
  
      activiteTypeApi
        .getActiviteTypesByCursus(this.data.item.id)
        .then((data) => (this.activitesByCursus = data));
  
        
  
     // this.test();
  
      // console.log("Dossier Professionnel > " + this.data);
      // console.dir(
      //   "data > " +
      //   JSON.stringify(this.data, null, 4)
      // );
  
      // console.log("************" + this.data.item.cursus.dossierProfessionnel.id);
  
      // setDpId(){
      //      // Dossier professionnel ID
      //      if (data.item.cursus.dossierProfessionnel !== null) {
      //     console.log("data.item.cursus.dossierProfessionnel.id : " + data.item.cursus.dossierProfessionnel.id);
      //     return this.dpId = data.item.cursus.dossierProfessionnel.id
      //   } else {
      //     return 0
      //   }
      // }
  
    },
  
    // FORM DIPLOME
    mixins: [validationMixin],
  
    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      date: {required, date},
      select: { required },
      checkbox: {
        checked(val) {
          return val
        },
      },
    },
  
    computed: {
      checkboxErrors() {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors() {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors() {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      dateErrors() {
        const errors = []
        if (!this.$v.date.$dirty) return errors
        !this.$v.date.date && errors.push('Must be valid date')
        !this.$v.date.required && errors.push('date is required')
        return errors
      },
    },
  };
  
  
  </script>
  
  <style scoped>
  /* TEMPORAIRE BUG */
  footer {
    display: none;
  }
  
  .modal-title {
    font-weight: bolder;
  }
  
  .fa-square-caret-down {
    position: relative;
    top: 4px;
  }
  
  .btn-delete {
    margin-right: 7px;
  }
  
  a {
    text-decoration: none;
    color: white;
  }
  
  a:hover {
    color: white;
    text-decoration: none;
  }
  
  .check {
    width: 20px;
  }
  
  .div-ok {
    justify-content: flex-end;
    display: flex;
  }
  
  .custom-select {
    margin-bottom: 5px;
  }
  
  .bi {
    position: relative;
    top: 2px;
  }
  
  .volets {
    display: flex;
    justify-content: space-between;
  }
  
  #div-save {
    justify-content: flex-end;
    display: flex;
  }
  
  #div-label {
    margin-top: 10px;
  }
  
  h5 {
    margin: 0 0 30px 0;
    font-weight: bolder;
  }
  
  
  
  select {
    display: block;
  }
  
  .accordeon-groupe {
    margin-top: 15px;
  }
  
  .titre-details-modal {
    text-align: left;
    padding: 6px 25px;
  }
  .container {
    margin: 89px 0 0 180px;
    padding-top: 0%;
    padding-bottom: 10%;
    min-height: 350px;
  }
  
  .card-header button {
    background-color: #e11b28 !important;
    border-color: #e11b28 !important;
  }
  
  .icon-right {
    margin-left: 7px;
  }
  
  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  