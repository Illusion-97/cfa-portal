<template>
  <div id="Examens">
    <Navbar-Referent />
    <BodyTitle title="Liste des Examens" />

    <div class="container">
      <br />
      <div class="row g-3">
        <div class="col-sm-3">
          <a href="/referent/creationExamenR" class="btn btn-primary"
            >Créer un Examen</a
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
            <th scope="col">Cursus</th>
            <th scope="col">Formation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
             <td>Enonce#1</td>
             <td>Cursus#1</td>
             <td>Formation#1</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Enonce#2</td>
            <td>Cursus#2</td>
            <td>Formation#1</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Enonce#3</td>
            <td>Cursus#3</td>
            <td>Formation#1</td>
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
  name: "Examens",
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

