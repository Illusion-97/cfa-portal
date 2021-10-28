<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_entreprise_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Details</span>
          <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateEntreprise()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteEntreprise()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
        </b-card-header>

        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">Id :</span>
          <span class="col-md-9">{{ entreprise.id }}</span>
        </b-card-text>
        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-3">Raison Sociale : </span>
          <span class="col-md-9">{{ entreprise.raisonSociale }}</span>
        </b-card-text>
        <b-card-text class="identity row ml-6">  
          <span class="font-weight-bold col-md-2">Siret : </span>
          <span class="col-md-9">{{ entreprise.siret }}</span>
        </b-card-text>
        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">NAF : </span>
          <span class="col-md-9">{{ entreprise.naf }}</span>
        </b-card-text>
        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">Effectif Total : </span>
          <span class="col-md-9">{{ entreprise.effectifTotal }}</span>
        </b-card-text>
        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-3">Type d'employeur : </span>
          <span class="col-md-9">{{ entreprise.employeurType }}</span>
        </b-card-text>
        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-9">{{ adresseSiegeDto.numero}} {{adresseSiegeDto.rue }}, {{adresseSiegeDto.codePostal }}, {{adresseSiegeDto.ville }}</span>
        </b-card-text>

    </b-card>

  </div>
</template>

<script>
import { entrepriseApi } from "@/_api/entreprise.api.js";
export default {
  name: "EntrepriseDetail",
  components: {
  },
  data() {
    return {
      entrepriseId: this.$route.params.id,
      entreprise: {},
      adresseSiegeDto: {},
      loading: false,
    };
  },
  created() {
    entrepriseApi.getById(this.$route.params.id).then(response => {this.entreprise = response; this.adresseSiegeDto = this.entreprise.adresseSiegeDto});
  },
  methods: {
    updateEntreprise() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_entreprise_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_entreprise_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_entreprise_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_entreprise_update",
        });
      }
    },
    deleteEntreprise() {
      entrepriseApi.deleteEntreprise(this.$route.params.id).then(() => this.goBack());
    },
    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>

<style scoped>
#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
}

#my-card > .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 25px;
}

.card-text {
  display: flex;
  justify-content: space-between;
}

.card-text > span {
  display: inline-block;
  width: 40em;
  padding-left: 3em;
}
</style>
