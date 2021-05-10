<template>
  <div id="Cours">
   
    <BodyTitle title="Liste des Cours" />

    <div class="container">
      <br />
      <div class="row g-3">
        <div class="col-sm-3">
          <a href="/referent/creation-cours" class="btn btn-primary"
            >Créer un cours</a
          >
        </div>
      </div>
      <br />
      <div class="btn-group" role="group" aria-label="Basic example">
      <a href="/referent/creation-note-info" class="btn btn-secondary">Rédiger une note d'information optionnelle </a>
      <a href="/referent/creation-support-de-cours" class="btn btn-secondary" >Enregistrer un support de cours</a>
      <a href="/referent/examens" class="btn btn-secondary" >Voir la liste des examens</a>
      <a href="/referent/devoirs" class="btn btn-secondary" >Voir la liste des devoirs</a>
      </div>
      <br />
      
      <!--
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
      -->
    </div>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
     />
    
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import axios from "axios";
import { courseFields } from "@/assets/js/fields.js";
export default {
  name: "Cours",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      fields: courseFields,
      items: [
        /*{
          nom: "C#",
          "Note d'information": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          ProgrammeDeCours: "Programme C#",
        },
        {
          nom: "Java",
          "Note d'information": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          ProgrammeDeCours: "Programme Java",
        },
        {
          nom: "Sql",
          "Note d'information": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          ProgrammeDeCours: "Programme Sql",
        },
      */],
      
    };
  },
  created() {
      axios
        .get(this.$apiUrl + "AppliCFABack/interventions/")
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((e) => this.errors.push(e));
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

