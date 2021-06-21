<template>
  <div id="Projets">
    <BodyTitle title="Liste des projets" />

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
export default {
  name: "Projets",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
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
  created() {
        axios
          .get("projets/", requestOptions.headers())
          .then((response) => (this.items = response.data))
          .catch((e) => this.errors.push(e));
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

