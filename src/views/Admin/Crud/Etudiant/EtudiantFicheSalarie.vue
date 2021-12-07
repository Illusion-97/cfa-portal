<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />

     <br>

    <b-form class="form mb-5" @submit="submit">
    
     <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-1">Nom</label>
        <div class="col-3">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>
         <!-- Prenom -->
        <label class=" col-1">Prénom</label>
        <div class="col-3">
          <b-form-input v-model="form.prenom" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Civilité -->
        <label class="col-1">Civilité</label>
        <div class="col-3">
            <input name="sexe" type="radio"/> Mr 
            <input name= "sexe" type="radio"/> Mme
        </div>

        <!-- Nom de naissance -->
        <label class=" col-1">Nom de naissance</label>
        <div class="col-3">
          <b-form-input v-model="form.naissance" required></b-form-input>
        </div>
      </b-form-row>

      <b-form-row class="text-align-left">
        <label class="col-1">Adresse</label>
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Numero -->
        <label class="col-1">Numero</label>
        <div class="col-1">
          <b-form-input v-model="form.numero" required></b-form-input>
        </div>
         <!-- Rue -->
        <label class=" col-1">Rue</label>
        <div class="col-2">
          <b-form-input v-model="form.rue" required></b-form-input>
        </div>
         <!-- Ville -->
        <label class=" col-1">Ville</label>
        <div class="col-2">
          <b-form-input v-model="form.ville" required></b-form-input>
        </div>
         <!-- Code Postal -->
        <label class=" col-1">Code Postal</label>
        <div class="col-2">
          <b-form-input v-model="form.codePostal" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Pays -->
        <label class="col-1">Pays</label>
        <div class="col-3">
          <b-form-input v-model="form.pays" required></b-form-input>
        </div>

        <!-- Nationalité -->
        <label class=" col-1">Nationalité</label>
        <div class="col-3">
          <b-form-input v-model="form.nationalite" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Date de naissance -->
        <label class="col-1">Née le </label>
        <div class="col-3">
          <b-form-input v-model="form.dateNaissance" required></b-form-input>
        </div>

        <!-- Ville de naissance -->
        <label class=" col-1">Ville de naissance</label>
        <div class="col-3">
          <b-form-input v-model="form.villeNaissance" required></b-form-input>
        </div>
        <!-- Dépt -->
        <label class=" col-1">Dépt</label>
        <div class="col-1">
          <b-form-input v-model="form.departement" required></b-form-input>
        </div>
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Email -->
        <label class=" col-1">Email</label>
        <div class="col-3">
          <b-form-input v-model="form.email" required></b-form-input>
        </div>
        <!-- Téléphone -->
        <label class=" col-1">Téléphone</label>
        <div class="col-3">
          <b-form-input v-model="form.telephone" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Date entrée  -->
        <label class="col-1">Date entrée </label>
        <div class="col-3">
          <b-form-input v-model="form.dateEntre" required></b-form-input>
        </div>

        <!-- Date anciennetée -->
        <label class=" col-1">Date anciennetée</label>
        <div class="col-3">
          <b-form-input v-model="form.dateAnciennete" required></b-form-input>
        </div>

      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- IBAN -->
        <label class="col-1">IBAN </label>
        <div class="col-3">
          <b-form-input v-model="form.iban" required></b-form-input>
        </div>

        <!-- BIC -->
        <label class=" col-1">BIC</label>
        <div class="col-3">
          <b-form-input v-model="form.bic" required></b-form-input>
        </div>

      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Precedante prefession -->
        <label class="col-1">Précédente profession </label>
        <div class="col-3">
          <b-form-input v-model="form.lastProfession" required></b-form-input>
        </div>

        <!-- Type de contrat -->
        <label class=" col-1">Type de contrat</label>
        <div class="col-3">
          <b-form-input v-model="form.typeContrat" required></b-form-input>
        </div>

      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Date de début -->
        <label class="col-1">Date de début </label>
        <div class="col-3">
          <b-form-input v-model="form.dateDebutLast" required></b-form-input>
        </div>

        <!-- Date de fin -->
        <label class=" col-1">Date de fin</label>
        <div class="col-3">
          <b-form-input v-model="form.dateFinLast" required></b-form-input>
        </div>

      </b-form-row>

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
  name: "FicheSalarieCreate",
  components: {
    BodyTitle,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Création fiche salarié",

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
      // console.log(this.$route.params.id);
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