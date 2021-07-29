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
          <th>Contenu</th>
        </tr>
      </thead>
      <tbody v-if="FormationsComputed">
        <tr v-for="formation in FormationsComputed" :key="formation.id">
          <td>
            {{ formation.titre }}
          </td>
          <td>{{formation.contenu }}</td>
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
import {formationApi} from "@/_api/formation.api.js";
import {etudiantApi} from "@/_api/etudiant.api.js";

export default {
  name: "Formations",
  components: {
    BodyTitle,
  },
  data() {
    return {
      formations: null,
      promotions: null,
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
    promotionsComputed() {
      return this.promotions;
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
        .getFormationByPromoId(this.selected.id)
        .then((response) => (this.formations = response));
    },
    pageChange(pageNum) {
      formationApi
        .getFormationByPromoId(this.selected.id,pageNum - 1, this.perPage)
        .then((response) => (this.formations = response));
    },
    refreshList() {
      etudiantApi
      .getPromotions(this.$store.getters.getUtilisateur.id)
      .then((response)=>(this.promotions = response));
      formationApi
        .getFormationByPromoId(this.selected.id,this.pageCount, this.perPage)
        .then((response) => (this.formations = response));
      formationApi
        .countFormation()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>

