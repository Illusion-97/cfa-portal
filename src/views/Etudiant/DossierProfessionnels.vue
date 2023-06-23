<template>
    <div class="container-fluid" id="container">

      <h2>Dossiers professionnels</h2>
      <br/>
      <v-text-field
        v-model="search"
        label="Search"
        class="input--small"
      ></v-text-field>
       <v-btn @click.prevent="fetchDossiers">
       <v-icon>mdi-magnify</v-icon>
       </v-btn>
  <br/>
  <br/>
      <div v-if="items && items.length > 0 && this.$store.getters.getUtilisateur.etudiantDto">
      <!-- Tableau -->
      <div v-for="result in search" :key="result.id">
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
    </div>
    <div v-else>
      <ul>
        <li>Pas de dossier professionnel !</li>
      </ul>
    </div>

    <b-pagination v-if="items && items.length > 0 && $store.getters.getUtilisateur.etudiantDto"
              v-model="currentPage"
              :total-rows="totalItems"
              :per-page="pageSize"
              @input="fetchDossiers"
></b-pagination>


     
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
         pageSize: 5, // Remplacez par la taille de page souhaitée
         totalItems: 0, // Remplacez par le nombre total d'éléments
         search:'',
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

  async fetchDossiers() {
  try {
    const result = await dossierProfessionnelApi.getAllByPage(this.currentPage, this.pageSize, this.search, this.$store.getters.getUtilisateur.etudiantDto.id);
    if (result) {
      this.items = result.content;
      this.totalItems = result.totalElements;
    }
  } catch (error) {
    console.error(error);
  }
}

    
    },

    created() {
      this.fetchDossiers();
      dossierProfessionnelApi
        .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.items = data));
        
    },

  };
  </script>
  
  <style scoped src="@/assets/styles/StyleEtudiant.css">
  .custom-search-field {
  width: 50%; /* Ajoutez la largeur souhaitée */
  size: 10%;
}
</style>
  