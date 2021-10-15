<template>
  <section class="mb-4">
    <span @click="goBack" class="h5 previous d-block">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
    <h1 class="text-center">{{ title }} une intervention</h1>
    <div class="container">
      <div class="row">
        <div class=" col-md-12 div-form">
          <form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group>
              <FormationList @click-list="onClickChildFormation" :formationProp="formation_input" :isDescription="false"/>
            </b-form-group>
            <b-form-group>
              <div class="d-flex justify-content-around">
                <!-- Promotions -->
                <div>
                  <label class="mr-2" for="promo">Promotion :</label>
                  <span class="btn btn-outline-dark btn-sm mb-2 px-5" data-toggle="modal" data-target="#modalPromo">
                    Ajouter des promotions
                  </span>
                </div>
                <!-- Trainers -->
                <div>
                  <label class="mr-2" for="promo">Formateur :</label>
                  <span class="btn btn-outline-dark btn-sm mb-2 px-5" data-toggle="modal" data-target="#modalTrainer">
                    Ajouter des formateurs
                  </span>
                </div>
              </div>

              <ModalFormateur idName="modalTrainer" @input="getTrainers" />
              <ModalPromotion idName="modalPromo" @input="getPromotions" />
            </b-form-group>

            <b-form-group>
              <div class="row">
                <div class="col-6">
                  <!-- Promotions -->
                  <label for="" v-if="form.promotionsDto.length > 0">Promotions :</label>
                  <div v-for="(prom,index) in form.promotionsDto" :key="uniqueKey(prom,index)">
                    <!-- <input type="text" name="promo" id="promo" class="form-control mb-2" disabled :value="prom.nom" /> -->
                    <div class="alert alert-secondary" role="alert">
                      {{prom.nom}}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <!-- Trainers -->
                  <label for="" v-if="form.formateursDto.length > 0">Formateurs:</label>
                  <div v-for="(trainer,index) in form.formateursDto" :key="uniqueKey(trainer,index)">
                    <!-- <input type="text" name="promo" id="trainer" class="form-control mb-2" disabled
                      :value="`${trainer.nom} ${trainer.prenom}`" /> -->
                    <div class="alert alert-secondary" role="alert">
                      {{trainer.nom}}
                      {{trainer.prenom}}
                    </div>
                  </div>
                </div>
              </div>
            </b-form-group>

            <b-form-group>
              <div class="d-flex" id="date">
                <label for="dateBegin">Date de debut :</label>
                <div class="col mx-2">
                  <b-form-datepicker v-model="form.dateDebut" :date-disabled-fn="dateDisabled" locale="fr"
                    id="dateBegin" hide-header :start-weekday="1" class="form-control"
                    placeholder="Aucune date selectionnée">
                  </b-form-datepicker>
                </div>
                <label for="dateEnd">Date de fin :</label>
                <div class="col ms-2">
                  <b-form-datepicker v-model="form.dateFin" :date-disabled-fn="dateDisabled" locale="fr" id="dateEnd"
                    class="form-control" hide-header :start-weekday="1" placeholder="Aucune date selectionnée" required>
                  </b-form-datepicker>
                </div>
              </div>
            </b-form-group>
            <b-form-group>
              <label for="noteInfo">Rediger une note d'information : </label>
              <textarea name="noteInfo" class="form-control" id="noteInfo" cols="30" rows="5"
                v-model="form.noteInfoPersonnel">
              </textarea>
            </b-form-group>

            <div class="d-flex justify-content-between" v-if="interventionId == null">
              <b-button type="reset" variant="outline-danger">Annuler</b-button>
              <b-button type="submit" variant="outline-info" class="">Envoyer</b-button>
            </div>
            <div class="d-flex justify-content-end" v-else>
              <b-button type="submit" variant="outline-info">Envoyer</b-button>
            </div>
          </form>
          <div id="error"></div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // import axios from 'axios';
  import { interventionApi } from "@/_api/intervention.api.js";
  import ModalPromotion from "@/components/Modal/ModalPromo.vue";
  import ModalFormateur from "@/components/Modal/FormateurModal.vue"
  import FormationList from "@/components/List/FormationListComponent.vue";
  // import VueSimpleComplete from "vue-simple-complete";
  export default {
    name: "intervention-form",
    data() {
      return {
        // opts: [],
        // courses: [],
        title: "Ajouter",
        form: {
          formationDto: {
            id: "",
          },
          promotionsDto: [],
          formateursDto: [],
          dateDebut: "",
          dateFin: "",
          noteInfoPersonnel: "",
          // support: "",
        },
        items: [],
        interventionId: this.$route.params.id,
        show: true,
        routeSplited :  this.$route.path.split("/").splice(1)

      };
    },
    components: {
      ModalPromotion,
      ModalFormateur,
      FormationList,
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      onSubmit(event) {
        event.preventDefault();
        // a modifier : ajout pour l'admin et ajout pour le referent
        interventionApi
          .insertIntervention(this.form)
          .then((data) => {
            if (data.status == 200) {
              // this.goBack();
              if(this.routeSplited[0] == 'admin')
                this.$router.push({name:'all-intervention'})
              else
                this.$router.push({name:'referent_intervention'})

              alert('ok')
            } 
          })
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values*
        this.form.formationDto.id = "";
        this.form.promotionsDto = [];
        this.form.formateursDto = [];
        this.form.dateDebut = "";
        this.form.dateFin = "";

        // this.form.support = "";
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
      },
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        const weekday = date.getDay();
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6;
      },
      previewFiles(evt) {
        this.form.support = evt.target.files[0].name;
        // console.log(this.form.support);
      },
      getPromotions(promo) {
        // console.log("get promo", promo);
        this.form.promotionsDto = promo;
      },
      getTrainers(trainer) {
        this.form.formateursDto = trainer;
      },
      onClickChildFormation(formation) {
        this.form.formationDto = formation;
      },
      uniqueKey(item, index) {
        return `${item}-${index}`;
      }
    },
    created() {
      // this.renderData();
      if (
        this.interventionId != "" &&
        this.interventionId != null &&
        this.interventionId != 0
      ) {
        interventionApi
          .getInterventionById(this.$route.params.id)
          .then((data) => {
            this.items = data.data;
            this.items.id = this.interventionId;
            this.form = this.items;
            this.title = "Modifier";
            // this.form.formationDto = this.items.formationDto;
            this.form.promotionsDto = this.items.promotionsDto;
          });
      }
    },
    computed: {
      formation_input() {
        return this.form.formationDto;
      },
    },
  };
</script>

<style scoped>
  .previous {
    cursor: pointer;
    color: black;
    text-decoration: none;
    /* margin-bottom: 2em; */
  }

  .icon {
    cursor: pointer;
  }

  #formation,
  #promotion,
  #date,
  #support,
  #desc {
    width: 100%;
    margin-bottom: 1em;
    height: auto;
  }

  #formation,
  #promotion,
  .form-control {
    border: 1px solid #767676;
    border-radius: 0.2em;
  }

  /* .form-select {
    width: 100%;
    height: calc(1.5em + 0.5rem + 2px);
    border-radius: 0.2em;
  } */

  .select-title {
    background-color: #76767625;
  }

  #dateBegin,
  #dateEnd {
    margin-left: 1em;
  }
</style>