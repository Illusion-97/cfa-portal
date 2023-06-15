<template>
  <div>
    <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </a>
    <b-card no-body id="my-card">
      <br>
      <b-card-text class="row-detail-title">
        <span class="font-weight-bold" style=" width: 30%">Détails adresse : </span>
        <span >{{ adresseCentre }}</span>
      </b-card-text>
      <b-card-text class="row-detail-title">
        <span class="font-weight-bold" style="width: 30%">Nombre de promotion : </span>
        <span class="">{{ nbPromotion }}</span>
        <b-button size="sm" @click="goToDetails()" class="mr-2">Afficher</b-button>
      </b-card-text>
      <b-card-text class="row-detail-title">
        <span class="font-weight-bold" style="width: 30%">Entreprise liée : </span>
        <span class="">{{ entreprise }}</span>
      </b-card-text>
    </b-card>
    </div>
    </div>
</template>
<script>
import { centreFormationApi } from '@/_api/centreFormation.api.js';
import { promotionApi } from '@/_api/promotion.api.js';
export default {
  name: "CentreFormationDetails",
  components:{
  },
  data() {
    return {
      adresseCentre: "",
      villeCentre: "",
      nbPromotion: 0,
      entreprise: "",
    }
  },
  methods: {
    getPromotion() {
      centreFormationApi
        .getById(this.$route.params.id)
        .then((response) => { 
          this.adresseCentre = response.adresseDto.libelle+" "+response.adresseDto.codePostal+" "+response.adresseDto.ville, 
          this.villeCentre = response.nom , this.entreprise = response.entrepriseDto.raisonSociale
        });
      promotionApi
        .countByCentreFormationId(this.$route.params.id, "")
        .then((response) => { this.nbPromotion = response })
    },
    goBack() {
      this.$router.push({
        name: "admin_centreFormation_list",
      });
    },
    goToDetails() {
      this.$router.push({
        name: "admin_promotion_list",
        params: { ville: this.villeCentre },
      });
    }
  },
  created() {
    this.getPromotion();
  },
}
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
.row-detail-title{
  grid-template-rows: 1fr;
  grid-template-columns: 30% 80%;
}
</style>