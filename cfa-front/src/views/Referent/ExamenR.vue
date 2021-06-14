<template>
  <div id="Examens">
    <BodyTitle title="Liste des Examens" />

    <div class="container">
      <br />
      <div class="row g-3">
        <div class="col-sm-3">
          <a href="/referent/creation-examen" class="btn btn-primary"
            >Créer un Examen</a
          >
        </div>
      </div>
      <br />
       <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
    />
      <!--
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
      -->
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { examensFields } from "@/assets/js/fieldsReferent.js"
import axios from "axios";
import { requestOptions } from '@/_helpers/request-options.js';
export default {
  name: "Examens",
  components: {
    BodyTitle,
    TableTemplate
  },
   data() {
    return {
      perPage: 10,
      fields: examensFields,
      items: [
        /*{
          enonce: "Enonce#1",
          cursus: "Cursus#1",
          formation: "Formation#1",
        },
        {
          enonce: "Enonce#2",
          cursus: "Cursus#2",
          formation: "Formation#2",
        },
        {
          enonce: "Enonce#3",
          cursus: "Cursus#3",
          formation: "Formation#3",
        },
        {
          enonce: "Enonce#4",
          cursus: "Cursus#4",
          formation: "Formation#4",
        },
      */],
    };
  },
  created() {
      axios
      .get("examens/", requestOptions.headers()) //faire la méthode pour recupérer le cursus
      .then((response) => (this.items = response.data))
      .catch((error) => console.log(error));
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

