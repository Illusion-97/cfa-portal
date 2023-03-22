<template>
  <div id="main-cr-prj">
    <div>

      <!-- Nom des categorie du tableau -->
      <nav id="navbar-btn">
        <v-btn-toggle w-100 role="group">
          <v-btn w-100 id="bt1" block v-b-toggle="'bt1'" @click="active = 1" variant="plain"
            style="color: white; background-color: #08092d">Infos etudiant</v-btn>
          <v-btn w-100 id="bt2"  block v-b-toggle="'bt2'" @click="active = 2" variant="plain"
            style="color: white; background-color: #08092d">Contrôle continue</v-btn>
          <v-btn w-100 id="bt3"  block v-b-toggle="'bt3'" @click="active = 3" variant="plain"
            style="color: white; background-color: #08092d">Planning</v-btn>
          <v-btn w-100 id="bt4"  block v-b-toggle="'bt4'" @click="active = 4" variant="plain"
            style="color: white; background-color: #08092d">Dossiers projets</v-btn>
          <v-btn w-100 id="bt5"  block v-b-toggle="'bt5'" @click="active = 5" variant="plain"
            style="color: white; background-color: #08092d">Dossiers professionnels</v-btn>
          <v-btn w-100 id="bt6"  block v-b-toggle="'bt6'" @click="active = 6" variant="plain"
            style="color: white; background-color: #08092d">Congé
          </v-btn>
          <v-btn w-100 id="bt7"  block v-b-toggle="'bt7'" @click="active = 7" variant="plain"
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

          <v-simple-table :page.sync="page" :items-per-page="itemsPerPage">
            <thead>
              <tr>
                <th class="text-left">
                  <v-card-subtitle><strong>Examen</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Date</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Note</strong></v-card-subtitle>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in notes" :key="item.id" class="redAcc">
                <td>{{ item[0].examen }}</td>
                <td>{{ item[0].date }}</td>
                <td>{{ item[0].noteObtenue }}</td>
              </tr>
            </tbody>
          </v-simple-table>





          <!-- <div v-for="item in notes" :key="item.id" class="redAcc"> -->
          <!-- <b-table
                    class="text-dark"
                    :items="item"
                    :fields="notesFields"
                  ></b-table> -->
          <!-- </div> -->
          <!-- <v-pagination v-model="page" :length="2"></v-pagination> -->
        </v-card-body>

        <!-- Tableau Planning -->
        <v-card-body v-show="active === 3" name="formulaire resume">
          <v-simple-table :page.sync="page" :items-per-page="itemsPerPage">
            <thead>
              <tr>
                <th class="text-left">
                  <v-card-subtitle><strong>Formation</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Date début</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Date fin</strong></v-card-subtitle>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="promo in promos" :key="promo.id">
                <td>{{ promo.nom }}</td>
                <td>{{ promo.dateDebut }}</td>
                <td>{{ promo.dateFin }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <!-- <v-pagination v-model="page" :length="1"></v-pagination> -->
        </v-card-body>

        <!-- Tableau Dossier Projet -->
        <v-card-body v-show="active === 4" name="formulaire contenu">
          <v-simple-table :page.sync="page" :items-per-page="itemsPerPage">
            <thead>
              <tr>
                <th class="text-left">
                  <v-card-subtitle><strong>Dossiers</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Actions</strong></v-card-subtitle>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dossProj in dossProjs" :key="dossProj.id">
                <td>{{ dossProj.nom }}</td>
                <td>
                  <v-card-actions>
                    <v-btn>Télecharger</v-btn>
                    <v-btn>Voir</v-btn>
                  </v-card-actions>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <!-- <v-pagination v-model="page" :length="2"></v-pagination> -->
        </v-card-body>

        <!-- Tableau Dossier Professionnel -->
        <v-card-body v-show="active === 5" name="page Annexe">
          <v-simple-table :page.sync="page" :items-per-page="itemsPerPage">
            <thead>
              <tr>
                <th class="text-left">
                  <v-card-subtitle><strong>Dossiers</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Actions</strong></v-card-subtitle>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dossProf in dossProfs" :key="dossProf.id">
                <td>{{ dossProf.nom }}</td>
                <td>
                  <v-card-actions>
                    <v-btn>Télecharger</v-btn>
                    <v-btn>Voir</v-btn>
                  </v-card-actions>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <!-- <v-pagination v-model="page" :length="2"></v-pagination> -->
        </v-card-body>

        <!-- Tableau Congé -->
        <v-card-body v-show="active === 6" name="page Annexe">
          <v-simple-table :page.sync="page" :items-per-page="itemsPerPage">
            <thead>
              <tr>
                <th class="text-left">
                  <v-card-subtitle><strong>Congé</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Date</strong></v-card-subtitle>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="conge in conges" :key="conge.id">
                <td>Congé</td>
                <td>{{ conge.dateDebut }} à {{ conge.dateFin }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-body>

        <!-- Tableau Absences -->
        <v-card-body v-show="active === 7" name="page Annexe">
          <v-simple-table :page.sync="page" :items-per-page="itemsPerPage">
            <thead>
              <tr>
                <th class="text-left">
                  <v-card-subtitle><strong>Absence</strong></v-card-subtitle>
                </th>
                <th class="text-left">
                  <v-card-subtitle><strong>Date</strong></v-card-subtitle>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="absence in absences" :key="absence.id">
                <td>absence</td>
                <td>{{ absence.dateDebut }} à {{ absence.dateFin }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <br>
          <div>TEST TABLEAU</div>
          <!-- TEST -->
          <!-- MARCHE PEUT ETRE AVEC UNE MISE A JOUR DE VUETIFY -->
          <v-data-table :items-per-page="itemsPerPage" :headers="absenceFields" :items="absences" item-value="dateDebut" class="elevation-1">
          </v-data-table>
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
// import { notesFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { planningFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { congeFields } from "@/assets/js/fieldsDetailEtudiant.js";
import { absenceFields } from "@/assets/js/fieldsDetailEtudiant.js";
export default {
  data: () => {
    return {
      name: "DetailEtudiant",
      active: undefined,
      page: 1,
      pageCount: 1,
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
      //   notesFields,
      planningFields,
      congeFields,
      absenceFields,
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
        .then((response) => (this.absences = response));
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
