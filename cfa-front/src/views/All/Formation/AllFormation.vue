<template>
  <div>
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :length="nbPageComputed"
      :clickHandler="pageChange"
      :onSubmit="search"
      :showBtn="true"
      v-model="keyword"
      btnTxt="Ajouter une formation"
      btnLink="ajouter-formation"
    />
  </div>
</template>

<script>
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { formationApi } from "@/_api/formation.api.js";
import { formationFields } from "@/assets/js/fields.js";
import { BAlert} from 'bootstrap-vue'
export default {
  name: "Formation",
  components: {
    TableTemplate,
    BAlert
  },
  data() {
    return {
      items: [],
      fields: formationFields,
      currentPage: 1,
      perPage: 10,
      pageCount: 0,
      keyword: "",
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      formationApi
        .getAllByPage(this.currentPage, this.perPage, this.keyword)
        .then((data) => (this.items = data));
      this.countFormation();
    },
    countFormation() {
      formationApi
        .countFormation(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      formationApi
        .getAllByPage(page, this.perPage, this.keyword)
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
        formationApi
          .getAllByPage(this.currentPage, this.perPage, this.key)
          .then((data) => {
            this.items = data;
            console.log(this.items);
          });
        formationApi
          .countFormation(this.key)
          .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    // refresh(e) {
    //   e.preventDefault();
    //   console.log(e);
    //   if (this.key === "") this.fillList();
    // },
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
