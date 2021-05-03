<template>
  <div id="referentDashboard">
    <Navbar-Referent />
    <BodyTitle title="Liste des Promotions" />

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
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "ReferentDashboard",
  components: {
    NavbarReferent,
    BodyTitle,
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

