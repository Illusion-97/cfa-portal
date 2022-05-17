<template>
<div>
  <div>
     <HeaderFormateur :title="title" />
  </div>
  <section class="section-form d-flex justify-content-around">

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label class="mon-label">Consigne</label>
          <div class="mon-input">
            <b-form-textarea type="text" v-model="form.consigne"> </b-form-textarea>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="mon-label">Date de début</label>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
              required
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
            class="icon"/> Valider</b-button>
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
      // title : "Création d'un nouveau devoir",
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
    };
  },
  computed: {
    isFormateur() {
      return utilisateurService.isFormateur();
    }
  },
  
  methods: {
    onSubmit(event){
      event.preventDefault();
      // var bodyFormData = new FormData();
      
      this.form.interventionId = this.$route.params.id;
      // bodyFormData.append("devoir", JSON.stringify(this.form));
      console.log("BtnValider--")
      console.log("interventionId : " +this.form.interventionId);
      console.log("consigne : " +this.form.consigne);
      console.log(this.form);
      devoirApi
        .save(this.form);
    },
    getId(){
      interventionApi.getInterventionById(this.interventionId).then((data) => 
       { this.intervention2 = data;
       this.title = "Création d'un nouveau devoir " +this.intervention2.data.formationDto.titre 

      })    
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
margin-bottom: 5px;
width: 9.7em;
}

.mon-input{
  width: 99%;
}

.btnAddDevoir{
  margin-top: 1vh;
}

.section-form{
  width: 38vw;
  margin: 6vh auto;
}
</style>
