<template>
  <div id="adminDashboard">
   
    <BodyTitle title="Liste des utilisateurs" />

    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
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
  created() {
    utilisateurApi.getAllUsersHttp().then(response => this.items = response);
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

