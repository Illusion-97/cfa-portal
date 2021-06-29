<template>
  <div id="Projets">
    <BodyTitle title="Liste des projets" />

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
  <br>
    <div class="container">
      <router-link class="btn btn-primary" :to="{ name: 'referent_create-projet'}">Créer un projet</router-link>
    </div>

    
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
    />
    <router-link
      :to="{ name: 'referent_groupe-projet' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";

import TableTemplate from "@/components/utils/TableTemplate.vue";
import { projetsFields } from "@/assets/js/fieldsReferent.js"
import axios from "axios";
import { requestOptions } from '@/_helpers/request-options.js';
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "Projets",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      etudiantsBDD: null,
      promotions: null,

      selected: null,
      items: [/*
        {
          nom: "Projet CFA",
          description: "Site CFA",
          cahierDesCharges: "en pj",
          groupe: "Paris Nantes",
        },
        {
          nom: "Planning",
          description: "Planning membre Dawan",
          cahierDesCharges: "en pj",
          groupe: "#",
        },
        {
          nom: "CV",
          description: "CV",
          cahierDesCharges: "en pj",
          groupe: "#",
        },
        {
          nom: "Skills",
          description: "#",
          cahierDesCharges: "en pj",
          groupe: "#",
        },
      */],
      fields: projetsFields,
      
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
          .get("projets/", requestOptions.headers())
          .then((response) => (this.items = response.data))
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

