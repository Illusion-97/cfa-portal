<template>
  <div>
    <div class="d-flex flex-row align-items-end justify-content-between">
      <form class="form-inline p-2" @submit="submit">
        <input id="saisie" name="saisie" type="text" class="form-control" placeholder="Rechercher par année" v-model="saisie" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
      </div>
    <div class="container-fluid">
      <b-table v-if="promosList.length != 0" :items="promosList" :fields="fields" striped responsive="sm">
        <template #cell(Durée)="row">
            {{ getHours(row.item)? getHours(row.item) + " H" : getHours(row.item) / 24 + "J" }}
        </template>
        <template #cell(Actions)="row">
          <v-app>
            <b-button block variant="info" @click="click(row.item.id)">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'eye']" /> voir
            </b-button>
          </v-app>
        </template>
      </b-table>
      <div v-else>Pas de promotion pour cette année</div>
    </div>
    <paginate :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
      :next-link-class="'page-link'" :active-class="'active'">
      >
    </paginate>
    </div>
</template>
<script>
// import { centreFormationApi } from '@/_api/centreFormation.api.js';
import { promotionApi } from '@/_api/promotion.api.js';
import { CentreDeFormation } from "@/assets/js/fieldsAdmin.js";  
export default {
  name: "CentreFormationDetails",
  components:{
  },
  data() {
    return {
      promosList: [],
      perPage: 7,
      pageCount: 0,
      saisie: "",
      currentPage: 1,
      fields: CentreDeFormation,
    }
  },
  methods: {
    getPromosList() {
      promotionApi
        .getAllByCentreFormationIdPagination(this.$route.params.id, 0, this.perPage, this.saisie)
        .then((response) => {this.promosList = response}),
      promotionApi
        .countByCentreFormationId(this.$route.params.id, this.saisie)
      .then((response) => {
        this.pageCount = Math.ceil(response / this.perPage)
      })
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
      return (fin.getTime() - debut.getTime()) / 3600000;
    },
    getHours(promotion) {
      return this.getPeriod(promotion);
    },
    pageChange(perPage) {
      promotionApi
        .getAllByCentreFormationIdPagination(this.$route.params.id, perPage - 1, this.perPage, this.saisie)
        .then((response) => {this.promosList = response});
    },
    submit(e) {
      e.preventDefault();
      this.getPromosList();
    },
  },
  created() {
    this.getPromosList();
  },
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