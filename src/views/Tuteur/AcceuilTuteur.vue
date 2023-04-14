<template>
  <div class="container-fluid">

    <!-- BARRE DE RECHERCHE -->
    <div class="d-flex flex-row align-items-start" v-if="etudiants">
      <h2 class="p-2">Liste des étudiants</h2>
      <form class="form-inline p-2" @submit="submit">
        <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
    </div>

    <!-- test -->
    <v-data-table :headers="etudiantFields" :items="etudiants" :page.sync="page" :items-per-page="perPage"
      class="elevation-1" hide-default-footer >
    </v-data-table>

  
    <!-- PAGINATION -->
    <v-pagination v-model="page" @next="pageChange(page)" @previous="pageChange(page)" @input="pageChange(page)"
      :length="pageCount" color="#E91E63" circle v-if="etudiants"></v-pagination>

  </div>
</template>

<script>
import { tuteurApi } from "@/_api/tuteur.api.js";
import etudiantFields from "@/assets/js/fieldsTuteur.js";

export default {
  data() {
    return {
      perPage: 8,
      pageCount: 0,
      saisie: "",
      etudiants: [],
      etudiantFields,
      page: 1,
      tuteurId: this.$store.getters.getUtilisateur.tuteurDto.id,
    };
  },

  created() {
    this.refreshList();
  },

  methods: {
    refreshList() {
      tuteurApi
        .getEtudiantByTuteurByPage(this.tuteurId, 0, this.perPage, this.saisie)
        .then((response) => {
          this.etudiants = response
        });

      tuteurApi.getAllEtudiantsByTuteurIdBySearch(this.tuteurId, this.saisie).then((response) => {
        this.pageCount = Math.ceil(response / this.perPage)
      })
    },

    submit(e) {
      e.preventDefault();
      this.refreshList();
      this.saisie = "";
      this.page = 1;
    },

    goToEtudiant(item) {
      this.$router.push({
        name: "detail_etudiant",
        params: { id: item },
      });
    },

    pageChange(pageNum) {
      tuteurApi
        .getEtudiantByTuteurByPage(this.tuteurId, pageNum - 1, this.perPage)
        .then((response) => {
          this.etudiants = response
        });
    },
  },
};
</script>

<style scoped/>
