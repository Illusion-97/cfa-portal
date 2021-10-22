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
        <div class="mon-group">
            <label class="form-label"
              >Selectionner un projet pour le dossier Projet :
            </label>
            <select
              class="custom-select"
              v-model="selected"
              @change="onSelected()"
            >
              <option
                v-for="projet in projets_computed"
                :key="projet.id"
                :value="projet"
                >{{ projet.nom }}</option
              >
            </select>
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
    </div>
    

</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {dossierProjetApi} from "@/_api/dossierProjet.api.js";
import { fileApi } from "@/_api/file.api.js"
import {projetApi} from "@/_api/projet.api.js"

export default {
  name: "DossierPro",
  components: {
    BodyTitle
  }, data(){
    return{

      files: [],
      fileToSave : "",
      file: "",
      projets: [],
      selected: null,
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
    projets_computed(){
      return this.projets
    }
  },
  methods:{
    onSelected() {
      this.form.projetDto = this.selected;
    },
      handleFileUpload() {
      this.fileToSave = this.$refs.file.files[0];
    },
    submitFile() {    
      this.form.nom = this.fileToSave.name;
      fileApi.submitFileByDirectoryAndIdAndDirectory("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProjet", this.fileToSave);
      dossierProjetApi.save(this.form,this.$store.getters.getUtilisateur.id).then(()=>this.refreshList())
      
    },
    download_file(fileName) {
      fileApi.downloadByDirectoryAndIdAndDirectoryAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, "DossierProjet",fileName);
      
    },
    delete_file(file) {
      dossierProjetApi.deleteDossierProjet(file.id,this.$store.getters.getUtilisateur.id).then(()=>this.refreshList());
      fileApi.deleteByDirectoryAndIdAndDirectoryAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id,"DossierProjet", file.nom);
      
    },
    refreshList(){
    dossierProjetApi.getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id).then(response => this.files = response)
    projetApi.getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id).then(response => this.projets= response)
  
    }
  }
}

</script>