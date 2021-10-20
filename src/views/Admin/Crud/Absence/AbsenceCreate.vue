<template>
  <div :class="{my_margin: isFormateur}">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label>Etudiant</label>
          <div class="mon-input">
            <b-form-input
              type="text"
              v-model="etudiant_input"
              disabled="disabled"
            >
            </b-form-input>
          </div>
          <a
          class="btn btn-primary col-1 ml-5"
          @click="showUtilisateurModal()"
          >Choisir</a
        >
        </b-form-row>
      </b-form-group>

     <b-form-group>
        <b-form-row class="text-align-left">
          <label >Date de début</label>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
              required
            ></b-form-datepicker>
          </div>
            </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label >Date de fin</label>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label>Motif</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.justificatif">
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    <UtilisateurModal
      v-show="isUtilisateurModalVisible"
      @close="closeUtilisateurModal"
      v-on:close="onClickUtilisateurClose"
      :roleProp="UtilisateurModal_role"
      :utilisateursProp="UtilisateurModale_utilisateur"
    />

  </div>  
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import UtilisateurModal from "@/components/Modal/UtilisateurModal.vue";
import { absencesApi } from "@/_api/absence.api.js";
import { etudiantApi } from "@/_api/etudiant.api.js";

export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
    UtilisateurModal,
  },
  data() {
    return {
      vue_title: "Création d'une nouvelle absence",
      btn_form_text: "Ajouter",

      form: {
        dateDebut: "",
        dateFin: "",
        justificatif: "",
        etudiantDto: "",
      },

      etudiant_input: "",

      onglet: 0,

      //UtilisateurModal
      isUtilisateurModalVisible: false,
      UtilisateurModal_role: null,
      UtilisateurModale_utilisateur: null,
    };
  },
  computed: {
  },
  created() {
     
    if (this.isCreated() && 
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0) {
      etudiantApi.getById(this.$route.params.id).then((response) => {
        this.form.etudiantDto = response;
        this.etudiant_input = `${this.form.etudiantDto.prenom} ${this.form.etudiantDto.nom}`;
      });
    } else if( 
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0){
      absencesApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un absence";
        this.btn_form_text = "Update";
        this.etudiant_input = `${this.form.etudiantDto.prenom} ${this.form.etudiantDto.nom}`;
      });
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      absencesApi.save(this.form).then(() => this.goBack());
    },
    goBack() {
      this.$router.go(-1);
    },
    //Utilisateur Modal
    showUtilisateurModal() {
      this.UtilisateurModal_role = "ETUDIANT";         
      this.isUtilisateurModalVisible = true;
    },
    closeUtilisateurModal() {
      this.isUtilisateurModalVisible = false;
    },
    onClickUtilisateurClose(utilisateur) {
      this.form.etudiantDto = utilisateur;
      this.etudiant_input = `${utilisateur.prenom} ${utilisateur.nom}`;
    },
    //Pour created
    isCreated(){
      let tab = this.$route.path.split("/");

      for(let i = 0; i<tab.length; i++)
        if(tab[i] == "create") 
          return true;      

      return false;
    },
    //Pour marge si formateur
    isFormateur(){
      let tab = this.$route.path.split("/");

      for(let i = 0; i<tab.length; i++)
        if(tab[i] == "formateur") 
          return true;      

      return false;
    },
  },
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

#saisie {
  width: 70%;
  margin-right: 5%;
}

.mon-btn {
  width: 80%;
}

#form-group {
  margin-left: 1.8em;
}

label {
  width: 10em;
  padding-left: 0.2em;
}

.mon-input {
  width: 37.2%;
}

.mon-container-tuile {
  margin-bottom: 2em;
  margin-top: 2em;
  margin-left: 1.5em;
}

.ma_tuile {
  width: 8em;
  margin-right: 1em;
}

.ma_tuile:hover {
  background-color: #6c757d;
  color: white;
  cursor: pointer;
}

.activ {
  background-color: #28a745;
}

.my_margin{
  width: 80%;
  margin: auto;
}
</style>
-