<template>
<div>
  <div>
     <HeaderFormateur :title="title" :subTitle="getInterventionDate" />
  </div>
  <b-alert  
        class="b-alert-succes d-flex justify-content-around"
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismissed="dismissCountDown = 0"
      >
        {{ message }}
      </b-alert>
  <section class="section-form ">


    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label class="mon-label">Consigne</label>
          <div class="mon-input">
            <b-form-textarea type="text" v-model="form.consigne" required> </b-form-textarea>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="mon-label">Date de dÃ©but</label>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>

       <b-form-group>
        <b-form-row class="text-align-left">
          <div class="mon-label">Date de fin</div>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>

    <div class="d-flex justify-content-end">
      <b-form @submit="onSubmit">
        <b-button
          type="submit"
          class="btnAddDevoir btn-success">
          <font-awesome-icon
            :icon="['fas', 'plus-square']"
            class="icon"/> Valider
      </b-button>
      </b-form>
      <b-button
              class="btnAddDevoir btn-warning"
              v-b-toggle.collapseFormulaire
              @click="annulerFormDevoir"
              ><font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
              Annuler
        </b-button>
    </div>


      <div v-if="isFormateur">
      </div>
      <div v-else>
        <InterventionListComponent
        v-on:click-list="onClickChildInterventionList"
        :interventionProp="intervention_input"
      />
      </div>
    </b-form>
  </section>
  </div>
</template>

<script>
import InterventionListComponent from "@/components/List/InterventionListComponent.vue";
import  HeaderFormateur  from "@/components/Navigation/HeaderFormateur.vue";
import { devoirApi } from "@/_api/devoir.api.js";
import { interventionApi } from "@/_api/intervention.api.js";
import { utilisateurService} from "@/_services/utilisateur.service.js"; 

export default {
  name: "DevoirCreate",
  components: {
    HeaderFormateur,
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
      interventionId: this.$route.params.id,
      promo: [],
      title : "",
      // title : "CrÃ©ation d'un nouveau devoir",
      btn_form_text: "Ajouter",
      intervention_input: "",
      form: {
        consigne: "",
        dateDebut: "",
        dateFin: "",
        interventionId: null,
        interventionDto: {},
      },
      intervention: null,
      intervention2: [],
      message: "",
      dismissCountDown: null,
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
      event.preventDefault();
      this.form.interventionId = this.$route.params.id;
      devoirApi
        .save(this.form)
        .then((response) => {
          this.showAlert(response.titre, false);
        });
    },
    getId(){
      interventionApi.getInterventionById(this.interventionId).then((data) => 
       { this.intervention2 = data;
       this.title = "Creation d'un nouveau devoir " +this.intervention2.data.formationDto.titre 
  
      }) 
    },
    annulerFormDevoir(){
      console.log("test");
    },
    showAlert(){
      this.message = "Le devoir a été mis a jours avec succes";
      this.dismissCountDown = this.dismissSecs;
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
    )
    this.getId();
    
  },
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
width: 9.7em;
}

.mon-input{
  width: 99%;
}

.btnAddDevoir{
  margin: 3vh 0 0 2vw;
  width: 10vw;
}


.section-form{
  width:30vw;
  margin: 6vh auto;
}
.b-alert-succes{
  width: 30vw;
  margin: 30px auto;
}
</style>