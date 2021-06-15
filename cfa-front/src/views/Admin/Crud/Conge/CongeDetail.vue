<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_conge_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Detail</span>
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Date de début :</span>
          <span class="col-md-4">{{ conge.dateDebut }}</span>
          <span class="font-weight-bold col-md-2">Date de fin : </span>
          <span class="col-md-4">{{ conge.dateFin }}</span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Motif :</span>
          <span class="col-md-4">{{ conge.motif }}</span>
          <span class="font-weight-bold col-md-2">Type : </span>
          <span class="col-md-4">{{ conge.type }}</span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Utilisateur :</span>
          <span class="col-md-4">{{ conge.utilisateurDto.prenom }} {{ conge.utilisateurDto.nom }}</span>
          <span class="font-weight-bold col-md-2">Status : </span>
          <span class="col-md-4">{{ conge.status }}</span>
        </b-card-text>
    </b-card>

  </div>
</template>

<script>
import { congeApi } from "@/_api/conge.api.js";
export default {
  name: "CongeDetail",
  components: {
  },
  data() {
    return {
      congeId: this.$route.params.id,
      conge: {},
      loading: false,
    };
  },
  created() {
    congeApi.getById(this.$route.params.id).then(response => this.conge = response);
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
