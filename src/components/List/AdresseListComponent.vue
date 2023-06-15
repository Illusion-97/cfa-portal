<template>
  <div id="adresseList" class="container-fluid">
    <b-alert class="m-4 " :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <div class="d-flex justify-content-center">
      <v-progress-circular v-if="loading" indeterminate color="red darken-1"></v-progress-circular>
    </div>
    <div class="d-flex flex-row align-items-end justify-content-between">

      <!-- BARRE DE RECHERCHE -->
      <form class="form-inline form" @submit="submit">
        <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>

      <!-- AJOUT ADRESSE -->
      <button @click="openClick()" class="btn btn-outline-info mt-4 ">
        <span v-if="!visible">
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" />Ajouter une adresse
        </span>
        <span v-else>
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
        </span>
      </button>
    </div>

    <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
      <addAdresse ref="childRef" @hidden="openClick" :modifierAdresse="modifier" :adresse="adresse">
      </addAdresse>
    </b-collapse>
    <br>

    <!-- LIST ADRESSE -->
    <b-table :items="adresses" :fields="fields" striped responsive="sm">
      <!-- Actions -->
      <template #cell(Actions)="row">
        <v-app>
          <div class="d-flex align-items-center justify-content-between">
            <v-btn class="m-0  widthBtn" color="error" @click="deleteAdresse(row.item.id)">
              <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />
              Supprimer
            </v-btn>
            <v-btn class="m-0 widthBtn" color="warning" dark @click="update(row.item)">
              <font-awesome-icon class="mr-1" :icon="['fas', 'pen']" /> Modifier
            </v-btn>
          </div>
        </v-app>
      </template>
    </b-table>

    <!-- PAGINATION -->
    <paginate :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
      >
    </paginate>
  </div>
</template>
<script>
import { adresseApi } from "@/_api/adresse.api.js";
import addAdresse from "@/views/Admin/Crud/Entreprise/EntrepriseAddAdresse.vue";
import { AdresseFields } from "@/assets/js/fieldsAdmin.js";
export default {
  name: "AdresseListComponent",
  components: {
    addAdresse
  },
  data() {
    return {
      adresses: [],
      perPage: 7,
      pageCount: 0,
      saisie: "",
      modifier: true,
      adresse: {},
      visible: false,
      dismissCountDown: null,
      message: "",
      color: "success",
      loading: false,
      fields: AdresseFields,
    };
  },
  created() {
    this.refreshList();
  },
  methods: {
    openClick(data) {
      this.visible = !this.visible;
      this.$refs.childRef.clear();
      try  {
        if (data.id > 0) {
          this.adresse = data;
          this.$refs.childRef.modifier();
        } 
      } catch{
        this.modifier = false;
      }
      if (data == "Adresse ajouter.") {
        this.color = "success";
        this.dismissCountDown = 6;
        this.message = data;
        this.loading = false;
        this.refreshList();
      }
      if (data == "Adresse modifier.") {
        this.color = "success";
        this.dismissCountDown = 6;
        this.message = data;
        this.loading = false;
        this.refreshList();
      }
      if (data == "Clear") 
        this.modifier = false;
    },
    submit(e) {
      e.preventDefault();
      adresseApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.adresses = response));
      adresseApi
        .getCount(this.saisie)
        .then((response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      adresseApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.adresses = response));
    },
    refreshList() {
      adresseApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.adresses = response));
      adresseApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteAdresse(adresseId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res)
        adresseApi.deleteAdresse(adresseId).then(() => this.refreshList());
    },
    update(adresse) {
      this.modifier = true;
      this.visible = false;
      this.openClick(adresse);
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
