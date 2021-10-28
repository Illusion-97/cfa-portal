<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />
      

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Numero</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.numero" type="number" min="0" placeholder="0"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Rue</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.rue"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Ville</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.ville"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Code Postal</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.codePostal" type="number" min="0" placeholder="01"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

    
      <div class="offset-1 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">{{btn_form_text}}</button>
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
import {adresseApi} from "@/_api/adresse.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";

export default {
  name: "AddAdresse",
  components: {
    BodyTitle,
  },
  data() {
    return {
      vue_title: "Création d'une adresse",
      btn_form_text: "Ajouter",

      form: {
        id: null,
        numero: "",
        rue: "",
        ville: "",
        codePostal: "",
      },
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      adresseApi.save(this.form).then(() => this.goBack());
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      // console.log(this.$route.params.id);
      adresseApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'une adresse";
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