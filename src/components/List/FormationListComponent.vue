<template>

  <div class="container-fluid">
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="color"
      @dismissed="dismissCountDown = 0"
    >
      {{ message }}
    </b-alert>
    <div class="updateListFormation">
      <button-2 name="button2" outlined @click="openLoginWdg2" class="button2">
        Mise à jour des formations 
      </button-2>
      <div class="login-wdg2">
        <login-wdg-2
          v-if="showLoginWdg2Card"
          @logInUser="logInUserWdg2"
          @wdg2Close="wdg2Close"
        />
      </div>
      <div class="progress"
        v-if="loading"
        indeterminate
      ></div>
    </div>
    <br>
    <div class="header-list">
      <div id="groupe-input" v-if="!isAction">
        <input
          class="form-control"
          type="text"
          :value="formation_input"
          :disabled="true"
        />
      </div>
      <form class="d-flex" @submit="search">
        <input
          id="saisie"
          name="saisie"
          type="search"
          class="form-control"
          v-model="key"
          placeholder="Rechercher une formation..."
        />
        <button class="btn btn-primary" type="submit">Recherche</button>
      </form>

      <router-link class="btn btn-info" :to="{ name: 'admin_formation_create' }" v-if="isAction">Ajouter</router-link>
    </div>
    <table
      class="table table-striped table-hover text-center"
    >
      <thead>
        <tr>
          <!-- <th>Id</th> -->
          <th class="text-center">Intitulé</th>
          <th class="text-center" v-if="isDescription">Description</th>
          <!-- <th v-if="isAction" width="20%">Voir plus</th> -->
        </tr>
      </thead>
      <tbody v-if="formationComputed">
        <tr
          v-for="formation in formationComputed"
          :key="formation.id" class="mon-tr"
          v-on:click="clickList(formation)"
          @dblclick="dblClick(formation)">
          <!-- <td>{{ formation.id }}</td> -->
          <td>{{ formation.titre }}</td>
          <td v-if="isDescription">{{formation.contenu}}</td>
          
          <!-- <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_formation_detail', params: { id: formation.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-success"
              :to="{ name: 'admin_formation_update', params: { id: formation.id } }"
              >Update</router-link
            >
            &nbsp;
            <button
              class="btn btn-danger"
              v-on:click="deleteFormation(formation.id)"
            >
              Delete
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>

    <paginate
      :page-count="nbPageComputed"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination float-right'"
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
import LoginWdg2 from "../LoginWdg2.vue";
export default {
  name: "FormationListComponent",
  components: {
    LoginWdg2,
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    isDescription: {
      type: Boolean,
      default: true,
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
      dismissCountDown: null,
      message: "",
      color: "success",

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
    dblClick(formation){
      let route = this.$route.path.split("/").splice(1);

       if(route[0]== 'admin') this.$router.push({name:'admin_formation_detail', params: { id: formation.id }}); 
      // else if(route[0]== 'referent')  this.$router.push({name:'referent_formation_detail', params: { id: formation.id }});
      // else if(route[0]== 'formateur') this.$router.push({name:'formateur_formation_detail', params: { id: formation.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_formation_detail', params: { id: formation.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_formation_detail', params: { id: formation.id }});

    },
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    // fetch courses from webservice DG2
    logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      this.formationApi.fetchAllFormationDG2Http({ logInUser: value }).then(response =>{
        this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data
          this.loading = false;
          this.fillList()
      }).catch(err =>{
        this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
      });
      this.loading = false;
      this.loadLocations();
    },
    // close the card for the login to webservice DG2
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
