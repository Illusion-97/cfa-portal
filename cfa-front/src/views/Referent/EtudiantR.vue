<template>
  <div id="EtudiantR">
    <BodyTitle title="Liste des Etudiants de la promo" />
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
            <th scope="col">Prenom</th>
            <th scope="col">Adresse</th>
            <th scope="col">Feuille de présence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Schwarzer</td>
            <td>Julien</td>
            <td>2 rue du Corbier</td>
            <td>Feuille de présence</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Etudiant2</td>
            <td>Thomas</td>
            <td>28 rue de la tourelle</td>
            <td>Feuille de présence</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Sparrow</td>
            <td>Jack</td>
            <td>60 rue Louis</td>
            <td>Feuille de présence</td>
          </tr>
        </tbody>
      </table>
      <br />
      
      <a href="#" class="link">Télécharger toutes les feuilles de présence de la promo</a>
    </div>
    -->
    <div class="container">
      <a href="#" class="link">Télécharger toutes les feuilles de présence de la promo</a>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import axios from "axios";
export default {
  name: "EtudiantR",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [
        {
          Nom: "Schwarzer",
          Prenom: "Julien",
          Adresse: "2 rue du Corbier",
          FeuilleDePrésence: "Feuille de présence",
        },
        {
          Nom: "Ture",
          Prenom: "Thomas",
          Adresse: "28 rue de la tourelle",
          FeuilleDePrésence: "Feuille de présence",
        },
        {
          Nom: "Sparrow",
          Prenom: "Jack",
          Adresse: "60 rue Louis",
          FeuilleDePrésence: "Feuille de présence",
        },
      ],
      created() {
        axios
          .get("http://localhost:8080/AppliCFABack/etudiants/")
          .then((response) => (this.items = response.data))
          .catch((e) => this.errors.push(e));
        },
    };
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

