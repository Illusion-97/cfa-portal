<template>
  <div>
    <!-- <BodyTitle title="Affichage des cours" /> -->
    <h1 class="text-center">Affichage des cours</h1>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      btnTxt="Ajouter un cours"
      :showBtn="true"
      btnLink="/formateur/ajouter-cours"
    />

    <!-- {{ items.length +0.5 | formatNumber}} -->
  </div>
</template>

<script>
import TableTemplate from "@/components/utils/TableTemplate.vue";
// import courseModel from "@/assets/mock/course.json";
import { courseFields } from "@/assets/js/fields.js";
// import { courseItemLength } from "@/assets/mock/itemLength.js";
// import BodyTitle from "@/components/utils/BodyTitle.vue";
import axios from "axios";
export default {
  name: "Cours",
  data() {
    return {
      // items: courseModel,
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
      .get("http://localhost:8080/AppliCFABack/interventions/10")
      .then((response) => (this.items = response.data))
      .catch((e) => this.errors.push(e));
  },
  // methods: {
  //   items(){
  //     var result;
  //      axios
  //       .get("http://localhost:8080/AppliCFABack/etudiants/23/intervention")
  //       .then((response) => (this.items = response.data))
  //       .catch((e) => this.errors.push(e));
  //       return result
  //   }
  // }
};
</script>

<style scoped></style>
