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
          <span class="">Detail</span>
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateConge()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteConge()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
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
      conge: {utilisateurDto: {}},
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
   updateConge() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_conge_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_conge_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_conge_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_conge_update",
        });
      }
    },
    deleteConge() {
      congeApi.deleteConge(this.$route.params.id).then(() => this.goBack());
    },
  },
  created() {
    congeApi.getById(this.$route.params.id).then(response => this.conge = response);
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css">
</style>
