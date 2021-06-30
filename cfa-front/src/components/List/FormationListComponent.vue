<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="d-flex" id="groupe-input" v-if="!isAction">
        <label style="width:6.5em;">Formation :</label>
        <input class="form-control" type="text" :value="formation_input" disabled="disabled"/>
      </div>

      <form class="form-inline form" @submit="search">
        <input id="saisie" name="saisie" type="search" class="form-control" v-model="key" placeholder="Rechercher une formation..."/>
        <button class="btn btn-primary" type="submit">Recherche</button>
      </form>

      <router-link class="btn btn-info" :to="{ name: '' }" v-if="isAction">Ajouter</router-link>
    </div>
    <table class="table table-bordered table-striped table-hover table-sm mx-auto text-center">
      <thead class="thead-dark">
        <tr>
          <!-- <th>Id</th> -->
          <th class="text-center">Nom de la formation</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="formationComputed">
        <tr v-for="formation in formationComputed" :key="formation.id" v-on:click="clickList(formation)">
          <!-- <td>{{ formation.id }}</td> -->
          <td>{{ formation.titre }}</td>
          <td v-if="isAction">
            <router-link class="btn btn-info" :to="{ name: '', params: { id: formation.id } }">Detail</router-link>
            &nbsp;
            <router-link class="btn btn-info" :to="{ name: '', params: { id: formation.id } }">Update</router-link>
            &nbsp;
            <button class="btn btn-info" v-on:click="deleteFormation(formation.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <paginate :page-count="nbPageComputed" :page-range="1" :margin-pages="2" :click-handler="pageChange"
      :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
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
      formationProp: {
        default: null,
      },
    },
    watch: {
      formationProp() {
        if (this.formationProp != null)
          this.formation_input = `${this.formationProp.titre}`;
      },
    },
    data() {
      return {
        formation: [],
        currentPage: 1,
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
      key: {
        get() {
          return this.saisie;
        },
        set(keyword) {
          this.saisie = keyword;
        },
      },
    },
    created() {
      this.fillList();
    },
    methods: {
      fillList() {
        formationApi
          .getAllByPage(this.currentPage, this.perPage, this.key)
          .then((data) => (this.formation = data));
        this.countFormation();
      },
      countFormation() {
        formationApi
          .countFormation(this.key)
          .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
      },
      pageChange(page) {
        formationApi
          .getAllByPage(page, this.perPage, this.key)
          .then((data) => (this.formation = data));
      },
      search(evt) {
        evt.preventDefault();
        this.fillList();
        this.countFormation();
      },
      deleteFormation(formationId) {
        formationApi.deleteFormation(formationId).then(() => this.fillList());
      },
      clickList(formation) {
        this.formation_input = formation.titre;
        this.$emit("click-list", formation);
      },
    },
  };
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>