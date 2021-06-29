<template>
  <div class="container-fluid">
    <BodyTitle :title="title" />

    <div class="col-md-10">
      <div class="row mb-5">
        <div class="col-md-3">
          <b-card header="Formateur Référent">
            <div>
              <p>
                {{ etudiant.formateurReferentDto.prenom }}
                {{ etudiant.formateurReferentDto.nom }}
              </p>
              <p>{{ etudiant.formateurReferentDto.login }}</p>
            </div>
          </b-card>
        </div>
        <div class="col-md-3">
          <b-card header="Manager">
            <div>
              <p>
                {{ etudiant.managerDto.prenom }} {{ etudiant.managerDto.nom }}
              </p>
              <p>{{ etudiant.managerDto.login }}</p>
            </div>
          </b-card>
        </div>
      </div>
    </div>

    <div class="mon-container-tuile">
      <div class="ma-tuile">Promotions</div>
      <div class="ma-tuile">Groupes</div>
      <div class="ma-tuile">Notes</div>
      <div class="ma-tuile">Absences</div>
      <div class="ma-tuile">Congés</div>
    </div>

    <!-- Promotions -->
    <div class="ma-fenetre">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Groupes -->
    <div class="ma-fenetre">
      <table class="table">
        <thead class="">
          <tr>
            <th>Nom</th>
            <th>Etudiants</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="groupe in etudiant.groupesDto"
            :key="groupe.id"
            @dblclick="clickGroupe(groupe)"
            class="mon-tr"
          >
            <td>{{ groupe.nom }}</td>
            <td v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">
              {{ etudiant.prenom }} {{ etudiant.nom }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Notes -->
    <div class="ma-fenetre">
      <table class="table">
        <thead class="">
          <tr>
            <th>Examen</th>
            <th>Note</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="note in notesComputed"
            :key="note.id"
            @dblclick="clickNote(note)"
            class="mon-tr"
          >
            <td>
              <span v-if="note.devoirDto">{{ note.devoirDto.enonce }}</span>
            </td>
            <td>{{ note.noteObtenu }}</td>
            <td>{{ note.observations }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Absences -->
    <div class="ma-fenetre">
      <table class="table">
        <thead class="">
          <tr>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Raison</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="absence in absencesComputed"
            :key="absence.id"
            @dblclick="clickAbsence(absence)"
            class="mon-tr"
          >
            <td>{{ absence.dateDebut }}</td>
            <td>{{ absence.dateFin }}</td>
            <td>{{ absence.justificatif }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Congés -->
    <div class="ma-fenetre">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { etudiantApi } from "@/_api/etudiant.api.js";
import { noteApi } from "@/_api/note.api.js";
import { absencesApi } from "@/_api/absence.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "EtudiantDetail",
  components: {
    BodyTitle,
  },
  created() {
    etudiantApi
      .getById(this.$route.params.id)
      .then((response) => (this.etudiant = response));

    noteApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.notes = response));

    absencesApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.absences = response));
  },
  data() {
    return {
      etudiant: {formateurReferentDto: {}, managerDto: {}},

      notes: [],
      absences: [],
    };
  },
  computed: {
    title() {
      return "Etudiant : " + this.etudiant.prenom + " " + this.etudiant.nom;
    },
    notesComputed() {
      return this.notes;
    },
    absencesComputed() {
      return this.absences;
    },
  },
  methods: {
    clickPromotion(promotion) {
      this.$router.push({
        name: "admin_promotion_detail",
        params: { id: promotion.id },
      });
    },
    clickGroupe(groupe) {
      this.$router.push({
        name: "admin_groupe_detail",
        params: { id: groupe.id },
      });
    },
    clickNote(note) {
      this.$router.push({
        name: "admin_note_detail",
        params: { id: note.id },
      });
    },
    clickAbsence(absence) {
      this.$router.push({
        name: "admin_absence_detail",
        params: { id: absence.id },
      });
    },
  },
};
</script>

<style scoped>
.mon-container-tuile {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
}

.ma-tuile {
  width: 10em;
  height: 5em;
  /*TODO un centrage plus "jolie"*/
  line-height: 4em;
  color: #6c757d;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border: 5px #6c757d solid;
  border-radius: 30px;
}

.ma-tuile:hover {
  background-color: #6c757d;
  color: white;
  cursor: pointer;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

.ma-fenetre {
  margin-bottom: 5em;
}
</style>
