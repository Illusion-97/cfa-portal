<template>
  <section>
    <!-- TODO : changer le chemin de retour en fonction du role. Si ADMIN => lst ADMIN sinn Si REF => lst REF -->
    <span @click="goBack" class="h5 previous d-block">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
    <h1 class="text-center">{{ title }} une intervention</h1>
    <div class="container">
      <div class="row">
        <div class=" col-md-12 div-form">
          <form @submit="onSubmit" @reset="onReset" v-if="show">
            <!-- <b-form-group label="Formation :" label-for="formation">
              <b-form-select v-model="form.formationDto.id" id="formation" class="form-select">
                <template #first>
                  <b-form-select-option disabled :value="null" class="select-title">Selectionnez une formation
                  </b-form-select-option>
                </template>

                <template>
                  <b-form-select-option v-for="course in courses" :key="course.id" :value="course.id">
                    {{ course.titre }}
                  </b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group> -->
            <b-form-group>
              <FormationList @click-list="onClickChildFormation" :formationProp="formation_input" />
            </b-form-group>
            <b-form-group>
              <label class="mr-2" for="promo">Promotion :</label>
              <span class="btn btn-outline-dark mb-2 px-5" data-toggle="modal" data-target="#modal">
                Ajouter des promotions
              </span>
              <div v-for="prom in form.promotionsDto" :key="prom.id">
                <input type="text" name="promo" id="promo" class="form-control mb-2" disabled :value="prom.nom" />
              </div>
              <ModalPromotion idName="modal" @input="getPromotions"></ModalPromotion>
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
                    class="form-control" hide-header :start-weekday="1" placeholder="Aucune date selectionnée">
                  </b-form-datepicker>
                </div>
              </div>
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
          <b-card class="mt-3" header="Form Data Result" v-if="show">
            <pre class="m-0">{{ form }}</pre>
            <!-- <pre class="m-0">{{ items }}</pre> -->
          </b-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import { interventionApi } from "@/_api/intervention.api.js";
  import ModalPromotion from "@/components/Modal/ModalPromo.vue";
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
          dateDebut: "",
          dateFin: "",
          // support: "",
        },
        items: [],
        interventionId: this.$route.params.id,
        show: true,
      };
    },
    components: {
      ModalPromotion,
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
              this.$router.push({ name: "all-intervention" });
              // console.log(data);
              alert('ok')
            } else
              alert("ERREUR")
          })
        // .catch((err) => alert(err.response));

        //       axios.interceptors.response.use(
        //         (response) => {
        //           return response;
        //         },
        //         (error) => {
        //           if(error.status == 500) { 
        //             var newDiv = document.createElement("p");
        //             newDiv = document.textContent("error");
        //             newDiv.appendChild(newContent);
        //             var currentDiv = document.getElementById('error');
        //             document.body.insertBefore(newDiv, currentDiv);
        //           }
        // // Do something with response error
        //           // if (error.response.status === 401) {
        //           //   console.log("unauthorized, logging out ...");
        //           //   auth.logout();
        //           //   router.replace("/auth/login");
        //           // }
        //           // return Promise.reject(error.response);
        //         }
        // );
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values*
        this.form.formationDto.id = "";
        this.form.promotionsDto = [];
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
        console.log("get promo", promo);
        this.form.promotionsDto = promo;
      },
      onClickChildFormation(formation) {
        this.form.formationDto = formation;
      },
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
            this.items = data;
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