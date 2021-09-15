<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mon dossier projet" />
        <br>
        <div class="">
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            class="mr-3"
            accept="application/pdf"
          />
          <button v-on:click="submitFile()" class="btn btn-primary">Ajouter</button>
        </div>

        <div class="column" v-if="files_computed">
          <div class="col-md-2" v-for="f in files_computed" :key="f.id">
                <b-card-text {{f.name}}
                  ></b-card-text>
          </div>

    </div>
    </div>
    </div>
    

</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {dossierProjetApi} from "@/_api/dossierProjet.api.js";
import { fileApi } from "@/_api/file.api.js"

export default {
  name: "DossierPro",
  components: {
    BodyTitle
  }, data(){
    return{

      files: [],
      file : "",

      form:{
        nom : "",
        projetDto :null
      }
    }
  },
  created(){
    

  },
   computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    files_computed(){
      return this.files;
    },
    },
  methods:{
      handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {    
      this.form.nom = this.file.name;    
      fileApi.submitFileByDirectoryAndIdAndDirectory("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProjet", this.file).then(() => this.list_reset());
      dossierProjetApi.save(this.form)
    },
    list_reset() {
      // fileApi.getListByDirectoryAndIdAndDirectory("utilisateurs",this.$store.getters.getUtilisateur.id).then((response) => this.files = response);
    },
    download_file(fileName) {
      fileApi.downloadByDirectoryAndIdAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, fileName);
    },
    delete_file(fileName) {
      fileApi.deleteByDirectoryAndIdAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, fileName).then(() => this.list_reset());
    },
  }
}
</script>