<template>
  <section>
    <b-alert :show="dismissCountDown" dismissible fade variant="danger" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <b-table :items="items" :fields="fields" striped stacked="md" :per-page="perPage" :current-page="currentPage">
      <!-- Header sup -->
      <template #thead-top>
        <b-tr>
          <b-th colspan="4">
            <form class="form-inline form" @submit="submit">
              <input id="saisie" placeholder="Rechercher" type="text" class="form-control" v-model="saisie" />
              <button class="btn-submit" type="submit">
                <font-awesome-icon :icon="['fas', 'search']" class="icon" />
              </button>
            </form>
          </b-th>
          <b-th class="text-center" variant="secondary" colspan="2">
            <b-button class="mb-2" pill variant="outline-secondary" @click="$bvToast.show('my-toast')">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
            </b-button>
            <b-toast id="my-toast" variant="warning" solid auto-hide-delay="50000">
              <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                  <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                  <strong class="mr-auto">Rappel Positionnements</strong>
                </div>
              </template>
              <div v-for="niveau in niveaux" :key="niveau.valeur">
                <div>
                  <span class="span-positionnement" v-bind:style="{ background: niveau.codeCouleur }">
                    {{ niveau.valeur }}</span>
                  <span> {{ niveau.description }}.</span>
                </div>
              </div>
            </b-toast>
            Positionnements
          </b-th>
        </b-tr>
      </template>
      <!-- //details -->
      <template #cell(details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Masquer" : "Afficher" }}
        </b-button>
      </template>
      <!-- details show -->
      <template #row-details="row">
        <b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 class="btn-accordion">Absences</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-table sticky-header :items="row.item.itemsAbsences" head-variant="dark" :fields="fieldsAbseces" dark
                  bordered stacked="md"></b-table>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 class="btn-accordion">Devoirs</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-table sticky-header :items="row.item.itemsDevoirs" head-variant="dark" :fields="fieldsDevoirs" dark
                  bordered stacked="md"></b-table>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-card>
      </template>
      <!-- Départ -->
      <template #cell(depart)="row">
        <div v-if="row.item.depart != 'Pas défint'" class="
              text-white text-center
              font-weight-bold
              d-flex
              justify-content-around
              align-items-center
            ">
          <div class="w-50" v-bind:style="{ background: row.item.bgDepart }">
            {{ row.item.depart }}
          </div>
          <div>
            <b-button class="m-1 btn-sm" variant="primary" disabled>
              <font-awesome-icon :icon="['fas', 'edit']" />
            </b-button>
          </div>
        </div>
        <div v-else class="text-center">
          {{ row.item.depart }}
        </div>
      </template>
      <!-- Fin -->
      <template #cell(fin)="row">
        <div v-if="
          row.item.ajouterPositionnement == false &&
          row.item.modifierPositionnement == false
        " class="
              text-white text-center
              font-weight-bold
              d-flex
              justify-content-around
              align-items-center
            ">
          <div v-bind:style="{ background: row.item.bgFin }" class="w-50 span-positionnement">
            {{ row.item.fin }}
          </div>
          <div>
            <b-button class="m-1 btn-sm" variant="warning" @click="modifier(row.item)">
              <font-awesome-icon :icon="['fas', 'edit']" />
            </b-button>
          </div>
        </div>
        <div v-else-if="
          row.item.ajouterPositionnement || row.item.modifierPositionnement
        " class="d-flex justify-content-around align-items-center">
          <b-form-spinbutton inline v-model="row.item.fin" min="0" max="5" step="1"></b-form-spinbutton>
          <b-button class="m-1 btn-sm" variant="success" @click="ajouterPositionnement(row.item)">
            <font-awesome-icon :icon="['fas', 'plus-square']" /></b-button>

          <b-button v-if="row.item.modifierPositionnement == true" class="m-1 btn-sm" variant="warning"
            @click="annulerModif(row.item)">
            <font-awesome-icon :icon="['fas', 'undo-alt']" />
          </b-button>
        </div>
      </template>
      <!-- Action -->
      <template #cell(action)="row">
        <b-button block variant="danger" @click="showModal(row.item)">
          <font-awesome-icon :icon="['fas', 'clock']" />
          Déclarer Absence
        </b-button>
        <b-modal hide-footer :ref="'modal-' + row.item.id">
          <template #modal-title>
            <div class="text-center">
              Ajouter une absence ou un retard pour
              <span class="text-info font-weight-bold">{{
                row.item.prenom + " " + row.item.nom
              }}</span>
            </div>
          </template>
          <b-form @submit="ajouetrAbsence(row.item)">
            <b-form-group label="Type">
              <b-form-select id="input-3" v-model="formModel.type" :options="retardAbsence" required></b-form-select>
            </b-form-group>
            <b-form-group label="Du">
              <div class="w-100 d-flex justify-content-center">
                <b-form-input v-model="formModel.dateDebut" type="date" class=""></b-form-input>
                <b-form-input v-model="formModel.tempDebut" type="time" class=""></b-form-input>
              </div>
            </b-form-group>
            <b-form-group label="Au">
              <div class="w-100 d-flex justify-content-center">
                <b-form-input v-model="formModel.dateFin" type="date" class=""></b-form-input>
                <b-form-input v-model="formModel.tempFin" type="time" class=""></b-form-input>
              </div>
            </b-form-group>

            <b-button type="submit" class="mt-3" variant="outline-success" block>Ajouter</b-button>
          </b-form>
          <b-button class="mt-3" variant="outline-danger" block @click="hideModal(row.item)">Annuler</b-button>
        </b-modal>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" size="md"
      class="customPagination"></b-pagination>
  </section>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { absenceApi } from "@/_api/absence.api.js";
