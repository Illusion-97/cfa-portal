<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label id="label" >Enonce</label>
          <div id="input">
            <b-form-input type="text" v-model="form.enonce"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <CursusListComponent v-on:click-list="onClickChildCursusList" :cursusProp="cursus_input"/>

      <FormationListComponent v-on:click-list="onClickChildFormationList" :formationProp="formation_input"/>

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import FormationListComponent from "@/components/List/FormationListComponent.vue";
import CursusListComponent from "@/components/List/CursusListComponent.vue";
import { examenApi } from "@/_api/examen.api.js";

export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
    FormationListComponent,
    CursusListComponent,
  },
  data() {
    return {
      vue_title: "Création d'un nouvel examen",
      btn_form_text: "Ajouter",

      form: {
        enonce: "",
        formationDto: {},
        cursusDto: {},
      },

      formation: null,
      cursus: null,
    };
  },
  computed: {
    formation_input(){
      return this.formation;
    },
    cursus_input(){
      return this.cursus;
    },
  },
  methods: {
    onClickChildFormationList(formation) {
      this.form.formationDto = formation;
    },
    onClickChildCursusList(cursus) {
      this.form.cursusDto = cursus;
    },
    goBack() {
      this.$router.go(-1);
    },
    submit(e) {
      let route = this.$route.path.split("/").splice(1);
      e.preventDefault();
      examenApi.save(this.form)
      .then(() => 
          { 
                if (route[0]== 'admin'){
                this.$router.push({ name: "admin_examen_list", 
                
                });
              }
              else if (route[0] == 'referent') {
              this.$router.push({
              name: "ExamenR",
              });
            }
            else if (route[0] == 'cef') {
              this.$router.push({
              name: "cef_examen",
              });
            }

        });
    },
  },
  created(){
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      examenApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Update d'un examen";                
        this.btn_form_text = "Update";
        this.formation = response.formationDto;
        this.cursus = response.cursusDto;
        });
      
    }
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
  
  #saisie {
    width: 70%;
    margin-right: 5%;
  }
  
  .mon-btn{
    width: 80%;
  }
  
#form-group{
  margin-left: 1.8em;
}

#label{
  width: 10em;
  padding-left: 0.2em;;
}

#input{
  width: 37.2%
}
</style>
