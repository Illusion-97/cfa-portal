<template>
  <section v-if="(livretEvaluation != null)">
   
    <div >
      
     
<h3   class="m-4  text-center">Etât du liveret : {{livretEvaluation.etat | etatLivret }} </h3>
      <b-card no-body class="mb-1" v-for="(eva, i ) in atEvaluations" :key="eva.at.id">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 class="btn-accordion">{{ eva.at.libelle }}</b-button>
        </b-card-header>
        <b-collapse :id="'collapse-1' + i" :visible="true" :accordion="'my-accordion-' + i + eva.at.id" role="tabpanel">
          <b-card-body class="">
            <v-app>
              <div v-if="eva.valide == false">
                <h3>Evaluations: </h3>

                <div class=" render" v-for="evalAt in eva.evaluation" :key="evalAt.id" v-html="evalAt.contenu"></div>
                <br>
                <form v-if="(eva.bloc !=null)">
                  <v-radio-group  v-model=" eva.bloc.criteresSatisfaits" column>
                    <v-radio label="Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette
activité-type." :value=true></v-radio>
                    <v-radio label="Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel."
                      :value=false></v-radio>
                  </v-radio-group>
                  <div >

                  </div>
                  <v-textarea   rows="2" v-model="eva.bloc.commentaireInsatisfaction" label="Commentaire Insatisfaction">
                  </v-textarea>
                  <v-textarea rows="2" v-model="eva.bloc.commentaireEvaluationsComplementaires"
                    label="Commentaire Evaluations Complementaires"></v-textarea>

                  <v-btn class="mr-4" color="success" @click="edit(eva)">
                    <span>
                      <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
                    </span>
                    Ajouter
                  </v-btn>

                </form>
              </div>
              <div v-else>
                <h4>
                  <span>
                    <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'check']" />
                  </span>

                  Activité type validée l'étudiant {{ eva.bloc.criteresSatisfaits ? " a staisfait" : "n'a pas satisfait"
                  }} aux
                  critères issus des référentiels du titre professionnel
                </h4>

                <v-btn class="mr-4" color="warning" @click="modifier(eva)">

                  <span>
                    <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" />
                  </span>

                  Modifier
                </v-btn>
              </div>
            </v-app>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <v-app class="mt-4 mb-4">
      <h3 class="text-center mt-4 text-white bg-dark ">Validation global du livret</h3>
      <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0" class="m-2">
      {{ message }}
    </b-alert>
      <form  class="mt-4" >
  
        <v-textarea rows="2" v-model="livretEvaluation.observation" label="Commentaire globale du livret">
        </v-textarea>

        <v-btn class="mr-4" color="success" @click=" UpdateLivret">
          <span>
            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
          </span>
          Valider
        </v-btn>

      </form>
    </v-app>

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
      reload : true,
    }
  },
  watch: {
    livretEvaluation(val) {
      if (val != null && this.reload) {
        this.getActivitesTypes(this.$route.params.idPromotion)
        this.reload = false
      }
    },
  },
  created() {
    this.getPrmotion();
   
  },

  methods: {
    async forceRerender() {
      // Remove MyComponent from the DOM
      //this.renderComponent = false;

			// Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
     // this.renderComponent = true;
    },
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
    modifier(eva) {
      eva.valide = false;
    },
    UpdateLivret(){
      let livret = this.livretEvaluation;
      livret.etat = "VALIDEPARLEFORMATEUR"
      
      livretEvaluationApi.update(livret).then(response =>{
       this.livretEvaluation = response;
       this.color = "success";
          this.dismissCountDown = 6;
          this.message = "le Livret d'évaluation a été modifier avec success"
          setTimeout(() => {
            this.forceRerender();
          }, 6000);
    
      }).catch(err => {
          this.color = "danger";
          this.dismissCountDown = 6;
          this.message = err;
        })
    },
    // getBlocEvaluation(idAt,idLivret){
    //   blocEvaluationApi.getByIdAtAndIdLivret(idAt,idLivret).then(response => {

    //   })
    // },
    getLivertEvaluation(idEtu, idCursus) {
      livretEvaluationApi.getByIdEtudiantAndIdCursus(idEtu, idCursus).then(response => {
        this.livretEvaluation = response;
      
         // this.getActivitesTypes(this.$route.params.idPromotion)
  
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
        valide: this.livretEvaluation.etat != "ENATTENTEDEVALIDATION" ? true : false,
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