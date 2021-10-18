<template>
  <div>
    <BodyTitle title="Absences - Retards" />
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :length="nbPageComputed"
      :clickHandler="pageChange"
      :showBtn="true"
      btnTxt="Ajouter une absence / un retard"
      btnLink="referent_create-absence-retard"
      v-model="keyword"
      :onSubmit="search"
    />
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { absences_latesFields } from "@/assets/js/fields.js";
import { absencesApi } from "@/_api/absence.api";
export default {
  name: "AbsenceRetard",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      pageCount: 0,
      keyword: "",
      items: [],
      fields: absences_latesFields,
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      absencesApi
        .getAllAbsences(this.currentPage, this.perPage, this.key)
        .then((data) => (this.items = data));
      this.countAbsence();
    },
    countAbsence() {
      absencesApi
        .countAbsence(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      absencesApi
        .getAllAbsences(page, this.perPage, this.key)
        .then((data) => (this.items = data));
      this.countAbsence();
    },
    search(evt) {
      evt.preventDefault();
      this.fillList();
      this.countAbsence();
    },
  },
  computed: {
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
