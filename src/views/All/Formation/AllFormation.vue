<template>
  <section>
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
      <div class="updateListLocation p-2">
        <button
          name="button2"
          outlined
          @click="openLoginWdg2"
          class="btn btn-outline-info"
        >
          Mise à jour des formations
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

    <!-- <router-link :to="{ name: 'admin_formation_create' }" class="button float-right">
      Ajouter une nouvelle formation
    </router-link> -->

    <!-- <small class="form-text info-text ml-1 mt-4">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
      Double-cliquez sur une formation pour plus d'info
    </small> -->
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <!-- //details -->
      <template #cell(Details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Masquer" : "Afficher" }}
        </b-button>
      </template>
      <!-- Roles -->
      <template #cell(rolesDto)="row">
        <p v-for="role in row.item.rolesDto" :key="role.id">
          {{ role.intitule }}
        </p>
      </template>
      <template #cell(action)="row">
        <b-button block variant="info" @click="gotoDetailDg2(row)">
          <font-awesome-icon :icon="['fas', 'eye']" />
          Voir dans Dg2</b-button
        >
      </template>
      <!-- https://dawan.org/Training/show/ -->
      <!--Description -->
      <template #row-details="row">
        <b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 class="btn-accordion"
                >Cursus associés
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-table
                  sticky-header
                  :items="row.item.cursus"
                  head-variant="light"
                  :fields="fieldsCursus"
                  dark
                  bordered
                >
                  <template #cell(action)="row">
                    <b-button
                      block
                      variant="info"
                      @click="gotoDetailCursus(row.item)"
                    >
                      <font-awesome-icon :icon="['fas', 'eye']" />
                    </b-button>
                  </template>
                </b-table>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 class="btn-accordion"
                >Interventions Liées</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-table
                  sticky-header
                  :items="row.item.interventions"
                  head-variant="light"
                  :fields="fieldsIntervention"
                  dark
                  bordered
                >
                  <template #cell(action)="row">
                    <b-button
                      block
                      variant="info"
                      @click="gotoDetailIntervention(row.item)"
                    >
                      <font-awesome-icon :icon="['fas', 'eye']" />
                    </b-button> </template
                ></b-table>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-card>
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
  </section>
</template>

<script>
import { formationApi } from "@/_api/formation.api.js";
import LoginWdg2 from "../../../components/LoginWdg2.vue";
import { formationFields } from "@/assets/js/fields.js";
import { fieldsCursus } from "@/assets/js/fields.js";
import { fieldsIntervention } from "@/assets/js/fields.js";

export default {
  name: "Formation",
  components: {
    LoginWdg2,
  },
  data() {
    return {
      dismissCountDown: null,
      message: "",
      color: "success",
      items: [],
      fields: formationFields,
      fieldsCursus: fieldsCursus,
      fieldsIntervention: fieldsIntervention,
      currentPage: 1,
      perPage: 10,
      pageCount: 0,
      keyword: "",
      showLoginWdg2Card: false,
      loading: false,
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      formationApi
        .getAllByPage(this.currentPage, this.perPage, this.keyword)
        .then((data) => {
          // this.assigneTableItems(data);
          this.items = data;
        });
      this.countFormation();
    },
    // assigneTableItems(formations) {
    //   console.log(formations);
    // },
    gotoDetailDg2(row) {
      let link = "https://dawan.org/Training/show/" + row.item.slug;
      Object.assign(document.createElement("a"), {
        target: "_blank",
        rel: "noopener noreferrer",
        href: link,
      }).click();
    },

    countFormation() {
      formationApi
        .countFormation(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      formationApi
        .getAllByPage(page, this.perPage, this.keyword)
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
      formationApi
        .getAllByPage(this.currentPage, this.perPage, this.key)
        .then((data) => (this.items = data));
      formationApi
        .countFormation(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    detailFormation(id) {
      this.$router.push({ name: "admin_formation_detail", params: { id: id } });
    },
    gotoDetailIntervention(intervention) {
      this.$router.push({
        name: "admin_intervention_detail",
        params: { id: intervention.id },
      });
    },
    gotoDetailCursus(cursus) {
      this.$router.push({
        name: "admin_cursus_detail",
        params: { id: cursus.id },
      });
    },
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      formationApi
        .fetchAllFormationsDG2Http({ logInUser: value })
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
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
    key: {
      get() {
        return this.keyword;
      },
      set(keyword) {
        this.keyword = keyword;
      },
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
<style scoped src="@/assets/styles/BtnAccordion.css">
</style>
<style scoped>
tbody tr {
  cursor: pointer;
}

.btn-search {
  /* border: 1px solid black; */
  border: 0;
  background-color: inherit;
  border-radius: 100%;
  width: 2.5em;
  margin-left: -3em;
}
.icon {
  color: brown;
}
.icon:hover {
  font-size: 20px;
}

.button {
  border: 1px solid black;
  border-radius: 3px;
  background-color: inherit;
  text-decoration: none;
  color: black;
  padding: 1.5px 10px;
  /* margin-bottom: 1em; */
}
</style>
