<template>
    <div class="container-fluid" id="container">

      <h2>Dossiers professionnels</h2>
      <br/>
      <div>
  <!-- Barre de recherche -->
  <v-text-field v-model="search" label="Rechercher" class="input--small"></v-text-field>
       <v-btn @click.prevent="performSearch"><v-icon>mdi-magnify</v-icon></v-btn>
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
          <b-button size="sm" class="mr-2" variant="primary" @click="getDossiers(data.item.id)">
            <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
            Modifier
          </b-button>

          <!-- BOUTON TELECHARGER -->
          <b-button class="btn mr-2 btn-success btn-sm" type="button" v-on:click="generer(data.item.id, data.item.nom)">
            <i class="fa-solid fa-file-pdf"></i>
            Télécharger
          </b-button>

          <!-- BOUTON VOIR -->
          <v-btn small color="light" @click="voirDossier(data.item.id)">
            <v-icon>mdi-eye</v-icon>              
          </v-btn>
        </template>
      </b-table>
  
    </div>
    <div v-else>
      <ul>
        <li>Pas de dossier professionnel !</li>
      </ul>
    </div>
     

    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" @input="handlePageChange"></b-pagination>


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
  
  export default {
    name: "DossierPro",
    data() {
      return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      search: "",
      
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
     
 generer(id, nomDossierPro) {
        dossierProfessionnelApi.genererDossierProfessionnel(id).then(response => {
            const bas64 = response;
            const linkSource = `data:application/pdf;base64,${bas64}`;
            const downloadLink = document.createElement("a");
            const fileName = "dossier-pro-" + nomDossierPro + ".pdf";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          }).catch(error => {
      console.error("Erreur lors du téléchargement du fichier", error);
    });
      },
  
      getDossiers(item) {
        this.$router.push({
          name: "modifier_dossier_pro",
          params: { id: item },
        });
      },
      handlePageChange(page) {
        this.currentPage = page;
      //this.fetchDossiers();
  },


voirDossier(promotionId) {
  const etudiantId = this.$store.getters.getUtilisateur.etudiantDto.id;

  dossierProfessionnelApi.generateDossierProByStudentAndPromo(etudiantId, promotionId)
    .then(() => {
      this.$router.push({
        name: 'dossierVoir',
        params: {
          etudiantId: etudiantId,
          promotionId: promotionId
        }
      });
    })
    .catch((error) => console.log(error));
},

  
  /*fetchDossiers() {
  const page = this.currentPage;
  const size = this.perPage;
  const search = this.search;
  const etudiantId = this.$store.getters.getUtilisateur.etudiantDto.id;

  dossierProfessionnelApi
    .getAllByPage(page, size, search, etudiantId)
    .then((data) => {
      if (data && data.items.length > 0) {
        this.items = data.items;
        this.totalRows = data.totalElements;
      } else {
        this.items = [];
        this.totalRows = 0;
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
},*/


  performSearch() {
    this.currentPage = 1; 
     // this.fetchDossiers();
      
  },

   
    
    },

    created() {
  
      this.items = []; // Initialize the items array

dossierProfessionnelApi
  .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
  .then((data) => {
    this.items = data; // Assign the retrieved data to items
   // this.fetchDossiers(); // Call fetchDossiers to update totalRows and totalPages
  })
  .catch((error) => {
    console.error("Error", error);
  });
      
}
    

  };
  </script>
  
  <style scoped src="@/assets/styles/StyleEtudiant.css">
  .custom-search-field {
  width: 50%; /* Ajoutez la largeur souhaitée */
  size: 10%;
}
</style>
  