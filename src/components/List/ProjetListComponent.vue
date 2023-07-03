<template>
  <div class="container-fluid">
    <div>
      <div style="display: grid;grid-column-gap: 20px; grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr; margin:1% 0 1% 0">
        <form class="form-inline form" @submit="submit">
          <input id="saisie" name="saisie" placeholder="Rechercher" type="text" class="form-control" v-model="saisie" />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>

        <div style="text-align: right">
          <button @click="showCreateProjet()" class="btn btn-outline-info mt-4 mb-4" style="width: 200px; ">
            <span v-if="!isVisible">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter un projet
            </span>
            <span v-else>
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
          </button>
        </div>

        <div style="text-align: left">
          <button @click="showGroupProjet()" class="btn btn-outline-info mt-4 mb-4" style="width: 200px; ">
            <span v-if="!isGroupeVisible">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Groupe Projet
            </span>
            <span v-else>
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
          </button>
        </div>

      </div>
    </div>

    <b-collapse :visible="isVisible" class="mt-2 mb-4">
      <projet-create></projet-create>
    </b-collapse>

    <b-collapse :visible="isGroupeVisible" class="mt-2 mb-4">
      <groupe-list-component></groupe-list-component>
    </b-collapse>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Groupe</th>
          <!-- <th v-if="isAction">Actions</th> -->
        </tr>
      </thead>
      <tbody v-if="projetsComputed">
        <tr
          v-for="projet in projetsComputed"
          :key="projet.id"
          class="mon-tr"
        >
          <td>{{ projet.nom }}</td>
          <td>{{ projet.description }}</td>
          <td>{{projet.groupeId}}</td>
          <td>
            <b-button style="margin-right: 5px" @click="detail(projet.id)">Modifier</b-button>
            <b-button class="btn btn-danger" v-on:click="deleteProjet(projet.id)">Supprimer</b-button>
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
import { projetApi } from "@/_api/projet.api.js";
import ProjetCreate from "@/views/Admin/Crud/Projet/ProjetCreate.vue";
import {groupeApi} from "@/_api/groupe.api";
import GroupeListComponent from "@/components/List/GroupeListComponent.vue";
export default {
  name: "projetListComponent",
  components: {ProjetCreate, GroupeListComponent},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    projetProp: {
      default: null,
    },
  },
  watch: {
    projetProp() {
      if (this.projetProp != null)
        this.projet_input = `${this.projetProp.enonce}`;
    },
  },
  data() {
    return {
      // projets: [{nom: "", description: "", groupeDto: {nom: ""}}],
      isVisible:false,
      isGroupeVisible: false,
      formAjoutProjet: true,
      projets: [],
      perPage: 10,
      pageCount: 0,
      currentPage: 1,
      saisie: "",
      projet_input: "",
    };
  },
  computed: {
    projetsComputed() {
      return this.projets;
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
      projetApi
        .getAllByPage(this.currentPage, this.perPage, this.saisie)
        .then((response) => (this.projets = response));
      projetApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      projetApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.projets = response));
    },
    refreshList() {
      projetApi
        .getAllByPage(0, this.perPage)
        .then((response) => {
          this.projets = response;});
      projetApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteProjet(projetId) {
      projetApi.deleteProjet(projetId).then(() => this.refreshList());
    },
    createProjet(){
      this.$router.push({
        name: "admin_projet_create",
        params: {}
      });
    },
    showCreateProjet(){
      this.isVisible = !this.isVisible;
      this.isGroupeVisible = false;
    },
    getGroupNameById(index){
      let groupName;
      groupeApi.getById(index).then(response => {groupName = response.nom})
      return groupName;
    },
    clickList(projet) {
      if (!this.isAction) {
        this.projet_input = projet.enonce;
        this.$emit("click-list", projet);
      }
    },
    detail(projet) {
      this.$router.push({name:'admin_projet_detail', params: {id: projet }});
    },
    showGroupProjet(){
      this.isGroupeVisible = !this.isGroupeVisible;
      this.isVisible = false
    }
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css" >
.grid-header  {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
