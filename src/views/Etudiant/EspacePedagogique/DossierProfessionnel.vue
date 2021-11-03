<template>
      <div class="body">
        <BodyTitle title="Mon dossier professionel" />
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
        <table class="table table-striped table-hover text-center">
          <thead>
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
                <button v-on:click="download_file(file.nom)">Télécharger</button>
                <button v-on:click="delete_file(file)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
    
    </div>
</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { fileApi } from "@/_api/file.api.js"
import {dossierProfessionnelApi} from "@/_api/dossierProfessionnel.api.js"
import {cursusApi} from "@/_api/cursus.api.js"

export default {
  name: "DossierPro",
  components: {
    BodyTitle,
  },
  data(){
    return{

      files: [],
      fileToSave : "",
      file: "",
      etudiant: "",
      url:"",

      form:{
        nom : "",
        cursusDto :""
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
   
    submitFile(){    
      this.form.nom = this.fileToSave.name;
      fileApi.submitFileByDirectoryAndIdAndDirectory("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProfessionnel", this.fileToSave);
      dossierProfessionnelApi.save(this.form,this.$store.getters.getUtilisateur.id).then(()=>this.refreshList());
    },
    download_file(fileName) {
      fileApi.downloadByDirectoryAndIdAndDirectoryAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, "DossierProfessionnel",fileName);
    },
    delete_file(file) {
      dossierProfessionnelApi.deleteDossierProfessionnel(file.id,this.$store.getters.getUtilisateur.id).then(()=>this.refreshList());
      fileApi.deleteByDirectoryAndIdAndDirectoryAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProfessionnel", file.nom);
    },
     refreshList() {
    cursusApi.getCurrentCursusByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id).then(response => this.form.cursusDto = response)
    dossierProfessionnelApi.getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id).then(response => this.files = response)
     }
  }
}
</script>