<template>
  <div>
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :length="nbPageComputed"
      :clickHandler="pageChange"
      :showBtn="true"
      btnTxt="Ajouter une intervention"
      btnLink="ajouter-intervention"
    />

  </div>
</template>

<script>
import { interventionApi } from "../../../_api/intervention.api.js";
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
      perPage: 5,
      pageCount: 0,
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      interventionApi
        .getIntervention(this.currentPage, this.perPage)
        // .getAllIntervention()
        .then((data) => (this.items = data));
      this.countIntervention();
    },
    countIntervention() {
      interventionApi
        .countIntervention()
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      interventionApi
        .getIntervention(page, this.perPage)
        .then((data) => (this.items = data));
    },
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
  },
};
</script>
<style scoped></style>
