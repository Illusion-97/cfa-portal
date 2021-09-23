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

       <br>
       <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Nom du fichier</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="files_computed">
            <tr v-for="file in files_computed" 
                :key="file.id"
                >
              <td>
                {{file.nom}}
              </td>
              <td>
                <button>Visualiser</button>
                <button v-on:click="download_file(file.nom)">Télécharger</button>
              </td>
            </tr>
          </tbody>
        </table>

>>>>>>> ba7c9f521e21377772417ff9605c5a1c4e3513e4
    </div>
    </div>
    

</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {dossierProjetApi} from "@/_api/dossierProjet.api.js";
import { fileApi } from "@/_api/file.api.js"
import {etudiantApi} from "@/_api/etudiant.api.js"

export default {
  name: "DossierPro",
  components: {
    BodyTitle
  }, data(){
    return{

      files: [],
      fileToSave : "",
      file: "",
      etudiant: "",

      form:{
        nom : "",
        projetDto :null
      }
    }
  },
 created(){
    this.refreshList();
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
      this.fileToSave = this.$refs.file.files[0];
    },
    submitFile() {    
      this.form.nom = this.fileToSave.name;
      this.etudiant.dossierProjet.push(this.form)  
      fileApi.submitFileByDirectoryAndIdAndDirectory("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProjet", this.fileToSave);
      etudiantApi.save(this.etudiant)
    },
    download_file(fileName) {
      fileApi.downloadByDirectoryAndIdAndDirectoryAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, "DossierProfessionnel",fileName);
    },
    delete_file(fileName) {
      fileApi.deleteByDirectoryAndIdAndDirectoryAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProfessionnel", fileName);
    },
    refreshList(){
    dossierProjetApi.getByIdEtudiant(this.$store.getters.getUtilisateur.id).then(response => this.files = response)
    etudiantApi.getById(this.$store.getters.getUtilisateur.id).then(response => this.etudiant = response)
  
    }
  }
}

</script>