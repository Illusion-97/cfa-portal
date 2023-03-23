<template>
  <div id="main-cr-prj">
    <div>

      <!-- Nom des categorie du tableau -->
      <nav id="navbar-btn">
        <v-btn-toggle w-100 role="group">
          <v-btn w-100 id="bt1" block v-b-toggle="'bt1'" @click="active = 1" variant="plain"
            style="color: white; background-color: #08092d">Infos etudiant</v-btn>
          <v-btn w-100 id="bt2" block v-b-toggle="'bt2'" @click="active = 2" variant="plain"
            style="color: white; background-color: #08092d">Contrôle continue</v-btn>
          <v-btn w-100 id="bt3" block v-b-toggle="'bt3'" @click="active = 3" variant="plain"
            style="color: white; background-color: #08092d">Planning</v-btn>
          <v-btn w-100 id="bt4" block v-b-toggle="'bt4'" @click="active = 4" variant="plain"
            style="color: white; background-color: #08092d">Dossiers projets</v-btn>
          <v-btn w-100 id="bt5" block v-b-toggle="'bt5'" @click="active = 5" variant="plain"
            style="color: white; background-color: #08092d">Dossiers professionnels</v-btn>
          <v-btn w-100 id="bt6" block v-b-toggle="'bt6'" @click="active = 6" variant="plain"
            style="color: white; background-color: #08092d">Congé
          </v-btn>
          <v-btn w-100 id="bt7" block v-b-toggle="'bt7'" @click="active = 7" variant="plain"
            style="color: white; background-color: #08092d">Absences</v-btn>
        </v-btn-toggle>
      </nav>

      <v-card id="x">
        <!--Tableau Infos Etudiant-->
        <v-card-body v-show="active === 1" name="page Info">
          <v-card-text>
            <v-card-title disabled>Nom : {{ infos.nom }}</v-card-title>
            <v-card-title disabled>Prenom : {{ infos.prenom }}</v-card-title>
            <v-card-title disabled>Date de naissance : {{ infos.dateDeNaissance }}</v-card-title>
            <v-card-title disabled>Adresse : {{ infos.adresse }}</v-card-title>
            <v-card-title disabled>Télephone : {{ infos.telephone }}</v-card-title>
            <v-card-title disabled>Télephone fixe : {{ infos.telephoneFix }}</v-card-title>
          </v-card-text>
        </v-card-body>

        <!-- Tableau Controle Continu -->
        <v-card-body v-show="active === 2" name="controle continu">
          <v-data-table :headers="notesFields" :items="notes" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCount = $event">
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-card-body>

        <!-- Tableau Planning -->
        <v-card-body v-show="active === 3" name="planning">
          <v-data-table :headers="planningFields" :items="promo" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCount = $event">
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-card-body>

        <!-- Tableau Dossier Projet -->
        <v-card-body v-show="active === 4" name="dossier projet">
          <v-data-table :headers="dossProjFields" :items="dossProj" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCount = $event">
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-card-body>

        <!-- Tableau Dossier Professionnel -->
        <v-card-body v-show="active === 5" name="dossier professionnel">
          <v-data-table :headers="dossProfFields" :items="dossProfs" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCount = $event">
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-card-body>

        <!-- Tableau Congé -->
        <v-card-body v-show="active === 6" name="page Annexe">
          <v-data-table :headers="congeFields" :items="conges" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCount = $event">
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-card-body>

        <!-- Tableau Absences -->
        <v-card-body v-show="active === 7" name="page Annexe">
          <v-data-table :headers="absenceFields" :items="absences" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCount = $event">
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-card-body>
      </v-card>
    </div>
  </div>
</template>

<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { congeApi } from "@/_api/conge.api.js";
import { absenceApi } from "@/_api/absence.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { etudiantApi } from "@/_api/etudiant.api.js";
import { promotionApi } from "@/_api/promotion.api.js";
import { notesFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { planningFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { congeFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { absenceFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { dossProfFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { dossProjFields } from "@/assets/js/fieldsDetailEtudiant.js";

export default {
  data: () => {
    return {
      name: "DetailEtudiant",
      active: undefined,
      page: 1,
      pageCount: 0,
      itemsPerPage: 2,
      index: 1,
      etudiantId: 0,
      promos: [],
      conges: [],
      absences: [],
      dossProfs: [],
      dossProjs: [],
      infos: [],
      notes: [],
      notesFields,
      planningFields,
      congeFields,
      absenceFields,
      dossProfFields,
      dossProjFields,
    };
  },
  methods: {

    getinfoEtudiant() {
      utilisateurApi.getById(this.etudiantId).then((response) => (this.infos = response));
    },

    getnoteEtudiant() {
      etudiantApi
        .getNotesByIdEtudiant(this.etudiantId)
        .then((response) => (this.notes = response));
    },

    getplanningEtudiant() {
      promotionApi
        .getCursusByIdEtudiant(this.etudiantId)
        .then((response) => ((this.promos = response)));
    },

    getdossProjEtudiant() {
      dossierProjetApi
        .getByIdEtudiant(this.etudiantId)
        .then(
          (response) => ((this.dossProjs = response))
        );
    },

    getdossProfEtudiant() {
      dossierProfessionnelApi
        .getByIdEtudiant(this.etudiantId)
        .then((response) => (this.dossProfs = response));
    },

    getCongeEtudiant() {
      congeApi
        .getAllByIdEtudiant(this.etudiantId)
        .then((response) => (this.conges = response));
    },

    getabsenceEtudiant() {
      absenceApi
        .getAllByIdEtudiant(this.etudiantId)
        .then((response) => (this.absences = response, console.log(this.absences)));
    },

    indexIncre() {
      return this.index++;
    },
  },

  created() {
    this.etudiantId = this.$route.params.id;
    this.getinfoEtudiant();
    this.getnoteEtudiant();
    this.getplanningEtudiant();
    this.getdossProjEtudiant();
    this.getdossProfEtudiant();
    this.getCongeEtudiant();
    this.getabsenceEtudiant();
  },
};
</script>

<style>
#main-cr-prj {
  background-color: none;
  margin: 0% 0% 0% 3%;
  min-width: 1170px;
  min-height: 100%;
}

.v-btn-toggle {
  width: 14%;
}

#x {
  margin: 0% 2% 0% 0%;
}
</style>
