<template>
  <div id="cursusList">
   
    <BodyTitle title="Liste des cursus" />

    
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

      <router-link class="btn btn-primary" :to="{ name: 'admin_addCursus' }"
        >Ajouter un cursus</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Titre</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="cursusComputed">
        <tr v-for="cursus in cursusComputed" :key="cursus.id">
          <td>{{ cursus.id }}</td>
          <td>{{ cursus.titre }} </td>
          <td>
            <router-link class="btn btn-info" :to="{name:'admin_cursus_detail', params: { id: cursus.id }}">Details</router-link>
            &nbsp;
            <router-link class="btn btn-success" :to="{name:'admin_cursus_update', params: { id: cursus.id }}">Modifier</router-link>
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteCursus(cursus.id)">
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
import { cursusApi } from "@/_api/cursus.api.js";
export default {
  name: "CursusList",
  components: {
    BodyTitle,
  },
  data() {
    return {
      cursus: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",
    
    };
  },
  computed: {
    cursusComputed() {
      return this.cursus;
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
      cursusApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.cursus = response));
      cursusApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      cursusApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.cursus = response));
    },
    refreshList() {
      cursusApi
        .getAllCursus(0, this.perPage)
        .then((response) => (this.cursus = response));
      cursusApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteCursus(cursusId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
      cursusApi.deleteCursus(cursusId).then(() => this.refreshList());
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

