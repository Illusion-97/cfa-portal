<template>
  <div>
    <BodyTitle title="Liste des centres de formations" />
    <!-- <CentreFormationListComponent :isAction="true"/> -->
    <div class="header-list">
      <form class="form-inline form" @submit="submit">
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
      </form>
    </div>
    HELLO
    {{centresFormation}}
    <!-- <div class="row d-flex justify-content-arround">
      <div 
        v-for="centreFormation in centresFormationComputed"
        :key="centreFormation.id"
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
          <b-card-text class="mt-4 font-weight-bold">
            HELLO2
            {{centreFormation.nom}}
          </b-card-text >
        </b-card>
      </div> -->
    <!-- </div> -->
    <div>
      {{centresFormation}}
    </div>
  </div>
</template>

<script>
import { centreFormationApi } from "@/_api/centreFormation.api.js"
import BodyTitle from "@/components/utils/BodyTitle.vue";
// import CentreFormationListComponent from "@/components/List/CentreFormationListComponent.vue";

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
    BodyTitle,
    // CentreFormationListComponent,
  },
   created () {
    this.getListCentresFormation();
    console.log(" la liste des centres")
    console.log(this.centresFormation);
  },
  methods:{
    getListCentresFormation(){
      centreFormationApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => {this.centresFormation = response;
        console.log(this.centresFormation)
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
    //  pageChange ??
  }
  
};
</script>
<style scoped>
</style>

