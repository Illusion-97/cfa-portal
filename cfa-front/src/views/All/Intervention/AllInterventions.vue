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
      btnLink="admin_intervention_create"
      v-model="keyword"
      :onSubmit="search"
    />
  </div>
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";
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
      keyword: "",
      length : 0,
    };
  },
  created() {
    this.fillList();
    this.lengthItv();
  },
  methods: {
    fillList() {
      interventionApi
        .getIntervention(this.currentPage, this.perPage, this.keyword)
        // .getAllIntervention()
        .then((data) => (this.items = data));
      this.countIntervention();
    },
    countIntervention() {
      interventionApi
        .countIntervention(this.keyword)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      interventionApi
        .getIntervention(page, this.perPage, this.keyword)
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
      interventionApi
        .getIntervention(this.currentPage, this.perPage, this.key)
        .then((data) => (this.items = data));
      interventionApi
        .countIntervention(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    refresh(e) {
      e.preventDefault();
      if (this.key === "") this.fillList();
    },
    lengthItv(){
      interventionApi.countIntervention().then(data => this.length = data)
    }
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
<style scoped></style>
