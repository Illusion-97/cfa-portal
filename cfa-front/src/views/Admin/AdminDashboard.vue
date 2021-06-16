<template>
  <div id="adminDashboard">
   
    <BodyTitle title="Liste des utilisateurs" />
<section>
      <div class="container">
        <div class="row">
<div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Rechercher
          </button>
        </div>
      </div>
       <router-link class="btn btn-primary" :to="{name:'admin_addUser'}">Ajouter un utilisateur</router-link>
    </div>
    </div>
  </div>
  </section>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnTxt="Ajouter un Utilisateur"
      btnLink="admin_addUser"
      
    />
    <!--
    <div class="container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Etudiants</th>
            <th scope="col">Groupe / Projets</th>
            <th scope="col">Programme de cours</th>
            <th scope="col">Cours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>.Net</td>
            <td>@voir</td>
            <td>@voir</td>
            <td>@voir</td>
            <td>@voir</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Designer</td>
            <td>@voir</td>
            <td>@voir</td>
            <td>@voir</td>
            <td>@voir</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Java</td>
            <td>@voir</td>
            <td>@voir</td>
            <td>@voir</td>
            <td>@voir</td>
          </tr>
        </tbody>
      </table>
    </div>
    -->
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { utilisateursFields } from "@/assets/js/fieldsAdmin.js"
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
      name : "",
      perPage: 5,
      items: [
        /*{
          nom : ".Net",
          etudiant:"sydaphasavanh",
          groupeProjet: "@voir",
          ProgrammeDeCours: "@voir",
          Cours: "@voir",
        },
        {
          nom : "Designer",
          etudiant:"Jack",
          groupeProjet: "@voir",
          ProgrammeDeCours: "@voir",
          Cours: "@voir",
        },
        {
          nom : "Java",
          etudiant:"potier",
          groupeProjet: "@voir",
          ProgrammeDeCours: "@voir",
          Cours: "@voir",
        },
      */],
      fields: utilisateursFields,
      
    };
  },
  methods: {

    retrieveUsers() {
      utilisateurApi.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchName() {
      utilisateurApi.getAllUsersByName(this.name)
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  },
  mounted(){
    this.retrieveUsers();
  },
  
  created() {
    utilisateurApi.getAllUsers().then(response => this.items = response);
  },
};
</script>
<style scoped>
.opts,
label {
  color: black;
}
.table {
  text-align: center;
}
.icon:hover {
  cursor: pointer;
}
</style>

