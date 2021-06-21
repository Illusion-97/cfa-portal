<template>
  <div id="Cours">
   
    <BodyTitle title="Liste des Cours" />

    <div class="container">
      <br />
      <div class="row g-3">
        <div class="col-sm-3">
          <router-link class="btn btn-primary" :to="{name: 'CreateCoursR'}"
            >Créer un cours</router-link
          >
        </div>
      </div>
      <br />
      <div class="btn-group" role="group" aria-label="Basic example">
      <router-link class="btn btn-secondary" :to="{name: 'NoteInfoR'}">Rédiger une note d'information optionnelle </router-link>
      <router-link class="btn btn-secondary" :to="{name: 'CreateSupportCoursR'}">Enregistrer un support de cours</router-link>
      <router-link class="btn btn-secondary" :to="{name: 'ExamenR'}">Voir la liste des examens</router-link>
      <router-link class="btn btn-secondary" :to="{ name: 'DevoirsR' }">Voir la liste des devoirs</router-link>
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
import { requestOptions } from '@/_helpers/request-options.js';
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
        .get("interventions/", requestOptions.headers())
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

