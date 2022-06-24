<template>
  <div>
    <div class="stickyPosition">
      <HeaderFormateur :title="promotion.nom" />
    </div>
    <section>
      <div class="container-fluid mt-4">
        <b-tabs content-class="mt-3" fill v-model="tabIndex">
          <b-tab active>
            <template v-slot:title>
              <font-awesome-icon
                :icon="['fas', 'user-graduate']"
                class="icon"
              />
              Etudiants
            </template>
            <div>
              <table class="table">
                <thead class="">
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="etudiant in promotion.etudiantsDto"
                    :key="etudiant.id"
                    @dblclick="clickEtudiant(etudiant)"
                    class="mon-tr"
                  >
                    <td>{{ etudiant.utilisateurDto.prenom }}</td>
                    <td>{{ etudiant.utilisateurDto.nom }}</td>
                    <td>{{ etudiant.utilisateurDto.login }}</td>
                    <td>
                      {{ etudiant.utilisateurDto.telephone }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-tab>
          <b-tab>
            <template v-slot:title>
              <font-awesome-icon
                :icon="['fas', 'business-time']"
                class="icon"
              />
              Interventions
            </template>
            <div id="interventions">
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
                  <tr
                    v-for="intervention in promotion.interventionsDto"
                    :key="intervention.id"
                    @dblclick="clickIntervention(intervention)"
                    class="mon-tr"
                  >
                    <td>{{ intervention.formationDto.titre }}</td>
                    <td>{{ intervention.heuresDisponsees }}</td>
                    <td>{{ intervention.dateDebut | formatDate }}</td>
                    <td>{{ intervention.dateFin | formatDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-tab>
          <b-tab @click="reloadExam()">
            <template v-slot:title>
              <font-awesome-icon :icon="['fas', 'file-alt']" class="icon" />
              Examens
            </template>

            <ExamensPromotionsListCompoenent
              :examens="promotion.examensDto"
              ref="examen"
            />
          </b-tab>
          <b-tab>
            <template v-slot:title>
              <font-awesome-icon
                :icon="['fas', 'sort-numeric-up-alt']"
                class="icon"
              />
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
import HeaderFormateur from "@/components/Navigation/HeaderFormateur.vue";
import AjouterNotes from "@/components/Formateur/AjouterNotes.vue";

export default {
  name: "PromotionDetailFormateur",
  components: {
    ExamensPromotionsListCompoenent,
    HeaderFormateur,
    AjouterNotes,

    // BodyTitle,
  },
  props: {},
  data() {
    return {
      // AjouterNotes: {
      //   ouvert : false,
      //   titre : "qsddqd"
      // },
      tabIndex: 1,
      promotionId: this.$route.params.id,
      promotion: {
        cursusDto: {},
        referentPedagogiqueDto: {},
        cefDto: { utilisateurDto: {} },
        interventionsDto: [{ formationDto: {} }],
        etudiantDto: [{ utilisateurDto: {} }],
      },
      itemsEtudients: [],
      ville: "",
      onglet: 1,
      isModalVisible: false,
    };
  },

  computed: {},
  methods: {
    reloadExam() {
      this.$refs.examen.assigneTableItems(this.promotion.examensDto);
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    clickEtudiant(etudiant) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_detail",
          params: { id: etudiant.id },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_detail",
          params: { id: etudiant.id },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_detail",
          params: { id: etudiant.id },
        });
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
  },
  created() {
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

.identite > .nom {
  font-size: 1.5em;
}

#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
}

#my-card > .card-header {
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

.card-text > span {
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
</style>
