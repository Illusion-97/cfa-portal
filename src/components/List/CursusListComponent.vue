<template>
  <div class="container-fluid">
    <div class="header-list">

      <div v-bind:class="{'text-align-left': true, 'mt-5 mb-2': isModal}" id="groupe-input" v-if="!isAction">
        <label class="col-1" v-if="!isModal">Cursus</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="cursus_input"
          disabled="disabled"
        />
      </div>
      
      <form v-bind:class="{'form form-inline': true, 'mt-5 mb-2': isModal}" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          placeholder="Rechercher"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <button class="btn btn-primary" v-on:click="createCursus()">
              Ajouter un cursus
            </button>

    </div>


    <table class="table table-striped table-hover text-center">
      <thead v-bind:class="{'thead-dark': isModal}">
        <tr>
          <th>Nom du cursus</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="cursusComputed">
        <tr
          v-for="cursus in cursusComputed"
          :key="cursus.id"
          class="mon-tr"
          v-on:click="clickList(cursus)"
          @dblclick="dblClick(cursus)">
        
          <td>{{ cursus.titre }}</td>
          <!-- <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_cursus_detail', params: { id: cursus.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-success"
              :to="{ name: 'admin_cursus_update', params: { id: cursus.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteCursus(cursus.id)">
              Delete
            </button>
          </td> -->
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
      :container-class="'pagination float-right'"
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
    isModal: {
      type: Boolean,
      default: false,
    }
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
    dblClick(cursus){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_cursus_detail', params: { id: cursus.id }}); 
      // else if(route[0]== 'referent')  this.$router.push({name:'referent_cursus_detail', params: { id: cursus.id }});
      // else if(route[0]== 'formateur') this.$router.push({name:'formateur_cursus_detail', params: { id: cursus.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_cursus_detail', params: { id: cursus.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_cursus_detail', params: { id: cursus.id }});
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>

