<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Examens" />

    <div class="header-list">
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

      <router-link class="btn btn-info" :to="{ name: 'admin_conge_create' }"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Enonce</th>
          <th>Fomration</th>
          <th>Cursus</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="examensComputed">
        <tr v-for="examen in examensComputed" :key="examen.id">
          <td>{{ examen.enonce }}</td>
          <td>{{ examen.formationDto.titre }}</td>
          <td>{{ examen.cursusDto.titre }}</td>
          <td>
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: examen.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: examen.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteConge(examen.id)">
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
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { examenApi } from "@/_api/examen.api.js";

export default {
  name: "ExamenListe",
  components: {
    BodyTitle,
  },
  data() {
    return {
      examens: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",
    };
  },
  computed: {
    examensComputed() {
      return this.examens;
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
      examenApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.examens = response));
      examenApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      examenApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.examens = response));
    },
    refreshList() {
      examenApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.examens = response));
      examenApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteConge(congeId) {
      examenApi.deleteConge(congeId).then(() => this.refreshList());
    },
  },
};
</script>

<style scoped>
.header-list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form{
  width: 40%;
}

#saisie{
  width: 70%;
  margin-right: 5%;
}
</style>
