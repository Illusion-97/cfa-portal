<template>
 
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>
     <BodyTitle :title=vue_title />
     
    <b-form class="form mb-5" @submit="submit">
    
     <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-1">Nom de l'entreprise</label>
        <div class="col-3">
          <select
              class="custom-select"
              v-model="form.entrepriseDto"
            >
              <option
                v-for="e in entreprisesComputed"
                :key="e.id"
                :value="e"
                >{{ e.raisonSociale }}</option
              >
            </select>
          <!--<b-form-input v-model="form.nom" required></b-form-input>-->
        </div>

        <!-- 
        <label class=" col-1">Logo</label>
        <div class="col-3">
          <div class="file-field">
            <div class="d-flex justify-content-center">
              <div class="btn btn-mdb-color btn-rounded float-left">
                <input type="file">
              </div>
            </div>
          </div>
        </div>-->
      </b-form-row> 

<!-- 
      <b-form-row class="text-align-left">
        <label class="col-1">Adresse</label>
        <div class="col-10">
          <AdresseListComponent
        v-on:click-list="onClickChildAdresseList"
        :adresseProp="adresse_input"
      />
        </div>
      </b-form-row> -->

      <br>

      <b-form-row class="text-align-left">
        <label class="col-2">Historique succinct</label>
        <div class="col-10">
          <b-form-input v-model="form.historique" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <label class="col-2">Nom du (ou de la) dirigeant(e)actuel(e)</label>
        <div class="col-10">
          <b-form-input v-model="form.nomDirigeant" required></b-form-input>
        </div>
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Secteur d'activité </label>
        <div class="col-3">
          <b-form-input v-model="form.secteurActivite" required></b-form-input>
        </div>
        <label class="col-2">Type d'organisation</label>
        <div class="col-3">
          <b-form-input v-model="form.organisationType" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Combien de salariés</label>
        <div class="col-3">
          <b-form-input v-model="form.nbSalarie" required></b-form-input>
        </div>
        <!-- Nom -->
        <label class="col-2">Chiffre d'affaire annuel</label>
        <div class="col-3">
          <b-form-input v-model="form.chiffreAffaireAnnuel" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Description de son activité</label>
        <div class="col-10">
          <b-form-input v-model="form.activiteDescription" required></b-form-input>
        </div>
      </b-form-row>

        <br>

       <b-form-row class="text-align-left">
        <label class="col-2">Type d'usagers / clients auxqels elle rend service</label>
        <div class="col-10">
          <b-form-input v-model="form.clientType" required></b-form-input>
        </div>
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Profils de formations</label>
        <div class="col-10">
          <b-form-input v-model="form.formationProfil" required></b-form-input>
        </div>
      </b-form-row>

      <br>
      
       <b-form-row class="text-align-left">
        <label class="col-2">Métiers exercés par ses salariés</label>
        <div class="col-10">
          <b-form-input v-model="form.metiersExerces" required></b-form-input>
        </div>
      </b-form-row>


      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    

    </div>
    
</template>

<script>
import {ficheEntrepriseApi} from "@/_api/ficheEntreprise.api.js";
import { entrepriseApi } from "@/_api/entreprise.api.js";
import {etudiantApi} from "@/_api/etudiant.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
// import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
export default {
  name: "AddUser",
  components: {
    BodyTitle,
    // AdresseListComponent,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Création fiche entreprise",
      entreprises: null,
      selected: null,
      

      form: {
        entrepriseDto: null,
        historique: "",
        nomDirigeant: "",
        secteurActivite: "",
        organisationType: "",
        nbSalarie: "",
        chiffreAffaireAnnuel: "",
        activiteDescription: "",
        clientType: "",
        formationProfil: "",
        metiersExerces: "",
      },
      adresse: null,

    };
  },
  created(){
    if(this.$route.name == "admin_etudiant_fiche_entrepris" || this.$route.name == "admin_etudiant_fiche_poste"){
        etudiantApi.getById(this.utilisateur.id).then((response) => {
        this.form.etudiantDto = response;
    });
    }
    else {
      ficheEntrepriseApi.getByIdEtudiant(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Modification de la fiche entreprise";
        this.btn_form_text = "Modifier";
      });
    }
    

    entrepriseApi.getAll().then((response) => (this.entreprises = response));
  },
  computed: {
    entreprisesComputed() {
      return this.entreprises;
    },
    utilisateur(){

      return this.$store.getters.getUtilisateur;
    },
    adresse_input(){
      return this.adresse;
    },
  },
  methods: {
    onClickChildAdresseList(adresse) {
      this.form.adresseSiegeDto = adresse;
    },
    submit(e) {
      e.preventDefault();

      ficheEntrepriseApi
      .save(this.form)
      .then(() => this.goBack());

    },
    goBack() {
      this.$router.go(-1);
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

.mon-btn{
  width: 80%;
}
</style>