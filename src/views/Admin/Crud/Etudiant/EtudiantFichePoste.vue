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
        <!-- intitule -->
        <label class="col-1">Intitulé du poste</label>
        <div class="col-3">
          <b-form-input v-model="form.intitule" required></b-form-input>
        </div>

        <!-- nature -->
        <label class=" col-1">Nature du poste</label>
        <div class="col-3">
          <b-form-input v-model="form.nature" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <label class="col-2">Mission Principale du service</label>
        <div class="col-10">
          <b-form-input v-model="form.mission" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Composition du service </label>
        <div class="col-10">
          <b-form-input v-model="form.compositionService" required></b-form-input>
        </div>
      </b-form-row>

      <br>

      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Positionnement de l'agent dans le service </label>
        <div class="col-10">
          <b-form-input v-model="form.positionnement" required></b-form-input>
        </div>
      </b-form-row>
      
      <br>

      <b-form-row class="text-align-left">
        <label class="col-2">Mission principale, Raison d'être ou finalité du poste</label>
        <div class="col-10">
          <b-form-input v-model="form.missionPrincipale" required></b-form-input>
        </div>
      </b-form-row>

      <br>
      
      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    </div>
    
</template>

<script>
import {fichePosteApi} from "@/_api/fichePoste.api.js";
import {etudiantApi} from "@/_api/etudiant.api.js";
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
        intitule: "",
        nature: "",
        mission: "",
        compositionService: "",
        positionnement: "",
        etudiantDto: "",
        missionPrincipale: "",
      },

    };
  },
  created(){
    if (this.$route.name == "admin_etudiant_fiche_poste" || this.$route.name == "admin_etudiant_fiche_poste") {
    etudiantApi.getById(this.utilisateur.id).then((response) => {
        this.form.etudiantDto = response;

    });
    }
    else {
      fichePosteApi.getByIdEtudiant(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Modification de la fiche poste";
        this.btn_form_text = "Modifier";
      });
      }
  },
  computed: {
    utilisateur(){

      return this.$store.getters.getUtilisateur;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      fichePosteApi
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