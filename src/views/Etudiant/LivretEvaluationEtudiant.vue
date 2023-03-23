<template>
  <div class="container-fluid" id="container">
    <h2>Livret d'évaluation</h2>
    <br>

    <b-table small head-variant="light" :items="livret" :fields="fields" v-if="livret">
      <template #cell(etat)="row">
        {{ row.item.etat | etatLivret }}
      </template>
      <template #cell(TODO)="row">
        <button class="btn mr-2 btn-success btn-sm" type="button" @click="generer(row.item)">
          <i class="fa-solid fa-file-pdf"></i>
          Télécharger
        </button>
      </template>

    </b-table>
    <ul v-else>
      <li>Pas livret d'évalutation.</li>
    </ul>
  </div>
</template>

<script>
// import { examenApi } from "@/_api/examen.api.js";

import { livretEvaluationApi } from "@/_api/livretEvaluation.api.js";


export default {
  name: "LivretEvaluationEtudiant",
  data() {
    return {
      livret: [],
      fields: [
        {
          key: "titreProfessionnelTitre",
          label: "Promotion",
          thStyle: { width: "35%" },
          sortable: true,
        },
        {
          key: "etat",
          label: "Etat",
          thStyle: { width: "25%" },
        },
        {
          key: "TODO",
          label: "PDF",
          thStyle: { width: "15%" },
          formatter: () => { return "Bouton Telechargement"; },
        },

        {
          key: "observation",
          label: "Observation",
          thStyle: { width: "35%" },
        },
      ],
    };
  },

  methods: {
    formatName() {
      return "ICONE POUR DL PDF";
    },
    generer(item) {

      livretEvaluationApi.generer(item.etudiantId, item.titreProfessionnelId).then(response => {
        let bas64 = response;
        const linkSource = `data:application/pdf;base64,${bas64}`;
        const downloadLink = document.createElement("a");
        const fileName = item.titreProfessionnelTitre + ".pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })

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

    livretEvaluationApi
      .getlivretEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => {
        this.livret = data
        console.log(data)
      });

  },
};
</script>

<style scoped src="@/assets/styles/StyleEtudiant.css">
.bi {
  margin-right: 5px;
}

.btn-donwload {
  color: #fff;
  width: 18px;
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
