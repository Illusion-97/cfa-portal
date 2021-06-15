<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Congés" />

    <router-link class="btn btn-info" :to="{name:'admin_conge_create'}">Ajouter</router-link>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Utilisateur</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Motif</th>
          <th>Type de congé</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="congesComputed">
        <tr v-for="conge in congesComputed" :key="conge.id">
          <td>
            {{ conge.utilisateurDto.prenom }} {{ conge.utilisateurDto.nom }}
          </td>
          <td>{{ conge.dateDebut }}</td>
          <td>{{ conge.dateFin }}</td>
          <td>{{ conge.motif }}</td>
          <td>{{ conge.type }}</td>
          <td>{{ conge.status }}</td>
          <td>
            <a class="btn btn-info">Detail</a>
            &nbsp;
            <a class="btn btn-info">Update</a>
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteConge(conge.id)">Delete</button>
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
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { congeApi } from "@/_api/conge.api.js";

export default {
  name: "CongeList",
  components: {
    BodyTitle,
  },
  data() {
    return {
      conges: [],
      perPage: 10,
      pageCount: 0,
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
  },
  methods: {
    pageChange(pageNum) {
      congeApi
        .getAllByPage(pageNum, this.perPage)
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
    deleteConge(congeId){
      congeApi
        .deleteConge(congeId)
        .then(() => this.refreshList());
    }
  },
};
</script>

<style scoped>/*
.pagination-custom {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.test {
  background-color: green;
}*/
</style>
