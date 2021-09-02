<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

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

      <div class="btn-group " role="group" aria-label="Basic example">
      <!--<router-link class="btn btn-secondary" :to="{name: 'NoteInfoR'}">Rédiger une note d'information optionnelle </router-link>
      <router-link class="btn btn-secondary" :to="{name: 'CreateSupportCoursR'}">Enregistrer un support de cours</router-link>-->
      <router-link class="btn-hover color-1" :to="{name: 'admin_etudiant_fiche_salarie'}">Ajouter une fiche salarié </router-link>
      <router-link class="btn-hover color-1" :to="{name: 'admin_etudiant_fiche_poste'}">Ajouter une fiche de poste</router-link>
      <router-link class="btn-hover color-1" :to="{name: 'admin_etudiant_fiche_entreprise'}">Ajouter une fiche d'entreprise </router-link>
    </div>
    <br>
    <br>
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
      <div
        :class="{
          btn: true,
          'btn btn-outline-primary': true,
          ma_tuile: true,
          activ: isConge,
        }"
        @click="changementOnglet(5)"
      >
        Congés
      </div>
    </div>

    <!-- Promotions -->
    <div :class="{ ma_fenetre: true, collapse: !isPromotion }">
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
    <div :class="{ ma_fenetre: true, collapse: !isGroupe }">
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
    <div :class="{ ma_fenetre: true, collapse: !isNote }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Examen/Devoir</th>
            <th>Note</th>
            <th>Observations</th>
            <th>
              <router-link
                class="btn btn-primary font-weight-bold mon-plus"
                :to="{
                  name: 'admin_note_create',
                  params: { id: etudiant.id },
                }"
                >+</router-link
              >
            </th>
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
        <thead class="">
          <tr>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Raison</th>
            <th>
              <router-link
                class="btn btn-primary font-weight-bold mon-plus"
                :to="{
                  name: 'admin_absence_create',
                  params: { id: etudiant.id },
                }"
                >+</router-link
              >
            </th>
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
        <thead class="">
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
        <tbody>
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
     goBack() {
      this.$router.go(-1);
    },
    clickPromotion(promotion) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
        this.$router.push({
        name: "admin_promotion_detail",
        params: { id: promotion.id },
      });
      }
      else{
        this.$router.push({
        name: "referent-promotion-detail",
        params: { id: promotion.id },
      });
      }
      /*
      else if{
        this.$router.push({
        name: "formateur-promotion-detail",
        params: { id: promotion.id },
      });
      }
      else if{
        this.$router.push({
        name: "cef-promotion-detail",
        params: { id: promotion.id },
      });
      }*/
    },
    clickGroupe(groupe) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
        this.$router.push({
        name: "admin_groupe_detail",
        params: { id: groupe.id },
      });
      }
      else{
      this.$router.push({
        name: "referent_groupe_detail",
        params: { id: groupe.id },
      });
      }
      /*
      else if{
        this.$router.push({
        name: "formateur-groupe-detail",
        params: { id: groupe.id },
      });
      }
      else if{
        this.$router.push({
        name: "cef-groupe-detail",
        params: { id: groupe.id },
      });
      }*/
    },
    clickNote(note) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]=='admin'){
      this.$router.push({
        name: "admin_note_detail",
        params: { id: note.id },
      });
      }
       else{
      this.$router.push({
        name: "referent_note_detail",
        params: { id: note.id },
      });
      }
      /*
      else if{
        this.$router.push({
        name: "formateur-note-detail",
        params: { id: note.id },
      });
      }
      else if{
        this.$router.push({
        name: "cef-note-detail",
        params: { id: note.id },
      });
      }*/
      
    },
    clickAbsence(absence) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]=='admin'){
      this.$router.push({
        name: "admin_absence_detail",
        params: { id: absence.id },
      });
      }
       else{
      this.$router.push({
        name: "referent_absence_detail",
        params: { id: absence.id },
      });
      }
      /*
      else if{
        this.$router.push({
        name: "formateur-absence-detail",
        params: { id: absence.id },
      });
      }
      else if{
        this.$router.push({
        name: "cef-absence-detail",
        params: { id: absence.id },
      });
      }*/
    },
    clickConge(conge) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]=='admin'){
      this.$router.push({
        name: "admin_conge_detail",
        params: { id: conge.id },
      });
      }
      else{
      this.$router.push({
        name: "referent_conge_detail",
        params: { id: conge.id },
      });
      }
      /*
      else if{
        this.$router.push({
        name: "formateur-conge-detail",
        params: { id: conge.id },
      });
      }
      else if{
        this.$router.push({
        name: "cef-conge-detail",
        params: { id: conge.id },
      });
      }*/

    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    deletePromotion(id) {
      console.log(id);
    },
    deleteGroupe(id) {
      console.log(id);
    },
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
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.buttons .router-link {
    margin: 10%;
    text-align: center;
}

.btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-1 {
    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-2 {
    background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
    box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.btn-hover.color-3 {
    background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7);
    box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.btn-hover.color-4 {
    background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
    box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
}
.btn-hover.color-5 {
    background-image: linear-gradient(to right, #0ba360, #3cba92, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.btn-hover.color-6 {
    background-image: linear-gradient(to right, #009245, #FCEE21, #00A8C5, #D9E021);
    box-shadow: 0 4px 15px 0 rgba(83, 176, 57, 0.75);
}
.btn-hover.color-7 {
    background-image: linear-gradient(to right, #6253e1, #852D91, #A3A1FF, #F24645);
    box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
}
.btn-hover.color-8 {
    background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}
.btn-hover.color-9 {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.btn-hover.color-10 {
        background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a , #FBB03B);
    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
.btn-hover.color-11 {
       background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
}

</style>
