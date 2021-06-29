<template>
  <div id="Groupes">
    <BodyTitle title="Liste des groupes" />

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
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "Groupes",
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
          .get("groupeEtudiants/", requestOptions.headers())
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

