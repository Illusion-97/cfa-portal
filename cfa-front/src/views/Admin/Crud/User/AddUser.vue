<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />
      

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Prénom</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.prenom"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

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

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Login</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.login"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Password</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.password"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

    
      <div class="offset-1 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">{{btn_form_text}}</button>
      </div>
    </b-form>

    </div>

    
</template>

<script>
import {utilisateurApi} from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";

export default {
  name: "AddUser",
  components: {
    BodyTitle,
  },
  data() {
    return {
      btn_form_text: "Ajouter",

      form: {
        id: null,
        prenom: "",
        nom: "",
        login: "",
        password: "",
      },
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      utilisateurApi.save(this.form).then(() => this.$router.push({ name: 'admin_dashboard'}));
    },
  },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      console.log(this.$route.params.id);
      utilisateurApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'un utilisateur";
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