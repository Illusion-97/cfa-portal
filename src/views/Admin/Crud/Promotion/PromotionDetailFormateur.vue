<template>
  <div v-if="promotion">
    <section>
      <div class="container-fluid mt-4">
        <b-tabs content-class="mt-3" fill v-model="tabIndex">

          <!-- TABLE ETUDIANTS -->
          <b-tab active>
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'user-graduate']" class="icon" />
              Etudiants
            </template>
            <div>
              <form class="form-inline m-4" @submit="submitEtudiant">
                <input id="saisieEtudiant" placeholder="Rechercher" type="text" class="form-control"
                  v-model="saisieEtudiant" />
                <button class="btn-submit" type="submit">
                  <font-awesome-icon :icon="['fas', 'search']" class="iconSearch" />
                </button>
              </form>
              <table class="table">
                <thead class="">
                  <tr>
                    <th v-if="isAdmin"> Détails étudiant</th>
                    <th>Nom </th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="etudiant in etudients" :key="etudiant.id" class="mon-tr">
                    <td>
                      <b-button @click="clickEtudiant(etudiant)" size="sm" class="mr-2">
                        Afficher détails
                      </b-button>
                    </td>
                    <td>{{ etudiant.utilisateurDto.nom }}</td>
                    <td>{{ etudiant.utilisateurDto.prenom }}</td>
                    <td>{{ etudiant.utilisateurDto.login }}</td>
                    <td>
                      {{ etudiant.utilisateurDto.telephone }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <paginate class="customPagination" :page-count="pageCountEtudiant" :page-range="1" :margin-pages="2"
                :click-handler="pageChangeEtudiant" :prev-text="'Prev'" :next-text="'Next'"
                :container-class="'pagination float-right'" :page-class="'page-item'" :page-link-class="'page-link'"
                :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
                :next-link-class="'page-link'" :active-class="'active'">
              </paginate>
            </div>
          </b-tab>

          <!-- TABLE INTERVENTIONS -->
          <b-tab>
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'business-time']" class="icon" />
              Interventions
            </template>
            <div id="interventions">
              <div class="d-flex flex-row align-items-end justify-content-between">
                <form class="form-inline m-4" @submit="submitIntervention">
                  <input id="saisieEtudiant" placeholder="Rechercher" type="text" class="form-control"
                    v-model="saisieIntervention" />
                  <button class="btn-submit" type="submit">
                    <font-awesome-icon :icon="['fas', 'search']" class="iconSearch" />
                  </button>
                </form>

                <b-button variant="primary" class="m-4" @click="getGrille">Télécharger la grille de
                  positionnement</b-button>

                <b-button class="m-4" variant="warning" @click="openLoginWdg2EtudiantBypromo">
                  Import Etudiant de la promo
                </b-button>
                <b-button class="m-4" variant="success" @click="openLoginWdg2InterventionBypromo">
                  Import Intervention de la promo
                </b-button>
              </div>
              <div class="modal-import-dg2">
                <div class="login-wdg2">
                  <login-wdg2 hidden :id="'ShowLoginCardEtudiant'" @logInUser="importEtudiantPromo"
                    @wdg2Close="wdg2CloseEtudiantByPromo()" />
                </div>
                <div class="login-wdg2">
                  <login-wdg2 hidden :id="'ShowLoginCardPromo'" @logInUser="importInterventionByPromo"
                    @wdg2Close="wdg2CloseInterventionByPromo()" />
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
                  <tr v-for="intervention in intervention" :key="intervention.id" @click="clickIntervention(intervention)"
                    class="mon-tr">
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
              <paginate class="customPagination" :page-count="pageCountIntervention" :page-range="1" :margin-pages="2"
                :click-handler="pageChangeIntervention" :prev-text="'Prev'" :next-text="'Next'"
                :container-class="'pagination float-right'" :page-class="'page-item'" :page-link-class="'page-link'"
                :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
                :next-link-class="'page-link'" :active-class="'active'">
              </paginate>
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


          <!-- ORDRE DE PASSAGE -->
          <b-tab>
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'table']" />
              Ordre de passage
            </template>
            <div>
              <OrdrePassage />
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
import OrdrePassage from "@/components/Formateur/OrderPassage.vue";
import AjouterNotes from "@/components/Formateur/AjouterNotes.vue";
import { utilisateurService } from "@/_services/utilisateur.service.js";
import { interventionApi } from "@/_api/intervention.api";
import { etudiantApi } from "@/_api/etudiant.api";
import LoginWdg2 from "@/components/LoginWdg2.vue";

