<template>
  <div>
    <section class="container-fluid mt-4">
      <v-app>
        <b-tabs content-class="mt-3" fill v-model="tabIndex">

          <!-- TABLE DETAILS -->
          <!-- A MODIFIER -->
          <b-tab active title-link-class="tabColor">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'search-plus']" class="icon" />
              Détails
            </template>
            <div class="m-4 flex-xl-column">

              <!-- Formateur affecté -->
              <div class="d-flex justify-content-start">
                <h3 class="
                        order-0
                        mr-4
                        pr-2
                        d-flex
                        align-items-center
                        right-border
                        start
                      ">
                  {{
                    trainers.length > 1
                    ? "Formateurs affectés"
                    : "Formateur affecté"
                  }}
                </h3>
                <div v-for="t in trainers" :key="t.id">
                  <h4>
                    {{ t.utilisateurDto.nom }} {{ t.utilisateurDto.prenom }}
                  </h4>
                </div>
              </div>

              <!-- Promotion associé -->
              <div class="separation"></div>
              <div class="d-flex justify-content-start mt-2">
                <h3 class="
                        order-0
                        mr-4
                        pr-2
                        d-flex
                        align-items-center
                        right-border
                        start
                      ">
                  {{
                    promo.length > 1
                    ? "Promotions associées"
                    : "Promotion associé"
                  }}
                </h3>
                <div class="d-flex flex-column">
                  <h4 v-for="p in promo" :key="p.id" class="pt-2">
                    {{ p.nom }}
                  </h4>
                </div>

              </div>

              <!-- Note info personnel -->
              <div class="separation"></div>
              <div class="d-flex justify-content-start mt-2">
                <h3 class="
                        order-0
                        mr-4
                        pr-2
                        d-flex
                        align-items-center
                        right-border
                        start
                      ">
                  Note info personnel
                </h3>
                <div class="container-note-info-personel">
                  <div v-if="items.noteInfoPersonnel == null" class="d-flex justify-content-between align-items-center">
                    <h4>
                      Pas d'information disponible
                    </h4>
 
                    <b-button @click="items.noteInfoPersonnel = '', modifierInfo = true">
                      <font-awesome-icon :icon="['fas', 'plus-square']" class="icon" />
                      Ajouter
                    </b-button>
                  </div>

                  <div v-else >
                    <div v-if="modifierInfo == false" class="d-flex justify-content-between align-items-center">

                      <h4>
                        {{ items.noteInfoPersonnel }}
                      </h4>   
                        <div class="d-flex flex-xl-column">  
                          <b-button variant="primary" @click="modifierInfoPerso()">
                            <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
                            Modifier
                          </b-button>
                        </div>
                    </div>
                    
                    <div v-else class="d-flex justify-content-between align-items-center">

                      <div class="w-75">
                        <b-form-textarea id="textarea-large" size="lg" placeholder="Ajouter information"
                        v-model="items.noteInfoPersonnel"></b-form-textarea>
                      </div>
                      <div  class="d-flex flex-xl-column">
                        
                        <b-button variant="success" @click="updateIntervention()">
                        <font-awesome-icon :icon="['fas', 'check-square']" class="icon" />
                        Valider
                      </b-button>
                      <b-button class="mt-2" variant="warning" @click="annulerModif()">
                        <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                        Annuler
                      </b-button>
                    </div >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>

          <!-- TABLE ETUDIANTS -->
          <!-- A MODIFIER -->
          <b-tab title-link-class="tabColor">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'user-graduate']" class="icon" />
              Etudiants
            </template>
            <EtudiantsInterventionListComponent />
          </b-tab>

          <!-- TABLE EVALUATIONS -->
          <!-- A MODIFIER -->
          <b-tab title-link-class="tabColor">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'code']" class="icon" />
              Evaluations
            </template>
            <EvaluationComponent />

          </b-tab>

          <!-- TABLE DEVOIRS -->
          <b-tab title-link-class="tabColor">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'code']" class="icon" />
              Devoirs
            </template>
            <div>
              <DevoirsInterventionListComponent />
            </div>
          </b-tab>

          <!-- TABLE EXAMENS -->
          <b-tab @click="reloadExam()" title-link-class="tabColor">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'file-alt']" class="icon" />
              Examens
            </template>
            <div>
              <ExamensPromotionsListCompoenent ref="examen" :examens="examensByInterventionId"
                :context="'intervention'" />
            </div>
          </b-tab>

          <!-- TABLE NOTES -->
          <b-tab title-link-class="tabColor">
            <template v-slot:title class="text-info">
              <font-awesome-icon :icon="['fas', 'sort-numeric-up-alt']" class="icon" />
              Notes
            </template>
            <div>
              <AjouterNotes :context="'intervention'" />
            </div>
          </b-tab>
        </b-tabs>
      </v-app>

    </section>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
