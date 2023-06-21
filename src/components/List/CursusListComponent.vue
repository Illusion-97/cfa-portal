<template>
  <div class="container-fluid">
    <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <div class="d-flex justify-content-center">
      <v-progress-circular v-if="loading" indeterminate color="red darken-1"></v-progress-circular>
    </div>
    <div class="d-flex flex-row align-items-end justify-content-between">
      <form v-bind:class="{ 'form form-inline': true, 'mt-5 mb-2': isModal }" @submit="submit">
        <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
      <div class="updateListCursus">
        <button name="button2" outlined @click="openLoginWdg2" class="btn btn-outline-info">
          <span v-if="!showLoginWdg2Card">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Mise à jour des cursus
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
    <div class="header-list">
      <div v-bind:class="{ 'text-align-left': true, 'mt-5 mb-2': isModal }" id="groupe-input" v-if="!isAction">
        <label class="col-1" v-if="!isModal">Cursus</label>
        <input class="col-9 form-control" type="text" :value="cursus_input" disabled="disabled" />
      </div>
    </div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(action)="row">
        <b-button block variant="info" @click="gotoDetailCursus(row.item)">
          <span tooltip="Voir le détail" flow="left">
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'eye']" />
          Détails
        </span> 
        </b-button>

        <b-button block variant="warning" @click="showModal(row.item)">
          <span tooltip="Modifier" flow="left">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
            Modifier
          </span>
        </b-button>

        <b-button block variant="primary"
          @click="gotoActiviteTypeCursus(row.item)"
        >
        <span tooltip="Voir les activitées type associées" flow="left">
          <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" />
          Voir AT
        </span>
        </b-button>
        <b-modal hide-footer :ref="'modal-' + row.item.id">
          <template #modal-title>
            <div class="text-center">Modifier le cursus</div>
          </template>

          <b-form @submit="modifierCursus(row.item)">
            <v-text-field v-model="row.item.niveau" label="Niveau*" type="number" required></v-text-field>

            <div class="w-100 d-flex justify-content-center">
              <v-text-field v-model="row.item.sigle" label="Sigle*" required></v-text-field>
            </div>

            <div class="w-100 d-flex justify-content-center">
              <v-text-field v-model="row.item.millesime" label="Millesime*" type="number" required></v-text-field>
            </div>

            <div class="w-100 d-flex justify-content-center">
              <v-text-field v-model="row.item.codeTitre" label="Code Titre*" required></v-text-field>
            </div>
            <small>*indique les champs requis</small>

            <b-button type="submit" class="mt-3" variant="warning" block>
              <font-awesome-icon class="mr-1" :icon="['fas', 'pen']" />Modifier</b-button>
          </b-form>
          <b-button class="mt-3" variant="danger" block @click="hideModal(row.item)">
            Annuler</b-button>
        </b-modal>
      </template>
    </b-table>

    <paginate :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
      >
    </paginate>
  </div>
</template>

<script>
import { cursusApi } from "@/_api/cursus.api.js";
import LoginWdg2 from "../LoginWdg2.vue";
import { fieldsCursus } from "@/assets/js/fields.js";

export default {
  name: "CursusListComponent",
  components: {
    LoginWdg2,
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    cursusProp: {
      default: null,
    },
    isModal: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    cursusProp() {
      if (this.cursusProp != null)
        this.cursus_input = `${this.cursusProp.titre}`;
    },
  },
  data() {
    return {
      dismissCountDown: null,
      color: null,
      cursus: [],
      perPage: 7,
      pageCount: 0,
      saisie: "",
      fields: fieldsCursus,
      cursus_input: "",
      items: [],
      item: {
        niveau: "",
        sigle: "",
        millesime: "",
      },
      showLoginWdg2Card: false,
      loading: false,
      message: "",
    };
  },
  computed: {
    cursusComputed() {
      return this.cursus;
    },
  },
  created() {
    this.refreshList();
  },
  methods: {
    submit(e) {
      e.preventDefault();
      cursusApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.items = response));
      cursusApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
      this.saisie = "";
    },
    showModal(item) {
      this.$refs["modal-" + item.id].show();
    },
    hideModal(item) {
      this.$refs["modal-" + item.id].hide();
      this.refreshList();
    },
    pageChange(pageNum) {
      cursusApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.items = response));
    },
    gotoDetailCursus(cursus) {
      this.$router.push({
        name: "admin_cursus_detail",
        params: { id: cursus.id },
      });
    },
    modifierCursus(item) {
      cursusApi.save(item);
      this.items = null;
      this.refreshList();
      this.hideModal(item);
      this.refreshList();
    },
    gotoActiviteTypeCursus(cursus) {
      this.$router.push({
        name: "admin_activites_types",
        params: { id: cursus.id },
      });
    },
    createCursus() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_cursus_create",
          params: {},
        });
      } else {
        this.$router.push({
          name: "cef_addCursus",
        });
      }
    },

    refreshList() {
      cursusApi.getAllByPage(0, this.perPage).then((response) => {
        this.items = response;
      });
      cursusApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        )
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCursus(cursusId) {
      cursusApi.deleteCursus(cursusId).then(() => this.refreshList());
    },
    clickList(cursus) {
      this.cursus_input = cursus.titre;
      this.$emit("click-list", cursus);
    },
    dblClick(cursus) {
      let route = this.$route.path.split("/").splice(1);

      if (route[0] == "admin")
        this.$router.push({
          name: "admin_cursus_detail",
          params: { id: cursus.id },
        });
      else if (route[0] == "cef")
        this.$router.push({
          name: "cef_cursus_detail",
          params: { id: cursus.id },
        });

    },

    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = !this.showLoginWdg2Card;
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      cursusApi
        .fetchAllCursusDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
          this.refreshList();
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

<style scoped src="@/assets/styles/CrudListComponent.css"></style>

