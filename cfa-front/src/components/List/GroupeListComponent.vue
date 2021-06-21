<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">groupe</label>
        <input class="col-9 form-control" type="text" :value="groupe_input" disabled="disabled"/>
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

      <router-link class="btn btn-info" :to="{ name: '' }" v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Etudiants</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="groupeComputed">
        <tr v-for="groupe in groupeComputed" :key="groupe.id" v-on:click="clickList(groupe)">
          <td>{{ groupe.id }}</td>
          <td>{{ groupe.nom }}</td>
          <td>
              <span v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">{{etudiant.prenom}} {{etudiant.nom}}</span>
            </td>
          <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: groupe.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: groupe.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteGroupe(groupe.id)">
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
import { groupeApi } from "@/_api/groupe.api.js";
export default {
  name: "groupeListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    groupeProp: {
      default: null,
    }
  },
  watch: {
    groupeProp(){
      if (this.groupeProp != null) 
        this.groupe_input = `${this.groupeProp.titre}`;
    }
  },
  data() {
    return {
      groupe: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      groupe_input: "",
    };
  },
  computed: {
    groupeComputed() {
      return this.groupe;
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
      groupeApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.groupe = response));
      groupeApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      groupeApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.groupe = response));
    },
    refreshList() {
      groupeApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.groupe = response));
      groupeApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteGroupe(groupeId) {
      groupeApi.deleteGroupe(groupeId).then(() => this.refreshList());
    },
    clickList(groupe) {
      this.groupe_input = groupe.nom;
      this.$emit('click-list',groupe);
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
