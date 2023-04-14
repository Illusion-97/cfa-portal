<template>
  <div id="main-cr-prj">
    
    <!-- Button retour -->
    <v-btn id="btn-retour" @click="retour()">Retour</v-btn>
    <div v-if="this.$store.getters.getUtilisateur.tuteurDto">

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
            style="color: white; background-color: #08092d">Congé</v-btn>
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
            <v-card-title disabled>Date de naissance : {{ infos.dateDeNaissance ? infos.dateDeNaissance : "Date de naissance non renseigner." }}</v-card-title>
            <v-card-title disabled>Adresse : {{ infos.adresseDto ? infos.adresseDto.libelle + " " + infos.adresseDto.ville + " " + infos.adresseDto.codePostal : "Adresse non renseigner." }}</v-card-title>
            <v-card-title disabled>Télephone : {{ infos.telephone ? infos.telephone : "Numéro de téléphone non renseigner." }}</v-card-title>
            <v-card-title disabled>Télephone fixe : {{ infos.telephoneFixe ? infos.telephoneFixe : "Numéro de téléphone fixe non renseigner." }}</v-card-title>
            <v-card-title disabled>Adresse mail : {{ infos.login }}</v-card-title>
          </v-card-text>
        </v-card>

        <!-- Tableau Controle Continu -->
        <v-card v-show="active === 2" name="controle continu">
          <v-data-table :headers="notesFields" :items="notes" :page.sync="pageNotes" :items-per-page="itemsPerPage"
            hide-default-footer class="elevation-1" v-if="notes.length">
          </v-data-table>
          <v-card-title v-else>Pas de controle continu.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageNotes" :length="Math.ceil(notes.length / itemsPerPage)" color="#E91E63" circle v-if="notes.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Planning -->
        <v-card v-show="active === 3" name="planning">
          <v-data-table :headers="planningFields" :items="promos" :page.sync="pagePromos" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="promos.length">
          </v-data-table>
          <v-card-title v-else>Pas de planning.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pagePromos" :length="Math.ceil(promos.length / itemsPerPage)" color="#E91E63" circle v-if="promos.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Projet -->
        <v-card v-show="active === 4" name="dossier projet">
          <v-data-table :headers="dossProjFields" :items="dossProjs" :page.sync="pageDossProjet"
            :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer v-if="dossProjs.length">
          </v-data-table>
          <v-card-title v-else>Pas de dossier projet.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageDossProjet" :length="Math.ceil(dossProjs.length / itemsPerPage)" circle color="#E91E63" v-if="dossProjs.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Professionnel -->
        <v-card v-show="active === 5" name="dossier professionnel">
          <v-data-table :headers="dossProfFields" :items="dossProfs" :page.sync="pageDossProfessionnel"
            :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer v-if="dossProfs.length">
          </v-data-table>
          <v-card-title v-else>Pas de dossier professionnel.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageDossProfessionnel" :length="Math.ceil(dossProfs.length / itemsPerPage)" circle color="#E91E63" v-if="dossProfs.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Congé -->
        <v-card v-show="active === 6" name="congé">
          <v-data-table :headers="congeFields" :items="conges" :page.sync="pageConge" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="conges.length">
          </v-data-table>
          <v-card-title v-else>Pas de congé.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageConge" :length="Math.ceil(conges.length / itemsPerPage)" color="#E91E63" circle v-if="conges.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Absences -->
        <v-card v-show="active === 7" name="absences">
          <v-data-table :headers="absenceFields" :items="absences" :page.sync="pageAbsence" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="absences.length">
          </v-data-table>
          <v-card-title v-else>Pas d'absence.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageAbsence" :length="Math.ceil(absences.length / itemsPerPage)" color="#E91E63" circle v-if="absences.length"></v-pagination>
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
      active: undefined,
      pageNotes: 1,
      pagePromos: 1,
      pageDossProjet: 1,
      pageDossProfessionnel: 1,
      pageConge: 1,
      pageAbsence: 1,
      itemsPerPage: 2,
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
      this.$router.push({
        name: "tuteur_acceuil",
      });
    },

    getinfoEtudiant() {
      utilisateurApi.getById(this.etudiantId).then((response) => (this.infos = response));
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

<style scoped />
