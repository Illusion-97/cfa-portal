<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Etudiant</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="etudiant_input"
          disabled="disabled"
        />
        <span
          class="col-1 delete-input"
          v-if="etudiant_input"
          @click="delete_input()"
          >x</span
        >
      </div>

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">Recherche</button>
      </form>

      <router-link
        class="btn btn-info"
        :to="{ name: 'admin_etudiant_create' }"
        v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Nom de l'étudiant</th>
          <th>Email</th>
          <th>Promotions</th>
          <th v-if="isAction">Supprimer</th>
        </tr>
      </thead>
      <tbody v-if="etudiantsComputed">
        <tr
          v-for="etudiant in etudiantsComputed"
          :key="etudiant.id" class="mon-tr"
          v-on:click="clickList(etudiant)"
          @dblclick="dblClick(etudiant)">
          <td>{{ etudiant.prenom }} {{ etudiant.nom }}</td>
          <td>{{ etudiant.login }}</td>
          <td>
            <div
              v-for="promotion in etudiant.promotionsDto"
              :key="promotion.id"
            >
              {{ promotion.nom }}
            </div>
          </td>
          <td v-if="isAction">
            <span
            type="button"
              class="text-danger"
              v-on:click="deleteEtudiant(etudiant.id)"
            >
              <font-awesome-icon :icon="['fas', 'user-slash']" class="icon" />
            </span>
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
import { etudiantApi } from "@/_api/etudiant.api.js";

export default {
  name: "EtudiantListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    etudiantProp: {
      default: null,
    },
  },
  watch: {
    etudiantProp() {
      if (this.etudiantProp != null)
        this.etudiant_input = `${this.etudiantProp.prenom} ${this.etudiantProp.nom}`;
    },
  },
  data() {
    return {
      etudiants: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      etudiant_input: "",
    };
  },
  computed: {
    etudiantsComputed() {
      return this.etudiants;
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
      etudiantApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.etudiants = response));
      etudiantApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      etudiantApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.etudiants = response));
    },
    refreshList() {
      etudiantApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.etudiants = response));
      etudiantApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteEtudiant(etudiantId) {
      etudiantApi.deleteEtudiant(etudiantId).then(() => this.refreshList());
    },
    clickList(etudiant) {
      this.etudiant_input = `${etudiant.prenom} ${etudiant.nom}`;
      this.$emit("click-list", etudiant);
    },
    dblClick(etudiant){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_etudiant_detail', params: { id: etudiant.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_etudiant_detail', params: { id: etudiant.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_etudiant_detail', params: { id: etudiant.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_etudiant_detail', params: { id: etudiant.id }});
      else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_etudiant_detail', params: { id: etudiant.id }});
    },
    delete_input() {
      this.etudiant_input = "";
      this.$emit("delete_input");
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
