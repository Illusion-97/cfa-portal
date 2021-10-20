<template>
  <div class="container-fluid">
    <BodyTitle title="Mes Cursus" />
    
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="CursusComputed">
        <tr v-for="cursus in CursusComputed" :key="cursus.id">
          <td>{{cursus.titre }}</td>
          <td>
            <router-link
              class="btn btn-info"
              :to="{ name: 'etudiant_espace-peda_cursusdetails', params: { id: cursus.id } }"
              >Detail</router-link>
              </td>
        </tr>
      </tbody>
    </table>

    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
      
    </paginate>
  </div>
</template>


<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {cursusApi} from "@/_api/cursus.api.js";
// import {etudiantApi} from "@/_api/etudiant.api.js";

export default {
  name: "Cursus",
  components: {
    BodyTitle,
  },
  data() {
    return {
      cursus: null,
      perPage: 10,
      pageCount: 0,
      
      selected: null,


      
    };
  },
 computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    CursusComputed() {
      return this.cursus;
    }, 
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    
    this.refreshList();
  },
  methods: {
    onSelected() {
     cursusApi
        .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((response) => (this.cursus = response));
    },
    pageChange(pageNum) {
     cursusApi
        .getByIdEtudiant(this.$store.getters.getUtilisateur.id,pageNum-1,this.perPage)
        .then((response) => (this.cursus = response));
    },
    refreshList() {
     cursusApi
        .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id,this.pageCount,this.perPage)
        .then((response) => (this.cursus = response));
      cursusApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>

