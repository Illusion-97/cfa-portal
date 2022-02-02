<template>
  <div class="container-fluid">
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
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>
      
     
    </div>
    <div class="row d-flex justify-content-between">
      <div v-for="promotion in promotionsComputed"
          :key="promotion.id" 
          @click="dblClick(promotion)"
          class="col-lg-4 col-md-12 col-sm-12 rounded mt-4 container-card ">
  <b-card
  
    header-text-variant="white"
    header-tag="header"
    header-bg-variant="dark"
    footer-tag="footer"
    footer-bg-variant="success"
    footer-border-variant="dark"
    style="max-width: 32rem;"
    class="card-Promotions col"
    
  >
    <b-card-header class="d-flex justify-content-between bg-white text-secondary col"> 
      <p>Nantes</p>
     <b-progress height="20px" :value="Progress(promotion)" show-progress class="mb-2 w-50"></b-progress>
  </b-card-header>
    <b-card-text  class="mt-4 font-weight-bold">{{ promotion.nom }}</b-card-text>
    <b-card-footer class="d-flex justify-content-between bg-white text-secondary"> <span> Date du debut : {{ promotion.dateDebut | formatDate }} </span> <span > Durée: {{ getMoths(promotion) }}M   </span>  <span> Date de fin : {{ promotion.dateFin | formatDate }} </span></b-card-footer>
  </b-card>
</div>
    </div>
  
   
  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "PromotionListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    promotionProp: {
      default: null,
    },
  },
  watch: {
    promotionProp() {
      if (this.promotionProp != null)
        this.promotion_input = `${this.promotionProp.nom}`;
    },
  },
  data() {
    return {
      promotions: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      promotion_input: "",
    };
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    nbPageComputed() {
      return this.pageCount;
    },
   
  },
  created() {
    this.refreshList();
  },

  methods: {
    getMoths(promotion){
      let debut = new Date(promotion.dateDebut);
      let fin = new Date(promotion.dateFin);

      return new Number((fin.getTime() - debut.getTime()) / 31536000000 *12).toFixed(0);
    },
    Progress(promotion){
      let debut = new Date(promotion.dateDebut);
      let fin = new Date(promotion.dateFin);
      
      let now =  Date.now()
      let moisPasse = new Number((now - debut.getTime()) / 31536000000 *12).toFixed(0);
      let moisFormation =  this.getMoths(promotion)
      if(moisPasse>= moisFormation){
        return 100
      }

      return (100*moisPasse)/moisFormation
    },
    submit(e) {
      e.preventDefault();
      promotionApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.promotions = response));
      promotionApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      promotionApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.promotions = response));
    },
    refreshList() {
      promotionApi
        .getAllPromotions(0, this.perPage)
        .then((response) => (this.promotions = response));
      promotionApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deletePromotion(promotionId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
        promotionApi
          .deletePromotion(promotionId)
          .then(() => this.refreshList());
      }
    },
    clickList(promotion) {
      this.promotion_input = promotion.nom;
      this.$emit("click-list", promotion);
      console.log(promotion);
    },
    dblClick(promotion){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_promotion_detail', params: { id: promotion.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_promotion_detail', params: { id: promotion.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_promotion_detail', params: { id: promotion.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_promotion_detail', params: { id: promotion.id }});
      else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_promotion_detail', params: { id: promotion.id }});

    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">

</style>
<style>
.card-Promotions{
  border-radius: 50px;
  min-height: 17rem;
}
.card-Promotions:hover{
  border: 3px solid red;
  cursor: pointer;
}
</style>
