<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left row" id="groupe-input" v-if="!isAction">
        <label class="col-1">Groupe</label>
        <input class="offset-1 col-9 form-control" type="text" :value="groupe_input" disabled="disabled"/>
        <span class="col-1 delete-input" v-if="groupe_input" @click="delete_input()">x</span>
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

      <button class="btn btn-primary" v-on:click="createGroupe()" v-if="isAction">
              Ajouter un groupe
            </button>
    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Etudiants</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="groupeComputed">
        <tr v-for="groupe in groupeComputed" :key="groupe.id" v-on:click="clickList(groupe)" v-on:dblclick="detail(groupe)" class="mon-tr">
          <td>{{ groupe.nom }}</td>
          <td>
              <span v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">{{etudiant.utilisateurDto.prenom}} {{etudiant.utilisateurDto.nom}}</span>
            </td>
          <!-- <td v-if="isAction">
            <button class="btn btn-danger" v-on:click="deleteGroupe(groupe.id)">
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
        this.groupe_input = `${this.groupeProp.nom}`;
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
    createGroupe(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_groupe_create",
        params: {}
      });
      }
      else if (route[0] == 'referent') {
        this.$router.push({
        name: "referent_groupe_create",
        
      });
      }
      else if (route[0] == 'cef') {
        this.$router.push({
        name: "cef_groupe_create",
        
      });
      }
    },

    clickList(groupe) {
      if (!this.isAction) {
      this.groupe_input = groupe.nom;
      this.$emit('click-list',groupe);
      }
    },
    detail(groupe) {
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_groupe_detail', params: { id: groupe.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_groupe_detail', params: { id: groupe.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_groupe_detail', params: { id: groupe.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_groupe_detail', params: { id: groupe.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_groupe_detail', params: { id: groupe.id }});

      //this.$router.push({name:'admin_groupe_detail', params: { id: groupe.id }}); 
    },
    delete_input(){
      this.groupe_input = "";
      this.$emit('delete_input');
    }
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
