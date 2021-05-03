<template>
  <div id="Devoirs">
    <Navbar-Referent />
    <BodyTitle title="Liste des Devoirs" />

    <div class="container">
      <br />
      <div class="row g-3">
        <div class="col-sm-3">
          <a href="/referent/creationDevoirR" class="btn btn-primary"
            >Créer un Devoir</a
          >
        </div>
      </div>
      <br />
      <br/>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Enonce</th>
            <th scope="col">Date début</th>
            <th scope="col">Date fin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
             <td>Enonce#1</td>
             <td>15/03/2021</td>
             <td>20/03/2021</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Enonce#2</td>
            <td>01/04/2021</td>
            <td>06/04/2021</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Enonce#3</td>
            <td>03/01/2021</td>
            <td>08/01/2021</td>
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
  name: "Devoirs",
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

