<template>
  <div>
    <!-- {{ items }} -->
    <TableTemplate
      :currentPage="currentPage"
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="true"
      btnTxt="Ajouter une intervention"
      btnLink="ajouter-intervention"

    />
  </div>
</template>

<script>
import { interventionApi } from "../../_api/intervention.api.js";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { courseFields } from "@/assets/js/fields.js";

export default {
  name: "Intervention",
  components: {
    TableTemplate,
  },
  data() {
    return {
      items: [],
      fields: courseFields,
      currentPage: 1,
      perPage: 10,
    };
  },
  created() {
    interventionApi
      .getIntervention(this.currentPage, this.perPage)
      .then((data) => {(this.items = data);
      console.log(process.env);
      console.log(this.items);
      });
    //   .getIntervention(this.currentPage, this.perPage)
    //   .then((data) => (this.items = data));
  },
  computed: {

  },
};
</script>

<style scoped></style>
