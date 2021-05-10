<template>
  <div>
    <BodyTitle title="Liste des documents administratifs" />
    <div class="">
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <button v-on:click="submitFile()">Ajouter</button>
    </div>
    <!-- <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
    /> -->

    <!-- <div>
      <p>{{items[0]}}</p>
      <p>{{items[1]}}</p>
      <p>{{items[2]}}</p>
      <p>{{items[3]}}</p>
    </div> -->

    <div class="container">
      <div class="row">
        <b-table id="my-table" striped small :items="items" :fields="fields" :per-page="per_page"
              :current-page="currentPage">

              <template #cell(name_dl)="data">
                  <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon text-success"  @click="download_file(data.value)"/> 
              </template>

              <template #cell(name_delete)="data">
                  <font-awesome-icon :icon="['fas', 'times']" class="icon text-danger" @click="delete_file(data.value)"/>
              </template>
        </b-table>
        <b-pagination class="pages ml-auto border-0" v-model="currentPage" :total-rows="rows" :per-page="per_page"
          aria-controls="my-table" size="sm">
        </b-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import BodyTitle from "@/components/utils/BodyTitle.vue";
// import TableTemplate from "@/components/utils/TableTemplate.vue";
import { fileFields } from "@/assets/js/fields.js";
export default {
  name: "DepotFichier",
  components: {
    BodyTitle,
    // TableTemplate,
  },
  data() {
    return {
      files: [],
      fields: fileFields,
      per_page: 10,
      currentPage: 1,
      file : '',
    };
  },
  computed: {
    items() {
      let result = [];
      //set up pour TableTemplate
      
      

      console.log("on commence le calcul d'items");
      console.log("file = " + this.files);

      for(let i = 0; i < this.files.length; i++){

        let table = {name : "", name_dl: "", name_delete: ""};

        table.name = this.files[i];
        table.name_dl = this.files[i];
        table.name_delete = this.files[i];
        
        result.push(table);
        // result[i] = table;
        // result.add()

        console.log("######################")
        // console.log("file = " + this.files);

        console.log("table = " + table);
        console.log("table.name = " + table.name);
        console.log("table.name_dl = " + table.name_dl);
        console.log("table.name_delete = " + table.name_delete);

        // console.log("result.length = " + result.length);

        console.log("result["+i+"] = ")
        console.log(result[i]);

        console.log("i = "+ i +"\tresult = " + result);
        console.log(result);
        
        console.log("######################")
      }
      

      console.log("result = ");
      console.log(result);

      return result;
    },
    rows() {
      return this.items.length;
    },
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
        .then(() => this.list_reset())
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
        .then((response) =>{
          console.log("#################");
          console.log("response.data = ");
          console.log(response.data);
          console.log("#################");
          (this.files = response.data)})
        .catch((error) => console.log(error));
    },
    download_file(fileName){
        let req = 
          this.$apiUrl +
          "AppliCFABack/files/" +
          "utilisateurs/" +
          this.$store.getters.getUtilisateur.id +
          "/" +
          fileName;

        axios
          .get(req, { responseType: "blob" })
          .then(resp => {
                var fileURL = window.URL.createObjectURL(new Blob([resp.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', fileName);
                document.body.appendChild(fileLink);
                fileLink.click();
          })
          .catch((error) => console.log(error));

      },
      delete_file(fileName){
        let req = 
          this.$apiUrl +
          "AppliCFABack/files/" +
          "utilisateurs/" +
          this.$store.getters.getUtilisateur.id +
          "/" +
          fileName;

        axios
          .delete(req)
          .then(() => this.list_reset())
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

 #my-table {
    text-align: center;
  }
</style>
