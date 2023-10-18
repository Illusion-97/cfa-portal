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
                          <b-form-textarea
                            auto-grow
                            rows="3"
                            solo
                            name="input-7-"
                            v-model="formDevoir.consigne">
                          ></b-form-textarea>
                    
                      </v-form>
                    </div>
                    </div>    
                  </b-form-row>
                </b-form-group>
                <b-form-group class="formGroupDateDebut">
                  <b-form-row class="text-align-left">
                    <div class="mon-label">
                      Date de début
                    </div>
                    <div>
                      <v-flex>
                        <b-form-datepicker v-model="formDevoir.dateDebut" date-format="MM/dd/yyyy" placeholder="Choisir une date">
                          <template slot="dateIcon">
                            <v-icon>fas fa-calendar</v-icon>
                          </template>
                          <template slot="timeIcon">
                            <v-icon>fas fa-clock</v-icon>
                          </template>
                        </b-form-datepicker>
                      </v-flex>
                    </div>
                  </b-form-row>
                </b-form-group>
                <b-form-group>
                  <b-form-row class="text-align-left">
                      <div class="mon-label">
                      Date de fin
                    </div>
                    <div>
                      <v-flex>
                        <b-form-datepicker v-model="formDevoir.dateFin" date-format="MM/dd/yyyy" placeholder="Choisir une date">
                          <template slot="dateIcon">
                            <v-icon>fas fa-calendar</v-icon>
                          </template>
                          <template slot="timeIcon">
                            <v-icon>fas fa-clock</v-icon>
                          </template>
                        </b-form-datepicker>
                      </v-flex>
                    </div>
                  </b-form-row>
                </b-form-group>
                <div>
                  <b-form @submit="onSubmit" class="d-flex justify-content-end bFormBtnValider">
                    <v-btn class="btnFormDevoir btnFormDevoirVider" color="secondary" @click="clear">
                      <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'broom']" />
                        Vider
                    </v-btn>
                    <v-btn
                      v-b-toggle.collapseFormulaire
                      @click="showshowDevoir = !showshowDevoir"
                      color="success"
                      dark
                      type="submit"
                      class="btnFormDevoir btnFormDevoirValider">
                      <font-awesome-icon
                        :icon="['fas', 'plus-square']"
                        class="icon"/>
                        Valider
                    </v-btn>
                    <v-btn
                        color="warning"
                        class="btnFormDevoir"
                        v-b-toggle.collapseFormulaire
                        @click="showshowDevoir = !showshowDevoir"
                        ><font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                        Annuler
                    </v-btn>
        
                  </b-form>  
                </div>

              </b-form>
            </section>
          </b-collapse>
      </div>
    </template>
    
    <script>
    import '@fortawesome/fontawesome-free/css/all.css';
    //import InterventionListComponent from "@/components/List/InterventionListComponent.vue";
    import {devoirApi} from "@/_api/devoir.api.js";
    // import { interventionApi } from "@/_api/intervention.api.js";
    import {utilisateurService} from "@/_services/utilisateur.service.js";

    export default {
      name: "DevoirCreate",
      components: {
        //InterventionListComponent,
      },
        props: {
        isAction: {
          type: Boolean,
          default: false,
        },
        interventionProp: {
          default: null,
        },
        getAllDevoirsByInterventionId: {
          type: Function,
          required: true
        }
      },
      data() {
        return {
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          menu2: false,
          modalShow: false,
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
          // this.formDevoir.dateDebut = new Date(this.formDevoir.dateDebut).toISOString();
          // this.formDevoir.dateFin = new Date(this.formDevoir.dateFin).toISOString();
    
    
    
          event.preventDefault();
          this.formDevoir.interventionId = this.$route.params.id;
          if (this.formDevoir.consigne != "" && this.formDevoir.dateDebut != null && this.formDevoir.dateFin != null) {
              devoirApi
                .save(this.formDevoir)
                .then(() => {
              this.showAlert(false);
              this.getAllDevoirsByInterventionId()
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
      //     this.$router.push({name:'formateur_intervention_detail', params: { id: this.$route.params.id }});
      //  },
        showAlert(isErr){
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
        clear() {
          this.formDevoir.consigne = '';
          this.formDevoir.dateDebut = null;
          this.formDevoir.dateFin = null;
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
      width: 12vw;
      height: 100%;
    }

    .btnFormDevoir{
      width: 8vw;
    }
    .btnFormDevoirValider{
      margin-right: 2vw;
    }
    .btnFormDevoirVider{
      margin-right: 2vw;
    }
    .bFormBtnValider{
      width: 100%;
    }
    .divBtnDevoirCreate{
      padding-bottom: 12px;
    }
    </style>
