<template>
  <div id="Cours">
   
    <BodyTitle title="Liste des Cours" />

    <div class="mon-group">
            <label class="form-label"
              >Choisissez une promotion pour affiner la recherche :
            </label>
            <select
              class="custom-select"
              v-model="selected"
              @change="onSelected()"
            >
              <option
                v-for="promotion in promotionsComputed"
                :key="promotion.id"
                :value="promotion"
                >{{ promotion.nom }}</option
              >
            </select>
          </div>

    <div class="container">
      <br />
      <div class="row g-2">
        <div class="col-sm-2">
          <router-link class="btn btn-primary" :to="{name: 'CreateCoursR'}"
            >Créer un cours</router-link
          >
        </div>
      </div>
      <br />
      <div class="btn-group" role="group" aria-label="Basic example">
      <router-link class="btn btn-secondary" :to="{name: 'NoteInfoR'}">Rédiger une note d'information optionnelle </router-link>
      <router-link class="btn btn-secondary" :to="{name: 'CreateSupportCoursR'}">Enregistrer un support de cours</router-link>
      <router-link class="btn btn-secondary" :to="{name: 'ExamenR'}">Voir la liste des examens</router-link>
      <router-link class="btn btn-secondary" :to="{ name: 'DevoirsR' }">Voir la liste des devoirs</router-link>
      </div>
      <br />
      
    </div>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
     />
    
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import axios from "axios";
import { requestOptions } from '@/_helpers/request-options.js';
import { courseFields } from "@/assets/js/fields.js";
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "Cours",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      fields: courseFields,
      etudiantsBDD: null,
      promotions: null,

      selected: null,
      items: [
        /*{
          nom: "C#",
          "Note d'information": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          ProgrammeDeCours: "Programme C#",
        },
        {
          nom: "Java",
          "Note d'information": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          ProgrammeDeCours: "Programme Java",
        },
        {
          nom: "Sql",
          "Note d'information": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          ProgrammeDeCours: "Programme Sql",
        },
      */],
      
    };
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    etudiantsBDDComputed() {
      return this.etudiantsBDD;
    },
  },
  methods: {
    onSelected() {
      promotionApi
        .getEtudiants(this.selected.id)
        .then((response) => (this.etudiantsBDD = response));
        
    },
  },
  created() {
      axios
        .get("interventions/", requestOptions.headers())
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((e) => this.errors.push(e));
        promotionApi.getAll().then((response) => (this.promotions = response));
    },
};
</script>
<style scoped>
.opts,
label {
  color: black;
}
.table {
  text-align: center;
}
.icon:hover {
  cursor: pointer;
}
</style>

