<template>
  <div>
    <div class="header-list">
      <!-- <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="key"
          placeholder="Rechercher une formation..."
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form> -->
      <div class="updateListFormation p-2">
        <button outlined @click="openLoginWdg2" class="btn btn-outline-info">
          Mise à jour des interventions
        </button>
        <div class="login-wdg2">
          <login-wdg-2
            v-if="showLoginWdg2Card"
            @logInUser="logInUserWdg2"
            @wdg2Close="wdg2Close"
          />
        </div>
      </div>
    </div>

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
import LoginWdg2 from "../../../../components/LoginWdg2.vue";
export default {
  name: "CentreFormationList",
    components:{
      LoginWdg2,
    },
  data() {
  
    return {
      centresFormation: [],
      perPage : 9,
      saisie: "",
      currentPage: 1,
      showLoginWdg2Card: false,
      loading: false,
      dismissCountDown : 0,
      message :"",
      color :"success",
    }
  },
  computed: {
    centresFormationComputed() {
      return this.centresFormation
    },
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
        openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    // fetch courses from webservice DG2
      async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
     await centreFormationApi
        .fetchAllCentreDeFormationsDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
          this.getListCentresFormation();
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });

    },
    // close the card for the login to webservice DG2
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    }
  }
  
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>


