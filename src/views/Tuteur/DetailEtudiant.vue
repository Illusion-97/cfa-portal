<template>
  <div id="main-cr-prj">
    <div v-if="infos">
      <v-col><v-btn id="btn-retour" @click="retour()">Retour</v-btn></v-col>
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
        <v-card v-show="active === 1" name="Info">
          <v-card-text>
            <v-card-title disabled>Nom : {{ infos.nom }}</v-card-title>
            <v-card-title disabled>Prenom : {{ infos.prenom }}</v-card-title>
            <v-card-title disabled>Date de naissance : {{ infos.dateDeNaissance? infos.dateDeNaissance : "Date de naissance non renseigné." }}</v-card-title>
            <v-card-title disabled>Adresse : {{ infos.adresseDto? infos.adresseDto.libelle + " " + infos.adresseDto.ville + " " + infos.adresseDto.codePostal : "Adresse non renseigné." }}</v-card-title>
            <v-card-title disabled>Télephone : {{ infos.telephone? infos.telephone : "Numéro de téléphone non renseigné." }}</v-card-title>
            <v-card-title disabled>Télephone fixe : {{ infos.telephoneFixe? infos.telephoneFixe : "Numéro de téléphone fixe non renseigné." }}</v-card-title>
            <v-card-title disabled>Adresse mail : {{ infos.login }}</v-card-title>
          </v-card-text>
        </v-card>


        <!-- NE FONCTIONNE PAS CAR DOUBLE TABLEAU  -->
        <!-- Tableau Controle Continu -->
        <v-card v-show="active === 2" name="controle continu">
          <v-data-table :headers="notesFields" :items="notes" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCountControleContinue = $event" v-if="notes.length != 0">
          </v-data-table>
          <v-card-title v-else>Pas de controle continu.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCountControleContinue" v-if="notes.length != 0"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Planning -->
        <v-card v-show="active === 3" name="planning">
          <v-data-table :headers="planningFields" :items="promos" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCountPlanning = $event" v-if="promos.length != 0">
          </v-data-table>
          <v-card-title v-else>Pas de planning.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCountPlanning" v-if="promos.length != 0"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Projet -->
        <v-card v-show="active === 4" name="dossier projet">
          <v-data-table :headers="dossProjFields" :items="dossProjs" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCountDossierProjet = $event" v-if="dossProjs.length != 0">
          </v-data-table>
          <v-card-title v-else>Pas de dossier projet.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCountDossierProjet" v-if="dossProjs.length != 0"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Professionnel -->
        <v-card v-show="active === 5" name="dossier professionnel">
          <v-data-table :headers="dossProfFields" :items="dossProfs" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCountDossierProfessionnel = $event" v-if="dossProfs.length != 0">
          </v-data-table>
          <v-card-title v-else>Pas de dossier professionnel.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCountDossierProfessionnel" v-if="dossProfs.length != 0"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Congé -->
        <v-card v-show="active === 6" name="congé">
          <v-data-table :headers="congeFields" :items="conges" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCountConge = $event" v-if="conges.length != 0">
          </v-data-table>
          <v-card-title v-else>Pas de congé.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCountConge" v-if="conges.length != 0"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Absences -->
        <v-card v-show="active === 7" name="absences">
          <v-data-table :headers="absenceFields" :items="absences" :page.sync="page" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer @page-count="pageCountAbsence = $event" v-if="absences.length != 0">
          </v-data-table>
          <v-card-title v-else>Pas d'absence.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCountAbsence" v-if="absences.length != 0"></v-pagination>
          </div>
        </v-card>
      </v-card>
    </div>
    <div v-else>Aucun d'étail de l'étudiant</div>
  </div>
</template>

<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { congeApi } from "@/_api/conge.api.js";
import { absenceApi } from "@/_api/absence.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { noteApi } from "@/_api/note.api.js";
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
      pageCountControleContinue: 0,
      pageCountPlanning: 0,
      pageCountDossierProjet: 0,
      pageCountDossierProfessionnel: 0,
      pageCountConge: 0,
      pageCountAbsence: 0,
      itemsPerPage: 4,
      etudiantId: 0,
      infos: [],
      notes: [],
      promos: [],
      dossProjs: [],
      dossProfs: [],
      conges: [],
      absences: [],
      notesFields,
      planningFields,
      dossProjFields,
      dossProfFields,
      congeFields,
      absenceFields,
    };
  },
  methods: {

    retour() {
        history.back();
    },

    getinfoEtudiant() {
      utilisateurApi.getById(this.etudiantId).then((response) => (this.infos = response, console.log(this.infos.length)));
    },

    getnoteEtudiant() {
      noteApi
        .getAllNoteByIdEtudiant(this.etudiantId)
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
        .then((response) => (this.absences = response));
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

#btn-retour{
  margin-left: 94%;
}

#x {
  margin: 0% 2% 0% 0%;
}
</style>
