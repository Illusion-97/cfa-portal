<template>
  <div id="adminDashboard" class="container-fluid">

    <!-- BARRE DE RECHERCHE -->
    <div class="d-flex flex-row align-items-start">
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
    <v-card-body>
      <v-simple-table
        :items="paginatedData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
      >
        <thead style="background-color: #08092D;">
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
          <td style="color: white">
            <strong>action</strong> 
          </td>
        </tr>        
        </thead>
        <tbody>
          <tr  v-for="etudiant in etudiants" :key="etudiant.id">
          <td>{{etudiant.utilisateurDto.nom}}</td>
          <td>{{etudiant.utilisateurDto.prenom}}</td>
          <td>{{etudiant.utilisateurDto.login}}</td>
          <td>{{etudiant.utilisateurDto.téléphone}}</td>
          <td><button>consulter</button></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-body>

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
    >
    </paginate>
  </div>
</template>

<script>
import { tuteurApi } from "@/_api/tuteur.api.js";
import { etudiantFields } from "@/assets/js/fieldsTuteur.js";
export default {
  data() {
    return {
      perPage: 1,
      pageCount: 0,
      saisie: "",
      etudiants: [],
      etudiantFields,
    };
  },

  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
  },

  created() {
    this.refreshList();
    // console.log(this.$store.getters.getUtilisateur.tuteurDto.id);
  },

  methods: {
    submit(e) {
      e.preventDefault();
      this.refreshList();
    },

    pageChange(pageNum) {
      tuteurApi
        .getByRoleByPage(
          this.selected_role,
          pageNum - 1,
          this.perPage,
          this.saisie
        )
        .then((response) => this.assigneTableItems(response));
    },

    refreshList() {
      tuteurApi.getEtudiantByTuteurByPage(0, this.perPage).then((response) => {
        this.etudiants = response;
      });

      tuteurApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
<style scoped lang="css">
</style>