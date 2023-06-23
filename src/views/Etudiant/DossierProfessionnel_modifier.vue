<template>
  <div class="container">
    <h2>Modification du dossier professionnel</h2>
    <div v-if="dossierPro">
      <!-- Afficher les informations du dossier -->
      <v-col cols="12" sm="6"  md="4">
      <v-text-field  type="text" label="Nom du dossier professionnel" v-model="dossierPro.nom" variant="filled"  clearable >
</v-text-field>
    </v-col>
     <br/>
    
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
    <div id="div-save">
    <b-button @click="showDeleteModal" class="ml-2" variant="danger">Supprimer</b-button>
    </div>
    <b-modal id="annexe-modal" size="xl" title="Ajouter des annexes" centered scrollable no-close-on-esc hide-footer>
      <v-file-input id="fileInput" v-model="newAnnexe.pieceJointe"></v-file-input>
      <input type="text" class="form-control" v-model="newAnnexe.libelleAnnexe" placeholder="Libelle" /><br>
      <b-button type="submit" class="btn btn-success" @click.prevent="addAnnexe">Ajouter</b-button>
    </b-modal>

    <b-modal id="deleteModal" title="Supprimer" @hide="selectedAnnexe = null" >
  <b-list-group>
    <b-list-group-item v-for="(annexe, index) in annexes" :key="index.id" :value="annexe.id">
      <div class="d-flex justify-content-between align-items-center">
        <span>{{ annexe.libelleAnnexe }} : {{ annexe.pieceJointe }}</span>
        <v-icon @click="deleteAnnexe(index)">mdi-close</v-icon>
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
          <v-text-field v-model="newFacultatif.intitule" :error-messages="nameErrors" :counter="10" label="Intitulé" required 
            @input="$v.newFacultatif.intitule.$touch()" @blur="$v.newFacultatif.intitule.$touch()" style="background-color: white;"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="newFacultatif.organisme" :error-messages="emailErrors" label="Organisme" required
            @input="$v.newFacultatif.organisme.$touch()" @blur="$v.newFacultatif.organisme.$touch()" style="background-color: white;"></v-text-field>
        </v-list-item>
        <v-list-item>
  
        <v-list-item class="containerDate">
          <v-text-field v-model="newFacultatif.date" label="Sélectionnez une date" readonly  required></v-text-field>
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
      <v-icon @click="clear()">mdi-close</v-icon>Effacer
    </b-button>
    </div>
      </v-list-group>
    </v-main>
  </v-app>
