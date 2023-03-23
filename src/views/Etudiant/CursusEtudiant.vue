<template>
  <div class="container-fluid" id="container">
    <h2>Cursus</h2>
    <br>
    <ul v-if="cursusComputed">
      <li v-for="item in cursusComputed" :key="item.id">
        <h5>
          {{ item.Titre }} -
          {{ item.Promotion }}
          <br />
        </h5>
        <p>
          <b-row>
            <b-col cols="2" class="info-gauche">
              <strong class="icon-right">Durée</strong>
              <font-awesome-icon :icon="['fas', 'clock']" />
            </b-col>
            <b-col cols="10">{{ item.Duree }} h </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche">
              <strong class="icon-right">Date</strong>
              <font-awesome-icon :icon="['fas', 'calendar']" />
            </b-col>
            <b-col cols="10">du {{ item.DateStart }} au {{ item.DateEnd }}</b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="info-gauche"><strong class="icon-right">Planning</strong>
              <font-awesome-icon :icon="['fas', 'calendar-alt']" />
            </b-col>
            <b-col cols="10">
              <b-table small head-variant="light" :items="item.Planning"></b-table>
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
          <br>
        </p>
      </li>
    </ul>
    <ul v-else>
      <li>Pas de cursus attribué.</li>
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
    cursusComputed() {
      let tab = [];
      this.cursus.forEach(function (item) {
        let tab2 = [];
        item.planningsEtudiantDto.forEach(function (item2) {
          tab2.push({
            Titre: item2.formationTitre,
            Debut: item2.interventionDateDebut,
            Fin: item2.interventionDateFin,
            Formateur: item2.formateurNom,
          });
        });
        tab.push({
          Titre: item.cursusTitre,
          Descriptif: item.cursusDescription,
          Duree: item.cursusDuree,
          DateStart: item.dateDebut,
          DateEnd: item.dateFin,
          Promotion: item.nom,
          Planning: tab2,
        });
      });
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
h2 {
  font-weight: bolder;
}

#container {
  width: 95%;
  margin: 5% 0 0 3%;
  /* margin: 5% 0% 0% 21%; */
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

.col-10,
.col-2 {
  padding-top: 0;
  padding-bottom: 0;
}

.m-top {
  margin-top: 39px;
}
</style>