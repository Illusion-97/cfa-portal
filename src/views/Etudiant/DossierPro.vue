<template>
  <div class="container" >
    <h5>
      Créer le dossier professionnel :
      <span>{{ data.item.cursus.titre }}</span>
    </h5>
    <b-form @submit="onSubmit">
    <v-col cols="12" sm="6"  md="4">
      <v-text-field  type="text" label="Nom du dossier professionnel" v-model="form.nom" variant="filled"  clearable >
</v-text-field>
    </v-col>

<br/>
  
    <div v-for="(item, index) in data.item.cursus.activiteTypes" :key="index" >

<h6>Activité type {{ index + 1 }} : {{ item.libelle }}</h6>

<b-form-select v-model="start" :options="optionsAT2(item)" @change="getValue2">
</b-form-select>
     
<br/>

<b-modal id="exp-pro-modal" size="xl" :title="'Compétence professionnelle : ' + compInModal.libelle" centered
      scrollable no-close-on-esc @hidden="resetModal"  hide-footer v-model="showModal" >
      <!-- FORMULAIRE -->
      <b-form @submit="addExp">
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
        </b-card>            
        <div id="div-save">
          <b-button size="sm" class="mr-2" variant="primary" @click.prevent=close>
    <v-icon>mdi-arrow-left</v-icon>
    Retour  
  </b-button> 
          <b-button size="sm" variant="success" type="submit">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            <span class="icon-right">Créer</span>
          </b-button>        
        </div>      
      </b-form>     
    </b-modal>   
  </div>
  <div>
  </div>

  <h6>Annexes</h6> 
    <b-form-select v-model="form.annexeDtos" @change="getAnnexe">
      <b-form-select-option v-for="(annexe, index) in annexes" :key="index.id" :value="annexe.id">
        {{ annexe.libelleAnnexe }}
      </b-form-select-option>
      <b-form-select-option value="">
        <b-button >+ Ajouter des annexes</b-button>
      </b-form-select-option>
    </b-form-select> 
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
        <v-icon @click="deleteAnnexe(index)">mdi-close</v-icon>
      </div>
    </b-list-group-item>
    <b-list-group-item v-if="annexes.length === 0">
      Pas d'annexes ajoutées.
    </b-list-group-item>
  </b-list-group>
</b-modal>
<br/>

<h6>Facultatifs</h6> 
<template>
  <v-app>
    <v-main>
      <v-list-group v-model="form.facultatifDto">
        <b-button block variant="danger">
          diplôme, titre, CQP, attestation de formation facultatif
        </b-button>
        <div v-for="(facultatif, index) in displayedItems" :key="index">
          <v-list-item>
            <v-text-field v-model="facultatif.intitule" label="Intitulé" style="background-color: white;"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field v-model="facultatif.organisme" label="Organisme" style="background-color: white;"></v-text-field>
          </v-list-item>
          <v-list-item>
            <template>
              <v-list-item class="containerDate">
                <v-text-field v-model="facultatif.date" label="Sélectionnez une date" readonly></v-text-field>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-calendar</v-icon>
                    </v-btn>
                  </template>
                  <v-date-picker v-model="facultatif.date" no-title scrollable locale="fr"></v-date-picker>
                </v-menu>
              </v-list-item>
            </template>
          </v-list-item>
          <div id="div-save">
          <v-pagination v-model="currentPage" :length="totalPages" @input="changePage"  color="info"></v-pagination>
          <v-btn icon @click.prevent="clear" color="warning"><v-icon size="sm" dark>mdi-broom</v-icon> </v-btn>
          <v-btn icon @click.prevent="deleteFacultatif(index)" color="red"><v-icon size="sm" dark>mdi-close</v-icon> </v-btn>
        </div>       
        </div>
      </v-list-group>
      <b-button  size="s" pill variant="success" @click="ajouterFacultatif()">
        <v-icon class="text-white">mdi-plus </v-icon>     
          </b-button>  
    </v-main>
  </v-app>
</template>

<br/><br/>
    
    <div id="div-save">
    
          <!-- BOUTON SAVE EXP -->
         
          <b-button v-b-modal.modal-createDossier-success size="sm" variant="success" type="submit">
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
    <b-modal id="modal-createDossier-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre dossier professionnel a correctement été crée.
      </p>
      <div class="div-ok">
        <b-button variant="primary">
          <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnels'">Ok</router-link>
        </b-button>
      </div>
    </b-modal>
 
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
import {dossierProfessionnelApi} from "@/_api/dossierProfessionnel.api.js";
import {validationMixin} from 'vuelidate'
import {email, maxLength, required} from 'vuelidate/lib/validators'
import {cursusApi} from "@/_api/cursus.api.js";
import {activiteTypeApi} from "@/_api/activiteType.api.js";
import {VueEditor} from "vue2-editor";


