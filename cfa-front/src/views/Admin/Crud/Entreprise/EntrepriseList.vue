<template>
  <div id="entrepriseList">
   
    <BodyTitle title="Liste des entreprises" />

    
    <div class="header-list">
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn btn-outline-secondary" type="submit">Recherche</button>
      </form>

      <router-link class="btn btn-primary" :to="{ name: 'admin_addEntreprise' }"
        >Ajouter une entreprise</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Raison Sociale</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="entreprisesComputed">
        <tr v-for="entreprise in entreprisesComputed" :key="entreprise.id">
          <td>{{ entreprise.id }}</td>
          <td>{{ entreprise.raisonSociale }} </td>
          <td>
            <router-link class="btn btn-info" :to="{name:'admin_entreprise_detail', params: { id: entreprise.id }}">Details</router-link>
            &nbsp;
            <router-link class="btn btn-success" :to="{name:'admin_entreprise_update', params: { id: entreprise.id }}">Modifier</router-link>
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteEntreprise(entreprise.id)">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
      >
    </paginate>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { entrepriseApi } from "@/_api/entreprise.api.js";
export default {
  name: "EntrepriseList",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      entreprises: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",
    
    };
  },
  computed: {
    entreprisesComputed() {
      return this.entreprises;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },

  methods: {

    submit(e) {
      e.preventDefault();
      entrepriseApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.entreprises = response));
      entrepriseApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      entrepriseApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.entreprises = response));
    },
    refreshList() {
      entrepriseApi
        .getAllEntreprises(0, this.perPage)
        .then((response) => (this.entreprises = response));
      entrepriseApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteEntreprise(entrepriseId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
      entrepriseApi.deleteEntreprise(entrepriseId).then(() => this.refreshList());
      }
    },

  },
};
</script>
<style scoped>
.header-list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form{
  width: 40%;
}

#saisie{
  width: 70%;
  margin-right: 5%;
}
</style>

