<template>
  <div class="container-fluid" >
    <v-btn style="margin-top: 10px" color="back-color" class="back" @click="goBack()">
      <v-icon>
        mdi-arrow-left
      </v-icon>
      Précédent
    </v-btn>
    <span id="title"><h4>{{vue_title}}</h4></span>
  <b-card>
    <v-app style="margin-left: 25%" class="w-50">
    <form class="form mb-5" @submit="submit()">
      <v-text-field rows="2" label="Nom du Projet" type="text" v-model="form.nom" required></v-text-field>
      <v-text-field label="Description" v-model="form.description" rows="3" max-rows="6"></v-text-field>
      <v-select label="Groupe" v-model="form.groupeId" :items="allGroupe" item-value="id" item-text="nom">
      </v-select>
      <div class="offset-10 col-3 pr-5 pl-0">
        <b-button variant="primary" type="submit" class="btn btn-primary mon-btn">
          {{btn_title}}
        </b-button>
      </div>
    </form>
    </v-app>
  </b-card>
  </div>
</template>

<script>
import { projetApi } from "@/_api/projet.api.js";
import { fileFields } from "@/assets/js/fields.js";
import {groupeApi} from "@/_api/groupe.api";

export default {
  name: "projetCreate",
  components: {},
  props: {
    isVisible: {
      type: Boolean
    },
    refreshList:{
      type: Function
    }
    },
  data() {
    return {
      vue_title: "Création d'un nouveau Projet",
      btn_title: "Ajouter",
      form: {
        id:this.$route.params.id,
        nom: "",
        description: "",
        groupeId: null,
      },
      groupe: null,
      allGroupe: [],
      selectedGroup: {},
      idGroup: 0,
      //Pour les files
      files: [],
      fields: fileFields,
      file: "",
    };
  },
  computed: {
    groupe_input() {
      return this.groupe;
    },
    rows() {
      return this.items.length;
    },
    routeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    submit() {
      projetApi
        .save(this.form)
        .then(() => {
          if (this.$route.params.id != null &&
              this.$route.params.id != "" &&
              this.$route.params.id != 0) {
            this.$router.go(-1);
          } else {
            this.refreshList();
            this.closeModal();
          }
        })
    },
    update(){
      projetApi
          .update(this.form)
          .then(this.goBack)
    },
    getProjet(){
      projetApi
          .getById(this.$route.params.id)
          .then(response => { this.form = response})
    },
    paramUrl(){
      if (this.$route.params.id != null &&
          this.$route.params.id != "" &&
          this.$route.params.id != 0){
        this.btn_title = "Modifier"
        return true
      }
      return false
    },
    closeModal(){
      const closeIt = !this.isVisible;
      this.$emit('update:isVisible', closeIt)
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    if ( this.paramUrl()){
      this.vue_title = "Modification du projet",
          this.getProjet()
      groupeApi
          .getAll()
          .then((response) => {this.allGroupe = response})
    }
     groupeApi
         .getAll()
         .then((response) => {this.allGroupe = response})
    }
};
</script>

<style scoped>
#title{
  display: flex;
  justify-content: center;
  padding: 0.5em;
}
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

.mon-label {
  margin-left: 2.2em;
  width: 9.7em;
}

</style>
