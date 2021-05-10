<template>
  <div>
    <!-- <BodyTitle title="Affichage des cours" /> -->
    <h1 class="text-center">Affichage des cours</h1>
    <TableTemplate :perPage="perPage" :items="items" :fields="fields" btnTxt="Ajouter une intervention" :showBtn="true"
      btnLink="formateur_ajouter-cours" />
  </div>
</template>

<script>
  import TableTemplate from "@/components/utils/TableTemplate.vue";
  import { courseFields } from "@/assets/js/fields.js";
  import axios from "axios";
  export default {
    name: "Cours",
    data() {
      return {
        items: [],
        fields: courseFields,
        perPage: 10,
      };
    },
    components: {
      TableTemplate,
      // BodyTitle,
    },
    created() {
      axios
        .get(`${this.$apiUrl}/AppliCFABack/interventions/with-object`)
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((e) => this.errors.push(e));
    },
    methods: {
      // getIntervention(){
      //   var result;
      //    axios
      //     .get("http://localhost:8080/AppliCFABack/etudiants/23/intervention")
      //     .then((response) => (this.items = response.data))
      //     .catch((e) => this.errors.push(e));
      //     return result
      // }
    },
  };
</script>

<style scoped></style>