<template>
  <div class="container">
    <h2>Livret d'évaluation</h2>
    <br>
    <b-table small head-variant="light" :items="livret" :fields="fields">
      <template v-slot:cell(TODO)>
        <button class="btn mr-2 btn-success btn-sm" type="button">
          <i class="fa-solid fa-file-pdf"></i>
          Télécharger
        </button>
      </template>
    </b-table>
  </div>
</template>

<script>
// import { examenApi } from "@/_api/examen.api.js";
import { livretApi } from "../../_api/livret.api.js";

export default {
  name: "LivretEvaluationEtudiant",
  data() {
    return {
      livret: [],
      fields: [
        {
          key: "cursus",
          label: "Promotion",
          thStyle: { width: "35%" },
          sortable: true,
        },
        {
          key: "TODO",
          label: "PDF",
          thStyle: { width: "25%" },
          formatter: () => { return "Bouton Telechargement"; },
        },
        {
          key: "observation",
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
    // tableauComputed() {
    //   let livret = this.livret;
    //   let tab = [];

    //   livret.forEach(function (item) {
    //     tab.push({
    //       Promotion: item.promotions[0],
    //       Examen: item.examen,
    //       Competence: item.competences[0],
    //       Satisfaction: item.satisfactions[0] || item.satisfactions[1],
    //       Observation: item.observations[0] || item.observations[1],
    //     });
    //   });
    //   return tab;
    // },
  },

  created() {
    // examenApi
    //   .getLivretEvaluation(this.$store.getters.getUtilisateur.etudiantDto.id)
    //   .then((data) => (this.livret = data));

    livretApi 
      .getlivretEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.livret = data));

  },
};
</script>

<style scoped>
h2 {
  font-weight: bolder;
}

.bi {
  margin-right: 5px;
}

.btn-donwload {
  color: #fff;
  width: 18px;
}

.container {
  margin: 89px 0 0 421px;
  min-height: 340px;
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
