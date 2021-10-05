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
      btnLink="cef_intervention_create"
      v-model="keyword"
      :onSubmit="search"
    />

    <div class="btn-group " role="group" aria-label="Basic example">
      <!--<router-link class="btn btn-secondary" :to="{name: 'NoteInfoR'}">Rédiger une note d'information optionnelle </router-link>
      <router-link class="btn btn-secondary" :to="{name: 'CreateSupportCoursR'}">Enregistrer un support de cours</router-link>-->
      <router-link class="btn-hover color-1" :to="{name: 'cef_examen'}">Voir la liste des examens</router-link>
      <router-link class="btn-hover color-1" :to="{name: 'cef_devoir'}">Voir la liste des devoirs </router-link>
    </div>
  </div>
  
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { courseFieldsReferent } from "@/assets/js/fields.js";

export default {
  name: "Intervention",
  components: {
    TableTemplate,
  },
  data() {
    return {
      items: [],
      fields: courseFieldsReferent,
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
<style scoped>
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.buttons .router-link {
    margin: 10%;
    text-align: center;
}

.btn-hover {
    width: 150px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    -moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    -moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-1 {
    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-2 {
    background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
    box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.btn-hover.color-3 {
    background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7);
    box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.btn-hover.color-4 {
    background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
    box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
}
.btn-hover.color-5 {
    background-image: linear-gradient(to right, #0ba360, #3cba92, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.btn-hover.color-6 {
    background-image: linear-gradient(to right, #009245, #FCEE21, #00A8C5, #D9E021);
    box-shadow: 0 4px 15px 0 rgba(83, 176, 57, 0.75);
}
.btn-hover.color-7 {
    background-image: linear-gradient(to right, #6253e1, #852D91, #A3A1FF, #F24645);
    box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
}
.btn-hover.color-8 {
    background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}
.btn-hover.color-9 {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.btn-hover.color-10 {
        background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a , #FBB03B);
    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
.btn-hover.color-11 {
       background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
}

</style>
