<template>
  <section>
    <!-- <router-link @click="goBack()" class="h6" style="cursor:pointer; color:black">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Retour à la liste
    </router-link> -->
    <router-link :to="{name:'formateur_cours'}" class="h6" style="cursor:pointer; color:black">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
    <div class="container">
      <div class="row">
        <div class=" col-md-12 div-form">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
            <b-form-group label="Formation :" label-for="formation">
              <!-- <b-form-input id="input-1" v-model="form.course" type="text" placeholder="Intitulé du cours" required>
              </b-form-input> -->
              <b-form-select v-model="form.course" id="formation">
                <template #first>
                  <b-form-select-option disabled :value="null" class="select-title">Selectionnez une formation</b-form-select-option>
                </template>

                <template>
                  <b-form-select-option v-for="course in courses" :key="course.id" :value="course.id">
                    {{course.titre}}
                  </b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Promotion :" label-for="input-3">
              <b-form-select id="input-3" v-model="form.class" multiple required>
                <template #first>
                  <b-form-select-option disabled :value="null" class="select-title">Selectionnez une promotion</b-form-select-option>
                </template>
                <template>
                  <b-form-select-option v-for="opt in opts" :key="opt.id" :value="opt.id">{{opt.nom}}
                  </b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>

            <b-form-group>
              <div class="d-flex">
                <label for="dateBegin">Date de debut :</label>
                <div class="col">
                  <b-form-datepicker v-model="form.dateBegin" :date-disabled-fn="dateDisabled" locale="fr"
                    id="dateBegin" hide-header :start-weekday="1">
                  </b-form-datepicker>
                </div>
                <label for="dateEnd">Date de fin :</label>
                <div class="col">
                  <b-form-datepicker v-model="form.dateEnd" :date-disabled-fn="dateDisabled" locale="fr" id="dateEnd"
                    hide-header :start-weekday="1"></b-form-datepicker>
                </div>
              </div>
            </b-form-group>

            <b-form-group>
              <label for="support" class="pr-1">Support de cours : </label>
              <input type="file" name="form.support" @change="previewFiles" id="support" />
            </b-form-group>

            <b-form-group label="Description :">
              <b-form-textarea v-model="form.content" rows="3" max-rows="6" placeholder="Description du cours">
              </b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        // opt: [{
        //     text: "Selectionnez une promotion",
        //     disabled: true,
        //     value: null,
        //   },
        //   {
        //     text: "Concepteur Developpeur d'Application PARIS 2021",
        //     value: "CDA PARIS 2021",
        //   },
        //   {
        //     text: "Concepteur Developpeur d'Application NANTES 2021",
        //     value: "CDA NANTES 2021",
        //   },
        //   {
        //     text: "Concepteur Developpeur d'Application AMIENS 2021",
        //     value: "CDA AMIENS 2021",
        //   },
        // ],
        opts: [],
        courses: [],
        form: {
          course: "",
          class: [],
          dateBegin: "",
          dateEnd: "",
          support: "",
          content: ""
        },
        show: true,
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      onSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.course = "";
        this.form.class = [];
        this.form.dateBegin = "";
        this.form.dateEnd = "";
        this.form.support = "";
        this.form.content = "";
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
      }
    },
    created() {
      axios.get('http://localhost:8080/AppliCFABack/promotions').then(response => {
        this.opts = response.data;
        console.log(this.opts);
      }).catch(err => console.error(err));

      axios.get('http://localhost:8080/AppliCFABack/formations').then(response => {
        this.courses = response.data;
        console.log(this.courses);
      }).catch(
        err => console
        .error(err))
    }
  };
</script>

<style scoped>
  .div-form {
    text-align: left;
  }

  .form-control {
    border-radius: 0.2em;
    border: 1px solid #767676;
    /* border-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));; */
  }

  .form-select {
    width: 100%;
    height: calc(1.5em + 0.5rem + 2px);
    border-radius: 0.2em;
  }

  .select-title {
    background-color: #76767625;
  }
</style>