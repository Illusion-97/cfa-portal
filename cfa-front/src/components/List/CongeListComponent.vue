<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Conge</label>
        <input class="col-9 form-control" type="text" :value="conge_input" disabled="disabled"/>
      </div>

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <router-link class="btn btn-info" :to="{ name: 'admin_conge_create' }" v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Utilisateur</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Motif</th>
          <th>Type de congé</th>
          <th>Status</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="congesComputed">
        <tr v-for="conge in congesComputed" :key="conge.id" class="mon-tr"
          v-on:click="clickList(conge)"
          @dblclick="dblClick(conge)">
          <td>
            {{ conge.utilisateurDto.prenom }} {{ conge.utilisateurDto.nom }}
          </td>
          <td>{{ conge.dateDebut }}</td>
          <td>{{ conge.dateFin }}</td>
          <td>{{ conge.motif }}</td>
          <td>{{ conge.type }}</td>
          <td>{{ conge.status }}</td>
          <!-- <td v-if="isAction">
            <router-link class="btn btn-info" :to="{name:'admin_conge_detail', params: { id: conge.id }}">Detail</router-link>
            &nbsp;
            <router-link class="btn btn-info" :to="{name:'admin_conge_update', params: { id: conge.id }}">Update</router-link>
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteConge(conge.id)">
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
import { congeApi } from "@/_api/conge.api.js";

export default {
  name: "CongeListComponent",
  components: {
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    congeProp: {
      default: null,
    },
  },
  watch: {
    congeProp(){
      if (this.congeProp != null) 
        this.conge_input = `${this.congeProp.titre}`;
    }
  },
  data() {
    return {
      conges: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      conge_input: "",
    };
  },
  computed: {
    congesComputed() {
      return this.conges;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();

    if(this.congeProp != null)
      this.conge_input = `${this.congeProp.titre}`;
  },
  methods: {
    submit(e) {
      e.preventDefault();
      congeApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.conges = response));
      congeApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      congeApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.conges = response));
    },
    refreshList() {
      congeApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.conges = response));
      congeApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteConge(congeId) {
      congeApi.deleteConge(congeId).then(() => this.refreshList());
    },
    clickList(conge) {
      this.conge_input = conge.motif;
      this.$emit("click-list", conge);
    },
    dblClick(conge){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_conge_detail', params: { id: conge.id }}); 
      // else if(route[0]== 'referent')  this.$router.push({name:'referent_conge_detail', params: { id: conge.id }});
      // else if(route[0]== 'formateur') this.$router.push({name:'formateur_conge_detail', params: { id: conge.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_conge_detail', params: { id: conge.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_conge_detail', params: { id: conge.id }});
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>