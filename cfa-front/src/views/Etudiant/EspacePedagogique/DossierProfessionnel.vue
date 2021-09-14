<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mon dossier professionel" />
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
    </div>
    </div>
    

</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
//import pdf from 'vue-pdf';
import { fileApi } from "@/_api/file.api.js"
import {dossierProfessionnelApi} from "@/_api/dossierProfessionnel.api.js"
import {cursusApi} from "@/_api/cursus.api.js"

export default {
  name: "DossierPro",
  components: {
    BodyTitle,
    //pdf
  },
  data(){
    return{

      files: [],
      file : "",

      form:{
        nom : "",
        cursusDto :""
      }
    }
  },
  created(){
    cursusApi.getCurrentCursusByIdEtudiant(this.$store.getters.getUtilisateur.id).then(response => this.form.cursusDto = response)

  },
   computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    },
  methods:{
      handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {    
      this.form.nom = this.file.name;    
      fileApi.submitFileByDirectoryAndIdAndDirectory("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProfessionnel", this.file).then(() => this.list_reset());
      dossierProfessionnelApi.save(this.form);
    },
    list_reset() {
      fileApi.getListByDirectoryAndId("utilisateurs",this.$store.getters.getUtilisateur.id).then((response) => this.files = response);
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