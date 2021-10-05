<template>
  <div class="container-fluid">
    <div class="header-list">

      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Cursus</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="cursus_input"
          disabled="disabled"
        />
      </div>
      
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn btn-outline-secondary" type="submit">
          Recherche
        </button>
      </form>

      <button class="btn btn-primary" v-on:click="createCursus()">
              Ajouter un cursus
            </button>
    </div>


    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Id</th>
          <th>Titre</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="cursusComputed">
        <tr
          v-for="cursus in cursusComputed"
          :key="cursus.id"
          v-on:click="clickList(cursus)"
        >
          <td>{{ cursus.id }}</td>
          <td>{{ cursus.titre }}</td>
          <td v-if="isAction">
            <button class="btn btn-info" v-on:click="detailCursus(cursus.id)">
              Details
            </button>
            &nbsp;
            <button class="btn btn-success" v-on:click="updateCursus(cursus.id)">
              Update
            </button>
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteCursus(cursus.id)">
              Delete
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
import { cursusApi } from "@/_api/cursus.api.js";
export default {
  name: "CursusListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    cursusProp: {
      default: null,
    },
  },
  watch: {
    cursusProp() {
      if (this.cursusProp != null)
        this.cursus_input = `${this.cursusProp.titre}`;
    },
  },
  data() {
    return {
      cursus: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      cursus_input: "",
    };
  },
  computed: {
    cursusComputed() {
      return this.cursus;
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
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      cursusApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.cursus = response));
    },
    refreshList() {
      cursusApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.cursus = response));
      cursusApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    detailCursus(id){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_cursus_detail",
        params: { id: id }
      });
      }
      else {
        this.$router.push({
        name: "cef_cursus_detail",
        params: { id: id }
        
      });
      }
    },
    updateCursus(id){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_cursus_update",
        params: {id :id}
      });
      }
      else {
        this.$router.push({
        name: "cef_cursus_update",
        params: { id: id }
        
      });
      }
    },
    createCursus(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_addCursus",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "cef_addCursus",
        
      });
      }
    },
    deleteCursus(cursusId) {
       var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
      cursusApi.deleteCursus(cursusId).then(() => this.refreshList());
      }
    },
    clickList(cursus) {
      this.cursus_input = cursus.titre;
      this.$emit("click-list", cursus);
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
