<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Examen</label>
        <input class="col-9 form-control" type="text" :value="examen_input" disabled="disabled"/>
      </div>

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn btn-primary" type="submit">Recherche</button>
      </form>

      <!--<router-link class="btn btn-info" :to="{ name: 'admin_examen_create' }" v-if="isAction"
        >Ajouter</router-link
      >-->
      <button class="btn btn-info" v-on:click="ajouterExamen()" v-if="isAction">
              Ajouter 
            </button>
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Enonce</th>
          <th>Formation</th>
          <th>Cursus</th>
          <!-- <th v-if="isAction">Actions</th> -->
        </tr>
      </thead>
      <tbody v-if="examensComputed">
        <tr v-for="examen in examensComputed" :key="examen.id" class="mon-tr"
          v-on:click="clickList(examen)"
          @dblclick="dblClick(examen)">
          <td>{{ examen.enonce }}</td>
          <td>{{ examen.formationDto.titre }}</td>
          <td>{{ examen.cursusDto.titre }}</td>
          <!-- <td v-if="isAction">
            <button class="btn btn-info" v-on:click="detailsExamen(examen)">
              Details 
            </button>
            &nbsp;
            <button class="btn btn-info" v-on:click="updateExamen(examen)">
              Update 
            </button>
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteExamen(examen.id)">
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
import { examenApi } from "@/_api/examen.api.js";

export default {
  name: "ExamenListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    examenProp: {
      default: null,
    }
  },
  watch: {
    examenProp(){
      if (this.examenProp != null) 
        this.examen_input = `${this.examenProp.enonce}`;
    }
  },
  data() {
    return {
      examens: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      examen_input: "",
    };
  },
  computed: {
    examensComputed() {
      return this.examens;
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
      examenApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.examens = response));
      examenApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      examenApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.examens = response));
    },
    refreshList() {
      examenApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.examens = response));
      examenApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteExamen(examenId) {
      examenApi.deleteExamen(examenId).then(() => this.refreshList());
    },
    updateExamen(examen){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_examen_update",
        params: { id: examen.id },
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_examen_update",
        params: { id: examen.id },
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_examen_update",
        params: { id: examen.id },
      });
      }
    },
    detailsExamen(examen){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_examen_detail",
        params: { id: examen.id },
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_examen_detail",
        params: { id: examen.id },
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_examen_detail",
        params: { id: examen.id },
      });
      }
    },
    ajouterExamen(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin') this.$router.push({name: "admin_examen_create"});
      else if(route[0]== 'referent') this.$router.push({name: "referent_examen_create"});
      else if(route[0]== 'formateur') this.$router.push({name: "formateur_examen_create"});
      else if (route[0] == 'cef') { this.$router.push({name: "cef_examen_create",});
      }

    },
    clickList(examen) {
      this.examen_input = examen.enonce;
      this.$emit('click-list',examen);
    },
    dblClick(examen){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_examen_detail', params: { id: examen.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_examen_detail', params: { id: examen.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_examen_detail', params: { id: examen.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_examen_detail', params: { id: examen.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_examen_detail', params: { id: examen.id }});

    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
