<template>
  <div class="container-fluid">
    <div class="updateListFormation">
      <v-btn outlined @click="openLoginWdg2" class="btn btn-info">
        Mise à jour des interventions 
      </v-btn>
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
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :pageCount="pageCount"
      :length="length"
      :clickHandler="pageChange"
      v-model="keyword"
      :onSubmit="search"
    />
  </div>
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { courseFields } from "@/assets/js/fields.js";
import LoginWdg2 from "../../../components/LoginWdg2.vue";

export default {
  name: "Intervention",
  components: {
    TableTemplate,
    LoginWdg2,
  },
  data() {
    return {
      items: [],
      fields: courseFields,
      currentPage: 1,
      perPage: 5,
      pageCount: 0,
      keyword: "",
      length : 0,

      showLoginWdg2Card: false,
      loading: false,
    };
  },
  created() {
    this.fillList();
    this.lengthItv();
  },
  methods: {
    fillList() {
      interventionApi
        .getIntervention(this.currentPage, this.perPage, this.keyword)
        // .getAllIntervention()
        .then((data) => (this.items = data));
      this.countIntervention();
    },
    countIntervention() {
      interventionApi
        .countIntervention(this.keyword)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      interventionApi
        .getIntervention(page, this.perPage, this.keyword)
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
      interventionApi
        .getIntervention(this.currentPage, this.perPage, this.key)
        .then((data) => (this.items = data));
      interventionApi
        .countIntervention(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    refresh(e) {
      e.preventDefault();
      if (this.key === "") this.fillList();
    },
    lengthItv(){
      interventionApi.countIntervention().then(data => this.length = data)
    },
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
      this.$alert("Fonctionnalité en cours de production");
      this.wdg2Close();
    },
    // fetch courses from webservice DG2
    logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      interventionApi.fetchAllInterventionDG2Http({ logInUser: value }); //requete dans le service à faire 
      this.loading = false;
    },
    // close the card for the login to webservice DG2
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    },
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
    key: {
      get: function() {
        return this.keyword;
      },
      set: function(keyword) {
        this.keyword = keyword;
      },
    },

  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
