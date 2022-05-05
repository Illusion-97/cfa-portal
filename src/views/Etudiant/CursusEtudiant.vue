<template>
  <div class="container">
    <ul>
      <li v-for="item in cursus" :key="item">
        <h5>
          {{ item.cursusTitre }} -
          {{ item.nom }}
          <br />
        </h5>
        <p>
          <b-row>
            <b-col cols="2" class="info-gauche"
              ><strong class="icon-right">Descriptif</strong
              ><font-awesome-icon :icon="['fas', 'book']"
            /></b-col>
            <b-col cols="10">
              {{ item.cursusDescription }}
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche">
              <strong class="icon-right">Durée</strong
              ><font-awesome-icon :icon="['fas', 'clock']"
            /></b-col>
            <b-col cols="10">{{ item.cursusDuree }} h </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche">
              <strong class="icon-right">Date</strong>
              <font-awesome-icon :icon="['fas', 'calendar']"
            /></b-col>
            <b-col cols="10"
              >du {{ item.dateDebut }} au {{ item.dateFin }}</b-col
            >
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche"
              ><strong class="icon-right">Planning</strong
              ><font-awesome-icon :icon="['fas', 'calendar-alt']"
            /></b-col>
            <b-col cols="10">
              {{ index }}
              <b-table
                v-for="item in cursus.planningsEtudiantDto"
                :key="item"
                small
                head-variant="light"
                :items="tableauComputed"
              ></b-table>

              <!-- BOUTON TELECHARGER -->
              <!-- <b-button variant="success" size="sm">
                <font-awesome-icon
                  :icon="['fas', 'download']"
                  class="btn-download"
                />
                Télécharger</b-button
              > -->
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
import { promotionApi } from "@/_api/promotion.api.js";

export default {
  name: "CursusEtudiant",
  data() {
    return {
      cursus: [],
    };
  },

  computed: {
    tableauComputed() {
      let tab = [];
      console.log("nombre d'exec");
      // for (let i = 0; i < this.cursus.length; i++) {
      let interventions = this.cursus.planningsEtudiantDto;
      interventions.forEach(function (item) {
        tab.push({
          Debut: item.interventionDateDebut,
          Fin: item.interventionDateFin,
          Formation: item.formationTitre,
          Formateur: item.formateurNom,
        });
      });
      // }

      return tab;
    },
  },

  created() {
    promotionApi
      .getCursusByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.cursus = data));
  },
};
</script>

<style scoped>
.container {
  margin: 89px 0 0 421px;
}

h5 {
  margin-bottom: 17px;
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

.icon-right {
  margin-right: 7px;
}

button {
  padding: 0rem 0.5rem !important;
}

.col-date {
  max-width: 20px;
}
</style>