<template>
  <div id="adminDashboard">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">utilisateur</label>
        <input class="col-9 form-control" type="text" :value="utilisateur_input" disabled="disabled"/>
      </div>
    <div class="header-list">
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn btn-outline-secondary" type="submit">Recherche</button>
      </form>

      <router-link class="btn btn-primary" :to="{ name: 'admin_addUser' }"
        v-if="isAction"
        >Ajouter un utilisateur</router-link
      >
    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <!-- <th>#</th> -->
          <th>Prénom</th>
          <th>Nom</th>
          <th>Login</th>
          <!-- <th>Mot de passe</th> -->
          <!-- <th>Adresse</th> -->
          <!-- <th>Entreprise</th> -->
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="usersComputed">
        <tr v-for="user in usersComputed" :key="user.id"
            v-on:click="clickList(user)">
          <!-- <td>{{ user.id }} </td> -->
          <td>{{ user.prenom }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.login }}</td>
          <!-- <td>{{ user.password }}</td> -->
          <!-- <td>{{ user.adresseDto.rue}}</td> -->
          <!-- <td>{{ user.entrepriseDto.raisonSociale}}</td> -->
          
          <td v-if="isAction">
            <router-link class="btn btn-info" :to="{name:'admin_user_detail', params: { id: user.id }}">Details</router-link>
            <!-- &nbsp; -->
            <router-link class="btn btn-success mx-2" :to="{name:'admin_user_update', params: { id: user.id }}">Modifier</router-link>
            <!-- &nbsp; -->
            <button class="btn btn-danger" v-on:click="deleteUtilisateur(user.id)">
              Supprimer
            </button>
          </td>
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
  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
  name: "UserListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    utilisateurProp: {
      default: null,
    }
  },
  watch: {
    utilisateurProp(){
      if (this.utilisateurProp != null) 
        this.utilisateur_input = `${this.utilisateurProp.prenom}`;
    }
  },
  data() {
    return {
      users: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",

      utilisateur_input: "",
    
    };
  },
  computed: {
    usersComputed() {
      return this.users;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },

  methods: {

    submit(e) {
      e.preventDefault();
      utilisateurApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.users = response));
      utilisateurApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      utilisateurApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.users = response));
    },
    refreshList() {
      utilisateurApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.users = response));
      utilisateurApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteUtilisateur(userId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
        utilisateurApi.deleteUtilisateur(userId).then(() => this.refreshList());
      }
    },
    clickList(utilisateur) {
      this.utilisateur_input = utilisateur.prenom;
      this.$emit('click-list',utilisateur);
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">
</style>

