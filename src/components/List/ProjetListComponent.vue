<template>
  <div class="container-fluid">
    <div>
      <div style="display: grid; grid-column-gap: 20px; grid-template-columns: 1fr auto;">
        <form class="form-inline form" @submit="submit">
          <input id="saisie" name="saisie" placeholder="Rechercher un projet" type="text" class="form-control" v-model="saisie" />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>

        <div class="buttons-container">
          <button @click="showCreateProjet()" class="btn btn-outline-info mt-4 mb-4" style="width: 200px;">
            <span v-if="!isVisible">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter un projet
            </span>
            <span v-else>
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
          </button>
          <button @click="showGroupProjet()" class="btn btn-outline-info mt-4 mb-4" style="width: 200px;">
            <span v-if="!isGroupeVisible">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Liste des groupes
            </span>
            <span v-else>
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
          </button>
        </div>

      </div>
    </div>

    <b-collapse :visible="isVisible" class="mt-2 mb-4">
      <projet-create :refreshList="refreshList" :isVisible.sync="isVisible"></projet-create>
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
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody v-if="projetsComputed">
        <tr
          v-for="(projet, index) in projetsComputed"
          :key="projet.id"
          class="mon-tr"
        >
          <td>{{ projet.nom }}</td>
          <td>{{ projet.description }}</td>
          <td>
            {{groupNameArray[index]}}
          </td>
          <td>
            <b-button variant="warning"  style="margin-right: 5px" @click="detail(projet.id)">
              <span tooltip="Modifier" flow="down">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
                Modifier
              </span>
            </b-button>
            <b-button class="btn btn-danger" @click="deleteProjet(projet.id)">
              <span tooltip="Supprimer" flow="down">
                <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />
                Supprimer
              </span>
            </b-button>
          </td>

        </tr>
      </tbody>
    </table>

    <pagination :page-change="pageChange" :page-count="pageCount"></pagination>
  </div>
</template>
<script>
import Pagination from "@/components/Navigation/Pagination.vue";
import { projetApi } from "@/_api/projet.api.js";
import ProjetCreate from "@/views/Admin/Crud/Projet/ProjetCreate.vue";
import {groupeApi} from "@/_api/groupe.api";
import GroupeListComponent from "@/components/List/GroupeListComponent.vue";
export default {
  name: "projetListComponent",
  components: {Pagination, ProjetCreate, GroupeListComponent},
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
      isVisible:false,
      isGroupeVisible: false,
      formAjoutProjet: true,
      projets: [],
      groupName: [],
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
    groupNameArray() {
      // Converti le tableau Set en Array
      return this.groupName;
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
        .then((response) => (this.projets = response, this.getGroupNameById(response.groupeId)));
    },
    refreshList() {
      projetApi
          .getAllByPage(0, this.perPage)
          .then((response) => {
            this.projets = response;
            this.projets.forEach(projet => {
              this.getGroupNameById(projet.groupeId); // Appel de getGroupNameById pour chaque projet
            });
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
      this.$router.push({
        name: "admin_projet_create",
        params: {}
      });
    },
    showCreateProjet(){
      this.isVisible = !this.isVisible;
      this.isGroupeVisible = false;
    },
    async getGroupNameById(idGroup) {
        groupeApi.getById(idGroup)
            .then(response => {
              this.groupName.push(response.nom)
            });

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
  grid-template-columns: 1fr 1fr;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px; 
}

.buttons-container button {
  margin: 0; 
}

</style>
