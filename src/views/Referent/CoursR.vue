<template>
  <div>
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :pageCount="pageCount"
      :length="length"
      :clickHandler="pageChange"
      :showBtn="true"
      btnTxt="Ajouter une intervention"
      btnLink="referent_intervention_create"
      v-model="keyword"
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
      userId: this.$store.getters.getUtilisateur.id,
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      formateurApi
        .getInterventionsByFormateurId(
          this.utilisateurId,
          this.currentPage,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
      this.countIntervention();
    },
    countIntervention() {
      formateurApi
        .countInterventionsByFormateurId(this.utilisateurId, this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      formateurApi
        .getInterventionsByFormateurId(
          this.utilisateurId,
          page,
          this.perPage,
          this.key
        )
        .then((data) => (this.items = data));
    },
    lenghtItv() {
      formateurApi
        .countInterventionsByFormateurId(this.utilisateurId, this.key)
        .then((data) => (this.length = data));
    },
    search(evt){
      evt.preventDefault();
      this.fillList();
      this.countIntervention();
    }
  },
  computed: {
    utilisateurId() {
      return this.userId;
    },
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
