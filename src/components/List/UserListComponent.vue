<template>
  <div id="adminDashboard" class="container-fluid">
    <!-- MESSAGE D'ALERT -->
    <b-alert class="m-4 " :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>

    <!-- LOADING -->
    <div class="d-flex justify-content-center">
      <v-progress-circular v-if="loading" indeterminate color="red darken-1"></v-progress-circular>
    </div>

    <div class="text-align-left" id="groupe-input" v-if="!isAction">
      <label class="col-1">utilisateur</label>
      <input class="col-9 form-control" type="text" :value="utilisateur_input" disabled="disabled" />
    </div>
    <div class="d-flex flex-row align-items-end justify-content-between m-3">

      <!-- BARRE DE RECHERCHE -->
      <form class="form-inline p-2" @submit="search">
        <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>

      <!-- LISTE DES ROLES -->
      <select class="custom-select m-2 w-25" v-model="selected_role" aria-label="Default select example"
        @change="refreshList()">
        <option value="">Tous les roles</option>
        <option :value="role.intitule" v-for="role in rolesComputed" :key="role.id">
          {{ role.intitule | lowercase | capitalize }}
        </option>
      </select>

      <!-- MAJ UTILISATEURS -->
      <div class="utilisateurs p-2">
        <button @click="openModalMajUsers" class="btn btn-outline-info">
          <span v-if="!visibleMajUsers">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Mise à jour des utilisateurs
          </span>
          <span v-else>
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" /> Fermer
          </span>
        </button>
      </div>

      <!-- MAJ ETUDIANT -->
      <div class="etudiant p-2">
        <button @click="openModalMajStudent" class="btn btn-outline-info">
          <span v-if="!visibleMajStudent">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Mise à jour des étudiants
          </span>
          <span v-else>
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" /> Fermer
          </span>
        </button>
      </div>

      <!-- ADD TUTEUR -->
      <div class="tuteur p-2">
        <button @click="openModalAddTuteur" class="btn btn-outline-info">
          <span v-if="!visibleAddTuteur">
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter un tuteur
          </span>
          <span v-else>
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" /> Fermer
          </span>
        </button>
      </div>
    </div>

    <!-- AJOUT TUTEUR -->
    <b-collapse id="collapse-1" :visible=visibleAddTuteur class="mt-2 mb-4">
      <addTuteur @hidden="ajoutTuteur" @cancel="openModalAddTuteur">
      </addTuteur>
    </b-collapse>

    <b-collapse class="modalWdg2" :visible=visibleMajStudent>
      <login-wdg-2 @hidden="openModalMajStudent" @logInUser="logInUserWdg2Etudiant" @wdg2Close="wdg2CloseEtudiant" />
    </b-collapse>

    <b-collapse class="modalWdg2" :visible=visibleMajUsers>
      <login-wdg-2 @hidden="openModalMajUsers" @logInUser="logInUserWdg2" @wdg2Close="wdg2Close" />
    </b-collapse>

    <br>
    <!-- LISTE DES UTILISATEURS -->
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <!-- //details -->
      <template #cell(Details)="row">
        <b-button variant="info" @click="row.toggleDetails" class="pl-4 pr-4">
          <font-awesome-icon class="mr-1 mt-1" :icon="row.detailsShowing ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
          {{ row.detailsShowing ? "Masquer" : "Afficher" }}
        </b-button>
      </template>
      <!-- Roles -->
      <template #cell(rolesDto)="row">
        <p v-for="role in row.item.rolesDto" :key="role.id">
          {{ role.intitule }}
        </p>
      </template>
      <template #cell(Modifier)="row">
        <b-button variant="warning" @click=ouvrirModalModification(row.item) class="pl-3 pr-3">
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'edit']" />
          Modifier
        </b-button>
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

    <b-modal hide-footer v-model="showModalRoleUser" title="Modifier le rôle de l'utilisateur">
      <b-form>
        <label>Selectionner les roles : </label>
        <b-form-checkbox-group v-model="editRoles" :options="options" class="mb-3" value-field="item"
          text-field="name"></b-form-checkbox-group>
        <!-- <div class="mt-3">Selected: <strong>{{ editRoles }}</strong></div> -->
        <b-button type="button" class="mt-3" variant="warning" @click=modifierRolesUtilisateur>
          <font-awesome-icon class="mr-1" :icon="['fas', 'edit']" />Modifier</b-button>
      </b-form>
    </b-modal>

    <paginate class="customPagination" :page-count="pageCount" :page-range="1" :margin-pages="2"
      :click-handler="pageChange" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination float-right'"
      :page-class="'page-item'" :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
      :prev-link-class="'page-link'" :next-link-class="'page-link'" :active-class="'active'">
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
      visibleAddTuteur: false,
      visibleMajStudent: false,
      visibleMajUsers: false,
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

      showModalRoleUser: false,
      editRoles: [],
      options: [],
      item: {}
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
    openModalAddTuteur() {
      this.visibleAddTuteur = !this.visibleAddTuteur;
      this.visibleMajStudent = false;
      this.visibleMajUsers = false;
    },
    ajoutTuteur(data) {
      if (data == "Tuteur ajouter.") {
        this.visibleAddTuteur = false;
        this.color = "success";
        this.dismissCountDown = 6;
        this.message = data;
        this.loading = false;
        this.refreshList();
      }
      else {
        this.visibleAddTuteur = true;
        this.color = "danger";
        this.dismissCountDown = 8;
        this.message = data;
        this.loading = false;
      }
    },
    openModalMajUsers() {
      this.visibleMajUsers = !this.visibleMajUsers;
      this.visibleMajStudent = false;
      this.visibleAddTuteur = false;
    },
    openModalMajStudent() {
      this.visibleMajStudent = !this.visibleMajStudent
      this.visibleAddTuteur = false
      this.visibleMajUsers = false
    },
    assigneTableItems(users) {
      this.items = [];
      if (users != null) {
        users.forEach((e) => {
          let item = {
            id: e.id,
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
        })
      }
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
    search(e) {
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
    wdg2Close() {
      this.visibleMajUsers = !this.visibleMajUsers;
      this.visibleAddTuteur = false;
      this.visibleMajStudent = false;
    },
    wdg2CloseEtudiant() {
      this.visibleMajStudent = !this.visibleMajStudent;
      this.visibleAddTuteur = false;
      this.visibleMajUsers = false;
    },
    ouvrirModalModification(item) {
      // console.log("user id : ", item.id)

      this.item = item
      if (this.item.rolesDto.length > 0) {
        this.editRoles = this.item.rolesDto.map(r => r.id)
      }
      this.fetchRolesFromDatabase();
      this.showModalRoleUser = true; // Affiche la modal de modification des rôles
    },
    closeModal() {
      this.showModalRoleUser = false;
    },
    modifierRolesUtilisateur() {
      const userId = this.item.id;
      utilisateurApi
        .updateRole(userId, this.editRoles)
        .then((data) => {
          // Traitement de la réponse
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = 'Rôles modifiés avec succès !';
          this.loading = false;
          console.log('Rôles modifiés avec succès !', data);
          // Fermer la modal
          this.showModalRoleUser = false;
          utilisateurApi
            .getByLogin(this.$store.getters.getUtilisateur.login)
            .then((response) => this.$store.dispatch("setUtilisateur", response));
          this.refreshList();
        })
        .catch((error) => {
          // Gestion des erreurs
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = "Une erreur s'est produite lors de la modification des rôles.";
          this.loading = false;
          console.error('Une erreur s\'est produite lors de la modification des rôles :', error);
        });
      this.editRoles = [];
      console.log(this.items);
    },
    fetchRolesFromDatabase() {
      utilisateursRoleApi.getAll()
        .then((data) => {
          this.options = data.map((role) => ({
            item: role.id,
            name: role.intitule,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
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

.modalWdg2 {
  margin-left: 30%;
}
</style>