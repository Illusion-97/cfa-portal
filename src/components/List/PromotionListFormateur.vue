<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="header-list">
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
      </div>
      <div class="row d-flex justify-content-arround">
        <div
          v-for="promotion in promotionsComputed"
          :key="promotion.id"
          @click="click(promotion)"
          class="col-lg-4 col-md-12 col-sm-12 rounded mt-4 container-card"
        >
          <b-card
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            footer-tag="footer"
            footer-bg-variant="success"
            footer-border-variant="dark"
            style="max-width: 32rem"
            class="card-Promotions col"
          >
            <b-card-header
              class="d-flex justify-content-between bg-white text-secondary col"
            >
              {{
                promotion.centreFormationAdresseVille != null
                  ? promotion.centreFormationAdresseVille
                  : "Pas de ville"
              }}
              <b-progress height="20px" show-progress class="mb-2 w-50">
                <b-progress-bar
                  :value="Progress(promotion)"
                  :label="Progress(promotion) + '%'"
                ></b-progress-bar>
              </b-progress>
            </b-card-header>
            <b-card-text class="mt-4 font-weight-bold">{{
              promotion.nom
            }}</b-card-text>
            <b-card-footer
              class="d-flex justify-content-between bg-white text-secondary"
            >
              <span>
                Date du debut : {{ promotion.dateDebut | formatDate }}
              </span>
              <span> Durée: {{ getMoths(promotion) }}M </span>
              <span>
                Date de fin : {{ promotion.dateFin | formatDate }}
              </span></b-card-footer
            >
          </b-card>
        </div>
      </div>
    </div>
    <div class="text-center m-4" v-if="loading">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
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
      perPage: 9,
      pageCount: 0,
      saisie: "",
      promotion_input: "",
      currentPage: 1,
      stopScrol: false,
      loading: false,
    };
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
  },
  created() {
    console.log(this.stopScrol);
    this.getList();
  },
  mounted() {
    this.getNextPromotions();
  },
  methods: {
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
    getList() {
      this.loading = true;
      promotionApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => {
          this.promotions = response;
          this.loading = false;
        })
        .catch((err) => {
          if (err) {
            this.stopScrol = true;
            this.loading = false;
          }
        });
    },
    getNextPromotions() {
      window.onscroll = () => {
        let bottomOfWindow =
          window.scrollY + window.innerHeight + 1 >=
          document.documentElement.offsetHeight;

        if (bottomOfWindow && this.stopScrol == false) {
          this.currentPage++;
          this.pageChange(this.currentPage * this.perPage);
        }
      };
    },
    pageChange(perPage) {
      this.loading = true;
      promotionApi
        .getAllByPage(0, perPage, this.saisie)
        .then((response) => {
          this.promotions = response;
        })
        .catch((err) => {
          if (err) {
            this.stopScrol = true;
            this.loading = false;
          }
        });
    },

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
.card-Promotions {
  border-radius: 5px;
  min-height: 17rem;
}
.card-Promotions:hover {
  border: 3px solid red;
  cursor: pointer;
}
</style>
