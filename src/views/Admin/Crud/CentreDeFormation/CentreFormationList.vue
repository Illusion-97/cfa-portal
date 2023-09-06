<template>
  <div class="container-fluid">
    <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <div class="d-flex justify-content-center">
      <v-progress-circular v-if="loading" indeterminate color="red darken-1"></v-progress-circular>
    </div>

    <div class="updateListCentreDeFormation">
      <div class="d-flex flex-row align-items-end justify-content-between m-3">
        <form class="form-inline form " @submit="submit">
          <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie" />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>

        <!-- UPDATE CENTRE DE FORMATION -->
        <div class="updateListFormation">
          <button outlined @click="openLoginWdg2" class="btn btn-outline-info">
            <span v-if="!showLoginWdg2Card">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Mise à jour des centres de formations
            </span>
            <span v-else>
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" /> Fermer
            </span>
          </button>
        </div>
      </div>
    </div>

    <b-collapse class="login-wdg2" :visible=showLoginWdg2Card>
      <login-wdg-2 v-if="showLoginWdg2Card" @logInUser="logInUserWdg2" @wdg2Close="wdg2Close" />
    </b-collapse>

    <!-- LIST CENTRE FORMATION -->
    <b-table :items="centresFormation" :fields="fields" striped class="table table-striped table-hover text-center">
    <template #cell(Actions)="row">
      <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
        <b-button variant="info" @click="click(row.item.id)" class="small-button custom-button">
          <span tooltip="Détails" flow="down">
            <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" /> voir
          </span>
        </b-button>
      </div>
    </template>
  </b-table>
    <paginate class="customPagination" :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
      >
    </paginate>
  </div>
</template>

<script>
import { centreFormationApi } from "@/_api/centreFormation.api.js"
import { CentreDeFormations } from "@/assets/js/fieldsAdmin.js";
import LoginWdg2 from "../../../../components/LoginWdg2.vue";

export default {
  name: "CentreFormationList",
  components: {
    LoginWdg2,
  },
  data() {
    return {
      centresFormation: [],
      pageCount: 0,
      perPage: 10,
      saisie: "",
      currentPage: 1,
      showLoginWdg2Card: false,
      loading: false,
      dismissCountDown: null,
      message: "",
      color: "success",
      fields: CentreDeFormations,
    };
  },
  created() {
    this.getListCentresFormation();
  },
  methods: {
    getListCentresFormation() {
      centreFormationApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => {
          this.centresFormation = response;
        });
      centreFormationApi
        .getCount(this.saisie)
        .then((response) =>
          (this.pageCount = Math.ceil(response / this.perPage))
        );
    },

    pageChange(perPage) {
      centreFormationApi
        .getAllByPage(perPage - 1, this.perPage, this.saisie)
        .then((response) => {
          this.centresFormation = response;
        });
    },
    click(centreFormation) {
      this.$router.push({
        name: "admin_centreFormation_details",
        params: { id: centreFormation },
      });
    },
    submit(e) {
      e.preventDefault();
      this.getListCentresFormation();
      this.saisie = "";
    },
    openLoginWdg2() {
      this.showLoginWdg2Card = !this.showLoginWdg2Card;
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      await centreFormationApi
        .fetchAllCentreDeFormationsDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
          this.getListCentresFormation();
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
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">
.custom-button {
  font-size: 14px; 
  padding: 8px 14px; 
}
</style>
