<template>
    <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Devoir</label>
        <input class="col-9 form-control" type="text" :value="devoir_input" disabled="disabled"/>
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

      <router-link class="btn btn-info" :to="{ name: 'admin_devoir_create' }" v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Enonce</th>
          <th>Date de Debut</th>
          <th>Date de Fin</th>
          <th>Intervention</th>
          <th v-if="isAction">Actions</th>
        </tr>
      </thead>
      <tbody v-if="devoirsComputed">
        <tr v-for="devoir in devoirsComputed" :key="devoir.id" v-on:click="clickList(devoir)">
          <td>{{ devoir.enonce }}</td>
          <td>{{ devoir.dateDebut }}</td>
          <td>{{ devoir.dateFin }}</td>
          <td>{{ devoir.interventionDto.formationDto.titre }}</td>
          <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_devoir_detail', params: { id: devoir.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_devoir_update', params: { id: devoir.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteDevoir(devoir.id)">
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
import { devoirApi } from "@/_api/devoir.api.js";

export default {
    name: "DevoirListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    devoirProp: {
      default: null,
    }
  },
  watch: {
    devoirProp(){
      if (this.devoirProp != null) 
        this.devoir_input = `${this.devoirProp.enonce}`;
    }
  },
  data() {
    return {
      devoirs: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      devoir_input: "",
    };
  },
  computed: {
    devoirsComputed() {
      return this.devoirs;
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
      devoirApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.devoirs = response));
      devoirApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      devoirApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.devoirs = response));
    },
    refreshList() {
      devoirApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.devoirs = response));
      devoirApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteDevoir(devoirId) {
      devoirApi.deleteDevoir(devoirId).then(() => this.refreshList());
    },
    clickList(devoir) {
      this.devoir_input = devoir.enonce;
      this.$emit('click-list',devoir);
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>