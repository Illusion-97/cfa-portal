<template>
  <div id="Etudiant">
    <BodyTitle title="Liste des Etudiants" />
    <TableTemplate
      :items="items"
      :fields="fields"
      :currentPage="currentPage"
      :perPage="perPage"
      :length="nbPageComputed"
      :clickHandler="pageChange"
      :showBtn="true"
      btnTxt="Ajouter un etudiant"
      btnLink=""
      v-model="keyword"
      :onSubmit="search"
    />

  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { etudiantsFields } from "@/assets/js/fieldsReferent.js";
import { etudiantApi } from "../../../_api/etudiant.api";
export default {
  name: "Etudiant",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      currentPage: 0,
      perPage: 10,
      keyword: "",
      pageCount: 0,
      items: [],
      fields: etudiantsFields,
      adresseDto: "",
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      etudiantApi
        .getAllByPage(this.currentPage, this.perPage, this.keyword)
        .then((data) => {
          this.items = data;
          this.adresseDto = this.items.adresseDto;
        });
      this.countEtudiant();
    },
    countEtudiant() {
      etudiantApi.getCount(this.key).then((data) => (this.pageCount = data));
    },
    pageChange(page) {
      etudiantApi
        .getAllByPage(page, this.perPage, this.key)
        .then((data) => (this.items = data));
      this.countEtudiant();
    },
    search(evt) {
      evt.preventDefault();
      etudiantApi
        .getAllByPage(this.currentPage, this.perPage, this.key)
        .then((data) => (this.items = data));
      this.countEtudiant();
    },
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
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
