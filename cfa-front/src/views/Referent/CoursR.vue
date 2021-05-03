<template>
  <div id="Cours">
    <Navbar-Referent />
    <BodyTitle title="Liste des Cours" />

    <div class="container">
      <br />
      <div class="row g-3">
        <div class="col-sm-3">
          <a href="/referent/creationCours" class="btn btn-primary"
            >Créer un cours</a
          >
        </div>
      </div>
      <br />
      <a href="/referent/creationNoteInfo" class="btn btn-outline-dark"
        >Rédiger une note d'information optionnelle</a>
      <a href="/referent/creationSupportDeCours" class="btn btn-outline-info"
        >Enregistrer un support de cours</a>
      <a href="/referent/examensR" class="btn btn-outline-secondary"
        >Voir la liste des examens</a>
      <a href="/referent/devoirsR" class="btn btn-outline-success"
        >Voir la liste des devoirs</a>
      <br />
      <br/>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Note d'information</th>
            <th scope="col">Programme de cours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>C#</td>
            <td>Lorem ipsum dolor sit, amet consectetur adipisicing elit</td>
            <td>Programme C#</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Java</td>
            <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit</td>
            <td>Programme Java</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>SQL</td>
            <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit</td>
            <td>Programme SQL</td>
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
  name: "Cours",
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

