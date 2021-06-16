<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Cursus</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="cursus_input"
          disabled="disabled"
        />
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

      <router-link
        class="btn btn-info"
        :to="{ name: 'admin_conge_create' }"
        v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Titre</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="cursusComputed">
        <tr
          v-for="cursus in cursusComputed"
          :key="cursus.id"
          v-on:click="clickList(cursus)"
        >
          <td>{{ cursus.id }}</td>
          <td>{{ cursus.titre }}</td>
          <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: cursus.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: cursus.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteCursus(cursus.id)">
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
import { cursusApi } from "@/_api/cursus.api.js";
export default {
  name: "CursusListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    cursusProp: {
      type: {},
      default: null,
    },
  },
  data() {
    return {
      cursus: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      cursus_input: "",
    };
  },
  computed: {
    cursusComputed() {
      return this.cursus;
    },
    nbPageComputed() {
      return this.pageCount;
    },
    cursusPropComputed(){
      return this.cursusProp;
    }
  },
  created() {
    this.refreshList();
    console.log("created");
    if (this.cursusPropComputed != null) {
      console.log(" prop !=null");
      this.cursus_input = `${this.cursusPropComputed.titre}`;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      cursusApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.cursus = response));
      cursusApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      cursusApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.cursus = response));
    },
    refreshList() {
      cursusApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.cursus = response));
      cursusApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteCursus(cursusId) {
      cursusApi.deleteCursus(cursusId).then(() => this.refreshList());
    },
    clickList(cursus) {
      this.cursus_input = cursus.titre;
      this.$emit("click-list", cursus);
    },
  },
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

#saisie {
  width: 70%;
  margin-right: 5%;
}

#groupe-input {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
</style>
