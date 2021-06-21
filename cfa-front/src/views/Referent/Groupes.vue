<template>
  <div id="Groupes">
    <BodyTitle title="Liste des groupes" />

    <div class="container">
      <router-link class="btn btn-primary" :to="{ name:'referent_create-groupe'}">Créer un groupe</router-link>
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
import { groupesFields } from "@/assets/js/fieldsReferent.js"
import axios from "axios";
import { requestOptions } from '@/_helpers/request-options.js';
export default {
  name: "Groupes",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [/*
        {
          nom: "Team1",
        },
        {
          nom: "Team2",
        },
        {
          nom: "Team3",
        },
      */],
      fields: groupesFields,
       
    };
  },
  created() {
        axios
          .get("groupeEtudiants/", requestOptions.headers())
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

