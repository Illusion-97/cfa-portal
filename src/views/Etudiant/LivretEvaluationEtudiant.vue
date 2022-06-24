<template>
  <div class="container">
    <div>
      <h5>Votre livret d'évaluation</h5>
      <!-- <b-button variant="success" size="sm">
        <font-awesome-icon :icon="['fas', 'download']" class="btn-download" />
        Télécharger</b-button> -->
    </div>
    <div>
      <b-table small head-variant="light" :items="tableauComputed"></b-table>
    </div>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
export default {
  name: "LivretEvaluationEtudiant",
  data() {
    return {
      livret: [],
    };
  },

  computed: {
      tableauComputed() {
        let livret = this.livret;
        let tab = [];

        livret.forEach(function (item) {
          tab.push({
            Promotion: item.promotion,
            Examen: item.examen,
            Competence: item.competences[0],
            Satisfaction: item.satisfactions[0],
            Observation: item.observations[0],
          });
        });
        return tab;
      },
    },

  created() {
      examenApi
        .getLivretEvaluation(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.livret = data));
    },
};
</script>

<style scoped>
.btn-donwload {
  color: #fff;
  width: 18px;
}

.container {
  margin: 89px 0 0 421px;
}

h5 {
  margin: 0 0 30px 0;
  display: inline-block;
  font-weight: bolder;
}

#key:intitule {
  width: 300px;
}

button {
  display: inline-block;
  margin-left: 10px;
}
</style>
