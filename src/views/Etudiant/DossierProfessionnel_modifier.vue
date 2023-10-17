<template>
  <div class="container">  
    <div v-if="dossierPro">
      <h5>Modification du dossier professionnel : 
      <span>{{ this.cursus.titre }}</span></h5>  
      <b-form @submit="updateDossier">
      <v-col cols="12" sm="6"  md="4">
      <v-text-field  type="text" v-model="dossierPro.nom" variant="filled"  clearable >
</v-text-field>
    </v-col>
     <br/>
     
     <div v-for="(activite, index) in activiteTypes" :key="index.id">
  <h6>Activité type {{ index + 1 }} : {{ activite.libelle }}</h6>
  
  <b-form-select  :options="optionsAT(activite)" @change="getValue">
  </b-form-select>
    
<br/>

<b-modal id="exp-pro-modal" size="xl" :title="'Compétence professionnelle : ' + compInModal.libelle" centered
           scrollable no-close-on-esc @hidden="resetModal" hide-footer v-model="showModal" v-if="expPro">
    <b-form @submit="addExp">
      <input hidden type="text" class="form-control" v-model="formExp.id" placeholder="id" />
      <b-card no-body class="mb-1" >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary" class="titre-details-modal volets">1. Décrivez les
              tâches réalisées ou opérations que vous avez
              effectué et dans quelles conditions.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

            <b-card-body>
              <vue-editor v-model="expPro.tacheRealisee" id="exp1" name="tacheRealisee" placeholder="Tâches réalisées" />
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary" class="titre-details-modal volets">2. Précisez les
              moyens utilisés.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">

            <b-card-body>
              <vue-editor v-model="expPro.moyenUtilise" id="exp2" name="moyenUtilise" placeholder="Moyens utilisés" />
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="primary" class="titre-details-modal volets">3. Avec qui
              avez-vous travaillé ?
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">

            <b-card-body>
              <vue-editor v-model="expPro.collaborateur" id="exp3" name="collaborateur" placeholder="Collaborateurs" />
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="primary" class="titre-details-modal volets">4. Précisez le
              contexte.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">

            <b-card-body>
              <vue-editor v-model="expPro.contexte" id="exp4" name="contexte" placeholder="Contexte" />
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-5 variant="primary" class="titre-details-modal volets">5. Informations
              complémentaires (facultatif).
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">

            <b-card-body>
              <vue-editor v-model="expPro.information" id="exp5" name="information" placeholder="Informations" />
            </b-card-body>
          </b-collapse>
        </b-card><br/>
        <div id="div-save">
          <b-button size="sm" class="mr-2" variant="primary" @click.prevent="close">
          <v-icon>mdi-arrow-left</v-icon>
          Retour
        </b-button>
        <div v-if="hideDelete == true">
             <b-button size="sm" variant="danger" class="btn-delete" @click="showDeleteExp">
              <font-awesome-icon :icon="['fas', 'trash']" />
              <span class="icon-right">Supprimer</span>
            </b-button>
          </div>          
        <b-button size="sm" variant="success" type="submit">
          <font-awesome-icon :icon="['fas', 'check-circle']" />
          <span class="icon-right">Créer</span>
        </b-button>
        </div>
        <b-modal id="delete-Exp" centered title="Confirmation de suppression" hide-footer>
          <p>
            Êtes-vous sûr de vouloir supprimer cette  <strong>expérience professionnelle</strong> ?
          </p>
          <div class="d-flex justify-content-between">
            <b-button @click="deleteExp" variant="danger">Confirmer</b-button>
            <b-button @click="$bvModal.hide('delete-Exp')">Annuler</b-button>
          </div>
        </b-modal>
        <br/>
    </b-form>
  </b-modal>  
  </div> 

  <br/>
    <h6>Annexes</h6> 
    <b-form-select v-model="selectedAnnexe" @change="getAnnexe" v-if="annexes.length > 0">
      <b-form-select-option v-for="(annexe, index) in annexes" :key="index.id" :value="annexe.id">
        {{ annexe.libelleAnnexe }}
      </b-form-select-option>
      <b-form-select-option value="">
        <b-button >+ Ajouter des annexes</b-button>
      </b-form-select-option>
    </b-form-select> 

    <div v-if="annexes.length === 0">
      <b-form-select v-model="selectedAnnexe" @change="getAnnexe">
      <b-form-select-option v-for="(annexe, index) in annexes" :key="index.id" :value="annexe.id">
        {{ annexe.libelleAnnexe }}
      </b-form-select-option>
      <b-form-select-option value="">
        <b-button >+ Ajouter des annexes</b-button>
      </b-form-select-option>
    </b-form-select> 
    </div>

    <div id="div-save">
    <b-button @click="showDeleteModal" class="ml-2" variant="danger">
       <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" /> Supprimer
    </b-button>
    </div>
    <b-modal id="annexe-modal" size="xl" title="Ajouter des annexes" centered scrollable no-close-on-esc hide-footer>
      <v-file-input id="fileInput" v-model="newAnnexe.pieceJointe"></v-file-input>
      <input hidden type="text" class="form-control" v-model="newAnnexe.id" placeholder="id" />
      <input type="text" class="form-control" v-model="newAnnexe.libelleAnnexe" placeholder="Libelle" /><br>
      <b-button type="submit" class="btn btn-success" @click.prevent="addAnnexe">Ajouter</b-button>
    </b-modal>

    <b-modal id="deleteModal" title="Supprimer" @hide="selectedAnnexe = null" >
  <b-list-group>
    <b-list-group-item v-for="(annexe, index) in annexes" :key="index.id" :value="annexe.id">
  <div class="d-flex justify-content-between align-items-center">
    <span>{{ annexe.libelleAnnexe }} : {{ annexe.pieceJointe }}</span>
    <v-icon @click="deleteAnnexe(index, annexe.id)">mdi-close</v-icon>
  </div>
