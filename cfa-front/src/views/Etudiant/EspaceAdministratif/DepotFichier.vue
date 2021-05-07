<template>
  <div>
    <BodyTitle title="Liste des documents administratifs" />
    <div class="">
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <button v-on:click="submitFile()">Ajouter</button>
    </div>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
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
      file : '',
    };
  },
  computed: {
    items() {
      let result = [];
      //set up pour TableTemplate
      let table = {name : "", name_dl: "", name_delete: ""};

      for(let i = 0; i < this.files.length; i++){
        table.name = this.files[i];
        table.name_dl = this.files[i];
        table.name_delete = this.files[i];
        result.push(table);
      }

      return result;
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    submitFile(){
      let req = 
        this.$apiUrl +
        "AppliCFABack/files/" +
        "utilisateurs/"+
        this.$store.getters.getUtilisateur.id;

      let formData = new FormData();
      formData.append('file', this.file);

      axios
        .post(req, formData,{headers: {'Content-Type': 'multipart/form-data'}})
        .then(this.list_reset())
        .catch((error) => console.log(error));
    },
    list_reset(){
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
  },
  created() {
    this.list_reset();
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
