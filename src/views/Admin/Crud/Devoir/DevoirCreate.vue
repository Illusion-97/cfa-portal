<template>
<div>
  <div class="divBtnDevoirCreate d-flex justify-content-end">
    <b-button
      variant="secondary"
      v-b-toggle.collapseFormulaire
      v-show="showshowDevoir"
      @click="showshowDevoir = !showshowDevoir"
      class="btnAddDevoir">
      <font-awesome-icon :icon="['fas', 'plus-circle']" class="icon" />
      Ajouter un devoir
    </b-button>
  </div>
  <b-alert  
    class="b-alert-succes d-flex justify-content-around"
    :show="dismissCountDown"
    dismissible
    fade
    variant="success"
    @dismissed="dismissCountDown = 0">
    {{ message }}
  </b-alert>
  <b-alert  
    class="b-alert-succes d-flex justify-content-around"
    :show="dismissCountDownErr"
    dismissible
    fade
    variant="danger"
    @dismissed="dismissCountDownErr = 0">
    {{ message }}
  </b-alert>
      <b-collapse id="collapseFormulaire">
        <section class="section-form ">
          <b-form class="form mb-5" @submit="submit">
            <!-- Consigne -->
            <b-form-group>
              <b-form-row class="text-align-left">
                <div class="mon-input">
                  <label class="mon-label">Consigne</label>
                <div>
                  <v-form class="">
                      <v-textarea
                        auto-grow
                        rows="3"
                        solo
                        name="input-7-"
                        v-model="formDevoir.consigne">
                      ></v-textarea>
                
                  </v-form>
                </div>
                </div>    
              </b-form-row>
            </b-form-group>
            <b-form-group class="formGroupDateDebut">
              <b-form-row class="text-align-left">
                <label class="mon-label">Date de début</label>
                <div class="w-100">  
                  <v-app class="vAppClass">
                    <v-col>
                       <v-container>
                          <v-row align="center">
                            <v-flex xs4>
                              <v-datetime-picker v-model="formDevoir.dateDebut" date-format="dd/MM/yyyyy">
                                <template slot="dateIcon">
                                  <v-icon>fas fa-calendar</v-icon>
                                </template>
                                <template slot="timeIcon">
                                  <v-icon>fas fa-clock</v-icon>
                                </template>
                              </v-datetime-picker>
                            </v-flex>
                          </v-row>
                       </v-container>
                    </v-col>
                </v-app>
                </div>  
              </b-form-row>
            </b-form-group>
            <b-form-group>
              <b-form-row class="text-align-left">
                <label class="mon-label">Date de fin</label>
                  <div class=" w-100">  
                  <v-app class="vAppClass">
                    <v-col>
                      <v-container>
                          <v-row align="center">
                            <v-flex xs4>
                              <v-datetime-picker v-model="formDevoir.dateFin">
                                <template slot="dateIcon">
                                  <v-icon>fas fa-calendar</v-icon>
                                </template>
                                <template slot="timeIcon">
                                  <v-icon>fas fa-clock</v-icon>
                                </template>
                              </v-datetime-picker>
                            </v-flex>
                          </v-row>
                       </v-container>
                    </v-col>
                </v-app>
                </div>  
              </b-form-row>
            </b-form-group>
          <v-app v-app class="vAppClass">
            <div>
              <b-form @submit="onSubmit" class="d-flex justify-content-end bFormBtnValider">
                <v-btn
                  color="success"
                  dark
                  type="submit"
                  class="btn-success btnFormDevoir btnFormDevoirValider">
                  <font-awesome-icon
                    :icon="['fas', 'plus-square']"
                    class="icon"/>
                    Valider
                </v-btn>
                <v-btn
                    color="warning"
                    v-b-toggle.collapseFormulaire
                    v-show="!showDevoir"
                    @click="showshowDevoir = !showshowDevoir"
                    ><font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                    Annuler
                </v-btn>
              </b-form>  
            </div>
              <div v-if="isFormateur">
              </div>
                <div v-else>
                  <InterventionListComponent
                  v-on:click-list="onClickChildInterventionList"
                  :interventionProp="intervention_input"
                />
              </div>
            </v-app>
          </b-form>
        </section>
      </b-collapse>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import InterventionListComponent from "@/components/List/InterventionListComponent.vue";
import { devoirApi } from "@/_api/devoir.api.js";
// import { interventionApi } from "@/_api/intervention.api.js";
import { utilisateurService} from "@/_services/utilisateur.service.js"; 