import { interventionApi } from "@/_api/intervention.api.js";
// import { absenceApi } from "@/_api/absence.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";
import EtudiantsInterventionListComponent from "@/components/List/EtudiantsInterventionListComponent.vue";
import EvaluationComponent from "@/components/Formateur/EvaluationComponent"
import DevoirsInterventionListComponent from "@/components/List/DevoirsInterventionListComponent";
import ExamensPromotionsListCompoenent from "@/components/List/ExamensPromotionsListCompoenent.vue";
import AjouterNotes from "@/components/Formateur/AjouterNotes.vue";
export default {
  name: "DetailIntervention",
  components: {
    EtudiantsInterventionListComponent,
    DevoirsInterventionListComponent,
    ExamensPromotionsListCompoenent,
    AjouterNotes,
    EvaluationComponent,
  },
  data() {
    return {
      tabIndex: 1,
      examensByInterventionId: [],
      interventionId: this.$route.params.id,
      titre: "",
      items: {
        formationDto: {},
      },
      students: [],
      promo: [],
      assignements: [],
      absences: [],
      trainers: [],
      devoirs: [],
      responseApi: [],
      status,

      onglet: 1,
      routeSplited: this.$route.path.split("/").splice(1),
      ajouterInfo: false,
      modifierInfo: false,
      textInfo: null,
    };
  },
  computed: {
    // showAlert() {
    //   if (this.status == 202) return "d-block";
    //   return "d-none";
    // },
    getTitle() {
      return this.items.formationDto.titre;
    },
    getSubTitle() {
      let dateDebut = new Date(this.items.dateDebut).toLocaleDateString();
      let dateFin = new Date(this.items.dateFin).toLocaleDateString();
      return `Du ${dateDebut}  au ${dateFin}`;
    },
    showEtudiant() {
      if (this.onglet == 1) return true;
      else return false;
    },
    showPromotion() {
      if (this.onglet == 2) return true;
      else return false;
    },
    showDevoir() {
      if (this.onglet == 3) return true;
      else return false;
    },
    showAbsence() {
      if (this.onglet == 4) return true;
      else return false;
    },
    isAdmin() {
      return utilisateurService.isAdmin();
    },
    isReferent() {
      return utilisateurService.isReferent();
    },
    isFormateur() {
      return utilisateurService.isFormateur();
    },
  },
  created() {
    this.getId();
    this.getStudents();
    this.getTrainer();
    this.getExamensByInterventionId();
    this.$root.$on("afficherNotes", (data) => {
      if (data) {
        this.tabIndex++;
        this.$root.$emit("afficherNotes", false);
      }
    });
  },

  methods: {
    // EXAMENS
    getExamensByInterventionId() {
      examenApi.getExamensByInterventionId(this.interventionId).then((response) => {
        this.examensByInterventionId = response;
      })
    },

    reloadExam() {
      this.$refs.examen.assigneTableItems(this.examensByInterventionId);

    },
    modifierInfoPerso() {
      this.modifierInfo = true;
      this.textInfo = this.items.noteInfoPersonnel;
    },
    annulerModif() {
      this.ajouterInfo = false;
      this.modifierInfo = false;
      this.items.noteInfoPersonnel = this.textInfo;
    },
    goBack() {
      this.$router.go(-1);
    },

    // INTERVENTION
    getId() {
      interventionApi.getInterventionById(this.interventionId).then((data) => {
        this.status = data.status;
        this.items = data.data;
        this.promo = this.items.promotionsDto;
        this.$root.$emit("promoId", data.data.promotionsDto[0].id);
      });
    },
    updateIntervention() {
      if (this.items.noteInfoPersonnel.length == 0 ) {
        alert("Le champs ne peut pas être vide.");
      }
      else{

        // this.items.noteInfoPersonnel = this.textInfo;
        interventionApi
        .update(this.items)
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
        this.ajouterInfo = false;
        this.modifierInfo = false;
      }
    },
    modifierIntervention() {
      const route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({ name: "admin_intervention_update" });
      } else if (route[0] == "referent") {
        this.$router.push({ name: "referent_intervention_update" });
      }
    },
    deleteIntervention(id) {
      interventionApi.deleteIntervention(id).then((response) => {
        this.status = response.status;
        if (this.status == 202) {
          this.showAlert;
          this.goBack();
        }
      });
    },

    // Etudiant
    getStudents() {
      interventionApi
        .findStudentsByPromoInterventionId(this.interventionId)
        .then((data) => (this.students = data));
      // .then(() => this.getAbsences());
    },
    goToStudentDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      let routeData;
      switch (this.routeSplited[0]) {
        case "admin":
          routeData = this.$router.resolve({
            name: "admin_etudiant_detail",
            params: {
              id: id,
            },
          });
          break;
        case "referent":
          routeData = this.$router.resolve({
            name: "referent_etudiant_detail",
            params: {
              id: id,
            },
          });
          break;
        case "formateur":
          routeData = this.$router.resolve({
            name: "formateur_etudiant_detail",
            params: {
              id: id,
            },
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },

    // // Devoir
    // getAssignement() {
    //   interventionApi
    //     .findAssignementByInterventionId(this.interventionId)
    //     .then((data) => (this.assignements = data));
    // },
    goToDevoirDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      let routeData;
      switch (this.routeSplited[0]) {
        case "admin":
          routeData = this.$router.resolve({
            name: "admin_devoir_detail",
            params: {
              id: id,
            },
          });
          break;
        case "referent":
          routeData = this.$router.resolve({
            name: "referent_devoir_detail",
            params: {
              id: id,
            },
          });
          break;
        case "formateur":
          routeData = this.$router.resolve({
            name: "formateur_devoir_detail",
            params: {
              id: id,
            },
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },
    ajouterDevoir() {
      const route = this.$route.path.split("/").splice(1);
      switch (route[0]) {
        case "admin":
          this.$router.push({
            name: "admin_devoir_create",
          });
          break;
        case "referent":
          this.$router.push({
            name: "referent_devoir_create",
          });
          break;
        case "formateur":
          this.$router.push({
            name: "formateur_devoir_create",
          });
          break;
      }
    },

    // Formateur
    getTrainer() {
      interventionApi
        .findTrainerByInterventionId(this.interventionId)
        .then((data) => (this.trainers = data));
    },

    // Absence
    // getAbsences() {
    //   for (let i = 0; i < this.students.length; i++) {
    //     absenceApi.getAllByIdEtudiant(this.students[i].id).then((data) => {
    //       //data est un array, on veut pas un array d'array donc on fait element par element
    //       for (let j = 0; j < data.length; j++) {
    //         this.absences.push(data[j]);
    //       }
    //     });
    //   }
    // },
    goToAbsenceDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      let routeData;
      switch (this.routeSplited[0]) {
        case "admin":
          routeData = this.$router.resolve({
            name: "admin_absence_detail",
            params: {
              id: id,
            },
          });
          break;
        case "referent":
          routeData = this.$router.resolve({
            name: "referent_absence_detail",
            params: {
              id: id,
            },
          });
          break;
        case "formateur":
          routeData = this.$router.resolve({
            name: "formateur_absence_detail",
            params: {
              id: id,
            },
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },
    ajouterAbsence() {
      const route = this.$route.path.split("/").splice(1);
      switch (route[0]) {
        case "admin":
          this.$router.push({
            name: "admin_absence_create",
          });
          break;
        case "referent":
          this.$router.push({
            name: "referent_absence_create",
          });
          break;
        case "formateur":
          this.$router.push({
            name: "formateur_absence_create",
          });
          break;
      }
    },

    // Promotion
    goToPromotionDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      switch (this.routeSplited[0]) {
        case "admin":
          return { name: "admin_promotion_detail", params: { id: id } };
        case "referent":
          return { name: "referent_promotion_detail", params: { id: id } };
        case "formateur":
          return { name: "formateur_promotion_detail", params: { id: id } };
      }
    },
    // Other
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    
  },
};
</script>

<style src="@/assets/styles/Onglet.css"></style>

<style scoped>
.start {
  width: 320px;
}

.container-note-info-personel {
  width: calc(99% - 320px);
}

.separation {
  width: 100%;
  height: 2px;
  background-color: gainsboro;
  margin: 4px 0;
}

#grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  margin-bottom: 3em;
}

#card-detail {
  grid-column: 2 / span 2;
  grid-row: 1;
  border-radius: 0;
}

.card-header {
  /* background-color: #a5303d61; */
  border-radius: 0;
  border-bottom: 0;
}

.mon-container-tuile {
  margin-bottom: 1em;
  text-align: center;
}

.ma_fenetre {
  width: 600px;
  margin: 0 auto;
}

/* .ma_tuile {
  font-size: 18px;
  text-transform: uppercase;
  border-bottom: 1px solid black;
  padding: 0 4em;
  padding-top: 0.25em;
}

.ma_tuile:hover {
  cursor: pointer;
  background-color: rgba(165, 165, 165, 0.26);
}

.activ {
  border-bottom: 2px solid rgb(49, 49, 170);
  color: rgb(9, 49, 170);
  font-weight: bold;
}

.activ:hover {
  background-color: unset;
  cursor: default;
} */

.icon-link {
  cursor: pointer;
  color: black;
  text-decoration: none;
  /* margin-bottom: 2em; */
}

.table-custom {
  text-align: center;
}

.table th {
  border-top: 0;
}

tr th {
  background: rgba(204, 198, 198, 0.329);
}

.table-custom tr:first-child {
  background-color: unset;
}

.table-custom tbody>tr:hover {
  background-color: rgba(18, 122, 192, 0.466);
  cursor: pointer;
}

.list-style-none {
  list-style: none;
  margin: 0;
  padding: 0;
}

.right-border {
  border-right: 3px solid gainsboro;
}
</style>
<style>
.tabColor {
  color: #2D001E;
}
</style>
