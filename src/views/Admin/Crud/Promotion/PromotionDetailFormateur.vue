<template>
  <div v-if="promotion">
    <section>
      <div class="container-fluid mt-4">
        <b-tabs content-class="mt-3" fill v-model="tabIndex">

          <!-- TABLE ETUDIANTS -->
          <!-- AJOUTER UN BOUTON RETOUR -->
          <b-tab active>
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'user-graduate']" class="icon" />
              Etudiants
            </template>
            <div>
              <table class="table">
                <p>{{promotion.etudiantsDto}}</p>
                <thead class="">
                  <tr>
                    <th v-if="isAdmin"> Détails étudiant</th>
                    <th>Nom </th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="etudiant in promotion.etudiantsDto" :key="etudiant.id" class="mon-tr">
                    <td>
                      <b-button @click="clickEtudiant(etudiant)" size="sm" class="mr-2">
                        Afficher détails
                      </b-button>
                    </td>
                    <td>{{ etudiant.utilisateurDto.prenom }}</td>
                    <td>{{ etudiant.utilisateurDto.nom }}</td>
                    <td>{{ etudiant.utilisateurDto.login }}</td>
                    <td>
                      {{ etudiant.utilisateurDto.telephone }}
                    </td>
                    <td width=16% v-if="isAdmin">
                      <b-button block variant="danger" @click="showModal(etudiant.utilisateurDto)">
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        Déclarer Absence
                      </b-button>
                      <b-modal hide-footer :ref="'modal-' + etudiant.utilisateurDto.id">
                        <template #modal-title>
                          <div class="text-center">
                            Ajouter une absence ou un retard pour
                            <span class="text-info font-weight-bold">{{
                              etudiant.utilisateurDto.prenom + " " + etudiant.utilisateurDto.nom
                            }}</span>
                          </div>
                        </template>
                        <b-form @submit="ajouterAbsence()">
                          <b-form-group label="Type">
                            <b-form-select id="input-3" v-model="formModel.type" :options="retardAbsence" required>
                            </b-form-select>
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
                        <b-button class="mt-3" variant="outline-danger" block @click="hideModal(etudiant)">Annuler
                        </b-button>
                      </b-modal>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-tab>

          <!-- TABLE INTERVENTIONS -->
          <b-tab>
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'business-time']" class="icon" />
              Interventions
            </template>
            <div id="interventions">
              <b-button variant="primary" class="m-4" @click="getGrille">Télécharger la grille de
                positionnement</b-button>

              <b-button
                  class="m-4"
                  variant="warning"
                  @click="openLoginWdg2EtudiantBypromo"
              >
                Import Etudiant de la promo
              </b-button>
              <b-button
                  class="m-4"
                  variant="success"
                  @click="openLoginWdg2InterventionBypromo"
              >
                Import Intervention de la promo
              </b-button>
              <div class="modal-import-dg2">
                <div class="login-wdg2">
                  <login-wdg2
                      hidden
                      :id="'ShowLoginCardEtudiant'"
                      @logInUser="importEtudiantPromo"
                      @wdg2Close="wdg2CloseEtudiantByPromo()"
                  />
                </div>
                <div class="login-wdg2">
                  <login-wdg2
                      hidden
                      :id="'ShowLoginCardPromo'"
                      @logInUser="importInterventionByPromo"
                      @wdg2Close="wdg2CloseInterventionByPromo()"
                  />
                </div>
              </div>
              <table class="table">
                <thead class="">
                  <tr>
                    <th>Formation</th>
                    <th>Heures dispensées</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="intervention in promotion.interventionsDto" :key="intervention.id"
                    @click="clickIntervention(intervention)" class="mon-tr">
                    <td>
                      {{
                        intervention.formationDto != null
                        ? intervention.formationDto.titre
                        : "Pas de Formation"
                      }}
                    </td>
                    <td>{{ intervention.heuresDisponsees }}</td>
                    <td>{{ intervention.dateDebut | formatDate }}</td>
                    <td>{{ intervention.dateFin | formatDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-tab>

          <!-- TABLE EXAMENS -->
          <b-tab @click="reloadExam()">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'file-alt']" class="icon" />
              Examens
            </template>
            <div>
              <ExamensPromotionsListCompoenent :examens="promotion.examensDto" ref="examen" :context="'promotion'" />
            </div>
          </b-tab>

          <!-- TABLE NOTES -->
          <b-tab>
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'sort-numeric-up-alt']" class="icon" />
              Notes
            </template>

            <div>
              <AjouterNotes :context="'promotion'" />
            </div>
          </b-tab>
        </b-tabs>

      </div>
    </section>
  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
import ExamensPromotionsListCompoenent from "@/components/List/ExamensPromotionsListCompoenent.vue";
import AjouterNotes from "@/components/Formateur/AjouterNotes.vue";
import { utilisateurService } from "@/_services/utilisateur.service.js";
import {interventionApi} from "@/_api/intervention.api";
import {etudiantApi} from "@/_api/etudiant.api";
import LoginWdg2 from "@/components/LoginWdg2.vue";

