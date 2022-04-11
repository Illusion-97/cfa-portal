<template>
  <div class="container">
    <ul>
      <li v-for="item in promotionsCursus" :key="item">
        <h5>
          {{ item.cursusDto.titre }} -
          {{ item.nom }}
          <br />
        </h5>
        <p>
          <b-row>
            <b-col cols="2" class="info-gauche"
              ><strong class="icon-right"
                >Descriptif</strong
              ><font-awesome-icon :icon="['fas', 'book']" /></b-col
            >
            <b-col cols="10">
              {{ item.cursusDto.description }}
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche">
              <strong class="icon-right"
                >Durée</strong
              ><font-awesome-icon :icon="['fas', 'clock']" /></b-col
            >
            <b-col cols="10">{{ item.cursusDto.duree }} h </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche">
             <strong class="icon-right"
                >Date</strong
              > <font-awesome-icon :icon="['fas', 'calendar']" /></b-col
            >
            <b-col cols="10"
              >du {{ item.dateDebut }} au {{ item.dateFin }}</b-col
            >
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche"
              ><strong class="icon-right"
                >Planning</strong
              ><font-awesome-icon :icon="['fas', 'calendar-alt']" /></b-col
            >
            <b-col cols="10">
              <b-button variant="success" size="sm">
                <font-awesome-icon
                  :icon="['fas', 'download']"
                  class="btn-download"
                />
                Télécharger</b-button
              >
            </b-col>
          </b-row>
        </p>
        <br />
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { cursusApi } from "@/_api/cursus.api.js";
import { promotionApi } from "@/_api/promotion.api.js";

export default {
  name: "CursusEtudiant",
  data() {
    return {
      cursus: [],
      promotions: [],
      promotionsCursus: [],
    };
  },

  created() {
    cursusApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.cursus = data));

    etudiantApi
      .getPromotions(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.promotions = data));

    promotionApi
      .getPromotionByEtudiantIdAndByCursusId(
        this.$store.getters.getUtilisateur.etudiantDto.id
      )
      .then((data) => (this.promotionsCursus = data));
  },
};
</script>

<style scoped>
.container {
  margin: 89px 0 0 421px;
}

h5 {
  margin-bottom: 7px;
  font-weight: bolder;
}

ul {
  list-style-type: none;
}

.info-gauche {
  text-align: end;
  padding-right: 0;
}

.space {
  min-height: 10px;
}

.icon-right{
  margin-right: 7px;
}

button{
  padding: 0rem 0.5rem !important;
}
</style>