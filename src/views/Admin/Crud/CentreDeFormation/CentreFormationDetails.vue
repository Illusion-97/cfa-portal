<template>
    <div class="container-fluid">
      <br>
      <v-btn color="back-color" class="back" @click="goBack()">
        <v-icon>
          mdi-arrow-left
        </v-icon>
        Précédent
      </v-btn>
    <b-card no-body id="my-card">
      <br>
      <b-card-text class="row-detail-title">
        <span class="font-weight-bold">Détails adresse : </span>
        <span>{{ adresseCentre }}</span>
      </b-card-text>
      <b-card-text class="row-detail-title" v-if="cef.entrepriseDto">
        <span class="font-weight-bold" >Entreprise liée : </span>
        <span>{{ cef.entrepriseDto.raisonSociale }}</span>
      </b-card-text>
      <b-card-text class="row-detail-title" v-else>
        <span class="font-weight-bold" >Entreprise liée : </span>
        <span>Aucune Entreprise lié</span>
      </b-card-text>
      <b-card-text class="row-detail-title">
        <span class="font-weight-bold" >Nombre de promotion : </span>
        <span>{{ nbPromotion }}</span>
        <span>
          <span tooltip="Liste des promotions liées au centre" flow="down">
          <b-button variant="info" size="sm" @click="goToDetails()" class="mr-2">
            <font-awesome-icon class="mr-1" :icon="['fas', 'eye']"/>Afficher</b-button>
          </span>
        </span>
      </b-card-text>
    </b-card>
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
      cef:{}
    }
  },
  methods: {
    getPromotion() {
      centreFormationApi
        .getById(this.$route.params.id)
        .then((response) => { 
          this.adresseCentre = response.adresseDto.libelle+" "+response.adresseDto.codePostal+" "+response.adresseDto.ville, 
          this.villeCentre = response.nom , this.cef = response
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
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 30% 60% 10%;
}

/* START TOOLTIP STYLES */
[tooltip] {
  position: relative; /* opinion 1 */
}

/* Applies to all tooltips */
[tooltip]::before,
[tooltip]::after {
  text-transform: none; /* opinion 2 */
  font-size: .9em; /* opinion 3 */
  line-height: 1;
  user-select: none;
  pointer-events: none;
  position: absolute;
  display: none;
  opacity: 0;
}
[tooltip]::before {
  content: '';
  border: 5px solid transparent; /* opinion 4 */
  z-index: 1001; /* absurdity 1 */
}
[tooltip]::after {
  content: attr(tooltip); /* magic! */
  
  /* most of the rest of this is opinion */
  font-family: Helvetica, sans-serif;
  text-align: center;
  
  /* 
    Let the content set the size of the tooltips 
    but this will also keep them from being obnoxious
    */
  min-width: 3em;
  max-width: 21em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1ch 1.5ch;
  border-radius: .3ch;
  box-shadow: 0 1em 2em -.5em rgba(0, 0, 0, 0.35);
  background: #333;
  color: #fff;
  z-index: 1000; /* absurdity 2 */
}

/* Make the tooltips respond to hover */
[tooltip]:hover::before,
[tooltip]:hover::after {
  display: block;
}

/* don't show empty tooltips */
[tooltip='']::before,
[tooltip='']::after {
  display: none !important;
}

/* FLOW: UP */
[tooltip]:not([flow])::before,
[tooltip][flow^="up"]::before {
  bottom: 100%;
  border-bottom-width: 0;
  border-top-color: #333;
}
[tooltip]:not([flow])::after,
[tooltip][flow^="up"]::after {
  bottom: calc(100% + 5px);
}
[tooltip]:not([flow])::before,
[tooltip]:not([flow])::after,
[tooltip][flow^="up"]::before,
[tooltip][flow^="up"]::after {
  left: 50%;
  transform: translate(-50%, -.5em);
}

/* FLOW: DOWN */
[tooltip][flow^="down"]::before {
  top: 100%;
  border-top-width: 0;
  border-bottom-color: #333;
}
[tooltip][flow^="down"]::after {
  top: calc(100% + 5px);
}
[tooltip][flow^="down"]::before,
[tooltip][flow^="down"]::after {
  left: 50%;
  transform: translate(-50%, .5em);
}

/* FLOW: LEFT */
[tooltip][flow^="left"]::before {
  top: 50%;
  border-right-width: 0;
  border-left-color: #333;
  left: calc(0em - 5px);
  transform: translate(-.5em, -50%);
}
[tooltip][flow^="left"]::after {
  top: 50%;
  right: calc(100% + 5px);
  transform: translate(-.5em, -50%);
}

/* FLOW: RIGHT */
[tooltip][flow^="right"]::before {
  top: 50%;
  border-left-width: 0;
  border-right-color: #333;
  right: calc(0em - 5px);
  transform: translate(.5em, -50%);
}
[tooltip][flow^="right"]::after {
  top: 50%;
  left: calc(100% + 5px);
  transform: translate(.5em, -50%);
}

/* KEYFRAMES */
@keyframes tooltips-vert {
  to {
    opacity: .9;
    transform: translate(-50%, 0);
  }
}

@keyframes tooltips-horz {
  to {
    opacity: .9;
    transform: translate(0, -50%);
  }
}

/* FX All The Things */ 
[tooltip]:not([flow]):hover::before,
[tooltip]:not([flow]):hover::after,
[tooltip][flow^="up"]:hover::before,
[tooltip][flow^="up"]:hover::after,
[tooltip][flow^="down"]:hover::before,
[tooltip][flow^="down"]:hover::after {
  animation: tooltips-vert 300ms ease-out forwards;
}

[tooltip][flow^="left"]:hover::before,
[tooltip][flow^="left"]:hover::after,
[tooltip][flow^="right"]:hover::before,
[tooltip][flow^="right"]:hover::after {
  animation: tooltips-horz 300ms ease-out forwards;
}

.back-color {
  background-color: #00072d !important;
  color: white !important;
}
</style>
