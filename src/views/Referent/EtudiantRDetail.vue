<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2" align="center">
        <div class="identite">
          <p class="nom">{{ etudiant.prenom }} {{ etudiant.nom }}</p>
          <p class="email">{{ etudiant.login }}</p>
        </div>
      </div>

      <div class="col-md-10">
        <div class="row mb-5">
          <div class="offset-1 col-md-4">
            <div class="container">
              <div class="content">
                <h1>Formateur Référent</h1>
                <br>
                <h3> {{ etudiant.formateurReferentDto.prenom }} {{ etudiant.formateurReferentDto.nom }}</h3>
              </div>
            </div>
          </div>

          <div class="offset-1 col-md-4">
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
    </div>
    
    <div class="mon-container-tuile">
      <div
        :class="{
          btn: true,
          'btn btn-outline-primary': true,
          ma_tuile: true,
          activ: isPromotion,
        }"
        @click="changementOnglet(1)"
      >
        Promotions
      </div>
      <div
        :class="{
          btn: true,
          'btn btn-outline-primary': true,
          ma_tuile: true,
          activ: isGroupe,
        }"
        @click="changementOnglet(2)"
      >
        Groupes
      </div>
      <div
        :class="{
          btn: true,
          'btn btn-outline-primary': true,
          ma_tuile: true,
          activ: isNote,
        }"
        @click="changementOnglet(3)"
      >
        Notes
      </div>
      <div
        :class="{
          btn: true,
          'btn btn-outline-primary': true,
          ma_tuile: true,
          activ: isAbsence,
        }"
        @click="changementOnglet(4)"
      >
        Absences
      </div>
      <!--<div
        :class="{
          btn: true,
          'btn btn-outline-primary': true,
          ma_tuile: true,
          activ: isConge,
        }"
        @click="changementOnglet(5)"
      >
        Congés
      </div>-->
    </div>

    <!-- Promotions -->
    <div :class="{ ma_fenetre: true, collapse: !isPromotion }">
      <table class="table">
        <thead class="tbl-header">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody class="tbl-content">
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
    <div :class="{ ma_fenetre: true, collapse: !isGroupe }">
      <table class="table">
        <thead class="tbl-header">
          <tr>
            <th>Nom</th>
            <th>Etudiants</th>
          </tr>
        </thead>
        <tbody class="tbl-content">
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
    <div :class="{ ma_fenetre: true, collapse: !isNote }">
      <table class="table">
        <thead class="tbl-header">
          <tr>
            <th>Examen/Devoir</th>
            <th>Note</th>
            <th>Observations</th>
            <th>
              <router-link
                class="btn btn-info font-weight-bold mon-plus"
                :to="{
                  name: 'admin_note_create',
                  params: { id: etudiant.id },
                }"
                >+</router-link
              >
            </th>
          </tr>
        </thead>
        <tbody class="tbl-content">
          <tr
            v-for="note in notesComputed"
            :key="note.id"
            @dblclick="clickNote(note)"
            class="mon-tr"
          >
            <td>
              <span v-if="note.devoirDto">{{ note.devoirDto.enonce }}</span>
              <span v-if="note.examenDto">{{note.examenDto.examenDto.enonce}}</span>
            </td>
            <td>{{ note.noteObtenu }}</td>
            <td>{{ note.observations }}</td>
            <td>
              <span class="close ma-croix" @click="deleteNote(note.id)">x</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Absences -->
    <div :class="{ ma_fenetre: true, collapse: !isAbsence }">
      <table class="table">
        <thead class="tbl-header">
          <tr>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Raison</th>
            <th>
              <router-link
                class="btn btn-info font-weight-bold mon-plus"
                :to="{
                  name: 'admin_absence_create',
                  params: { id: etudiant.id },
                }"
                >+</router-link
              >
            </th>
          </tr>
        </thead>
        <tbody class="tbl-content">
          <tr
            v-for="absence in absencesComputed"
            :key="absence.id"
            @dblclick="clickAbsence(absence)"
            class="mon-tr"
          >
            <td>{{ absence.dateDebut }}</td>
            <td>{{ absence.dateFin }}</td>
            <td>{{ absence.justificatif }}</td>
            <td>
              <span class="close ma-croix" @click="deleteAbsence(absence.id)"
                >x</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Congés -->
    <div :class="{ ma_fenetre: true, collapse: !isConge }">
      <table class="table">
        <thead class="tbl-header">
          <tr>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Motif</th>
            <th>Type</th>
            <th>Status</th>
            <th>
              <router-link
                class="btn btn-primary font-weight-bold mon-plus"
                :to="{
                  name: 'admin_conge_create',
                  params: { id: etudiant.id },
                }"
                >+</router-link
              >
            </th>
          </tr>
        </thead>
        <tbody class="tbl-content">
          <tr
            v-for="conge in congesComputed"
            :key="conge.id"
            @dblclick="clickConge(conge)"
            class="mon-tr"
          >
            <td>{{ conge.dateDebut }}</td>
            <td>{{ conge.dateFin }}</td>
            <td>{{ conge.motif }}</td>
            <td>{{ conge.type }}</td>
            <td>{{ conge.status }}</td>
            <td>
              <span class="close ma-croix" @click="deleteConge(conge.id)"
                >x</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { noteApi } from "@/_api/note.api.js";
