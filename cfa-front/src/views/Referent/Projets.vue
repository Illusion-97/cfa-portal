<template>
  <div id="Projets">
    <BodyTitle title="Liste des projets" />

    <div class="container">
      <a href="/referent/creation-projet" class="btn btn-primary">Créer un projet</a>
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
import { projetsFields } from "@/assets/js/fields.js"
import axios from "axios";
export default {
  name: "Projets",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [
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
      ],
      fields: projetsFields,
      created() {
        axios
          .get("http://localhost:8080/AppliCFABack/projets/10")
          .then((response) => (this.items = response.data))
          .catch((e) => this.errors.push(e));
        },
    };
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

