<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">projet</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="projet_input"
          disabled="disabled"
        />
      </div>

      <form class="form-inline form" @submit="submit">
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

       <button class="btn btn-primary" v-on:click="createProjet()" v-if="isAction">
              Ajouter un projet
            </button>
    </div>
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
          v-on:click="clickList(projet)"
          v-on:dblclick="detail(projet)"
          class="mon-tr"
        >
          <td>{{ projet.nom }}</td>
          <td>{{ projet.description }}</td>
          <td>{{ projet.groupeDto.nom }}</td>
          <!-- <td v-if="isAction">
            <button class="btn btn-danger" v-on:click="deleteProjet(projet.id)">
              Supprimer
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
import { projetApi } from "@/_api/projet.api.js";

export default {
  name: "projetListComponent",
  components: {},
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
      projets: [],
      perPage: 10,
      pageCount: 0,

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
        .getAllByPage(0, this.perPage, this.saisie)
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
          this.projets = response;

          //pour chaque projet, si groupe == null, pb de rendu de groupe.nom
          if (this.projets == null) return;
          for (let i = 0; i < this.projets.length; i++) {
            if (this.projets[i].groupeDto == null)
              this.projets[i].groupeDto = { nom: "" };
          }
        });

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
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_projet_create",
        params: {}
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_projet_create",
        
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_projet_create",
        
      });
      }
    },

    clickList(projet) {
      if (!this.isAction) {
        this.projet_input = projet.enonce;
        this.$emit("click-list", projet);
      }
    },
    detail(projet) {
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_projet_detail', params: { id: projet.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_projet_detail', params: { id: projet.id }});
      // else if(route[0]== 'formateur') this.$router.push({name:'formateur_projet_detail', params: { id: projet.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_projet_detail', params: { id: projet.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_projet_detail', params: { id: projet.id }});

      //this.$router.push({name:'admin_projet_detail', params: { id: projet.id }}); 
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
