<template>
  <div>
    <h1 class="text-center">Mes interventions</h1>
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :pageCount="pageCount"
      :length="length"
      :clickHandler="pageChange"
      :showBtn="false"
      v-model="key"
      :onSubmit="search"
    />
  </div>
</template>

<script>
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { courseFieldsFormateur } from "@/assets/js/fields.js";
import { formateurApi } from "@/_api/formateur.api";
export default {
  name: "Intervention-Formateur",
  components: {
    TableTemplate,
  },
  data() {
    return {
      items: [],
      fields: courseFieldsFormateur,
      currentPage: 1,
      perPage: 5,
      pageCount: 0,
      keyword: "",
      length: 0,
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      formateurApi
        .getInterventionsByFormateurId(
          this.$store.getters.getUtilisateur.formateurDto.id,
          this.currentPage,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
      this.countIntervention();
    },
    countIntervention() {
      formateurApi
        .countInterventionsByFormateurId(this.$store.getters.getUtilisateur.formateurDto.id, this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      formateurApi
        .getInterventionsByFormateurId(
          this.$store.getters.getUtilisateur.formateurDto.id,
          page,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
    },
    lenghtItv() {
      formateurApi
        .countInterventionsByFormateurId(this.$store.getters.getUtilisateur.formateurDto.id, this.key)
        .then((data) => (this.length = data));
    },
    search(evt){
      evt.preventDefault();
      this.fillList();
      this.countIntervention();
    }
  },
  computed: {
    key: {
      get() {
        return this.keyword;
      },
      set(keyword) {
        this.keyword = keyword;
      },
    },
  },
};
</script>

<style scoped></style>
