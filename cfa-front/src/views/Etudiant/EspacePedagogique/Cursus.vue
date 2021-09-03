<template>
  <div class="container-fluid">
    <BodyTitle title="Cursus" />

<div class="mon-group">
            <label class="form-label"
              >Selectionner une promotion pour afficher la liste correspondante:
            </label>
            <select
              class="custom-select"
              v-model="selected"
              @change="onSelected()"
            >
              <option
                v-for="promotion in promotionsComputed"
                :key="promotion.id"
                :value="promotion"
                >{{ promotion.nom }}</option
              >
            </select>
      </div>
      <br>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Titre</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="CursusComputed">
        <tr v-for="cursus in CursusComputed" :key="cursus.id">
          <td>{{cursus.titre }}</td>
          <td><router-link
              class="btn btn-info"
              :to="{ name: '', params: { id: cursus.id } }"
              >Detail</router-link></td>
        </tr>
      </tbody>
    </table>

    <!-- <paginate
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
      
    </paginate> -->
  </div>
</template>


<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {cursusApi} from "@/_api/cursus.api.js";
// import {etudiantApi} from "@/_api/etudiant.api.js";

export default {
  name: "Formations",
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
        .getByIdEtudiant(this.$store.getters.getUtilisateur.id)
        .then((response) => (this.cursus = response));
    },
    // pageChange(pageNum) {
    //   formationApi
    //     .getFormationByPromoId(this.selected.id,pageNum - 1, this.perPage)
    //     .then((response) => (this.formations = response));
    // },
    refreshList() {
     cursusApi
        .getByIdEtudiant(this.$store.getters.getUtilisateur.id)
        .then((response) => (this.cursus = response));
      // formationApi
      //   .countFormation()
      //   .then(
      //     (response) => (this.pageCount = Math.ceil(response / this.perPage))
      //   );
    },
  },
};
</script>

