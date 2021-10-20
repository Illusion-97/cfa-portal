<template>
  <div id="EtudiantR">
    <BodyTitle title="Liste des Etudiants de la promo" />

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
          <div class="mon-group">
            <label class="form-label">Liste des étudiants de la promo : </label>
            <table class="table table-striped" v-if="!isAction">
              <thead>
                <tr>
                  <th>Prenom Nom</th>
                  <th>Email</th>
                  <th>Promotions</th>
                </tr>
              </thead>
              <tbody v-if="etudiantsBDDComputed">
                <tr
                  v-for="etudiant in etudiantsBDDComputed"
                  :key="etudiant.id"
                  v-on:click="clickList(etudiant)"
                  v-on:dblclick="detail(etudiant.id)"
                  class="mon-tr"
                >
                  <td>{{ etudiant.utilisateurDto.prenom }} {{ etudiant.utilisateurDto.nom }}</td>
                  <td>{{ etudiant.utilisateurDto.login }}</td>
                  <td>
                    <ul class="text-left list-style-none">
                      <li v-for="promotion in etudiant.promotionsDto"
                      :key="promotion.id" >{{ promotion.nom }}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
             <!--<a href="#" class="link">Télécharger toutes les feuilles de présence de la promo</a>-->
          </div>
  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "EtudiantR",
  components: {
    BodyTitle,
  },
  data() {
    return {
      etudiants: [],
      etudiantsBDD: null,
      promotions: null,

      selected: null,
    };
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    etudiantsProp: {
      default: null,
    },
  },
  watch: {
    etudiantsProp() {
      if (this.etudiantsProp != null) 
          this.etudiants = this.etudiantsProp;
    },
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    etudiantsBDDComputed() {
      return this.etudiantsBDD;
    },
  },
  methods: {
    onSelected() {
      promotionApi
        .getEtudiants(this.selected.id)
        .then((response) => (this.etudiantsBDD = response));
    },
    clickList(etudiant) {
      this.etudiant_input = `${etudiant.prenom} ${etudiant.nom}`;
      this.$emit("click-list", etudiant);
    },
    detail(id) {
      // eslint-disable-next-line vue/no-mutating-props
      this.isAction = true;
      if (this.isAction)
        this.$router.push({ name: "referent_etudiant_detail", params: { id: id } });
    },
  },
  created() {
    promotionApi.getAll().then((response) => (this.promotions = response));
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
.list-style-none {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

