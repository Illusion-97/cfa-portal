<template>
  <div id="adminDashboard">
    <div class="text-align-left" id="groupe-input" v-if="!isAction">
      <label class="col-1">utilisateur</label>
      <input class="col-9 form-control" type="text" :value="utilisateur_input" disabled="disabled" />
    </div>
    <div class="row">
      <div class="d-flex justify-content-start">
        <select class="custom-select mr-3" v-model="selected_role" aria-label="Default select example"
          @change="refreshList()">
          <option value="">Tous les roles</option>
          <option :value="role.intitule" v-for="role in rolesComputed" :key="role.id">
            {{ role.intitule | lowercase | capitalize }}
          </option>
        </select>
        <form class="form-inline" @submit="submit">
          <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher" v-model="saisie"
            @change="onSelected" />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>
      </div>
      <div class="ml-auto d-flex justify-content-around">
        <button class="btn btn-outline-success" id="toggle" @click="showFileInput">Importer des
          utilisateurs
        </button>
        <form action="POST" class="d-flex" enctype="multipart/form-data">
          <input id="file" type="file" name="file" ref="file" class="ml-2" @change="handleFileUpload" accept=".csv" />
          <button class="btn btn-secondary rounded-sm" @click="makeToast(variant)" type="button"
            id="btn-import">Importer</button>
        </form>
        <router-link class="btn btn-outline-primary px-3 mx-3" :to="{ name: 'admin_addUser' }" v-if="isAction">Ajouter
          un utilisateur</router-link>
      </div>
    </div>

    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="usersComputed">
        <tr v-for="user in usersComputed" :key="user.id" v-on:click="clickList(user)">
          <td>{{ user.prenom }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.login }}</td>
          <td>
            <p v-for="role in user.rolesDto" :key="role.id">
              {{ role.intitule }}
            </p>
          </td>

          <td v-if="isAction">
            <button class="btn btn-info" v-on:click="detailUtilisateur(user.id)">
              Details
            </button>
            <router-link class="btn btn-success mx-2" :to="{ name: 'admin_user_update', params: { id: user.id } }">
              Modifier</router-link>
            <button class="btn btn-danger" v-on:click="deleteUtilisateur(user.id)">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <paginate :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
    </paginate>
  </div>
</template>

<script>
  import { utilisateurApi } from "@/_api/utilisateur.api.js";
  import { utilisateursRoleApi } from "@/_api/utilisateurRole.api.js";
  export default {
    name: "UserListComponent",
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
        users: [],
        userId : this.$store.getters.getUtilisateur.id,
        roles: [],
        perPage: 10,
        pageCount: 0,
        saisie: "",

        utilisateur_input: "",
        selected_role: "",
        // Gestion de l'import de fichier
        file_imported: "",
        toast_message: "",
        variant: "",
        formData : null
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
      makeToast(variant) { // genere une notif si l'import du fichier est reussi ou non
        utilisateurApi.uploadUser(this.userId,this.formData) // appel du service pour l'upload
          .then((res) => {
            this.variant = variant;
            // this.toast_message = res.data;
            this.file_imported != "" ? this.toast_message = res.data : this.toast_message = "Fichier introuvable";
            res.status == 200 ? this.variant = "success" : this.variant = "danger"; // change la couleur du toast en fonction du statuscode
          }).then(() => { // genere le toast
            this.$bvToast.toast(this.toast_message, {
              title: 'Import des utilisateurs',
              autoHideDelay: 5000,
              variant: this.variant
            })
          })
          .then(() => { // une fois l'upload reussi => on met à jour la liste
            this.refreshList();
            document.getElementById("file").value = "";
            this.formData = null;
          })

      },
      handleFileUpload() { // recupere les donnée du fichier uploadé
        this.file_imported = this.$refs.file.files[0];
        this.formData = new FormData();
        this.formData.append("file", this.file_imported);
      },
      fileUpload() {
        utilisateurApi.uploadUser(this.formData)
          .then((res) => {
            alert(res.data);
            this.formData = null
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
      },
      pageChange(pageNum) {
        utilisateurApi
          .getByRoleByPage(
            this.selected_role,
            pageNum - 1,
            this.perPage,
            this.saisie
          )
          .then((response) => (this.users = response));
      },
      refreshList() {
        utilisateurApi
          .getByRoleByPage(this.selected_role, 0, this.perPage, this.saisie)
          .then((response) => (this.users = response));

        utilisateurApi
          .getCountByRole(this.selected_role, this.saisie)
          .then(
            (response) => (this.pageCount = Math.ceil(response / this.perPage))
          );
      },
      deleteUtilisateur(userId) {
        var res = confirm("Êtes-vous sûr de vouloir supprimer?");
        if (res) {
          utilisateurApi.deleteUtilisateur(userId).then(() => this.refreshList());
        }
      },
      detailUtilisateur(id) {
        switch (this.selected_role) {
          case "":
            this.$router.push({
              name: "admin_user_detail",
              params: {
                id: id,
              },
            });
            break;
          case "ETUDIANT":
            utilisateurApi
              .getById(id)
              .then((response) =>
                this.$router.push({
                  name: "admin_etudiant_detail",
                  params: {
                    id: response.etudiantDto.id
                  },
                })
              );
            break;
            // case "FORMATEUR":
            //   console.log("pas de page detail pour formateur")
            //   break;
            // case "REFERENT":
            //   console.log("pas de page detail pour referent")
            //   break;
            // case "CEF":
            //   console.log("pas de page detail pour cef")
            //   break;
            // case "ADMIN":
            //   console.log("pas de page detail pour admin")
            //   break;
        }
      },
      clickList(utilisateur) {
        this.utilisateur_input = utilisateur.prenom;
        this.$emit("click-list", utilisateur);
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
</style>