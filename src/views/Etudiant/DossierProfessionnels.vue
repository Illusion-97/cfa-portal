<template>
  
  <div class="container-fluid" id="container">
    <h2>Dossiers professionnels</h2>
    <br/>
    <div>
</div>
<br/>
    <div v-if="items && items.length > 0 && this.$store.getters.getUtilisateur.etudiantDto">
    <!-- Tableau -->
    <b-table small head-variant="dark" :items="items" :fields="fields" primary-key="id">
      <!-- Contenu du tableau -->
      <template #cell(DossierPro)="data">
        {{ data.item.items.nom }}
      </template>

      <template #cell(action)="data">
        <!-- BOUTON MODIFIER -->
        <b-button size="sm" class="mr-2" variant="warning" @click="getDossiers(data.item.id)">
          <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
          Modifier
        </b-button>

        <!-- BOUTON TELECHARGER -->
        <b-button class="btn mr-2 btn-success btn-sm" type="button" @click="generer(data.item.id)">
    <i class="fa-solid fa-file-pdf"></i>
    Télécharger
  </b-button>

        <!-- BOUTON VOIR -->
        <button @click="voirDossier(data.item.id, data.item.fileImport)" class="btn btn-info btn-sm">
    <font-awesome-icon class="mr-1 ml-1" :icon="['fas', 'eye']" /> 
    Voir      
  </button>
       
      </template>
    </b-table>
   
  </div>
  <div v-else>
    <ul>
      <li>Pas de dossier professionnel !</li>
    </ul>
  </div>
   
  <p :data="pdfUrl" type="application/pdf" width="100%" height="600"></p>  


    <div>
<!-- BOUTON CREER -->
<router-link :to="{
 name: 'etudiant_dossierprofessionnel' 
 }">
<b-button size="sm" class="mr-2" variant="info">
  <v-icon>mdi-arrow-left</v-icon>
  Retour  
</b-button>
</router-link>


</div>
</div>
</template>

<script>
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import Swal from 'sweetalert2';

export default {
  name: "DossierPro",
  data() {
    return {
    pdfUrl:'',
    etudiantId:this.$store.getters.getUtilisateur.etudiantDto.id,
      items: [],
      telecharger: [],
      fields: [
      {
        key: "nom",
        label : "Nom du dossier",
        thStyle: { width: "50%" },
       },
       {
          key: "Action",
          label: "Action",
          thStyle: { width: "25%" },
},
      ]
    };
  },

  methods: {
   
    generer(dossierId) {
      dossierProfessionnelApi.generateDossier(dossierId).then(() => {
        Swal.fire({
        icon: 'success',
        title: 'Dossier téléchargé avec succès',
        showConfirmButton: false,
        timer: 1500 
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Échec du téléchargement du dossier',
        text: 'Veuillez réessayer plus tard',
      });
    });
    },

    getDossiers(item) {
      this.$router.push({
        name: "modifier_dossier_pro",
        params: { id: item },
      });
    },

    voirDossier(dossierId) {
      dossierProfessionnelApi.voirDossierPro(dossierId)
        .then(() => {
          const fileName = `${this.items.nom}-DP.pdf`;
          this.pdfUrl = `http://localhost:8080/${fileName}`;
        })
        .catch((error) => console.log(error));
},
  
  },

  created() {

  this.items = []; 
  dossierProfessionnelApi
    .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
    .then((data) => {
      this.items = data; 
    })
    .catch((error) => {
      console.error("Error", error);
    });
 
}

  

};
</script>

<style scoped src="@/assets/styles/StyleEtudiant.css">
.custom-search-field {
width: 50%; 
size: 10%;
}
</style>
