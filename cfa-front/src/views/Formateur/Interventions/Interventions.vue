<template>
  <div>
    <h1 class="text-center">Affichage des interventions</h1>
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :length="nbPageComputed"
      :clickHandler="pageChange"
      :showBtn="false"
      v-model="keyword"
      :onSubmit="search"
    />
  </div>
</template>

<script>
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { courseFields } from "@/assets/js/fields.js";
import { formateurApi } from "@/_api/formateur.api";
export default {
  name: "Cours",
  data() {
    return {
      items: [],
      fields: courseFields,
      currentPage: 1,
      perPage: 5,
      pageCount: 0,
      keyword: "",
    };
  },
  components: {
    TableTemplate,
    // BodyTitle,
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      formateurApi
        .getInterventionsByFormateurId(
          this.utilisateur.id,
          this.currentPage,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
      this.countFormation();
    },
    countFormation() {
      formateurApi
        .countInterventionsByFormateurId(this.utilisateur.id, this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      formateurApi
        .getInterventionsByFormateurId(
          this.utilisateur.id,
          page,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
      formateurApi
        .getInterventionsByFormateurId(
          this.utilisateur.id,
          this.currentPage,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
      formateurApi
        .countInterventionsByFormateurId(this.utilisateur.id, this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
  },
  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    nbPageComputed() {
      return this.pageCount;
    },
    key: {
      get: function() {
        return this.keyword;
      },
      set: function(keyword) {
        this.keyword = keyword;
      },
    },
  },
};
</script>

<style scoped></style>
