<template>
  <div class="container-fluid" id="container">
    <h2>Contrôles continus</h2>
    <br>

    <ul v-if="notesEtudiant.length != 0">
      <div v-for="(item, index) in notesEtudiant" :key="item.id" class="redAcc">

        <b-button v-b-toggle.index variant="primary" class="btn-volet">
          <!-- <b-button v-b-toggle="'accordion '+index" variant="primary"> -->
          <div>
            <strong>Promotion :</strong>
            {{ index.slice(1).slice(0, index.length - 2) }}
          </div>
          <div>

            <!-- DOWNLOAD PDF -->
            <!-- <b-button size="sm" class="btn-pdf" variant="success" v-on:click="goToEvents(item)"><i
              class="bi bi-file-pdf"></i>Télécharger PDF</b-button> -->
            <!-- <i class="bi bi-caret-down-square-fill"></i> -->

            <i class="fa-solid fa-square-caret-down"></i>
          </div>
        </b-button>

        <b-collapse :id="'index'" class="colla" visible>
          <!-- <b-collapse v-bind:id="'accordion '+index" class="mt-2"> -->
          <b-table small head-variant="light" :items="item" :fields="fields"></b-table>
        </b-collapse>

      </div>
    </ul>
    <ul v-else>
      <li>Pas de note.</li>
    </ul>

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
    //tester requete en prod
    goToEvents: function (item) {
      window.open(
        examenApi.getBulletinEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id) +
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

      console.log(this.notesEtudiant);

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
  border: 0;
  border-radius: 0;
}

h5 {
  margin: 0 0 30px 0;
  font-weight: bolder;
}

/* .container {
  margin: 5% 20% 0% 21%;
  min-height: 340px;
} */

#container {
  width: 95%;
  margin: 5% 0 0 3%;
  /* margin: 5% 0% 0% 21%; */
}

ul {
  list-style-type: none;
}
</style>
