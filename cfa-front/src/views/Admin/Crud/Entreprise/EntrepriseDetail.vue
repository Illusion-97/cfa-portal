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
        </b-card-header>

        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">Id :</span>
          <span class="col-md-10">{{ entreprise.id }}</span>
          <span class="font-weight-bold col-md-2">Raison Sociale : </span>
          <span class="col-md-10">{{ entreprise.raisonSociale }}</span>
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-10">{{ entreprise.adresseSiegeDto.numero}} {{entreprise.adresseSiegeDto.rue }}, {{entreprise.adresseSiegeDto.codePostal }}, {{entreprise.adresseSiegeDto.ville }}</span>
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
      loading: false,
    };
  },
  created() {
    entrepriseApi.getById(this.$route.params.id).then(response => this.entreprise = response);
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
