<template>
  <div class="container-fluid">
    <div style="display: grid; grid-template-columns: repeat(2, 1fr)">

      <!--<div class="text-align-left row" id="groupe-input" v-if="!isAction">
        <b-form-select v-model="selectedGroup">
          <b-form-select-option value="null">Choisissez un groupe</b-form-select-option>
          <b-form-select-option v-for="group in allGroupe" :key="group.id" :value="group.nom">{{ group.nom }}</b-form-select-option>
        </b-form-select>
      </div>-->

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          placeholder="Rechercher par Nom de projet"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <b-button class="btn btn-primary" v-on:click="createGroupe()">
        Ajouter un groupe
      </b-button>

    </div>

    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Etudiants</th>
          <th>Action</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="groupeComputed">
        <tr v-for="groupe in groupeComputed" :key="groupe.id" class="mon-tr">
          <td>{{ groupe.nom }}</td>
          <td>
              <span v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">{{etudiant.utilisateurDto.fullName+", "}}</span>
            </td>
          <td><b-button @click="detail(groupe)">Détail</b-button></td>
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
  data() {
    return {
      groupe: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",
      selectedGroup: "",
      allGroupe: [],
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
    this.getAllGroup();
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
    getAllGroup(){
      groupeApi
          .getAll()
          .then((response) => (this.allGroupe = response))
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
      this.$router.push({
        name: "admin_groupe_create",
        params: {}
      });
    },
    detail(groupe) {
      this.$router.push({name:'admin_groupe_detail', params: { id: groupe.id }});
    },
    delete_input(){
      this.selectedGroup = "";
      this.$emit('delete_input');
    }
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
