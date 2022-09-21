<template>
  <section>
    <BodyTitle title="Liste des formations" />
    <div class="d-flex flex-row align-items-end justify-content-between">
      <form class="form-inline p-2 " @submit="search">
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
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="red darken-1"
        ></v-progress-circular>
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
      <!--Description -->
      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right"><b>Civilite:</b></b-col>
            <b-col> {{ row.item.civilite }}  </b-col>
            <b-col sm="2" class="text-sm-right"><b>Adresse:</b></b-col>
            <b-col> {{ row.item.adresse }} </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right"><b>Téléphone:</b></b-col>
            <b-col> {{ row.item.telephone }}  </b-col>
            <b-col sm="2" class="text-sm-right"><b>Date de naissance:</b></b-col>
            <b-col> {{row.item.dateDeNaissance}} </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <table class="table text-center table-striped">
      <thead>
        <tr>
          <th scope="col">Intitulé</th>
          <th scope="col">Durée</th>
          <th scope="col">Prérequis</th>
          <th scope="col">Slug</th>
          <!-- <th scope="col">Voir plus</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="formation in items"
          :key="formation.id"
          @dblclick="detailFormation(formation.id)"
        >
          <td style="width: 15em">{{ formation.titre }}</td>
          <td>{{ formation.duration }}</td>
          <td>{{ formation.prerequis }}</td>
          <td>{{ formation.slug }}</td>
          <!-- <td style="width:10em;">
            <router-link
              :to="{ name: 'admin_formation_detail', params: { id: formation.id } }"
            >
              <font-awesome-icon
                :icon="['fas', 'info']"
                class="icon"
              />
            </router-link>
          </td> -->
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

    <!-- <BodyTitle title="Liste des Formations" />
    <FormationListComponent :isAction="true"/> -->
  </section>
</template>

<script>
//import TableTemplate from "@/components/utils/TableTemplate.vue";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { formationApi } from "@/_api/formation.api.js";
import LoginWdg2 from "../../../components/LoginWdg2.vue";
import { formationFields } from "@/assets/js/fields.js";
// import BodyTitle from "@/components/utils/BodyTitle.vue";
// import FormationListComponent from "@/components/List/FormationListComponent.vue";
export default {
  name: "Formation",
  components: {
    //TableTemplate,
    BodyTitle,
    // FormationListComponent,
    LoginWdg2,
  },
  data() {
    return {
     
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
        .then((data) => {this.assigneTableItems(data) ;this.items = data });
      this.countFormation();
    },
    assigneTableItems(formations){
      console.log(formations)
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
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      formationApi.fetchAllFormationsDG2Http({ logInUser: value });
      this.loading = false;
      this.$.push({ name: "admin_formation" });
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
