<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />
      

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Nom du centre de formation</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.nom"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <EntrepriseListComponent
        v-on:click-list="onClickChildEntrepriseList"
        :entrepriseProp="entreprise_input"
      />

      <AdresseListComponent
        v-on:click-list="onClickChildAdresseList"
        :adresseProp="adresse_input"
      />
    
      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">{{btn_form_text}}</button>
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
import {centreFormationApi} from "@/_api/centreFormation.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
export default {
  name: "AddEntreprise",
  components: {
    BodyTitle,
    AdresseListComponent,
    EntrepriseListComponent,
  },
  data() {
    return {
      vue_title: "Création d'un centre de formation",
      btn_form_text: "Ajouter",

      form: {
        id: null,
        nom: "",
        entrepriseDto: {},
        adresseDto: {},
      },
      adresse: null,
      entreprise: null,
    };
  },
  computed: {
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
    goBack() {
      this.$router.go(-1);
    },
    submit(e) {
      e.preventDefault();

      centreFormationApi
      .save(this.form)
      .then(() => this.goBack());
    },
  },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      // console.log(this.$route.params.id);
      centreFormationApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'un centre de formation";
        this.btn_form_text = "Modifier";
        this.adresse = response.adresseDto;
        this.entreprise = response.entrepriseDto;
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