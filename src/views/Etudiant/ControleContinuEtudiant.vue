<template>
  <div class="container">
    <h5>Contrôles continus</h5>

    <b-table small head-variant="light" :items="tableauComputed"></b-table>
    <br />

    <div v-for="(item, index) in notesEtudiant2" :key="item" class="redAcc">
      <b-button v-b-toggle.collapse-1 variant="primary">
        <!-- <b-button v-b-toggle="'accordion '+index" variant="primary"> -->
        <div><strong>Promotion :</strong> {{ index }}</div>
        <div>
          <i class="bi bi-caret-down-square-fill"></i>
        </div>
      </b-button>

      <b-collapse id="collapse-1" class="colla">
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

export default {
  name: "ControleContinuEtudiant",
  data() {
    return {
      notesEtudiant: [],
      notesEtudiant2: [],
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
          formatter: "formatName"
        },
      ],
    };
  },

  methods: {
    formatName(value) {
      alert(value)
      return value + "/20";
    },
  },

  computed: {
    tableauComputed() {
      let notesEtudiant = this.notesEtudiant;
      let tab = [];

      notesEtudiant.forEach(function (item) {
        tab.push({
          Promotion: item.promotion,
          Titre: item.examen,
          Date: item.date,
          Note: item.noteObtenue + "/20",
        });
      });
      return tab;
    },
  },

  created() {
    etudiantApi
      .getNotesByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.notesEtudiant = data));

    etudiantApi
      .getNotesByIdEtudiant2(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.notesEtudiant2 = data));
  },
};
</script>

<style scoped>
.colla {
  position: relative;
  bottom: 5px;
}

.redAcc {
  display: grid;
  text-align-last: left;
}

.redAcc button {
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