export default {
  name: "PromotionDetailFormateur",
  props: {
    promotionProp: {
      type: Array,
      default: null,
    },
  },
  components: {
    ExamensPromotionsListCompoenent,
    OrdrePassage,
    AjouterNotes,
    LoginWdg2
  },

  data() {
    return {
      tabIndex: 1,
      promotionId: this.$route.params.id,
      promotion: [],
      etudients: [],
      intervention: [],
      ville: "",
      saisieEtudiant: "",
      saisieIntervention: "",
      pageCountEtudiant: 0,
      pageCountIntervention: 0,
      countIntervention: 0,
      countEtudiant: 0,
      perPage: 9,
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
    wdg2CloseInterventionByPromo() {
      document.getElementById('ShowLoginCardPromo').hidden = true
    },
    wdg2CloseEtudiantByPromo() {
      document.getElementById('ShowLoginCardEtudiant').hidden = true
    },
    async importEtudiantPromo(value) {

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
        this.promotion = response;
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
    async importInterventionByPromo(value) {

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

    },
    submitEtudiant(e) {
      e.preventDefault();
      this.pageChangeEtudiant();
    },
    submitIntervention(e) {
      e.preventDefault();
      this.pageChangeIntervention();
    },
    async pageChangeIntervention(pageNum) {
      if (pageNum)
        interventionApi.findInterventionByPromotionId(this.$route.params.id, pageNum - 1, this.perPage, this.saisieIntervention).then((response) => { this.intervention = response })
      else
        interventionApi.findInterventionByPromotionId(this.$route.params.id, 0, this.perPage, this.saisieIntervention).then((response) => { this.intervention = response })

      if (this.saisieIntervention != "")
        await interventionApi.countInterventionByPromotionId(this.$route.params.id, this.saisieIntervention).then((response) => { this.countIntervention = response.nb })
      else
        await interventionApi.countInterventionByPromotionId(this.$route.params.id, "").then((response) => { this.countIntervention = response.nb })

      this.pageCountIntervention = Math.ceil(this.countIntervention / this.perPage)
    },
    async pageChangeEtudiant(pageNum) {
      if (pageNum)
        etudiantApi.getEtudiantsByPromotionByPage(this.$route.params.id, pageNum - 1, this.perPage, this.saisieEtudiant).then((response) => { this.etudients = response })
      else
        etudiantApi.getEtudiantsByPromotionByPage(this.$route.params.id, 0, this.perPage, this.saisieEtudiant).then((response) => { this.etudients = response })

      if (this.saisieEtudiant != "")
        await etudiantApi.getCountEtudiantsByPromotion(this.$route.params.id, this.saisieEtudiant).then((response) => { this.countEtudiant = response.nb })
      else
        await etudiantApi.getCountEtudiantsByPromotion(this.$route.params.id, "").then((response) => { this.countEtudiant = response.nb })

      this.pageCountEtudiant = Math.ceil(this.countEtudiant / this.perPage)
    }
  },
  created() {
    this.getPromotionId();
    this.pageChangeEtudiant();
    this.pageChangeIntervention();
  },
};
</script>

<style src="@/assets/styles/Onglet.css"></style>
<style scoped>
/* .mon-titre {
  display: flex;
  justify-content: space-around;
} */

.btn-submit {
  border: 0;
  background-color: inherit;
  border-radius: 100%;
  width: 2.5em;
  margin-left: -3em;
}

.iconSearch {
  color: brown;
}

#saisieEtudiant,
.select {
  border-radius: 20px;
  width: 400px;
  /* background: #000; */
}

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

.modal-import-dg2 {
  margin-inline: 10%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
