<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Formation</label>
        <input class="col-9 form-control" type="text" :value="formation_input" disabled="disabled"/>
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
          <th>Titre</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="formationComputed">
        <tr v-for="formation in formationComputed" :key="formation.id" v-on:click="clickList(formation)">
          <td>{{ formation.id }}</td>
          <td>{{ formation.titre }}</td>
          <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: formation.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: formation.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteFormation(formation.id)">
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
import { formationApi } from "@/_api/formation.api.js";
export default {
  name: "FormationListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    formation_prop: {
      type: {},
      default: null,
    }
  },
  data() {
    return {
      formation: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      formation_input: "",
    };
  },
  computed: {
    formationComputed() {
      return this.formation;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();

    if(this.formation_prop != null)
      this.formation_input = `${this.formation_prop.titre}`;
  },
  methods: {
    submit(e) {
      e.preventDefault();
      formationApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.formation = response));
      formationApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      formationApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.formation = response));
    },
    refreshList() {
      formationApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.formation = response));
      formationApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteFormation(formationId) {
      formationApi.deleteFormation(formationId).then(() => this.refreshList());
    },
    clickList(formation) {
      this.formation_input = formation.titre;
      this.$emit('click-list',formation);
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

#groupe-input{
  display: flex;
  justify-content: space-between;
  width: 50%;
}

</style>
