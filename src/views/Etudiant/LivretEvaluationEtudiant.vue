<template>
  <div class="container">
    <h5>Livret d'évaluation</h5>
    <b-table small head-variant="light" :items="tableauComputed"> </b-table>
    <br />
    <b-table
      small
      head-variant="light"
      :items="tableauComputed"
      :fields="fields"
    ></b-table>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";

export default {
  name: "LivretEvaluationEtudiant",
  data() {
    return {
      test: "['BLABLABLA']",
      livret: [],
      fields: [
        {
          key: "Promotion",
          label: "Promotion",
          thStyle: { width: "25%" },
          sortable: true,
        },
        {
          key: "TODO",
          label: "PDF",
          thStyle: { width: "25%" },
          formatter: "formatName",
        },
        {
          key: "Satisfaction",
          label: "Satisfation",
          thStyle: { width: "25%" },
        },
        {
          key: "Observation",
          label: "Observation",
          thStyle: { width: "25%" },
        },
      ],
    };
  },

  methods: {
    formatName() {
      return "ICONE POUR DL PDF";
    },
  },

  computed: {
    tableauComputed() {
      let livret = this.livret;
      let tab = [];

      livret.forEach(function (item) {
        tab.push({
          Promotion: item.promotion[0],
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
