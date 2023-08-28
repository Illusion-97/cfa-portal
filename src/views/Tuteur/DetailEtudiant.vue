<template>
  <div id="main-cr-prj" style="margin-top: 1em">
    <!-- Button retour -->
    <div class="card-retour" style="margin-top: 1em">
      <v-btn color="back-color" class="back" @click="goBack()">
        <v-icon>
          mdi-arrow-left
        </v-icon>
        Précédent
      </v-btn>
    </div>
    <br>
    <div class="grid-1" v-if="this.$store.getters.getUtilisateur.tuteurDto">

      <!-- Nom des categorie du tableau -->
      <nav id="selection-toggle" style="background-color: #08092d;">
        <div class="toggle-btn" role="group">
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Infos etudiant</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Contrôle continue</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Planning</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Dossiers projets</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Dossiers professionnels</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt6'" @click="active = 6" variant="plain">Congé</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt7'" @click="active = 7" variant="plain">Absences</v-btn>
        </div>
      </nav>

      <v-card class="detail-etudiant">
        <!--Tableau Infos Etudiant-->
        <v-card v-show="active === 1" name="Info">
          <v-card-text>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Nom : {{ infos.nom }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Prenom : {{ infos.prenom }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Date de naissance : {{ infos.dateDeNaissance? infos.dateDeNaissance : "Date de naissance non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Adresse : {{ infos.adresseDto? infos.adresseDto.libelle + " " + infos.adresseDto.ville + " " + infos.adresseDto.codePostal : "Adresse non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Télephone : {{ infos.telephone? infos.telephone : "Numéro de téléphone non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Télephone fixe : {{ infos.telephoneFixe? infos.telephoneFixe : "Numéro de téléphone fixe non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">Adresse mail : {{ infos.login }}</v-card-title>
          </v-card-text>
        </v-card>


        <!-- NE FONCTIONNE PAS CAR DOUBLE TABLEAU  -->
        <!-- Tableau Controle Continu -->
        <v-card v-show="active === 2" name="controle continu">
          <v-data-table :headers="notesFields" :items="notes" :page.sync="pageNotes" :items-per-page="itemsPerPage"
            hide-default-footer class="custom-font-size" v-if="notes.length">
          </v-data-table>
          <v-card-title v-else>Pas de controle continu.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageNotes" :length="Math.ceil(notes.length / itemsPerPage)" color="#08092d" square
              v-if="notes.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Planning -->
        <v-card v-show="active === 3" name="planning">
          <v-data-table :headers="planningFields" :items="promos" :page.sync="pagePromos" :items-per-page="itemsPerPage"
            class="elevation-2 title-size" hide-default-footer v-if="promos.length">
          </v-data-table>
          <v-card-title v-else>Pas de planning.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pagePromos" :length="Math.ceil(promos.length / itemsPerPage)" color="#08092d" square
              v-if="promos.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Projet -->
        <v-card v-show="active === 4" name="dossier projet">
          <v-data-table :headers="dossProjFields" :items="dossProjs" :page.sync="pageDossProjet"
            :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer v-if="dossProjs.length">
          </v-data-table>
          <v-card-title v-else>Pas de dossier projet.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageDossProjet" :length="Math.ceil(dossProjs.length / itemsPerPage)" square
              color="#08092d" v-if="dossProjs.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Professionnel -->
        <v-card v-show="active === 5" name="dossier professionnel">
          <v-data-table :headers="dossProfFields" :items="dossProfs" :page.sync="pageDossProfessionnel"
            :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer v-if="dossProfs.length">
          </v-data-table>
          <v-card-title v-else>Pas de dossier professionnel.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageDossProfessionnel" :length="Math.ceil(dossProfs.length / itemsPerPage)" square
              color="#08092d" v-if="dossProfs.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Congé -->
        <v-card v-show="active === 6" name="congé">
          <v-data-table :headers="congeFields" :items="conges" :page.sync="pageConge" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="conges.length">
          </v-data-table>
          <v-card-title v-else>Pas de congé.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageConge" :length="Math.ceil(conges.length / itemsPerPage)" color="#08092d" square
              v-if="conges.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Absences -->
        <v-card v-show="active === 7" name="absences">
          <v-data-table :headers="absenceFields" :items="absences" :page.sync="pageAbsence" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="absences.length">
          </v-data-table>
          <v-card-title v-else>Pas d'absence.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageAbsence" :length="Math.ceil(absences.length / itemsPerPage)" color="#08092d" square
              v-if="absences.length"></v-pagination>
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
import { etudiantApi } from "@/_api/etudiant.api.js";
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { noteApi } from "@/_api/note.api.js";
import { promotionApi } from "@/_api/promotion.api.js";
import { notesFields, dossProfFields, absenceFields, congeFields, planningFields, dossProjFields } from "@/assets/js/fieldsDetailEtudiant.js";

export default {
  data: () => {
    return {
      active: 1,
      pageNotes: 1,
      pagePromos: 1,
      pageDossProjet: 1,
      pageDossProfessionnel: 1,
      pageConge: 1,
      pageAbsence: 1,
      itemsPerPage: 8,
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

    goBack() {
      this.$router.go(-1);
    },

    async getInfoEtudiant() {
      try {
        const response = await etudiantApi.getById(this.etudiantId);
        this.infos = response.utilisateurDto;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'étudiant :", error);
      }
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
    this.getInfoEtudiant();
    this.getnoteEtudiant();
    this.getplanningEtudiant();
    this.getdossProjEtudiant();
    this.getdossProfEtudiant();
    this.getCongeEtudiant();
    this.getabsenceEtudiant();
  },
};
</script>

<style >
#main-cr-prj {
  margin: 0% 3% 0% 3%;
  display: grid;
  grid-template-rows: 50px 1fr;
}
.grid-1{

}
.toggle-btn{
  display: grid;
  grid-template-columns: repeat(7,1fr);
}
.btn-detail{
  color: white;
  background-color: #08092d;
}
.btn-retour{
  width: 70px;
  float: right;
}
.card-retour{
  height: 20px;
  text-align: right;
}

.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 17px !important;
}

</style>
