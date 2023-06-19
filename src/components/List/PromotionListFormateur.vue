<template>
  <div>
    <div class="container-fluid mt-4">

      <div class="header-list">
        <!-- BARRE DE RECHERCHE -->
        <form class="form-inline form" @submit="submit">
          <input
            id="saisie"
            name="saisie"
            placeholder="Rechercher"
            type="text"
            class="form-control"
            v-model="saisie"
          />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>
      </div><br/>

      <!-- LIST DES PROMOTIONS -->
      <div class="row d-flex justify-content-arround">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Ville</th>
              <th scope="col">Titre</th>
              <th scope="col">Date de début</th>
              <th scope="col">Durée</th>
              <th scope="col">Date de fin</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="promotion in promotions" :key="promotion.id">
              <th scope="row">{{ promotion.centreFormationAdresseVille != null ? promotion.centreFormationAdresseVille : "Pas de ville" }}</th>
              <td>{{ promotion.nom }}</td>
              <td>{{ promotion.dateDebut | formatDate }}</td>
              <td>{{ getMoths(promotion) }}M</td>
              <td>{{ promotion.dateFin | formatDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <paginate
        class="customPagination"
        :page-count="pageCount"
        :page-range="1"
        :margin-pages="2"
        :click-handler="pageChange"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination float-right'"
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
  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "PromotionListComponent",
  components: {
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    promotionProp: {
      default: null,
    },
  },
  watch: {
    promotionProp() {
      if (this.promotionProp != null)
        this.promotion_input = `${this.promotionProp.nom}`;
    },
  },
  data() {
    return {
      promotions: [],
      perPage: 7,
      pageCount: 0,
      nb: 0,
      saisie: "",
      promotion_input: "",
      currentPage: 1,
      stopScrol: false,
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // OTHER
    getMoths(promotion) {
      return this.getPeriod(promotion) * 12;
    },
    getPeriod(promotion) {
      let debut = new Date(promotion.dateDebut);
      let fin = new Date(promotion.dateFin);
      return new Number(
        (fin.getTime() - debut.getTime()) / 31536000000
      ).toFixed(0);
    },
    getDays(promotion) {
      return this.getPeriod(promotion) * 365;
    },
    Progress(promotion) {
      let debut = new Date(promotion.dateDebut);
      let now = Date.now();
      let joursPasse = new Number(
        ((now - debut.getTime()) / 31536000000) * 365
      ).toFixed(0);
      let joursFormation = this.getDays(promotion);
      if (joursPasse >= joursFormation) {
        return 100;
      }
      if(joursPasse <= 0 ){
        return 0;
      }
      return Math.round((100 * joursPasse) / joursFormation);
    },
    submit(e) {
      e.preventDefault();
      this.getList();
    },
    // PROMOTION
    getList() {
      promotionApi
        .getCountByFormateur(this.$store.getters.getUtilisateur.formateurDto.id, this.saisie)
        .then((response) => {  this.pageCount = Math.ceil(response.nb / this.perPage), console.log(response.nb) }),
      
      promotionApi
        .getAllByIdFormateurByPage(this.$store.getters.getUtilisateur.formateurDto.id, 0, this.perPage, this.saisie) 
        .then((response) => { this.promotions = response})
    },
    pageChange(currentPage) {
      promotionApi
        .getAllByIdFormateurByPage(this.$store.getters.getUtilisateur.formateurDto.id, currentPage - 1, this.perPage, this.saisie)
        .then((response) => { this.promotions = response });
    },
    // REDIRECTION 
    clickList(promotion) {
      this.promotion_input = promotion.nom;
      this.$emit("click-list", promotion);
    },
    click(promotion) {
      let route = this.$route.path.split("/").splice(1);

      if (route[0] == "admin")
        this.$router.push({
          name: "admin_promotion_detail",
          params: { id: promotion.id },
        });
      else if (route[0] == "referent")
        this.$router.push({
          name: "referent_promotion_detail",
          params: { id: promotion.id },
        });
      else if (route[0] == "formateur")
        this.$router.push({
          name: "formateur_promotion_detail",
          params: { id: promotion.id },
        });
      else if (route[0] == "cef")
        this.$router.push({
          name: "cef_promotion_detail",
          params: { id: promotion.id },
        });
      else if (route[0] == "etudiant")
        this.$router.push({
          name: "etudiant_promotion_detail",
          params: { id: promotion.id },
        });
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
<style scoped>

tr
  {
    font-size: 23px;
  }

.card-Promotions {
  border-radius: 5px;
  min-height: 17rem;
}
.card-Promotions {
  border: 3px solid red;
  cursor: pointer;
}
</style>