export default {
  name: "Selects",
  components: {
  VueEditor,
  },
  
  data () {
    return {
      data: this.$route.query.data,
      selectedComponent: 'DossierPro_Exp',
      selectedDate: null,
      selectedAnnexe: null,
      datePickerOpen: false,
      annexes: [],
      newAnnexe: {
      libelleAnnexe: "",
      pieceJointe: null
    },
      annexe: null,
      newFacultatif: {
        intitule: '',
        organisme: '',
        date: '',
      },
      currentPage: 1, 
      itemsPerPage: 1, 
      selectedActiviteTypes: [],
      text: "test",
      select1: null,
      cursus: [],
      activites: [],
      options: [],
      selectActivite: [],
      compInModal: [],
      expPro:[],
      activitesByCursus: [],
      hideDelete: false,
      start: [],
      showMessage: '',
      showModal:false,
      isFormValid: false,
      tempActivite: [],
      tempCompetence: [],
      dpId: 0,

      formExp: {
        id: 0,
        tacheRealisee: "",
        moyenUtilise: "",
        collaborateur: "",
        contexte: "",
        information: "",
        competenceProfessionnelleId: 0,
      },
      
      form: {
        id: 0,
        nom: "",

        cursusDto: {
          id: 0,
          titre: "",

          activiteTypes: [{
            id: 0,
            libelle: "",
            numeroFiche:0,
            competenceProfessionnelles: [{
              id: 0,
              libelle: "",
              numeroFiche:0
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
        }],

        annexeDtos : [{
          id:0,
          libelleAnnexe:"",
          pieceJointe:null,
          dossierProfessionnelId:0
        }],

        facultatifDto: [
          {
             id:0,
             version:0,
             intitule: "",
             organisme: "",
             date: "",
             dossierProfessionnelId:0
          }
        ],
        fileImport:null,
      },
   
      name: '',
      email: '',
      date: '',
      select: "",
      checkbox: false,
      
    };
  },


  methods: {
    
    ajouterFacultatif(){
      const nouveauFacultatif = {
      intitule: '',
      organisme: '',
      date: null, 
    };
    this.form.facultatifDto.push(nouveauFacultatif);
    },  

    changePage(newPage) {
    this.currentPage = newPage;
  },
    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },

    goDiplome() {
      this.$bvModal.show("bbb");
      console.log("launch");
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
  
    this.newAnnexe = {
      id: 0,
      libelleAnnexe: "",
      pieceJointe: null,
      dossierProfessionnelId: 0
    };
  // Affichage du modal
  this.$bvModal.show("annexe-modal");

},


onSubmit(event) {
  try {
    event.preventDefault();
    
    const dpDto = {
      id: 0,
      version:0,
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
            
      experienceProfessionnelleDtos: [],
      annexeDtos: [],
      facultatifDto: [],
      fileImport: this.form.fileImport
    };  

    for (const act of this.data.item.cursus.activiteTypes) {
      const newAct = {
        id: 0,
        libelle: act.libelle,
        competenceProfessionnelles: [],
        experienceProfessionnelles: [] 
      };

      for (const comp of act.competenceProfessionnelles) {
  const newComp = {
    id: comp.id,
    libelle: comp.libelle
  };

  newAct.competenceProfessionnelles.push(newComp);

  if (
    comp.tacheRealisee !== undefined ||
    comp.moyenUtilise !== undefined ||
    comp.collaborateur !== undefined ||
    comp.contexte !== undefined ||
    comp.information !== undefined
  ) {
    const newExpPro = {
      tacheRealisee: comp.tacheRealisee,
      moyenUtilise: comp.moyenUtilise,
      collaborateur: comp.collaborateur,
      contexte: comp.contexte,
      information: comp.information,
      competenceProfessionnelleId: comp.id
    };

    newAct.experienceProfessionnelles.push(newExpPro);
    dpDto.experienceProfessionnelleDtos.push(newExpPro);
  }
}

      dpDto.cursusDto.activiteTypes.push(newAct);
      
    }

        for (let i = 0; i < this.annexes.length; i++) {
  const annexe = this.annexes[i];
  const newAnnexe = {
    libelleAnnexe: annexe.libelleAnnexe,
    pieceJointe: annexe.pieceJointe.name
  };

           dpDto.annexeDtos.push(newAnnexe);
        console.log(this.annexes);
    
  }

  for (const facultatif of this.form.facultatifDto) {
      const newFacultatif = {
        intitule: facultatif.intitule,
        organisme: facultatif.organisme,
        date: facultatif.date,
      };

      dpDto.facultatifDto.push(newFacultatif);
    }

  dossierProfessionnelApi
  .saveDossierProfessionnel(
    this.$store.getters.getUtilisateur.etudiantDto.id,
    dpDto,
    this.newAnnexe.pieceJointe
  )
  .then(data => {
    this.form = data;
    console.log(data);
    this.$bvModal.show("modal-createDossier-success");
  })
  } catch (error) {
    console.error("Error:", error);
  }
},

    addAnnexe() {
      const annexe = {
    id: 0,
    libelleAnnexe: this.newAnnexe.libelleAnnexe,
    pieceJointe: this.newAnnexe.pieceJointe,
    dossierProfessionnelId: this.form
  };

  this.annexes.push(annexe);
  console.log(this.annexes);

  this.newAnnexe.libelleAnnexe = '';
  this.newAnnexe.pieceJointe = null;
},

 
  deleteAnnexe(index) {
    this.annexes.splice(index, 1);
  }, 
  deleteFacultatif(index)
  {
    this.form.facultatifDto.splice(index, 1);
  },
  getValue2(value) {
    this.selectedActiviteTypes = value;
    this.compInModal = value;
    this.showModal = true;
    this.tempCompetence = value;
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
    
async addExp(event) {
  event.preventDefault();

  const fields = ['tacheRealisee', 'moyenUtilise', 'collaborateur', 'contexte', 'information'];
  let isValid = true; 

  for (const field of fields) {
    const fieldValue = this.expPro[field];

    //chercher les balise <img>
    if (fieldValue && fieldValue.includes('<img')) {
      const imgTags = fieldValue.match(/<img[^>]*>/g);

      //verification de la taille
      if (imgTags) {
        for (const imgTag of imgTags) {
          const srcMatch = imgTag.match(/src=["'](.*?)["']/);
          if (srcMatch && srcMatch[1]) {
            const imageUrl = srcMatch[1];
            const imageSize = await this.getImageSize(imageUrl);
            const maxSizeInBytes = 200 * 1024;

            if (imageSize > maxSizeInBytes) {
              this.$bvToast.toast(`Les images ou captures d'écrans ne doivent pas dépasser 200 ko par image.`, {
                title: 'Erreur',
                variant: 'danger',
                solid: true,
              });
              isValid = false; 
            }
          }
        }
      }
    }
  }
  if (isValid) {
    this.$bvModal.hide("exp-pro-modal");
  }
},

async getImageSize(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const sizeInBytes = blob.size;
    return sizeInBytes;
  } catch (error) {
    console.error('Erreur lors de la récupération de la taille de l\'image:', error);
    return null;
  }
},

close(){
      this.expPro = {}; 
      this.$bvModal.hide("exp-pro-modal");

},

  openDatePicker() {
      this.datePickerOpen = true;
    },

setup(){
      const color = 'red';
      const height = '18';
      const width = '18';
      return {color,width,height}
    },

    clear() {
      this.displayedItems.forEach((facultatif) => {
      facultatif.intitule = '';
      facultatif.organisme = '';
      facultatif.date = null; 
    });
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
    },
    checkbox: {
      checked(val) {
        return val
      },
    }

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

  },

  computed: {
    totalPages() {
    return Math.ceil(this.form.facultatifDto.length / this.itemsPerPage);
  },
  displayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.form.facultatifDto.slice(startIndex, endIndex);
  },
   
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
#div-save2 {
  justify-content: flex-start;
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
.competence-saisie {
  color: green; 
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  /*styles spécifiques pour les écrans de 600px de large ou moins */
  .container {
    margin: 50px;
  }

  @media only screen and (min-width: 601px) and (max-width: 1024px) {
  /*styles spécifiques pour les écrans entre 601 et 1024px de large */
  .container {
    margin: 40px;
  }
}

@media only screen and (min-width: 1025px) {
  /* styles spécifiques pour les écrans de 1025px de large ou plus */
  .container {
    margin: 80px;
  }
}
}
</style>
