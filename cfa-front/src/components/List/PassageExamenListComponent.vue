<template>
    <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Passage Examen</label>
        <input class="col-9 form-control" type="text" :value="passageExamen_input" disabled="disabled"/>
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

      <router-link class="btn btn-info" :to="{ name: 'admin_passageExamen_create' }" v-if="isAction"
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
      <tbody v-if="passageExamensComputed">
        <tr v-for="passageExamen in passageExamensComputed" :key="passageExamen.id" v-on:click="clickList(passageExamen)">
          <td>{{ passageExamen.examenDto.enonce }}</td>
          <td>{{ passageExamen.dateDebut }}</td>
          <td>{{ passageExamen.dateFin }}</td>
          <td>{{ passageExamen.interventionDto.formationDto.titre }}</td>
          <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_passageExamen_detail', params: { id: passageExamen.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_passageExamen_update', params: { id: passageExamen.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-info" v-on:click="deletePassageExamen(passageExamen.id)">
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
import { passageExamenApi } from "@/_api/passageExamen.api.js";

export default {
    name: "passageExamenListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    passageExamenProp: {
      default: null,
    }
  },
  watch: {
    passageExamenProp(){      
      if (this.passageExamenProp != null) 
        this.passageExamen_input = `${this.passageExamenProp.examenDto.enonce}`;
    }
  },
  data() {
    return {
      passageExamens: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      passageExamen_input: "",
    };
  },
  computed: {
    passageExamensComputed() {
      return this.passageExamens;
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
      passageExamenApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.passageExamens = response));
      passageExamenApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      passageExamenApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.passageExamens = response));
    },
    refreshList() {
      passageExamenApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.passageExamens = response));
      passageExamenApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deletePassageExamen(passageExamenId) {
      passageExamenApi.deletePassageExamen(passageExamenId).then(() => this.refreshList());
    },
    clickList(passageExamen) {
      this.passageExamen_input = passageExamen.examenDto.enonce;
      this.$emit('click-list',passageExamen);
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>