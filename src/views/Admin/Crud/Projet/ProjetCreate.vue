<template>
  <div class="container-fluid">
    <span id="title"><h4>Création d'un nouveau Projet</h4></span>
  <b-card>
    <v-app style="margin-left: 25%" class="w-50">
    <form class="form mb-5" @submit="submit">
      <v-text-field rows="2" label="Nom du Projet" type="text" v-model="form.nom" required></v-text-field>
      <v-text-field label="Description" v-model="form.description" rows="3" max-rows="6"></v-text-field>
      <v-select label="Groupe" v-model="form.groupeId" :items="allGroupe" item-value="id">
        <option><v-btn>Ajouter un groupe</v-btn>
        </option>
      </v-select>
      <div class="offset-10 col-3 pr-5 pl-0">
        <b-button type="submit" class="btn btn-primary mon-btn">
          Ajouter
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
  components: {
  },
  data() {
    return {
      vue_title: "Création d'un nouveau Projet",
      form: {
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
    submit(e) {
      e.preventDefault();
      projetApi
        .save(this.form)
        .then((response) => {
          //Quand on créer l'objet, on ajoute la pj sur le serveur, après la création du dossier (donc de l'objet)
          if (this.file != "") this.submitFile(response.id);
        })
    },
  },
  created() {
     groupeApi
         .getAll()
         .then((response) => {this.allGroupe = response, console.log(response)})
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