</template>
   
    
<br/><br/>
    
    <div id="div-save">
    
          <!-- BOUTON SAVE EXP -->
         
          <b-button v-b-modal.modal-updateDossier-success size="sm" variant="success" type="submit">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            <span class="icon-right">Valider</span>
          </b-button>
          
          <b-button size="sm" variant="danger" type="submit" @click.prevent="goBack()" class="icon-right">
            <i class="fa-solid fa-circle-xmark"></i>
            <span class="icon-right">Annuler</span>
          </b-button>
      
        </div>
    </div>
    <div v-else>
      <ul>
        <li>Echec !</li>
      </ul>
    </div>
    
    <!-- MODALE SUCCESS DOSSIER CREE -->
    <b-modal id="modal-updateDossier-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre dossier professionnel a correctement mise à jour.
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'DossierProModification',
  data() {
    return {
      data: this.$route.query.data,
      cursus: [],
      activites: [],
      options: [],
      selectActivite: [],
      compInModal: [],
      expPro:[],
      activitesByCursus: [],
      filledCompetences: [],
      hideDelete: false,
      start: null,
      showMessage: '',
      showModal:false,
      isFormValid: false,
      tempActivite: [],
      tempCompetence: [],
      dpId: 0,
      selectedDate: null,
      selectedAnnexe: null,
      datePickerOpen: false,
      annexes: [],
      facultatifs:[],
      newFacultatif: {
      intitule: "",
      organisme: "",
      date: ""
    },
      newAnnexe: {
      libelleAnnexe: "",
      pieceJointe: null
    },
    showAnnexeModal: false,
    dossierPro: null,
      annexe: null,
      
    };
  },
  methods: {
    fetchDossier() {
      const dossierId = this.$route.params.id; 
      dossierProfessionnelApi
        .getById(dossierId) 
        .then((data) => {
          this.dossierPro = data; 
          this.annexes = this.dossierPro.annexeDtos;
          this.facultatifs = this.dossierPro.facultatifDto;
          if (this.facultatifs.length > 0) {
      this.newFacultatif.intitule = this.facultatifs[0].intitule;
      this.newFacultatif.organisme = this.facultatifs[0].organisme;
      this.newFacultatif.date = this.facultatifs[0].date;
    }
        })
        .catch((error) => {
          console.error(error);
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

addAnnexe() {
      const annexe = {
    id: 0,
    libelleAnnexe: this.newAnnexe.libelleAnnexe,
    pieceJointe: this.newAnnexe.pieceJointe,
    dossierProfessionnelId: 0
  };

  this.annexes.push(annexe);
  console.log(this.annexes);

  // Réinitialisation des valeurs pour effacer les valeurs précédentes
  this.newAnnexe.libelleAnnexe = '';
  this.newAnnexe.pieceJointe = null;
},


 
 
deleteAnnexe(index) {
    this.annexes.splice(index, 1);
 /* annexeId = this.newAnnexe.id;
  dossierProfessionnelApi.deleteAnnexe(annexeId)
    .then(() => {
      console.log("Suppression réussie");
      this.resetAnnexeForm();
    })
    .catch(error => {
      console.log("Echec", error);
    })
    .finally(() => {
      this.$bvModal.hide('deleteModal');
    });*/
  }, 

  getValue2(value) {
    
    // console.dir(
    //   "compInModal > " + JSON.stringify(this.compInModal, null, 4)
    // );
    //console.log("getValue > " + value);
    //console.dir("getValue > " + JSON.stringify(value, null, 4));

    this.compInModal = value;
    this.$bvModal.show("exp-pro-modal");
    this.tempCompetence = value;
    if(this.inputValidation != null)
    {
      this.filledCompetences.push(value);
    }
    this.expPro = {
      id:0,
      tacheRealisee: "",
            moyenUtilise: "",
            collaborateur: "",
            contexte: "",
            information: "",
            competenceProfessionnelleId: value.id,
           
    }
    this.expPro = value;
  },
 // OPTIONS DES ACTIVITES TYPES2
 optionsAT2(item) {
      let tab = [
        {
          value: null,
          text: "+ Ajouter une expérience professionnelle à :",
          disabled: true,
        },
      ];

      if (item.competenceProfessionnelles) {
        for (let i = 0; i < item.competenceProfessionnelles.length; i++) {

          tab.push({
            value: item.competenceProfessionnelles[i],
            text: item.competenceProfessionnelles[i].libelle,
            disabled: false,
          });

          
        }
      }
      return tab;
    },

    inputValidation(event){
    
    if (this.expPro.tacheRealisee == null || this.expPro.moyenUtilise == null ||
        this.expPro.collaborateur == null || this.expPro.contexte == null ||
        this.expPro.information == null ) {
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
    this.$bvModal.hide("exp-pro-modal");
   console.log(this.expPro);
},
close(){
      this.expPro = {}; 
      this.$bvModal.hide("exp-pro-modal");

},

  

  },

  mixins: [validationMixin],

  validations: {
    newFacultatif: {
    intitule: { required, maxLength: maxLength(10) },
    organisme: { required, email },
    //date: {required, date},
    },
  

  goBack() {
    this.$router.push('/etudiant/dossierprofessionnels');
    },

  
},
  created() {
    this.fetchDossier(); 

    cursusApi
      .getAllCursus().then((data) => (this.cursus = data));

    activiteTypeApi
      .getAllByIdPromotion(this.data.item.id)
      .then((data) => (this.activites = data));

    activiteTypeApi
      .getActiviteTypesByCursus(this.data.item.id)
      .then((data) => (this.activitesByCursus = data));

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
    /*dateErrors() {
      const errors = []
      if (!this.$v.newFacultatif.date.$dirty) return errors
      !this.$v.newFacultatif.date.date && errors.push('Must be valid date')
      !this.$v.newFacultatif.date.required && errors.push('date is required')
      return errors
    },*/
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