<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />
      
      <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <b-form class="form mb-5 mt-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Titre</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.titre"
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
import {cursusApi} from "@/_api/cursus.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";

export default {
  name: "AddAdresse",
  components: {
    BodyTitle,
  },
  data() {
    return {
      vue_title: "Création d'un Cursus",
      btn_form_text: "Ajouter",

      form: {
        id: null,
        titre: "",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit(e) {
      e.preventDefault();

      cursusApi.save(this.form).then(() => this.goBack());
    },
  },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      // console.log(this.$route.params.id);
      cursusApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'un cursus";
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