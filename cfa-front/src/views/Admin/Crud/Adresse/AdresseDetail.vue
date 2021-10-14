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
            <span v-on:click="updateAdresse()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteAdresse()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <b-card-text class="identity row ml-6">
        <span class="font-weight-bold col-md-2">Id :</span>
        <span class="col-md-4">{{ adresse.id }}</span>
        <span class="font-weight-bold col-md-2">Numero : </span>
        <span class="col-md-4">{{ adresse.numero }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-6">
        <span class="font-weight-bold col-md-2">Rue :</span>
        <span class="col-md-4">{{ adresse.rue }}</span>
        <span class="font-weight-bold col-md-2">Ville : </span>
        <span class="col-md-4">{{ adresse.ville }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-6">
        <span class="font-weight-bold col-md-2">Code postal :</span>
        <span class="col-md-10">{{ adresse.codePostal }} </span>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { adresseApi } from "@/_api/adresse.api.js";
export default {
  name: "AdresseDetail",
  components: {},
  data() {
    return {
      adresseId: this.$route.params.id,
      adresse: {},
      loading: false,
    };
  },
  created() {
    adresseApi
      .getById(this.$route.params.id)
      .then((response) => (this.adresse = response));
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateAdresse() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_adresse_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_adresse_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_adresse_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_adresse_update",
        });
      }
    },
    deleteAdresse() {
      adresseApi.deleteAdresse(this.$route.params.id).then(() => this.goBack());
    },
  },
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
