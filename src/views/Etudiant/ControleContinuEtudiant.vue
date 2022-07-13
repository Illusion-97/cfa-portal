<template>
  <div class="container">
    <h5>Contrôles continus</h5>

    <!-- <b-table small head-variant="light" :items="tableauComputed"></b-table> -->

    <div v-for="(item, index) in notesEtudiant" :key="item" class="redAcc">
      <b-button v-b-toggle.collapse-1 variant="primary" class="btn-volet">
        <!-- <b-button v-b-toggle="'accordion '+index" variant="primary"> -->
        <div>
          <strong>Promotion :</strong>
          {{ index.slice(1).slice(0, index.length - 2) }}
        </div>
        <div>
          <!-- BUTTON -->
          <b-button
            size="sm"
            class="btn-pdf"
            variant="success"
            v-on:click="goToEvents(item)"
            ><i class="bi bi-file-pdf"></i>Télécharger PDF</b-button
          >
          <i class="bi bi-caret-down-square-fill"></i>
        </div>
      </b-button>

      <b-collapse id="collapse-1" class="colla" visible>
        <!-- <b-collapse v-bind:id="'accordion '+index" class="mt-2"> -->
        <b-table
          small
          head-variant="light"
          :items="item"
          :fields="fields"
        ></b-table>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { examenApi } from "@/_api/examen.api.js";

export default {
  name: "ControleContinuEtudiant",
  data() {
    return {
      notesEtudiant: [],
      bulletin: [],

      fields: [
        {
          key: "examen",
          label: "Examen",
          thStyle: { width: "70%" },
        },
        {
          key: "date",
          label: "Date",
          thStyle: { width: "20%" },
        },
        {
          key: "noteObtenue",
          label: "Note",
          thStyle: { width: "10%" },
          formatter: (value) => {
            return value + "/20";
          },
        },
      ],
    };
  },

  methods: {
    // TELECHARGER PDF
    goToEvents: function (item) {
      window.open(
        "http://localhost:8085/examens/bulletin-etudiant/" +
          this.$store.getters.getUtilisateur.etudiantDto.id +
          "/" +
          item[0].id
      );
    }, 
  },

  computed: {},

  created() {
    etudiantApi
      .getNotesByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.notesEtudiant = data));

    examenApi
      .generateBulletinByStudentAndPromo(
        this.$store.getters.getUtilisateur.etudiantDto.id,
        1
      )
      .then((data) => (this.bulletin = data));

  },
};
</script>

<style scoped>
.bi {
  margin-right: 5px;
}
.btn-pdf {
    margin-right: 137px;
}

.colla {
  position: relative;
  bottom: 5px;
}

.redAcc {
  display: grid;
  text-align-last: left;
}

.btn-volet {
  background-color: #e11b28 !important;
  border-color: #e11b28 !important;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

h5 {
  margin: 0 0 30px 0;
  font-weight: bolder;
}
.container {
  margin: 89px 0 0 421px;
}
</style>
