<template>
 
  <div class="container-fluid">
     <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <BodyTitle :title="vue_title" />      

    <b-form class="form mb-5" @submit="submit">

      <!-- Cursus -->
      <b-form-group>        
        <b-form-row class="text-align-left">
          <label class="col-1">Cursus</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.cursusDto.titre"
              required
            ></b-form-input>
          </div>
          <a class="btn btn-primary" @click="showCursusModal">Choisir le cursus</a>
        </b-form-row>
      </b-form-group>

      <!-- Nom -->
      <b-form-group>        
        <b-form-row class="text-align-left">
          <label class="col-1">Nom</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.nom"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <!-- Dates -->
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Date de début</label>
          <div class="col-5 pr-5">
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
          <label class="col-1">Date de fin</label>
          <div class="col-5 pr-5">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>          

      <!-- Referent -->
      <b-form-group>        
        <b-form-row class="text-align-left">
          <label class="col-1">Referent</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.referentPedagogiqueDto"
              required
            ></b-form-input>
          </div>
          <a class="btn btn-primary" @click="showReferentModal">Choisir le référent</a>
        </b-form-row>
      </b-form-group>

      <!-- CEF -->

      <!-- Centre -->

      <!-- Etudiants -->

      <!-- Interventions   -->
    
      <div class="offset-1 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">{{btn_form_text}}</button>
      </div>
    </b-form>

    
      <CursusModal
      v-show="isCursusModalVisible"
      @close="closeCursusModal"
      v-on:close="onClickCursusClose"
      />

    </div>    
</template>

<script>
import {promotionApi} from "@/_api/promotion.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import CursusModal from "@/components/Modal/CursusModal.vue";

export default {
  name: "AddPromo",
  components: {
    BodyTitle,
    CursusModal,
  },
  data() {
    return {
      vue_title: "Création d'une promotion",
      btn_form_text: "Ajouter",
      cef: null,

      form: {
        id: null,
        dateDebut: "",
        dateFin: "",
        nom: "",
        cursusDto: {},
        referentPedagogiqueDto: {},
        cefDto: {},
        centreFormationDto: {},
        etudiantsDto: [],
        interventionsDto: [],
      },

      isCursusModalVisible: false,
      isReferentModalVisible: false,
    };
  },
  computed: {
    cefComputed() {
      return this.cef;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit(e) {
      e.preventDefault();

      promotionApi.save(this.form).then(() => this.$router.push({ name: 'admin_promotion_list'}));
    },

    //Cursus Modal
    showCursusModal() {
      this.isCursusModalVisible = true;
    },
    closeCursusModal() {
      this.isCursusModalVisible = false;
    },
    onClickCursusClose(cursus){
      this.form.cursusDto = cursus;
    },

    //Referent Modal
    showReferentModal() {
      this.isReferentModalVisible = true;
    },
    closeReferentModal() {
      this.isReferentModalVisible = false;
    },
    onClickReferentClose(referent){
      this.form.referentPedagogiqueDto = referent;
    }
  },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      console.log(this.$route.params.id);
      promotionApi.getPromotionByid(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'une promotion";
        this.btn_form_text = "Modifier";
        });
      
    }
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

#saisie {
  width: 70%;
  margin-right: 5%;
}

.mon-btn{
  width: 80%;
}
</style>