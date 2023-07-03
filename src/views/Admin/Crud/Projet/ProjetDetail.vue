<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </a>

    <b-card no-body id="my-card">
      <b-card-header>
        <span class="font-weight-bold">Projet : {{ projet.nom }}</span>
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateProjet()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteProjet()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <div class="offset-1 col-10 mb-5">
        <div class="">
          <span class="mon-label">Description :</span>
          <p class="">{{ projet.description }}</p>
        </div>        
      </div>

      <div class="offset-1 col-10 mb-5">
        <div class="mb-2">
          <span class="mon-label">Groupe :</span>
          <span class="group-nom"></span>
        </div>
        <table class="table">
          <thead class="">
            <tr>
              <th>Etudiant</th>
              <th>Email</th>
              <th>Promotions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="etudiant in etudiantsComputed" :key="etudiant.id">
              <td>{{ etudiant.utilisateurDto.prenom }} {{ etudiant.utilisateurDto.nom }}</td>
              <td>{{ etudiant.utilisateurDto.login }}</td>
              <td>
                <div
                  v-for="promotion in etudiant.promotionsDto"
                  :key="promotion.id"
                >
                  {{ promotion.nom.split("-").join(" ") }}
                </div>
              </td>
              <td><button class="btn btn-danger">Supprimer</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import { projetApi } from "@/_api/projet.api.js";
import { groupeApi } from "@/_api/groupe.api.js";
import { fileFields } from "@/assets/js/fields.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "ProjetDetail",
  components: {},
  data() {
    return {
      projetId: this.$route.params.id,
      //On initialise nom pour éviter les soucis dans la console
      projet: {},
      loading: false,

      etudiants: [],

      //Pour les files
      files: [],
      fields: fileFields,
      file: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    refreshListEtudiant(id) {
      groupeApi
        .getEtudiants(id)
        .then((response) => (this.etudiants = response));
    },
    updateProjet() {
        this.$router.push({
          name: "admin_projet_update",
        });
    },
    deleteProjet() {
      projetApi.deleteProjet(this.$route.params.id).then(() => this.goBack());
    },


  },
  created() {
    projetApi
      .getById(this.projetId)
      .then((response) => {this.projet = response; this.refreshListEtudiant(response.groupeId);});
  },
  computed: {
    etudiantsComputed() {
      return this.etudiants;
    },

    routeId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
.div-files{
  display: flex;
  justify-content: space-between;
}


</style>
