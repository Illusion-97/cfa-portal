<template>
  <div id="adminDashboard" class="container-fluid">
    <b-alert class="m-4 " :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <div class="d-flex justify-content-center">
      <v-progress-circular v-if="loading" indeterminate color="red darken-1"></v-progress-circular>
    </div>
    <div class="text-align-left" id="groupe-input" v-if="!isAction">
      <label class="col-1">utilisateur</label>
      <input class="col-9 form-control" type="text" :value="utilisateur_input" disabled="disabled" />
    </div>
    <div class="d-flex flex-row align-items-end justify-content-between">

      <!-- BARRE DE RECHERCHE -->
      <form class="form-inline p-2" @submit="submit">
        <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie"
          @change="onSelected" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>

      <!-- LISTE DES ROLES -->
      <select class="custom-select m-0 p-2 w-25" v-model="selected_role" aria-label="Default select example"
        @change="refreshList()">
        <option value="">Tous les roles</option>
        <option :value="role.intitule" v-for="role in rolesComputed" :key="role.id">
          {{ role.intitule | lowercase | capitalize }}
        </option>
      </select>

      <!-- MAJ UTILISATEURS -->
      <div class="updateListCursus p-2">
        <button name="button2" outlined @click="openLoginWdg2" class="btn btn-outline-info">
          Mise à jour des utilisateurs
        </button>
        <div class="login-wdg2">
          <login-wdg-2 v-if="showLoginWdg2Card" @logInUser="logInUserWdg2" @wdg2Close="wdg2Close" />
        </div>
      </div>

      <!-- MAJ ETUDIANT -->
      <div class="etudiant p-2">
        <button name="button2" outlined @click="openLoginWdg2Etudiant" class="btn btn-outline-info">
          Mise à jour des étudiants
        </button>
        <div class="login-wdg2">
          <login-wdg-2 v-if="showLoginWdg2CardEtudiant" @logInUser="logInUserWdg2Etudiant"
            @wdg2Close="wdg2CloseEtudiant" />
        </div>
      </div>

      <div class="tuteur p-2">
        <button @click="openClick" class="btn btn-outline-info">
          <span v-if="!visible">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter un tuteur
          </span>
          <span v-else>
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
          </span>
        </button>
      </div>
    </div>

    <!-- AJOUT TUTEUR -->
    <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
      <addTuteur @hidden="openClick">
      </addTuteur>
    </b-collapse>

    <div v-if="message == 'Tuteur ajouter.'" class="my-success-feedback"> {{ message }} </div>

    <!-- <button v-if="isAction" class="btn btn-outline-success" id="toggle" @click="showFileInput">Importer des
          utilisateurs
        </button>
        <form action="POST" class="d-flex" enctype="multipart/form-data">
          <input id="file" type="file" name="file" ref="file" class="ml-2" @change="handleFileUpload" accept=".csv" />
          <button class="btn btn-secondary rounded-sm" @click="makeToast(variant)" type="button"
            id="btn-import">Importer</button>
        </form> -->
    <!-- <router-link class="btn btn-outline-primary px-3 mx-3" :to="{ name: 'admin_addUser' }" v-if="isAction">Ajouter
          un utilisateur</router-link>
      </div> -->

    <!-- <small class="form-text info-text ml-1 mt-4 mb-2">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
      Mise à jour des user dg2 en attente de la requête
    </small> -->
    <br>

    <!-- LISTE DES UTILISATEURS -->
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
            <b-col> {{ row.item.civilite }} </b-col>
            <b-col sm="2" class="text-sm-right"><b>Adresse:</b></b-col>
            <b-col> {{ row.item.adresse }} </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right"><b>Téléphone:</b></b-col>
            <b-col> {{ row.item.telephone }} </b-col>
            <b-col sm="2" class="text-sm-right"><b>Date de naissance:</b></b-col>
            <b-col> {{ row.item.dateDeNaissance }} </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <paginate :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
    </paginate>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { utilisateursRoleApi } from "@/_api/utilisateurRole.api.js";
