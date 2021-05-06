<template>
  <div id="Groupes">
    <BodyTitle title="Liste des groupes" />

    <div class="container">
      <a href="/referent/creation-groupe" class="btn btn-primary">Créer un groupe</a>
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
export default {
  name: "Groupes",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [
        {
          nom: "Team1",
        },
        {
          nom: "Team2",
        },
        {
          nom: "Team3",
        },
      ],
       created() {
        axios
          .get("http://localhost:8080/AppliCFABack/groupeEtudiants/10")
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

