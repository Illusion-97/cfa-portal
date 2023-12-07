<template>
  <div class="container-fluid">
    <b-card>
      <div style="display: grid; grid-template-columns:  1fr 0.25fr">
        <form class="form-inline " @submit="submit">
          <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher par nom de groupe"
            v-model="saisie" />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>

        <b-button variant="primary" class="btn btn-primary" @click="createGroupe()">
          Ajouter un groupe
        </b-button>

      </div>

      <table class="table table-striped table-hover text-center" aria-describedby="mydesc">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Etudiants</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="groupeComputed">
          <tr v-for="groupe in groupeComputed" :key="groupe.id" class="mon-tr">
            <td>{{ groupe.nom }}</td>
            <td>
              <span v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">{{ etudiant.utilisateurDto.fullName + " " }}</span>
            </td>
            <td>
              <b-button variant="info" @click="detail(groupe)">
                <span tooltip="Voir le détail" flow="down">
                  <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'eye']" />Détails
                </span>
              </b-button>
              <b-button style="margin-left: 5px" class="btn btn-danger" v-on:click="deleteGroupe(groupe.id)">
                <span tooltip="Supprimer" flow="down">
                  <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />Supprimer
                </span>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination :page-count="pageCount" :page-change="pageChange"></pagination>
    </b-card>
  </div>
</template>

<script>
import {groupeApi} from "@/_api/groupe.api.js";
import Pagination from "@/components/Navigation/Pagination.vue";

export default {
  name: "groupeListComponent",
  components: { Pagination },
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
    getAllGroup() {
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
    createGroupe() {
      this.$router.push({
        name: "admin_groupe_create",
        params: {}
      });
    },
    detail(groupe) {
      this.$router.push({ name: 'admin_groupe_detail', params: { id: groupe.id } });
    },
    delete_input() {
      this.selectedGroup = "";
      this.$emit('delete_input');
    }
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
