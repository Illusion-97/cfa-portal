<template>
  <div>
    <TableTemplate
      :currentPage="currentPage"
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="true"
      :length="nbPageComputed"
      btnTxt="Ajouter une intervention"
      btnLink="ajouter-intervention"
    />
    <!-- {{ pageCount }} -->
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
    this.countIntervention();
    // this.length();
  },
  methods: {
    fillList() {
      interventionApi
        .getIntervention(this.currentPage, this.perPage)
        // .getAllIntervention()
        .then((data) => {
          this.items = data;
          // console.log(process.env);
          // console.log(this.items);
        });
        this.countIntervention();
    },
    countIntervention() {
      interventionApi.countIntervention().then((res) => (this.pageCount = res));
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
