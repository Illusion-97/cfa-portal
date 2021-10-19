<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left row" id="groupe-input" v-if="!isAction">
        <label class="col-1">Devoir</label>
        <input
          class="offset-1 col-9 form-control"
          type="text"
          :value="devoir_input"
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
        <button class="btn btn-primary" type="submit">Recherche</button>
      </form>

      <!--<router-link
        class="btn btn-info"
        :to="{ name: 'admin_devoir_create' }"
        v-if="isAction"
        >Ajouter</router-link
      >-->
      <button class="btn btn-info" v-on:click=ajouterDevoir v-if="isAction">
              Ajouter 
            </button>
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Enonce</th>
          <th>Date de Debut</th>
          <th>Date de Fin</th>
          <th>Intervention</th>
          <!-- <th v-if="isAction">Actions</th> -->
        </tr>
      </thead>
      <tbody v-if="devoirsComputed">
        <tr
          v-for="devoir in devoirsComputed"
          :key="devoir.id"
          class="mon-tr"
          v-on:click="clickList(devoir)"
          @dblclick="dblClick(devoir)">

          <td>{{ devoir.enonce }}</td>
          <td>{{ devoir.dateDebut }}</td>
          <td>{{ devoir.dateFin }}</td>
          <td>{{ devoir.interventionDto.formationDto.titre }}</td>
          <!-- <td v-if="isAction">
            <button class="btn btn-info" v-on:click="detailsDevoir(devoir)">
              Details 
            </button>
            &nbsp;
            <button class="btn btn-info" v-on:click="updateDevoir(devoir)">
              Update 
            </button>
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteDevoir(devoir.id)">
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
import { devoirApi } from "@/_api/devoir.api.js";

export default {
  name: "DevoirListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    devoirProp: {
      default: null,
    },
  },
  watch: {
    devoirProp() {
      if (this.devoirProp != null)
        if (this.devoirProp.enonce)
          this.devoir_input = `${this.devoirProp.enonce}`;
        else this.devoir_input = "";
    },
  },
  data() {
    return {
      devoirs: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      devoir_input: "",
    };
  },
  computed: {
    devoirsComputed() {
      return this.devoirs;
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
      devoirApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.devoirs = response));
      devoirApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      devoirApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.devoirs = response));
    },
    refreshList() {
      devoirApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.devoirs = response));
      devoirApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteDevoir(devoirId) {
      devoirApi.deleteDevoir(devoirId).then(() => this.refreshList());
    },
    uupdateDevoir(devoir){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_devoir_update",
        params: { id: devoir.id },
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_devoir_update",
        params: { id: devoir.id },
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_devoir_update",
        params: { id: devoir.id },
      });
      }
    },
    detailsDevoir(devoir){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_devoir_detail",
        params: { id: devoir.id },
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_devoir_detail",
        params: { id: devoir.id },
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_devoir_detail",
        params: { id: devoir.id },
      });
      }
    },
    ajouterDevoir(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_devoir_create",
        
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_devoir_create",
        
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_devoir_create",
        
      });
      }
    },
    clickList(devoir) {
      this.devoir_input = devoir.enonce;
      this.$emit("click-list", devoir);
    },
    dblClick(devoir){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_devoir_detail', params: { id: devoir.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_devoir_detail', params: { id: devoir.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_devoir_detail', params: { id: devoir.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_devoir_detail', params: { id: devoir.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_devoir_detail', params: { id: devoir.id }});

    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
