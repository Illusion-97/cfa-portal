<template>
  <div id="adminDashboard">
   
    <BodyTitle title="Liste des utilisateurs" />

    
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
        >Ajouter un utilisateur</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Login</th>
          <th>Mot de passe</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="usersComputed">
        <tr v-for="user in usersComputed" :key="user.id">
          <td>{{ user.id }} </td>
          <td>{{ user.prenom }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.login }}</td>
          <td>{{ user.password }}</td>
          <td>
            <router-link class="btn btn-info" :to="{name:'admin_user_detail', params: { id: user.id }}">Details</router-link>
            &nbsp;
            <router-link class="btn btn-success" :to="{name:'admin_user_update', params: { id: user.id }}">Modifier</router-link>
            &nbsp;
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
      :container-class="'pagination'"
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
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
  name: "AdminDashboard",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      users: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",
    
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
        .getAllUtilisateurs(0, this.perPage)
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
  },
};
</script>
<style scoped>
.header-list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form{
  width: 40%;
}

#saisie{
  width: 70%;
  margin-right: 5%;
}
</style>

