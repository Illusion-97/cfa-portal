<template>
  <section>
    <b-alert class="m-4" :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <div class="d-flex flex-row align-items-end justify-content-between m-3">
      <form class="form-inline" @submit="search">
        <input id="saisie" name="saisie" type="text" class="form-control" v-model="key"
          placeholder="Rechercher une formation..." />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
      <div class="updateListLocation">
        <button name="button2" outlined @click="openLoginWdg2" class="btn btn-outline-info">
          <span v-if="!showLoginWdg2Card">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Mise à jour des formations
          </span>
          <span v-else>
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" /> Fermer
          </span>
        </button>
      </div>
    </div>

    <b-collapse class="login-wdg2" :visible=showLoginWdg2Card>
      <login-wdg-2 v-if="showLoginWdg2Card" @logInUser="logInUserWdg2" @wdg2Close="wdg2Close" />
    </b-collapse>

    <b-table :items="items" :fields="fields" striped responsive="sm"  class="m-3">
      <!-- //details -->
      <template #cell(Details)="row">
        <b-button @click="row.toggleDetails" class="pl-4 pr-4">
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
        <b-button variant="info" @click="gotoDetailDg2(row)" class="ml-5 pl-4 pr-4">
          <span tooltip="Voir dans Dg2" flow="down">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'eye']" />
            Voir
          </span>
        </b-button>
      </template>
    </b-table>
    <paginate class="customPagination" :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
      >
    </paginate>
  </section>
</template>

<script>
import { formationApi } from "@/_api/formation.api.js";
import LoginWdg2 from "../../../components/LoginWdg2.vue";
import { formationFields } from "@/assets/js/fields.js";


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
    goToDetailFormation(id) {
      this.$router.push({ name: "admin_formation_detail", params: { id: id } });
    },
    openLoginWdg2() {
      this.showLoginWdg2Card = !this.showLoginWdg2Card;
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
<style scoped src="@/assets/styles/BtnAccordion.css"></style>
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

</style>