</b-list-group-item>

    <b-list-group-item v-if="annexes.length === 0">
      Pas d'annexes ajoutées.
    </b-list-group-item>
  </b-list-group>
</b-modal>

<br/>

<h6>Facultatif</h6>
<template>
  <v-app>
    <v-main>
      <v-list-group >
        <b-button block variant="danger">
          diplôme, titre, CQP, attestation de formation facultatif
        </b-button>
        <v-list-item>
          <input hidden type="text" class="form-control" v-model="newFacultatif.id" placeholder="id" />
          <v-text-field v-model="newFacultatif.intitule" :counter="10" label="Intitulé" 
            @input="$v.newFacultatif.intitule.$touch()" @blur="$v.newFacultatif.intitule.$touch()" style="background-color: white;"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="newFacultatif.organisme" label="Organisme" 
            @input="$v.newFacultatif.organisme.$touch()" @blur="$v.newFacultatif.organisme.$touch()" style="background-color: white;"></v-text-field>
        </v-list-item>
        <v-list-item>
  
        <v-list-item class="containerDate">
          <v-text-field v-model="newFacultatif.date" label="Sélectionnez une date" readonly></v-text-field>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <v-date-picker v-model="newFacultatif.date" no-title scrollable locale="fr"></v-date-picker>
              </v-menu>
        </v-list-item>
      
        </v-list-item>
        <div id="div-save">
    <b-button  size="sm" variant="warning" type="submit"  @click.prevent="clear">
      <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'broom']" /> 
     Effacer
    </b-button>
    </div>
      </v-list-group>
    </v-main>
  </v-app>
</template>

    
<br/><br/>

<template>
  <div>
    <h6>Importation</h6>
    <b-list-group>
      <b-list-group-item v-if="dossierPro.fileImport !== null">
        <div class="d-flex justify-content-between align-items-center">
          <span>{{ dossierPro.fileImport }}</span>
          <div class="d-flex align-items-center">
            <v-icon @click="confirmDeleteFile" class="text-danger">mdi-close</v-icon>
            <v-icon @click="showConfirmationModal" class="text-success">mdi-check</v-icon>
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item v-else>
        <v-file-input v-model="dossierPro.fileImport"></v-file-input>
      </b-list-group-item>
    </b-list-group>
  </div>
  <b-modal id="modal-delete-import-confirmation" centered title="Confirmation de suppression" hide-footer>
    <p>
      Êtes-vous sûr de vouloir supprimer le fichier <strong>{{ dossierPro.fileImport }}</strong> ?
    </p>
    <div class="d-flex justify-content-between">
      <b-button @click="deleteImport(dossierPro.fileImport)" variant="danger">Confirmer</b-button>
      <b-button @click="$bvModal.hide('modal-delete-import-confirmation')">Annuler</b-button>
    </div>
  </b-modal>
  <b-modal id="modal-import-confirmation" centered size="lg" no-close-on-esc hide-footer>
    <p>
      Ajouter ce fichier : <strong>{{ dossierPro.fileImport }}</strong>
    </p>
    <div class="d-flex justify-content-between">
      <b-button @click="importFile(dossierPro.fileImport); $bvModal.hide('modal-import-confirmation')"  variant="success">Valider</b-button>
      <b-button @click="$bvModal.hide('modal-import-confirmation')">Annuler</b-button>
    </div>
  </b-modal>
