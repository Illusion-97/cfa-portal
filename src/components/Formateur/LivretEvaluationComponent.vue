<template>
  <section>

    <div>
      <!-- <button @click="colspanClick()" class="btn btn-outline-info mt-4 mb-4">
            <span v-if="!visible">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter Livret d'evaluation
            </span>
            <span v-else>
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
159
        </button> -->
      <!-- <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
            <b-card>
                <b-card-body class="d-flex justify-content-center">
                    <v-app class="w-50">

                        <form>
                            <v-row>

                            </v-row>
                        </form>
                    </v-app>
                </b-card-body>
            </b-card>
        </b-collapse> -->

      <b-card no-body class="mb-1" v-for="(eva, i ) in atEvaluations" :key="eva.at.id">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 class="btn-accordion">{{ eva.at.libelle }}</b-button>
        </b-card-header>
        <b-collapse :id="'collapse-1' + i" :visible="true" :accordion="'my-accordion-' + i + eva.at.id" role="tabpanel">
          <b-card-body class="">

            <h3>Evaluations:</h3>

            <div class="render" v-for="evalAt in eva.evaluation" :key="evalAt.id" v-html="evalAt.contenu"></div>
            <br>
            <v-app >
              <div v-if="eva.valide == false">
                <form>
                <v-radio-group v-model="eva.bloc.criteresSatisfaits" column>
                  <v-radio label="Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette
activité-type." :value=true></v-radio>
                  <v-radio label="Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel."
                    :value=false></v-radio>
                </v-radio-group>
                <v-textarea rows="2" v-model="eva.bloc.commentaireInsatisfaction" label="Commentaire Insatisfaction">
                </v-textarea>
                <v-textarea rows="2" v-model="eva.bloc.commentaireEvaluationsComplementaires"
                  label="Commentaire Evaluations Complementaires"></v-textarea>

                <v-btn class="mr-4" color="success" @click="edit(eva)">
                  <span >
                    <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
                  </span>
                  Ajouter
                </v-btn>

              </form>
              </div>
            <div v-else>
                <h4>
                  <span >
                    <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'check']" />
                </span>
                 
                  Activité type validée l'étudiant {{ eva.bloc.criteresSatisfaits ? " a staisfait" : "n'a pas satisfait " }} aux
              critères issus des référentiels du titre professionnel
                </h4>

              <v-btn class="mr-4" color="warning" @click="modifier(eva)">

                <span >
                  <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" />
                </span>
                
                Modifier
              </v-btn>
            </div>
          </v-app>
          </b-card-body>
        </b-collapse>

      </b-card>
      <!-- <b-collapse      

              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
              v-for="at in activitesTypes"
              :key="at.id"
            >
              <b-card-body>
               {{at.libelle}} 
              </b-card-body>
            </b-collapse> -->
    </div>
  </section>
</template>
<script>
import { activiteTypeApi } from "@/_api/activiteType.api.js";
import { evaluationFormationApi } from "@/_api/evaluationFormation.api.js";
import { promotionApi } from "@/_api/promotion.api.js";
import { livretEvaluationApi } from "@/_api/livretEvaluation.api.js";
import { blocEvaluationApi } from "@/_api/blocEvaluation.api.js";

export default {

  name: "LivretEvaluationComponent",
  data() {
    return {
      visible: false,
      message: "",
      color: "success",
      dismissCountDown: 0,
      activitesTypes: [],
      atEvaluations: [],
      promotion: null,
      livretEvaluation: null,
      utilisateur: this.$store.getters.getUtilisateur,

    }
  },
  watch: {
    livretEvaluation(val) {
      if (val != null) {
        this.getActivitesTypes(this.$route.params.idPromotion)

      }
    },
  },
  created() {
    this.getPrmotion();
  },

  methods: {

    edit(eva) {
      eva.bloc.formateurEvaluateurId = this.utilisateur.formateurDto.id
      eva.bloc.dateSignature = new Date(Date.now()).toISOString()
      blocEvaluationApi.update(eva.bloc).then(response => {
        eva.bloc = response
        eva.valide = true;

      }).catch(err => {
        console.log(err)
      })
    },
    modifier(eva){
      eva.valide = false;
    },
    // UpdateLivret(){

    // },
    // getBlocEvaluation(idAt,idLivret){
    //   blocEvaluationApi.getByIdAtAndIdLivret(idAt,idLivret).then(response => {

    //   })
    // },
    getLivertEvaluation(idEtu, idCursus) {
      livretEvaluationApi.getByIdEtudiantAndIdCursus(idEtu, idCursus).then(response => {
        this.livretEvaluation = response;
      }).catch(err => console.log(err))
    },
    getPrmotion() {
      promotionApi.getPromotionByid(this.$route.params.idPromotion).then(response => {
        this.promotion = response;
        this.getLivertEvaluation(this.$route.params.id, response.cursusDto.id)
      })
    },
    getVisible(i) {
      if (i == 0) {
        return true
      }
      return false
    },
    colspanClick() {
      this.visible = !this.visible
      if (this.visible == false) {
        this.clear()
        this.modifier = false;
      }
    },
    getActivitesTypes(promoId) {
      activiteTypeApi
        .getAllByIdPromotion(promoId)
        .then((response) => {
          this.activitesTypes = response;
          response.forEach(e => {

            this.getEvaluationFormationByActiviteType(e)

          });
        });
    },
    getEvaluationFormationByActiviteType(at) {
      let evaluationFormation = {
        at: at,
        evaluation: null,
        bloc: null,
        valide: false,
      };
      evaluationFormationApi.getAllByIdPromotionAndActiviteTypeId(this.$route.params.idPromotion, at.id).then(response => {
        evaluationFormation.evaluation = response;
        blocEvaluationApi.getByIdAtAndIdLivret(at.id, this.livretEvaluation.id).then(response => {
          evaluationFormation.bloc = response;
        })
        this.atEvaluations.push(evaluationFormation)

        this.atEvaluations = this.atEvaluations.sort((eva1, eva2) => { return eva1.at.numeroFiche - eva2.at.numeroFiche })
      })

    }
  },
}
</script>

<style scoped src="@/assets/styles/BtnAccordion.css">

</style>