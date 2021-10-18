<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'etudiant_espace-peda_cursus' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
    
    <BodyTitle title="Details du Cursus" />

    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Titre</th>
          <th>Contenu</th>
        </tr>
      </thead>
      <tbody v-if="FormationsComputed">
        <tr v-for="formation in FormationsComputed" :key="formation.id">
          <td>{{formation.titre }}</td>
          <td>{{formation.contenu }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {formationApi} from "@/_api/formation.api.js";
// import {etudiantApi} from "@/_api/etudiant.api.js";

export default {
  name: "Formations",
  components: {
    BodyTitle,
  },
  data() {
    return {
      formations: null,
      perPage: 10,
      pageCount: 0,
      
      selected: null,


      
    };
  },
 computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    FormationsComputed() {
      return this.formations;
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
     formationApi
        .getFormationByCursusId(this.$route.params.id)
        .then((response) => (this.formations = response));
    },
    // pageChange(pageNum) {
    //   formationApi
    //     .getFormationByPromoId(this.selected.id,pageNum - 1, this.perPage)
    //     .then((response) => (this.formations = response));
    // },
    refreshList() {
      formationApi
        .getFormationByCursusId(this.$route.params.id)
        .then((response) => (this.formations = response));
      // formationApi
      //   .countFormation()
      //   .then(
      //     (response) => (this.pageCount = Math.ceil(response / this.perPage))
      //   );
    },
  },
};
</script>

<style scoped>
#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
}

#my-card > .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 25px;
}

.card-text {
  display: flex;
  justify-content: space-between;
}

.card-text > span {
  display: inline-block;
  width: 40em;
  padding-left: 3em;
}
</style>