export default {
  name: "PromotionDetailFormateur",
  props: [],
  components: {
    ExamensPromotionsListCompoenent,
    AjouterNotes,LoginWdg2
  },

  data() {
    return {
      tabIndex: 1,
      promotionId: this.$route.params.id,
      promotion: [],
      itemsEtudients: [],
      ville: "",
      onglet: 1,
      isModalVisible: false,
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
    };
  },
  computed: {
    isAdmin() {
      return utilisateurService.isAdmin();
    },
  },
  methods: {
    openHandler(pdfApp) {
      window._pdfApp = pdfApp;
    },
    openLoginWdg2EtudiantBypromo() {
      let card = document.getElementById('ShowLoginCardEtudiant')
      card.hidden = !card.hidden
    },
    openLoginWdg2InterventionBypromo() {
      let card = document.getElementById('ShowLoginCardPromo')
      card.hidden = !card.hidden
    },
    wdg2CloseInterventionByPromo(){
      document.getElementById('ShowLoginCardPromo').hidden = true
    },
    wdg2CloseEtudiantByPromo(){
      document.getElementById('ShowLoginCardEtudiant').hidden = true
    },
    async importEtudiantPromo(value){

      this.showLoginWdg2CardEtudiantByPromo = false;
      this.loading = true;
      //let promoId = promotion.id
      let promoId = this.promotion.idDg2;

      etudiantApi
          .fetchAllEtudiantDG2HttpByIdPromotion(value, promoId)
          .then((response) => {
            this.color = "success";
            this.dismissCountDown = 6;
            this.message = response.data;
            this.loading = false;
            this.refreshList();
          })
          .catch((err) => {
            this.color = "danger";
            this.dismissCountDown = 8;
            this.message = err;
            this.loading = false;
          });

    },
    getGrille() {
      promotionApi
        .getGrillePositionnement(this.promotionId)
        .then((response) => {
          let bas64 = response;
          const linkSource = `data:application/pdf;base64,${bas64}`;
          const downloadLink = document.createElement("a");
          const fileName = this.promotion.nom + "_" + this.promotion.centreFormationDto.nom + ".pdf";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        });
    },
    getPromotionId() {

      promotionApi.getPromotionByid(this.$route.params.id).then((response) => {
        this.promotion = response
      });
      this.$root.$on("afficherNotes", (data) => {
        if (data) {
          this.tabIndex++;
          this.$root.$emit("afficherNotes", false);
        }
      });
    },
    reloadExam() {
      this.$refs.examen.assigneTableItems(this.promotion.examensDto);
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    clickEtudiant(etudiant) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin" || route[0] == "formateur") {
        this.$router.push({
          name: "admin_etudiant_details",
          params: {
            id: etudiant.id,
            idPromotion: this.$route.params.id
          },
        })
      }
    },
    clickIntervention(intervention) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "intervention-detail",
          params: { id: intervention.id },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent-intervention-detail",
          params: { id: intervention.id },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef-intervention-detail",
          params: { id: intervention.id },
        });
      }
    },
    showModal(etuId) {
      this.$refs["modal-" + etuId.id].show();
    },
    hideModal(etuId) {
      this.$refs["modal-" + etuId].hide();
    },
    ajouterAbsence() {
      return null;
    },
  async importInterventionByPromo(value){

    this.showLoginWdg2CardInterventionByPromo = false;
    this.loading = true;

    let promoId = this.promotion.idDg2;

    interventionApi
        .fetchInterventionsDG2ByIdPromotion(value, promoId)
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
          this.refreshList();
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });

  }
  },
  created() {
    this.getPromotionId();
  },
};
</script>

<style src="@/assets/styles/Onglet.css"></style>
<style scoped>
/* .mon-titre {
  display: flex;
  justify-content: space-around;
} */

h1 {
  /* border: 1px solid #6c757d; */
  display: flex;
  justify-content: center;
  padding: 0.5em;
  /* padding-left: 2em; */
}

.mon-dropdown {
  margin-left: 1em;
  margin-top: 0.5em;
}

.mon-btn {
  height: 2.5em;
  margin-top: 1.5em;
}

.identite {
  margin-top: 4em;
  margin-bottom: 7em;
}

.identite>.nom {
  font-size: 1.5em;
}

#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
}

#my-card>.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 25px;
}

.card-text {
  display: flex;
  justify-content: space-between;
}

.card-text>span {
  display: inline-block;
  width: 40em;
  padding-left: 3em;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

.ma_fenetre {
  margin-bottom: 5em;
}

.mon-plus {
  font-size: 24px;
  height: 1.5em;
  line-height: 0.7em;
  float: right;
}

.ma-croix {
  margin-right: 0.6em;
}

.stickyPosition {
  position: sticky;
  top: 0px;
  z-index: 1;
}

.modal-import-dg2{
  margin-inline: 10%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
