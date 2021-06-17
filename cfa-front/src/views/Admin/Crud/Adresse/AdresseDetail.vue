<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_adresse_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Details</span>
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
  components: {
  },
  data() {
    return {
      adresseId: this.$route.params.id,
      adresse: {},
      loading: false,
    };
  },
  created() {
    adresseApi.getById(this.$route.params.id).then(response => this.adresse = response);
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
