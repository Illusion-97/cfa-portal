<template>
  <div id="adminDashboard" class="container-fluid">

    <!-- BARRE DE RECHERCHE -->
    <div class="d-flex flex-row align-items-start" v-if="etudiants">
      <h2 class="p-2">Liste des étudiants</h2>
      <form class="form-inline p-2" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          placeholder="Rechercher"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
    </div>

    <!-- TABLEAU -->
      <v-simple-table v-if="etudiants">
        <thead style="background-color: #08092d" >
          <tr>
            <td style="color: white">
              <strong>nom</strong>
            </td>
            <td style="color: white">
              <strong>prenom</strong>
            </td>
            <td style="color: white">
              <strong>mail</strong>
            </td>
            <td style="color: white">
              <strong>téléphone</strong>
            </td>
            <td style="color: white" class="text-center">
              <strong>action</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="etudiant in etudiants" :key="etudiant.id">
            <td>{{ etudiant.utilisateurDto.nom }}</td>
            <td>{{ etudiant.utilisateurDto.prenom }}</td>
            <td>{{ etudiant.utilisateurDto.login }}</td>
            <td>{{ etudiant.utilisateurDto.telephone }}</td>
            <td>
              <!-- <router-link :to="{
                name: 'detail_etudiant',
                query: { data: etudiant.id },
              }"> -->
              <b-button block variant="info" @click="goToEtudiant(etudiant.id)">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'eye']" /> voir
              </b-button>
              <!-- </router-link> -->
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <h2 class="p-2" v-else>Pas d'etudiant assignée.</h2>

    <!-- PAGINATION -->
    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination float-right'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
      v-if="etudiants"
    >
    </paginate>
  </div>
</template>

<script>
import { tuteurApi } from "@/_api/tuteur.api.js";

export default {
  data() {
    return {
      perPage: 8,
      pageCount: 0,
      saisie: "",
      etudiants: [],
      tuteurId: this.$store.getters.getUtilisateur.tuteurDto.id,
    };
  },

  created() {
    this.refreshList(); 
  },

  methods: {
    submit(e) {
      e.preventDefault();
      this.refreshList();
      this.saisie ="";
    },

    goToEtudiant(item) {
      this.$router.push({
        name: "detail_etudiant",
        params: { id: item },
      });
    },

    pageChange(pageNum) {
      tuteurApi
      .getEtudiantByTuteurByPage(this.tuteurId, pageNum -1, this.perPage)
      .then((response) => { 
        this.etudiants = response
      });
    },

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
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