</template>



<br/><br/>
    
    <div id="div-save">
          <b-button v-b-modal.modal-updateDossier-success size="sm" variant="success" type="submit">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            <span class="icon-right">Valider</span>
          </b-button>
          
          <b-button size="sm" variant="danger" type="submit" @click.prevent="goBack()" class="icon-right">
            <i class="fa-solid fa-circle-xmark"></i>
            <span class="icon-right">Annuler</span>
          </b-button>
      
        </div>
        </b-form>
    </div>
    <div v-else>
      <ul>
        <li>Echec !</li>
      </ul>
    </div>
    
    <b-modal id="modal-updateDossier-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre dossier professionnel a correctement été mise à jour.
      </p>
      <div class="div-ok">
        <b-button variant="primary">
          <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnels'">Ok</router-link>
        </b-button>
      </div>
    </b-modal>
  </div>
</template>


<script>
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { cursusApi } from "@/_api/cursus.api.js";
import { activiteTypeApi } from "@/_api/activiteType.api.js";
import { experiencesApi } from "@/_api/experiences.api.js";
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { VueEditor } from "vue2-editor";

export default {
  name: 'DossierProModification',
  components: {
  VueEditor,
  },
  data() {
    return {
      data: this.$route.query.data,
      cursus: [],
      activites: [],
      activiteTypes: [],
      options: [],
      fileImport:null,
      selectedActivite:[],
      selectActivite: [],
      compInModal: [],
      selectedCompetence:null,
      text: "",
      expPro:[],
      activitesByCursus: [],
      filledCompetences: [],
      hideDelete: false,
      start: null,
      experienceToDeleteIndex: null,
      showMessage: '',
      showModal:false,
      isFormValid: false,
      tempActivite: [],
      tempCompetence: [],
      dpId: 0,
      selectedDate: null,
      isIdVisible: false,
      selectedAnnexe: null,
      datePickerOpen: false,
      annexes: [],
      facultatifs:[],
      newFacultatif: {
      intitule: "",
      organisme: "",
      date: "",
    },
      newAnnexe: {
      libelleAnnexe: "",
      pieceJointe: null
    },
    formExp: {
        tacheRealisee: "",
        moyenUtilise: "",
        collaborateur: "",
        contexte: "",
        information: ""
      },
    showAnnexeModal: false,
    dossierPro:null,
      annexe: null,
      
    };
  },
  methods: {
    getActiviteTypeByCursus(){
      activiteTypeApi
          .getActiviteTypesByCursus(this.dossierPro.cursusDto.id)
          .then((response) => (this.activiteTypes = response))
    },
    getCursusEtudiant() {
      return cursusApi.getCurrentCursusByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id);
    },

    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },
   
    fetchDossier() {
  const dossierId = this.$route.params.id;

  dossierProfessionnelApi.getById(dossierId)
    .then((data) => {
      this.dossierPro = data;
      this.annexes = this.dossierPro.annexeDtos;
      if(this.annexes.length > 0)
      {
        this.newAnnexe.id=this.annexes[0].id;
        this.newAnnexe.version = this.annexes[0].version;
        this.newAnnexe.libelleAnnexe = this.annexes[0].libelleAnnexe;
        this.newAnnexe.pieceJointe = this.annexes[0].pieceJointe.name;
      }

      this.facultatifs = this.dossierPro.facultatifDto;
      if (this.facultatifs.length > 0) {
        this.newFacultatif.id = this.facultatifs[0].id;
        this.newFacultatif.version = this.facultatifs[0].version
        this.newFacultatif.intitule = this.facultatifs[0].intitule;
        this.newFacultatif.organisme = this.facultatifs[0].organisme;
        this.newFacultatif.date = this.facultatifs[0].date;
      }  

     this.expPro = this.dossierPro.experienceProfessionnelleDtos;
    })
    .catch((error) => {
      console.error(error);
    });
},