import { absencesApi } from "@/_api/absence.api.js";
import { congeApi } from "@/_api/conge.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "EtudiantDetail",
  components: {},
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

    congeApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.conges = response));
  },
  data() {
    return {
      etudiant: { formateurReferentDto: {}, managerDto: {}, groupesDto: {} },

      notes: [{devoirDto: {}, examenDto: {examenDto: {}}}],
      absences: [],
      conges: [],

      onglet: 0,
    };
  },
  computed: {
    notesComputed() {
      return this.notes;
    },
    absencesComputed() {
      return this.absences;
    },
    congesComputed() {
      return this.conges;
    },

    isPromotion() {
      if (this.onglet == 1) return true;
      else return false;
    },
    isGroupe() {
      if (this.onglet == 2) return true;
      else return false;
    },
    isNote() {
      if (this.onglet == 3) return true;
      else return false;
    },
    isAbsence() {
      if (this.onglet == 4) return true;
      else return false;
    },
    isConge() {
      if (this.onglet == 5) return true;
      else return false;
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
    clickConge(conge) {
      this.$router.push({
        name: "admin_conge_detail",
        params: { id: conge.id },
      });
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    // deletePromotion(id) {
    //   console.log(id);
    // },
    // deleteGroupe(id) {
    //   console.log(id);
    // },
    deleteNote(id) {
      noteApi
        .deleteNote(id)
        .then(() =>
          noteApi
            .getAllByIdEtudiant(this.$route.params.id)
            .then((response) => (this.notes = response))
        );
    },
    deleteAbsence(id) {
      absencesApi
        .deleteAbsence(id)
        .then(() =>
          absencesApi
            .getAllByIdEtudiant(this.$route.params.id)
            .then((response) => (this.absences = response))
        );
    },
    deleteConge(id) {
      congeApi
        .deleteConge(id)
        .then(() =>
          congeApi
            .getAllByIdEtudiant(this.$route.params.id)
            .then((response) => (this.conges = response))
        );
    },
  },
};
</script>

<style scoped>
.mon-plus {
  font-size: 24px;
  height: 1.5em;
  line-height: 0.7em;
  float: right;
}

.ma-croix {
  margin-right: 0.6em;
}

.identite {
  margin-top: 4em;
  margin-bottom: 7em;
}

.identite > .nom {
  font-size: 1.5em;
}

.identite > .email {
  font-size: 1.2em;
}

.mon-container-tuile {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
  padding-right: 50%;
}

.ma_tuile {
  width: 8em;
}

.ma_tuile:hover {
  background-color: rgb(0, 140, 255);
  color: white;
  cursor: pointer;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

.ma_fenetre {
  margin-bottom: 5em;
}

.activ {
  background-color:rgb(0, 140, 255);
  color: white;
}

.tbl-header{
  background-color: rgba(0, 0, 0, 0.493);
  color: white;
 }
 .tbl-content{
  height:300px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
 th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  font-weight: 300;
  font-size: 12px;
}
.container  {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 300px;
  background: #f2f2f2;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 20px 8px #d0d0d0;
}

.content {
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  text-align: justify;
  color: black;
  padding: 40px;
  font-family: 'Merriweather', serif;
}

h1 {
  font-weight: 900;
  text-align: center;
  font-size:  1.6em;;
}

h3 {
  font-weight: 300;
  font-size:  1.3em;
  text-align: center;
}


</style>
