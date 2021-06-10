<template>
  <section>
    <!-- TODO : changer le chemin de retour en fonction du role. Si ADMIN => lst ADMIN sinn Si REF => lst REF -->
    <router-link :to="{ name: 'all-intervention' }" class="h5" style="cursor:pointer; color:black;text-decoration:none;">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
    <h1 class="text-center">Ajouter une intervention</h1>
    <div class="container">
      <div class="row">
        <div class=" col-md-12 div-form">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group label="Formation :" label-for="formation">
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
            </b-form-group>

            <b-form-group label="Promotion :" label-for="promotion">
              <b-form-select id="promotion" v-model="form.promotionDto" multiple required>
                <template #first>
                  <b-form-select-option disabled :value="null" class="select-title">Selectionnez une promotion
                  </b-form-select-option>
                </template>
                <template>
                  <b-form-select-option v-for="opt in opts" :key="opt.id" :value="opt">
                    {{ opt.nom }}
                  </b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>

            <b-form-group>
              <div class="d-flex" id="date">
                <label for="dateBegin">Date de debut :</label>
                <div class="col mx-2">
                  <b-form-datepicker v-model="form.dateDebut" :date-disabled-fn="dateDisabled" locale="fr"
                    id="dateBegin" hide-header :start-weekday="1" class="form-control" placeholder="Aucune date selectionnée">
                  </b-form-datepicker>
                </div>
                <label for="dateEnd">Date de fin :</label>
                <div class="col ms-2">
                  <b-form-datepicker v-model="form.dateFin" :date-disabled-fn="dateDisabled" locale="fr" id="dateEnd" class="form-control"
                    hide-header :start-weekday="1" placeholder="Aucune date selectionnée"></b-form-datepicker>
                </div>
              </div>
            </b-form-group>

            <b-form-group>
              <div id="support">
                <label for="file">Support de cours : </label>
                <input type="file" class="ms-2" id="file" name="form.support" @change="previewFiles"  />
              </div>
            </b-form-group>
<!-- 
            <b-form-group label="Description :">
              <b-form-textarea v-model="form.formationDto.contenu" rows="3" max-rows="6"
                placeholder="Description du cours" id="desc">
              </b-form-textarea>
            </b-form-group> -->
            <b-button type="reset" variant="outline-danger">Annuler</b-button>
            <b-button type="submit" variant="outline-info" class="float-end px-3">Envoyer</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result" v-if="show">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  import { interventionApi } from "@/_api/intervention.api.js";
  export default {
    data() {
      return {
        opts: [],
        courses: [],
        form: {
          formationDto: {
            id: "",
          },
          promotionDto: [],
          dateDebut: "",
          dateFin: "",
          // support: "",
        },
        items: [],
        show: true,
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      onSubmit(event) {
        event.preventDefault();
        // a modifier : ajout pour l'admin et ajout pour le referent
        interventionApi.insertIntervention(this.form)
          .then((data) =>
            data.status === 200 ? window.location = "/intervention" : window.location = "/ajouter-intervention");
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.formationDto.id = "";
        this.form.formationDto.contenu = "";
        this.form.promotionDto = [];
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
    },
    created() {
      axios
        .get("http://localhost:8080/AppliCFABack/promotions")
        .then((response) => {
          this.opts = response.data;
          // console.log(this.opts);
        })
        .catch((err) => console.error(err));

      axios
        .get("http://localhost:8080/AppliCFABack/formations")
        .then((response) => {
          this.courses = response.data;
          // console.log(this.courses);
        })
        .catch((err) => console.error(err));
    },
  };
</script>

<style scoped>
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

  .form-select {
    /* width: 100%; */
    height: calc(1.5em + 0.5rem + 2px);
    border-radius: 0.2em;
  }

  .select-title {
    background-color: #76767625;
  }

  #dateBegin,#dateEnd{
    margin-left: 1em;
  }


</style>