confirmDeleteFile() {
      this.$bvModal.show('modal-delete-import-confirmation');
    },
    
    deleteImport(fileImport){
      dossierProfessionnelApi.deleteFileImport(fileImport, this.dossierPro.id).then(() => {
        this.dossierPro.fileImport = null;
        this.$bvModal.hide('modal-delete-import-confirmation');
      })

    },
    showConfirmationModal() {
      this.$bvModal.show("modal-import-confirmation");
    },

    
    importFile(fileImport,index)
    {
  dossierProfessionnelApi.saveImport(fileImport, this.dossierPro.id)
  .then(() => {
    this.$bvModal.hide("modal-import-confirmation" + index)})
          .catch((error) => console.error(error));
    },
    
    
    updateDossier(event) {
  event.preventDefault();

  const annexeDtos = [];


  for (let i = 0; i < this.annexes.length; i++) {
    const annexe = this.annexes[i];
    const newAnnexe = {
      id: annexe.id,
      version: annexe.version,
      libelleAnnexe: annexe.libelleAnnexe,
      pieceJointe: annexe.pieceJointe.name ? annexe.pieceJointe.name : annexe.pieceJointe,
      dossierProfessionnelId: this.dossierPro.id
    };
    annexeDtos.push(newAnnexe);

  }
 const experienceProfessionnelleDtos = this.dossierPro.experienceProfessionnelleDtos.map((expPro) => {
  return {
    id: expPro.id,
    version: expPro.version,
    tacheRealisee: expPro.tacheRealisee,
    moyenUtilise: expPro.moyenUtilise,
    collaborateur: expPro.collaborateur,
    contexte: expPro.contexte,
    information: expPro.information,
    competenceProfessionnelleId: expPro.competenceProfessionnelleId,
    dossierProfessionnelId: expPro.dossierProfessionnelId
  };
});
if (!this.dossierPro.experienceProfessionnelleDtos.some(expPro => expPro.competenceProfessionnelleId === this.tempCompetence.id)) {
  const newExpPro = {
    id: 0,
    tacheRealisee: this.expPro.tacheRealisee,
    moyenUtilise: this.expPro.moyenUtilise,
    collaborateur: this.expPro.collaborateur,
    contexte:this.expPro.contexte,
    information: this.expPro.information,
    competenceProfessionnelleId: this.tempCompetence.id,
    dossierProfessionnelId: this.dossierPro.id
  };

  experienceProfessionnelleDtos.push(newExpPro);
}
  const dpDto = {
    id: this.dossierPro.id,
    nom: this.dossierPro.nom,
    cursusDto: {
      id: this.dossierPro.cursusDto.id,
      titre: this.dossierPro.cursusDto.titre,
      activiteTypes: [
        {
          id: this.activites.id,
          libelle: this.activites.libelle,
          competenceProfessionnelles: [
            {
              id: this.tempCompetence.id,
              libelle: this.tempCompetence.libelle,
            },
          ],
        },
      ],
    },
    experienceProfessionnelleDtos, 
    annexeDtos,
    facultatifDto: [
      {
        id: this.newFacultatif.id,
        version: this.newFacultatif.version,
        intitule: this.newFacultatif.intitule,
        organisme: this.newFacultatif.organisme,
        date: this.newFacultatif.date,
        dossierProfessionnelId: this.dossierPro.id
      }
    ],
    fileImport: this.dossierPro.fileImport,
    version: this.dossierPro.version,
  };

  dossierProfessionnelApi
    .updateDossierProfessionnel(
      dpDto,
      this.$store.getters.getUtilisateur.etudiantDto.id,
      this.newAnnexe.pieceJointe
    )
    .then((data) => {
      this.dossierPro = data;
      console.log(data);
      console.log(this.dossierPro);
      this.$bvModal.show("modal-updateDossier-success");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
},


    gofacult() {
      this.$bvModal.show("cc");
      console.log("launch");
    },
    showDeleteModal(annexe) {
    this.selectedAnnexe = annexe;
    this.$bvModal.show('deleteModal');
  },

    getAnnexe() {
      this.showAnnexeModal = true;
      this.$bvModal.show("annexe-modal");
      this.newAnnexe = {
      id: 0,
      libelleAnnexe: "",
      pieceJointe: null,
      dossierProfessionnelId:0
    };   
},

toggleSelectedComp(competenceId) {
    const selectedCompetence = this.selectedActivite.competencesProfessionnellesDto.find(comp => comp.id === competenceId);
    this.showModal(selectedCompetence);
  },

addAnnexe() {
      const annexe = {
    id: 0,
    libelleAnnexe: this.newAnnexe.libelleAnnexe,
    pieceJointe: this.newAnnexe.pieceJointe,
    dossierProfessionnelId: 0
  };
  this.annexes.push(annexe);
  console.log(this.annexes);
  this.newAnnexe.libelleAnnexe = '';
  this.newAnnexe.pieceJointe = null;
},


deleteAnnexe(index, annexeId) {
  dossierProfessionnelApi.deleteAnnexe(annexeId)
    .then(() => {
      this.dossierPro.annexeDtos.splice(index, 1);
      console.log("Suppression réussie");
      this.newAnnexe = {
      libelleAnnexe: '',  
      pieceJointe: null,
      }
    })
    .catch(error => {
      console.log("Echec", error);
    })
    .finally(() => {
      this.$bvModal.hide('deleteModal');
    });
},

deleteExp(experienceId){
  experienceId = this.expPro.id;
  
      experiencesApi.deleteById(experienceId);
        this.$bvModal.hide('delete-Exp');
        
      },
    

    optionsAT(activite) {
  let tab = [
    {
      value: null,
      text: "+ Ajouter une expérience professionnelle à :",
      disabled: true,
    },
  ];

  if (activite.competencesProfessionnellesDto) {
    activite.competencesProfessionnellesDto.forEach((competence) => {
      const hasExperiences = this.hasExperiences(competence.id); 

      let option = {
        value: competence,
        text: competence.libelle,
      };

      if (hasExperiences) {
        option.html = '<span>&#x2705;</span> ' + competence.libelle;
      }

      tab.push(option);
    });
  }

  return tab;
},

hasExperiences(competenceId) {
  if (Array.isArray(this.dossierPro.experienceProfessionnelleDtos)) {
    return this.dossierPro.experienceProfessionnelleDtos.some((experience) => experience.competenceProfessionnelleId === competenceId);
  } else {
    return false; 
  }
},
  
  getValue(value) {
  this.compInModal = value;
  this.tempCompetence = value;
  this.expPro = this.dossierPro.experienceProfessionnelleDtos.find(e => e.competenceProfessionnelleId === this.compInModal.id);

  if (this.expPro !== undefined) {
    this.hideDelete = true;
  } else {
    this.expPro = {
      id: 0,
      tacheRealisee: "",
      moyenUtilise: "",
      collaborateur: "",
      contexte: "",
      information: "",
      competenceProfessionnelleId: this.tempCompetence.id
    }
    this.hideDelete = false;
  }

  this.showModal = true;
  },


showDeleteExp(){
  this.$bvModal.show('delete-Exp');
},

isExperienceFilled(experience) {
  return (
    experience.tacheRealisee ||
    experience.moyenUtilise ||
    experience.collaborateur ||
    experience.contexte ||
    experience.information
  );
},

    inputValidation(event){
    
    if (this.expPro.tacheRealisee === undefined || this.expPro.moyenUtilise === undefined ||
        this.expPro.collaborateur === undefined || this.expPro.contexte === undefined ||
        this.expPro.information === undefined ) {
      this.showFailed();
      event.preventDefault();        
      return;
    }
    this.expPro !== null;
    this.addExp(event);
    
          },

          showFailed(){
      this.showMessage = "Vous devez renseigner tous les champs." ;
    },
    
  
    addExp(event) { 
    event.preventDefault();
    this.showModal = false;
   console.log(this.expPro);
},
close(){
      this.expPro = {}; 
      this.$bvModal.hide("exp-pro-modal");

},  
goBack() {
      window.history.back();
    },

  },

  mixins: [validationMixin],

  validations: {
    newFacultatif: {
    intitule: { required, maxLength: maxLength(10) },
    organisme: { required, email },
    //date: {required, date},
    },
  

},

watch: {
    file(newFile) {
      if (newFile) {
        this.handleFileInput(newFile);
      }
    }
  },
  created() {
  this.fetchDossier();

    this.getCursusEtudiant()
        .then((response) => {
          this.cursus = response;
          this.getActiviteTypeByCursus(this.cursus.id);
        });

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
      if (!this.$v.newFacultatif.intitule.$dirty) return errors
      !this.$v.newFacultatif.intitule.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.newFacultatif.intitule.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.newFacultatif.organisme.$dirty) return errors
      !this.$v.newFacultatif.organisme.email && errors.push('Must be valid e-mail')
      !this.$v.newFacultatif.organisme.required && errors.push('Organisme is required')
      return errors
    },
  },
  
};
</script>


<style scoped>
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

.containerDate {
  margin: 0px;
  padding: 0px;
  padding-bottom: 0%;
  margin-bottom: 0;
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

.delete-button {
  margin-left: 10px;
  padding: 0;
  border: none;
  background: none;
  color: red;
  cursor: pointer;
}


</style>
