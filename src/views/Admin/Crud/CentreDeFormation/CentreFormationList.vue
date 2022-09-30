<template>
  <div>
    <div class="header-list">
      <!-- <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          placeholder="Rechercher"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form> -->
    </div>
    <!-- {{centresFormation}} -->
    <div class="row d-flex justify-content-arround">
      <div 
        v-for="centreFormation in centresFormationComputed"
        :key="centreFormation.id"
        @click="click(centreFormation)"
        class="col-lg-4 col-md-12 col-sm-12 rounded mt-4 container-card"
      >
        <b-card
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          footer-tag="footer"
          footer-bg-variant="success"
          footer-border-variant="dark"
          style="max-width: 32rem"
          class="card-Promotions col"
        >
        <b-card-header
          class="d-flex justify-content-between bg-white text-secondary col"
        >
          {{centreFormation.adresseDto.libelle}} - {{centreFormation.adresseDto.codePostal}} 
          - {{centreFormation.adresseDto.ville}}
        </b-card-header>
        <b-card-text class="mt-4 font-weight-bold">
          {{centreFormation.nom}}
        </b-card-text>
          <b-card-footer
            class="d-flex justify-content-between bg-white text-secondary"
          >
            <span>
              Nombre de promotions en cours : 
            </span>
          </b-card-footer>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { centreFormationApi } from "@/_api/centreFormation.api.js"
export default {
  name: "CentreFormationList",
  data() {
    return {
      centresFormation: [],
      perPage : 9,
      saisie: "",
      currentPage: 1,
    }
  },
  computed: {
    centresFormationComputed() {
      return this.centresFormation
    },
  },
  components: {
  },
  created () {
    this.getListCentresFormation();
  },
  mounted() {
    this.getNextCentresFormation();
  },
  methods:{
    getListCentresFormation(){
      centreFormationApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => {this.centresFormation = response
        });
     },
    getNextCentresFormation(){
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight === 
          document.documentElement.offsetHeight;
          if(bottomOfWindow) {
            this.currentPage++;
            this.pageChange(this.currentPage * this.perPage);
          }
      }
    },
    pageChange(perPage) {
      centreFormationApi
        .getAllByPage(0, perPage, this.saisie)
        .then((response) => {this.centresFormation = response
        //dans BDD table centreFormation, colonne adresse vite pour ligne SurSite, ADistance
        for(let i = 0; i < this.centresFormation.length; i++){
          if(this.centresFormation[i].adresseDto == null){
          this.centresFormation[i].adresseDto= "";
          }
          }
        });
    },
    click(centreFormation){
      this.$router.push({
        name: "admin_centreFormation_details",
        params: {id: centreFormation.id}
      });
    },
  }
  
};
</script>
<style scoped>
</style>