import addTuteur from "@/components/Admin/AddTuteur.vue"
import { utilisateursFields } from "@/assets/js/fieldsAdmin.js";
import LoginWdg2 from "../LoginWdg2.vue";
export default {
  name: "UserListComponent",
  components: {
    addTuteur,
    LoginWdg2,
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    utilisateurProp: {
      default: null,
    },
  },
  watch: {
    utilisateurProp() {
      if (this.utilisateurProp != null)
        this.utilisateur_input = `${this.utilisateurProp.prenom}`;
    },
  },

  data() {
    return {
      visible: false,
      dismissCountDown: null,
      message: "",
      color: "success",
      selected: null,
      users: [],
      userId: this.$store.getters.getUtilisateur.id,
      roles: [],
      perPage: 7,
      pageCount: 0,
      saisie: "",
      fields: utilisateursFields,
      items: [],
      le: { width: "5%" },
      utilisateur_input: "",
      selected_role: "",
      // Gestion de l'import de fichier
      file_imported: "",
      toast_message: "",
      variant: "",
      formData: null,

      showLoginWdg2Card: false,
      showLoginWdg2CardEtudiant: false,
      loading: false,
    };
  },
  computed: {
    usersComputed() {
      return this.users;
    },
    nbPageComputed() {
      return this.pageCount;
    },
    rolesComputed() {
      return this.roles;
    },
  },
  created() {
    this.refreshList();
    this.getRoles();
  },
  methods: {
    openClick(data) {
      this.visible = !this.visible;
      if (data) {
        this.message = data;
        this.refreshList;
      }
    },
    assigneTableItems(users) {
      this.items = [];
      users.forEach((e) => {
        let item = {
          nom: e.nom,
          prenom: e.prenom,
          login: e.login,
          rolesDto: e.rolesDto,
          civilite: e.civilite,
          telephone: e.telephone,
          adresse:
            e.adresseDto != null
              ? e.adresseDto.libelle +
              " " +
              e.adresseDto.codePostal +
              " " +
              e.adresseDto.ville
              : "Pas d'adresse",
          dateDeNaissance: e.dateDeNaissance,
        };
        this.items.push(item);
      });
    },
    makeToast(variant) {
      utilisateurApi
        .uploadUser(this.userId, this.formData)
        .then((res) => {
          this.variant = variant;
          this.file_imported != ""
            ? (this.toast_message = res.data)
            : (this.toast_message = "Fichier introuvable");
          res.status == 200
            ? (this.variant = "success")
            : (this.variant = "danger"); // change la couleur du toast en fonction du statuscode
        })
        .then(() => {
          this.$bvToast.toast(this.toast_message, {
            title: "Import des utilisateurs",
            autoHideDelay: 5000,
            variant: this.variant,
          });
        })
        .then(() => {
          this.refreshList();
          document.getElementById("file").value = "";
          this.formData = null;
        });
    },
    handleFileUpload() {
      this.file_imported = this.$refs.file.files[0];
      this.formData = new FormData();
      this.formData.append("file", this.file_imported);
    },
    fileUpload() {
      utilisateurApi
        .uploadUser(this.formData)
        .then((res) => {
          alert(res.data);
          this.formData = null;
        })
        .then(() => this.refreshList());
    },
    showFileInput(e) {
      e.preventDefault();
      document.getElementById("toggle").style.display = "none";
      document.getElementById("file").style.display = "block";
      document.getElementById("btn-import").style.display = "block";
    },
    getRoles() {
      utilisateursRoleApi.getAll().then((data) => (this.roles = data));
    },
    onSelected() {
      utilisateursRoleApi
        .getById(this.selected_role.id)
        .then((data) => (this.selected_role = data));
    },
    submit(e) {
      e.preventDefault();
      this.refreshList();
      this.saisie = "";
    },
    pageChange(pageNum) {
      utilisateurApi
        .getByRoleByPage(
          this.selected_role,
          pageNum - 1,
          this.perPage,
          this.saisie
        )
        .then((response) => this.assigneTableItems(response));
    },
    refreshList() {
      utilisateurApi
        .getByRoleByPage(this.selected_role, 0, this.perPage, this.saisie)
        .then((response) => { this.assigneTableItems(response) });

      utilisateurApi
        .getCountByRole(this.selected_role, this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    openLoginWdg2Etudiant() {
      this.showLoginWdg2CardEtudiant = true;
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;

      utilisateurApi
        .fetchAllUsersDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });
      this.refreshList();
    },
    async logInUserWdg2Etudiant(value) {
      this.showLoginWdg2CardEtudiant = false;
      this.loading = true;

      etudiantApi
        .fetchAllEtudiantDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });
      this.refreshList();
    },
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    },
    wdg2CloseEtudiant(value) {
      this.showLoginWdg2CardEtudiant = value;
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
<style scoped lang="css">
#file,
#btn-import {
  display: none;
}
.my-success-feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 100%;
  color: green;
  font-weight: bolder;
}
</style>