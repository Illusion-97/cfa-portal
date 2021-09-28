<template>
  <div class="container-fluid">
    <div class="header-list">

      <div v-if="!isAction" class="row mt-3 mb-3">
        <div class="text-align-left col-md-6 d-flex justify-content-between">
          <label class="mr-3">Cursus</label>
          <input
            class="form-control"
            type="text"
            :value="cursus_input"
            disabled="disabled"
          />
        </div>

        <form class="col-md-6 d-flex justify-content-between float-right" @submit="submit">
          <input
            id="saisie"
            name="saisie"
            type="text"
            class="form-control"
            v-model="saisie"
          />
          <button class="btn btn-primary" type="submit">Recherche</button>
        </form>
      </div>

      <div v-if="isAction">
        <form class="row ml-1 mb-2 form-inline form" @submit="submit">
          <input
            id="saisie"
            name="saisie"
            type="text"
            class="form-control col-4"
            v-model="saisie"
          />
          <button class="btn btn-primary" type="submit">Recherche</button>

          <router-link class="btn btn-info offset-5 col-1" :to="{ name: 'admin_addCursus' }"
          >Ajouter</router-link
        >

        </form>

        
      </div>
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
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
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_cursus_detail', params: { id: cursus.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_cursus_update', params: { id: cursus.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteCursus(cursus.id)">
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
    deleteCursus(cursusId) {
      cursusApi.deleteCursus(cursusId).then(() => this.refreshList());
    },
    clickList(cursus) {
      this.cursus_input = cursus.titre;
      this.$emit("click-list", cursus);
    },
  },
};
</script>

<style scoped>  
  .header-list > form{
    width: 40%;
  }
  
  #saisie{
    width: 70%;
    margin-right: 5%;
  }
  
  #groupe-input{
    width: 50%;
  }
  
  .mon-tr:hover {
    background-color: rgb(216, 213, 213) !important;
    cursor: pointer;
  }

  .delete-input:hover{
    cursor: pointer;
  }
</style>
