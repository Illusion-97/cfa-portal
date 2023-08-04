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
        <b-button class="btn mr-2 btn-success btn-sm" type="button" v-on:click="generer(etudiantId, promotionId)">
          <i class="fa-solid fa-file-pdf"></i>
          Télécharger
        </b-button>

        <!-- BOUTON VOIR -->
        <button @click="voirDossier(etudiantId, promotionId)" class="btn btn-info btn-sm">
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
import { promotionApi } from "@/_api/promotion.api.js";

export default {
  name: "DossierPro",
  data() {
    return {
    currentPage: 1,
    perPage: 5,
    totalRows: 0,
    search: "",
    pdfUrl:'',
    etudiantId:this.$store.getters.getUtilisateur.etudiantDto.id,
    promotionId:this.$route.params.id,
    promotion:[],
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
   
generer(etudiantId, promotionId) {
  window.open(
        "http://localhost:8085/dossierProfessionnel/dossier-professionnel/" +
        etudiantId +
        "/" +
        promotionId
      );
    },

    getDossiers(item) {
      this.$router.push({
        name: "modifier_dossier_pro",
        params: { id: item },
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
},


voirDossier(etudiantId, promotionId) {
  dossierProfessionnelApi.generateDossierProByStudentAndPromo(etudiantId, promotionId)
    .then(() => {
      const fileName = `dossierEtudiant${etudiantId}-promo${promotionId}-1.pdf`;
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

  if (
    this.$route.params.id != null &&
    this.$route.params.id !== "" &&
    this.$route.params.id !== 0
  ) {
    this.promotionId = this.$route.params.id;
    promotionApi.getPromotionByid(this.promotionId)
      .then((response) => {
        this.promotion = response;
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }
}

  

};
</script>

<style scoped src="@/assets/styles/StyleEtudiant.css">
.custom-search-field {
width: 50%; 
size: 10%;
}
</style>
