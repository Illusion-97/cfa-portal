<template>
  <div class="container-fluid">
    <v-btn style="margin-top: 10px" color="back-color" class="back" @click="goBack()">
      <v-icon>
        mdi-arrow-left
      </v-icon>
      Précédent
    </v-btn>

    <b-card no-body id="my-card">
      <b-card-header>
        <div>
          <span class="mon-label">Groupe : </span>
          <span class="group-nom">{{ groupe.nom }}</span>
        </div>
        <button class="btn btn-warning" v-on:click=updateGroupe>
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'edit']" />
              Modifier 
            </button>
      </b-card-header>

      <div class="offset-1 col-10">
        <p class="mon-label ">Etudiants :</p>
        <table class="table">
          <thead class="">
            <tr>
              <th>Etudiant</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody v-if="etudiantsComputed">
            <tr v-for="etudiant in etudiantsComputed" :key="etudiant.id">
              <td>{{ etudiant.utilisateurDto.fullName }}</td>
              <td>{{ etudiant.utilisateurDto.login }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import {groupeApi} from "@/_api/groupe.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "GroupeDetail",
  components: {},
  data() {
    return {
      groupeId: this.$route.params.id,
      groupe: { nom: "" },
      loading: false,

      etudiants: [{ nom: "", promotionsDto: [{ nom: "" }], utilisateurDto:{fullName:""} }],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateGroupe(){
      this.$router.push({
        name: "admin_groupe_update"})
    },
    refreshList() {
      groupeApi
        .getEtudiants(this.groupeId)
        .then((response) => (this.etudiants = response));
    },
  },
  created() {
    groupeApi
      .getById(this.groupeId)
      .then((response) => (this.groupe = response));

    this.refreshList();
  },
  computed: {
    etudiantsComputed() {
      return this.etudiants;
    },
  },
};
</script>

<style scoped></style>
