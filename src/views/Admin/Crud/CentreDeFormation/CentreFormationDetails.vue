<template>
  <div>
    <div class="row d-flex justify-content-arround">
        <div
          v-for="promotion in promosListComputed"
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
            
              {{promotion.centreFormationAdresseVille != null ? promotion.centreFormationAdresseVille : "pas de ville" }}
              <b-progress
                height="20px"
                :value="progress(promotion)"
                show-progress
                class="mb-2 w-50"
              ></b-progress>
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
              <span> Durée: {{ getMonths(promotion) }}M </span>
              <span>
                Date de fin : {{ promotion.dateFin | formatDate }}
              </span></b-card-footer
            >
        </b-card>
      </div>
    </div>
  </div>  
  
</template>

<script>
// import { centreFormationApi } from '@/_api/centreFormation.api.js';
import { promotionApi } from '@/_api/promotion.api.js';

export default {
  name: "CentreFormationDetails",
  data() {
    return {
      promosList: [],
      perPage: 9,
      pageCount: 0,
      saisie: "",
      promotion_input: "",
      currentPage: 1,
    }
  },
  methods: {
    getPromosList() {
      promotionApi
        .getAllByCentreFormationIdPagination(this.$route.params.id, 0, this.perPage)
        .then((response) => (this.promosList = response));
    },
    click(promotion){
      this.$router.push({
        name: "admin_promotion_details",
        params: {id: promotion.id}
      })
    },
     getPeriod(promotion) {
      let debut = new Date(promotion.dateDebut);
      let fin = new Date(promotion.dateFin);
      return new Number(
        (fin.getTime() - debut.getTime()) / 31536000000
      ).toFixed(0);
    },
    getMonths(promotion) {
      return this.getPeriod(promotion) * 12;
    },
    getDays(promotion) {
      return this.getPeriod(promotion) * 365;
    },
    progress(promotion) {
      let debut = new Date(promotion.dateDebut);

      let now = Date.now();
      let joursPasse = new Number(
        ((now - debut.getTime()) / 31536000000) * 365
      ).toFixed(0);
      let joursFormation = this.getDays(promotion);
      if (joursPasse >= joursFormation) {
        return 100;
      }

      return (100 * joursPasse) / joursFormation;
    },
     getNextPromotions() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.currentPage++;
          this.pageChange(this.currentPage * this.perPage);
        }
      };
    },
    pageChange(perPage) {
      promotionApi
        .getAllByCentreFormationIdPagination(this.$route.params.id, 0, perPage)
        .then((response) => {this.promosList = response
        });
    },
  },
  created() {
    this.getPromosList();
  },
  mounted() {
    this.getNextPromotions();
  },
  computed: {
    promosListComputed(){
      return this.promosList;
    },
  }

}


//     data(){
//         return {
//             centreFormationId: this.$route.params.id,
//             centreFormation: {},
//             entrepriseDto : {},
//             adresseDto :{},
//             loading: false,
            
//         };
//     },
//     created(){
//         centreFormationApi.getById(this.$route.params.id).then(response => {this.centreFormation = response; this.entrepriseDto = this.centreFormation.entrepriseDto; this.adresseDto = this.centreFormation.adresseDto} );
        
//     },
//     methods :{
//       updateCentre() {
//       let route = this.$route.path.split("/").splice(1);
//       if (route[0] == "admin") {
//         this.$router.push({
//           name: "admin_centreFormation_update",
//         });
//       } else if (route[0] == "referent") {
//         this.$router.push({
//           name: "referent_centreFormation_update",
//         });
//       } else if (route[0] == "formateur") {
//         this.$router.push({
//           name: "formateur_centreFormation_update",
//         });
//       } else if (route[0] == "cef") {
//         this.$router.push({
//           name: "cef_centreFormation_update",
//         });
//       }
//     },
//     goBack() {
//       this.$router.go(-1);
//     },
//     deleteCentre() {
//       centreFormationApi.deleteCentreFormations(this.$route.params.id).then(() => this.goBack());
//     },
//     }

// }
</script>