import { positionnementApi } from "@/_api/positionnements.api.js";
import { devoirApi } from "@/_api/devoir.api.js";
import { niveauApi } from "@/_api/niveau.api.js";

export default {
  name: "EtudiantsInterventionListComponent",

  data() {
    return {
      perPage: 9,
      currentPage: 1,
      saisie: "",
      message: "",
      dismissSecs: 5,
      dismissCountDown: null,
      tempPositionnementFin: null,
      niveaux: [],
      formModel: {
        type: "RETARD",
        dateDebut: null,
        tempDebut: null,
        dateFin: null,
        tempFin: null,
      },
      retardAbsence: [
        { text: "Retard", value: "RETARD" },
        { text: "Absence", value: "ABSENCE" },
      ],
      items: [
        // {
        //   nom: "nom",
        //   prenom: "prenom",
        //   nomCentreFormation: "ville",
        //   depart: 2,
        //   fin: 3,
        //   _showDetails: false,
        // },
      ],
      fieldsAbseces: [
        {
          key: "date",
          label: "Date",
          thStyle: { width: "33%" },
          thClass: "",
        },
        {
          key: "typeAbsence",
          label: "Type",
          thStyle: { width: "33%" },
          thClass: "",
        },

        {
          key: "justificatif",
          label: "Justificatif fourni",
          thStyle: { width: "33%" },
          thClass: "",
        },
      ],
      fieldsDevoirs: [
        {
          key: "consigne",
          label: "Consigne",
          thStyle: { width: "30%" },
          thClass: "",
        },
        {
          key: "date",
          label: "Date",
          thStyle: { width: "30%" },
          thClass: "",
        },
        {
          key: "dateRendu",
          label: "Date rendu",
          thStyle: { width: "30%" },
          thClass: "",
        },
        {
          key: "justificatif",
          label: "Justificatif",
          thStyle: { width: "10%" },
          thClass: "",
        },
      ],
      fields: [
        {
          key: "details",
          label: "Détails",
          thStyle: { width: "5%" },
          thClass: "",
        },
        {
          key: "nom",
          label: "Nom",
          thStyle: { width: "13%" },
          thClass: "",
        },
        {
          key: "prenom",
          label: "Prenom",
          thStyle: { width: "13%" },
          thClass: "",
        },

        {
          key: "nomCentreFormation",
          label: "Nom du centre",
          thStyle: { width: "13%" },
          thClass: "",
        },
        {
          key: "depart",
          label: "Départ",
          thStyle: { width: "13%" },
          thClass: "text-center",
        },
        {
          key: "fin",
          label: "Fin",
          thStyle: { width: "13%" },
          thClass: "text-center",
        },
        {
          key: "action",
          label: "Action",
          thStyle: { width: "12%" },
          // thClass: "text-center",
        },
      ],
    };
  },
  created() {
    this.getItems();
    this.getNiveaux();
    // let now = new Date();
    // let nowDate =
    //   now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    //2022-05-04
  },
  mounted() { },
  computed: {
    rows() {
      return this.items.length;
    },
  },

  methods: {
    getNiveaux() {
      niveauApi.getAll().then((responce) => {
        this.niveaux = responce;
      });
    },

    // ABSENCE
    ajouetrAbsence(item) {
      let dateDebut = new Date(
        this.formModel.dateDebut + ":" + this.formModel.tempDebut
      );
      let dateFin = new Date(
        this.formModel.dateFin + ":" + this.formModel.tempFin
      );
      if (dateFin < dateDebut) {
        this.hideModal(item);
        this.showAlert();
      } else {
        let absence = {
          id: 0,
          version: 0,
          dateDebut: dateDebut.toISOString(),
          dateFin: dateFin.toISOString(),
          etudiantId: item.id,
          interventionId: this.$route.params.id,
          typeAbsence: this.formModel.type,
        };

        absenceApi.save(absence).then((responce) => {
          this.items[this.items.indexOf(item)].itemsAbsences.push({
            date: this.getDateFormat(responce.dateDebut, responce.dateFin),
            justificatif: "Non",
            typeAbsence: responce.typeAbsence,
          });
          this.items[this.items.indexOf(item)]._showDetails = true;
        });

        this.hideModal(item);
      }
    },

    // DEVOIR ET ABSENCE
    getItems() {
      etudiantApi
        .getEtudiantsByInterventionIdwithDevoirsAndAbsence(
          this.$route.params.id,
          this.saisie
        )
        .then((response) => {
          let allDevoirs = new Array();
          if (response.length > 0) {
            let devoirsEtudiant = response[0].devoirs;
            if (devoirsEtudiant.length > 0 && allDevoirs.length == 0) {
              devoirsEtudiant.forEach((dE) => {
                devoirApi.getById(dE.devoirId).then((devoirResponse) => {
                  allDevoirs.push(devoirResponse);
                });
              });
            }
            let items = [];
            //Affecter les absences

            response.forEach((e) => {
              let itemsAbsences = [];
              let itemsDevoirs = [];
              e.absences.forEach((absence) => {
                let itemAbsences = {
                  date: this.getDateFormat(absence.dateDebut, absence.dateFin),
                  typeAbsence: absence.typeAbsence,
                  justificatif: absence.justificatif != null ? "Oui" : "Non",
                };
                itemsAbsences.push(itemAbsences);
              });

              // Affectation tableau initial
              let item = {
                id: e.etudiant.idEtudiant,
                nom: e.etudiant.nom,
                prenom: e.etudiant.prenom,
                nomCentreFormation: e.etudiant.nomCentreFormation,
                depart: e.niveauDebut != null ? e.niveauDebut.valeur : 0,
                fin: e.niveauFin != null ? e.niveauFin.valeur : 0,
                _showDetails: false,
                itemsAbsences: itemsAbsences,
                itemsDevoirs: itemsDevoirs,
                bgDepart:
                  e.niveauDebut != null ? e.niveauDebut.codeCouleur : "black",
                bgFin: e.niveauFin != null ? e.niveauFin.codeCouleur : "",
                modifierPositionnement: false,
                ajouterPositionnement: e.niveauFin != null ? false : true,
                positionnement: e.positionnement,
              };

              items.push(item);
              //Affecter les devoirs
              setTimeout(() => {
                for (let i = 0; i < e.devoirs.length; i++) {
                  let itemDevoir = {
                    consigne:
                      allDevoirs[i].consigne.substring(
                        0,
                        allDevoirs[i].consigne.length / 10
                      ) + "...",
                    date: this.getDateFormat(
                      allDevoirs[i].dateDebut,
                      allDevoirs[i].dateFin
                    ),
                    justificatif: e.devoirs[i].justificatif,
                    dateRendu: new Date(e.devoirs[i].dateRendu).toLocaleString(
                      "fr-FR"
                    ),
                  };
                  itemsDevoirs.push(itemDevoir);
                }
              }, 500);
            });
            this.items = items;
          } else {
            // pas de donnéés
          }
        });
    },

    // OTHER
    ajouterPositionnement(item) {
      let positionnement = {};
      if (item.modifierPositionnement) {
        positionnement = item.positionnement;
        positionnement.niveauFin = item.fin;
      } else {
        positionnement = {
          id: 0,
          version: 0,
          niveauDebut: 0,
          niveauFin: item.fin,
          interventionId: this.$route.params.id,
          etudiantId: item.id,
        };
      }
      positionnementApi.save(positionnement).then((response) => {
        item.modifierPositionnement = false;
        item.ajouterPositionnement = false;
        item.bgFin = this.getBgPositionnement(item.fin);
        item.positionnement = response;

      });
    },
    getBgPositionnement(niveau) {
      for (let i = 0; i < this.niveaux.length; i++) {
        if (this.niveaux[i].valeur == niveau) {
          return this.niveaux[i].codeCouleur;
        }
      }
    },
    submit() {
      this.getItems();
    },
    modifier(item) {
      item.modifierPositionnement = true;
      this.tempPositionnementFin = item.fin;
    },
    annulerModif(item) {
      item.modifierPositionnement = false;
      item.fin = this.tempPositionnementFin;
      this.tempPositionnementFin = null;
    },
    getDateFormat(dateDebutR, dateFinR) {
      let dateDebut = new Date(dateDebutR).toLocaleString();
      let dateFin = new Date(dateFinR).toLocaleString();
      return `Du ${dateDebut}  Au ${dateFin}`;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    showModal(item) {
      this.$refs["modal-" + item.id].show();
    },
    hideModal(item) {
      this.$refs["modal-" + item.id].hide();
    },
    showAlert() {
      this.message =
        "Impossible de rajouter l'absence ou le retard date de fin inférieure à la date de départ";

      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
<style scoped src="@/assets/styles/BtnAccordion.css"></style>
<style scoped>
.absent {
  width: 50px;
  background-color: black;
  color: white;
}

.span-positionnement {
  display: inline-block;
  width: 50px;
  text-align: center;
  color: rgb(149, 147, 147);
  font-weight: bold;
}
</style>
<style >
.customPagination>.page-item>.page-link {
  color: #0d153e;
}

.customPagination>.page-item.active>.page-link {
  background-color: antiquewhite;
  background-color: #0d153e;
  border: 1px solid black;
  font-weight: bold;
  color: white;
}

.customPagination>.page-item.active>.page-link:hover {
  background-color: #757a92;
  border: 2px solid black;
  font-weight: bold;
}

.customPagination>.page-item>.page-link:hover {
  background-color: #757a92;
  border: 2px solid black;
  font-weight: bold;
  color: white;
}
</style>