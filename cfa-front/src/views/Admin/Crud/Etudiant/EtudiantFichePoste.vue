<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />
     
    <b-form class="form mb-5" @submit="submit">
    
     <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-1">Intitulé du poste</label>
        <div class="col-3">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>

        <!-- Cursus -->
        <label class=" col-1">Nature du poste</label>
        <div class="col-3">
          <b-form-input v-model="form.prenom" required></b-form-input>
        </div>
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-1">Nom</label>
        <div class="col-3">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>

        <!-- Cursus -->
        <label class=" col-1">Prénom</label>
        <div class="col-3">
          <b-form-input v-model="form.prenom" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <label class="col-2">Status, corps, Categorie, grade</label>
        <div class="col-10">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <label class="col-2">Mission Principale du service</label>
        <div class="col-10">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Composition du service </label>
        <div class="col-10">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Positionnement de l'agent dans le service </label>
        <div class="col-10">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>
      </b-form-row>
      
      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Mission principale, Raison d'être ou finalité du poste</label>
        <div class="col-10">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>
      </b-form-row>

      <br>
      
      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    </div>
    
</template>

<script>
import {utilisateurApi} from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "AddUser",
  components: {
    BodyTitle,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Création fiche poste",

      form: {
        id: null,
        prenom: "",
        nom: "",
        login: "",
        password: "",
        rolesDto: [],
        adresseDto: {},
        entrepriseDto: {},
      },

      adresse: null,
      entreprise: null,
      isModalVisible: false,
    };
  },
  computed: {
    rolesComputed() {
      return this.form.rolesDto;
    },
    adresse_input(){
      return this.adresse;
    },
    entreprise_input(){
      return this.entreprise;
    },
  },
  methods: {
    onClickChildAdresseList(adresse) {
      this.form.adresseDto = adresse;
    },
    onClickChildEntrepriseList(entreprise) {
      this.form.entrepriseDto = entreprise;
    },
    submit(e) {
      e.preventDefault();

      utilisateurApi
      .save(this.form)
      .then(() => this.$router.push({ name: 'admin_dashboard'}));
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    onClickClose(roles){
      this.form.rolesDto = roles;
    }
  },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      console.log(this.$route.params.id);
      utilisateurApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'un utilisateur";
        this.btn_form_text = "Modifier";
        this.adresse = response.adresseDto;
        this.entreprise = response.entrepriseDto;
        this.role = response.rolesDto;
        });
    }
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

.mon-btn{
  width: 80%;
}
</style>