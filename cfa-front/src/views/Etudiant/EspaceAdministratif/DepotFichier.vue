<template>
  <div>
    <BodyTitle title="Liste des documents administratifs" />
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="true"
      btnTxt="Ajouter un fichier"
      btnLink="/"
    />

  </div>
</template>

<script>
import axios from "axios";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { fileFields } from "@/assets/js/fields.js";
export default {
  name: "DepotFichier",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      files: [],
      fields: fileFields,
      perPage: 10,
    };
  },
  computed: {
    items() {
      let result = [];
      let table = {name : ""};

      for(let i = 0; i < this.files.length; i++){
        table.name = this.files[i];
        result.push(table);
      }

      return result;
    }
  },
  methods: {
  },
  created() {
    let req = 
      this.$apiUrl +
      "AppliCFABack/files/" +
      "utilisateurs/"+
      this.$store.getters.getUtilisateur.id;

    axios
      .get(req)
      .then((response) => (this.files = response.data))
      .catch((error) => console.log(error));
  }
};
</script>

<style scoped>
.form {
  border: 1px solid #6c757d;
  margin-top: 5em;
  padding-top: 2em;
  padding-left: 5em;
  padding-right: 5em;
}

.b-form-textarea {
  height: 200px;
}
</style>
