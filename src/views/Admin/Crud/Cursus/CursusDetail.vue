<template>
  <div class="container-fluid">
    <br>
    <div class="button-container">
      <v-btn color="back-color" class="back" @click="goBack()">
        <v-icon>
          mdi-arrow-left
        </v-icon>
        Précédent
      </v-btn>
      <!-- Ajout du bouton "Suivant" en haut à droite -->
      <v-btn class="btnModel" @click="goToDetailModele(cursusId)">
        <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" />
        Voir le modèle
      </v-btn>
    </div>

    <div id="my-card">
      <div>
        <p class="font-weight-bold" style="text-align: center; font-size: 20px; word-break: break-all">{{ cursus.titre }}</p>
      </div>

      <b-card-header style="background-color: #129cb8">
        <span class="">Details</span>
      </b-card-header>

      <div style="display: grid; grid-template-rows: repeat(2, 1fr); padding-left: 10px">
        <div class="row-detail-title" >
          <h6 class="font-weight-bold">Titre : </h6>
          <p style="word-break: break-all; width: 100%;">{{ cursus.titre }}</p>
        </div>
        <div class="row-detail-title">
          <h6 class="font-weight-bold">Durée : </h6>
          <p class="">{{ cursus.duree }}</p>
        </div>
      </div>

      <div class="identity  ml-6">
        <span class="font-weight-bold">Promotions associées :</span>
        <table class="table table-striped table-hover text-center ">
          <thead>
            <tr>
              <th>Nom de la promo</th>
              <th>Ville</th>
              <th>Date de debut</th>
              <th>Date de fin</th>
              <th>Nombres de participants</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="promotionsComputed">
            <tr
              v-for="promotion in promotionsComputed"
              :key="promotion.id"
              class="mon-tr"
            >
              <td>{{ promotion.nom.split("-").join(" ") }}</td>
              <td>{{promotion.centreFormationAdresseVille}}</td>
              <td>{{ promotion.dateDebut | formatDate }}</td>
              <td>{{ promotion.dateFin | formatDate }}</td>
              <td>{{promotion.nbParticipants}}</td>
              <td>{{promotion.type}}</td>
              <td><b-button  @click="detail(promotion.id)">Voir</b-button></td>
            </tr>
          </tbody>
        </table>

        <paginate
            class="customPagination"
            :page-count="pageCount"
            :page-range="1"
            :margin-pages="2"
            :click-handler="pageChange"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination float-right'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-link-class="'page-link'"
            :active-class="'active'"
        >
        </paginate>
      </div>

    </div>

  </div>
</template>

<script>
import {cursusApi} from "@/_api/cursus.api.js";

export default {
  name: "CursusDetail",
  components: {},
  data() {
    return {
      cursusId: this.$route.params.id,
      cursus: {},
      promotions: [],
      loading: false,
      currentPage: 0,
      perPage: 10,
      pageCount: 0,

    };
  },
  computed: {
    promotionsComputed() {
      return this.promotions.content;
    },
  },
  created() {
    cursusApi
      .getById(this.$route.params.id)
      .then((response) => (this.cursus = response));
    cursusApi.countPromotionByIdCursus(this.$route.params.id).then(response =>{
      this.pageCount = Math.ceil(response / this.perPage)
    })
    cursusApi
        .getAllPromotionByIdCursusPaginate(this.$route.params.id, this.pageCount, this.perPage)
        .then((response) => (this.promotions = response));
  },
  methods :{
    pageChange(pageNum) {
      cursusApi
          .getAllPromotionByIdCursusPaginate(this.$route.params.id, pageNum - 1, this.perPage)
          .then((response) => (this.promotions = response));
    },
    goBack() {
      this.$router.go(-1);
    },
    detail(id) {
      this.$router.push({ name: "admin_promotion_details", params: { id: id } });
    },
    goToDetailModele(id){
      this.$router.push({ name: "admin_cursus_modele_details", params: { id: id } });
    }
  }
};
</script>

<style scoped>
#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
  display: grid;
  grid-template-rows: 0.1fr 0.1fr 0.39fr 1fr;
}

#my-card > .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 25px;
}

.card-text {
  display: flex;
  justify-content: space-between;
}

.card-text > span {
  display: inline-block;
  width: 40em;
  padding-left: 3em;
}
.row-detail-title{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 0.3fr 1fr;
}
.back-color {
  background-color: #00072d !important;
  color: white !important;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin: 10px; /* Ajustez selon vos besoins */
}

/* Ajoutez du style pour les boutons si nécessaire */
.back {
  background-color: #00072d !important;
  color: white !important;
}

.btnModel {
  background-color: #007bff !important;
  color: white !important;
}
</style>
