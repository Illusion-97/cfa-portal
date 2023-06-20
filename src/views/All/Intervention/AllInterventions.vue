<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Interventions" />
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="color"
      @dismissed="dismissCountDown = 0"
    >
      {{ message }}
    </b-alert>
    <div class="d-flex justify-content-center">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="red darken-1"
      ></v-progress-circular>
    </div>
    <div class="d-flex flex-row align-items-end justify-content-between">
      <form class="form-inline p-2" @submit="search">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="key"
          placeholder="Rechercher une formation..."
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
      <div class="updateListFormation p-2">
        <button outlined @click="openLoginWdg2" class="btn btn-outline-info">
          Mise à jour des interventions
        </button>
        <div class="login-wdg2">
          <login-wdg-2
            v-if="showLoginWdg2Card"
            @logInUser="logInUserWdg2"
            @wdg2Close="wdg2Close"
          />
        </div>
      </div>
    </div>

    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(intitule)="row">
        {{
          row.item.formationDto != null
            ? row.item.formationDto.titre
            : "Non définit"
        }}
      </template>
      <template #cell(action)="row">
        <b-button
          block
          variant="info"
          @click="gotoDetailIntervention(row.item)"
        >
        <span tooltip="Détails intervention" flow="down">
          <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" /> Voir
        </span>
        </b-button>
      </template>
    </b-table>
    <paginate
      :page-count="pageCount"
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
import { interventionApi } from "@/_api/intervention.api.js";
import LoginWdg2 from "../../../components/LoginWdg2.vue";
import { fieldsIntervention } from "@/assets/js/fields.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";

export default {
  name: "Intervention",
  components: {
    BodyTitle,
    LoginWdg2,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 9,
      pageCount: 0,
      keyword: "",
      length: 0,
      fields: fieldsIntervention,
      showLoginWdg2Card: false,
      loading: false,
      dismissCountDown: null,
      color: null,
      message: null,
    };
  },
  created() {
    this.addFieldsIntitule();
    this.fillList();
    this.lengthItv();
  },
  methods: {
    fillList() {
      interventionApi
        .getIntervention(this.currentPage, this.perPage, this.keyword)
        .then((data) => {
          this.items = data;
        });
      this.countIntervention();
    },
    gotoDetailIntervention(intervention) {
      this.$router.push({
        name: "admin_intervention_detail",
        params: { id: intervention.id },
      });
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
    lengthItv() {
      interventionApi.countIntervention().then((data) => (this.length = data));
    },
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    // fetch courses from webservice DG2
      async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
     await interventionApi
        .fetchAllInterventionsDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
          this.fillList();
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });

    },
    // close the card for the login to webservice DG2
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    },
    addFieldsIntitule() {
      this.fields.unshift({
        key: "intitule",
        label: "Intitulé",
      });
    },
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
    key: {
      get: function () {
        return this.keyword;
      },
      set: function (keyword) {
        this.keyword = keyword;
      },
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
