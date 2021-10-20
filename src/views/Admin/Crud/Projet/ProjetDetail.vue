<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <b-card no-body id="my-card">
      <b-card-header>
        <span class="font-weight-bold">Projet : {{ projet.nom }}</span>
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateProjet()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteProjet()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <div class="offset-1 col-10 mb-5">
        <div class="">
          <span class="mon-label">Description :</span>
          <p class="">{{ projet.description }}</p>
        </div>        
      </div>

      <div class="offset-1 col-10 mb-5">
        <div class="mb-2">
          <span class="mon-label">Groupe :</span>
          <span class="group-nom">{{ projet.groupeDto.nom }}</span>
        </div>
        <table class="table">
          <thead class="">
            <tr>
              <th>Etudiant</th>
              <th>Email</th>
              <th>Promotions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="etudiant in etudiantsComputed" :key="etudiant.id">
              <td>{{ etudiant.utilisateurDto.prenom }} {{ etudiant.utilisateurDto.nom }}</td>
              <td>{{ etudiant.utilisateurDto.login }}</td>
              <td>
                <div
                  v-for="promotion in etudiant.promotionsDto"
                  :key="promotion.id"
                >
                  {{ promotion.nom }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="offset-1 col-10 text-align-left">
        <div class="div-files">
          <label class="mon-label">Documents : </label>
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            class="mr-3"
          />
          <button
            v-if="routeId"
            v-on:click.stop.prevent="submitFile(routeId)"
            class="btn btn-primary"
          >
            Ajouter
          </button>
        </div>

        <b-table
          v-if="routeId && items.length > 0"
          class="table"
          striped
          small
          :items="items"
          :fields="fields"
        >
          <template #cell(name_dl)="data">
            <font-awesome-icon
              :icon="['fas', 'arrow-down']"
              class="icon text-success"
              @click="download_file(routeId, data.value)"
            />
          </template>

          <template #cell(name_delete)="data">
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="icon text-danger"
              @click="delete_file(routeId, data.value)"
            />
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
import { projetApi } from "@/_api/projet.api.js";
import { groupeApi } from "@/_api/groupe.api.js";
import { fileApi } from "@/_api/file.api.js";
import { fileFields } from "@/assets/js/fields.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "ProjetDetail",
  components: {},
  data() {
    return {
      projetId: this.$route.params.id,
      //On initialise nom pour éviter les soucis dans la console
      projet: { nom: "", groupeDto: { nom: "" } },
      loading: false,

      etudiants: [],

      //Pour les files
      files: [],
      fields: fileFields,
      file: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    refreshListEtudiant(id) {
      groupeApi
        .getEtudiants(id)
        .then((response) => (this.etudiants = response));
    },
    updateProjet() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_projet_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_projet_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_projet_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_projet_update",
        });
      }
    },
    deleteProjet() {
      projetApi.deleteProjet(this.$route.params.id).then(() => this.goBack());
    },

    //Pour la piece jointe
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile(id) {
      if (this.file)
        fileApi
          .submitFileByDirectoryAndId("projets", id, this.file)
          .then(() => this.refreshListFiles(id));
    },
    refreshListFiles(id) {
      fileApi
        .getListByDirectoryAndId("projets", id)
        .then((response) => (this.files = response));
    },
    download_file(id, fileName) {
      fileApi.downloadByDirectoryAndIdAndFilename("projets", id, fileName);
    },
    delete_file(id, fileName) {
      fileApi
        .deleteByDirectoryAndIdAndFilename("projets", id, fileName)
        .then(() => this.refreshListFiles(id));
    },
  },
  created() {
    projetApi
      .getById(this.projetId)
      .then((response) => {this.projet = response; this.refreshListEtudiant(this.projet.groupeDto.id);});

    //Pour etre sur, on test les 3 possibilités qui sont source d'erreurs
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      this.refreshListFiles(this.$route.params.id);
    }
  },
  computed: {
    etudiantsComputed() {
      return this.etudiants;
    },
    //Pour les files
    items() {
      let result = [];

      for (let i = 0; i < this.files.length; i++) {
        let table = { name: "", name_dl: "", name_delete: "" };

        table.name = this.files[i];
        table.name_dl = this.files[i];
        table.name_delete = this.files[i];

        result.push(table);
      }

      return result;
    },
    rows() {
      return this.items.length;
    },
    routeId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
.div-files{
  display: flex;
  justify-content: space-between;
}


</style>