export default {
  name: "DevoirCreate",
  components: {
    InterventionListComponent,
  },
    props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    interventionProp: {
      default: null,
    },
  },
  data() {
    return {
      temp: {
        consigne: "",
      },
      showshowDevoir: true,
      promo: [],
      title : "",
      btn_form_text: "Ajouter",
      intervention_input: "",
      formDevoir: {
        consigne: "",
        dateDebut: null,
        dateFin: null,
        interventionId: null,
      },
      intervention: null,
      intervention2: [],
      message: "",
      dismissCountDown: null,
      dismissCountDownErr: null,
      dismissSecs: 5,
    };
  },
  computed: {
    isFormateur() {
      return utilisateurService.isFormateur();
    },
    getInterventionDate() {
      let dateDebut = new Date(this.intervention2.data.dateDebut).toLocaleDateString();
      let dateFin = new Date(this.intervention2.data.dateFin).toLocaleDateString();
      return `Du ${dateDebut}  au ${dateFin}`;
    },
  },
  methods: {
    onSubmit(event){
      // la date arrive sous format " Tue Jun 07 2022 09:05:52 GMT+0200 (heure d’été d’Europe centrale)"
      this.formDevoir.dateDebut = new Date(this.formDevoir.dateDebut).toISOString();
      this.formDevoir.dateFin = new Date(this.formDevoir.dateFin).toISOString();

      event.preventDefault();
      this.formDevoir.interventionId = this.$route.params.id;
      if (this.formDevoir.consigne != "" && this.formDevoir.dateDebut != null && this.formDevoir.dateFin != null) {
          console.log("dateDebut juste avant")
          console.log(this.formDevoir);
          devoirApi
            .save(this.formDevoir)
            .then((response) => {
          this.showAlert(false);
          console.log(response);
          //  .catch((error) => this.showAlert(response.titre, true));
        });
      } else {
        this.showAlert(this.formDevoir, true)
      }
    },
    // getId(){
    //   interventionApi.getInterventionById(this.$route.params.id).then((data) => 
    //    { this.intervention2 = data;
    //    this.title = "Création d'un nouveau devoir " +this.intervention2.data.formationDto.titre 
    //   }) 
    // },
  //   annulerFormDevoir(){
  //     let route = this.$route.path.split("/").splice(1);
  //     console.log("ma route :");
  //     console.log(route);
  //     this.$router.push({name:'formateur_intervention_detail', params: { id: this.$route.params.id }});
  //  },
    showAlert(formDevoir, isErr){
      console.log(formDevoir);
      if (isErr) {
        this.message = "Veuillez renseigner tous les champs";
        this.dismissCountDownErr = this.dismissSecs
      } else {
        this.message = "Le devoir a bien été rajouté avec succès";
        this.dismissCountDown = this.dismissSecs;
      }
    },
    onClickChildInterventionList(intervention) {
      this.form.interventionDto = intervention;
    },
    goBack() {
      this.$router.go(-1);
    },
    submit(e) {
      let route = this.$route.path.split("/").splice(1);
      e.preventDefault();
      devoirApi
        .save(this.form)
        .then(() => 
          { 
                if (route[0]== 'admin'){
                this.$router.push({ name: "admin_devoir_list", 
                });
              }
              else if (route[0] == 'referent') {
              this.$router.push({
              name: "DevoirsR",
              });
            }
            else if (route[0] == 'cef') {
              this.$router.push({
              name: "cef_devoir",
              });
            }
        });
    },
    isCreated(){
      let tab = this.$route.path.split("/");

      for(let i = 0; i<tab.length; i++)
        if(tab[i] == "create") 
          return true;      

      return false;
    },
  },
  created() {
    if (!this.isCreated()) {
      devoirApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un devoir";
        this.btn_form_text = "Update";
        this.intervention = response.interventionDto;
      });      
    }else if(
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    );
    // this.getId();
    
  }
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

.mon-btn {
  width: 80%;
}

.mon-label{
margin: 10px 0 5px 0;
width: 100%;
}

.mon-input{
  width: 99%;
}
.section-form{
  width:30vw;
  margin: 6vh auto;
}
.b-alert-succes{
  width: 30vw;
  margin: 30px auto;
}
.btnAddDevoir {
  position: relative;
  right: 0px;
  width: 18%;
  height: 100%;
}
.divBtnDevoirCreate{
  padding: 12px
}
.btnFormDevoir{
  width: 30%;
}
.btnFormDevoirValider{
  margin-right: 2vw;
}
.bFormBtnValider{
  width: 100%;
}
.vAppClass{
  height : 5vh;
  width: 100%;
}
.monDatePicker{
  width: 100%;
}
</style>