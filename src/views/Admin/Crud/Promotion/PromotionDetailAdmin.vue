<template>
    <div v-if="promotion">
      <section>
        <div class="container-fluid mt-4">
          <b-tabs content-class="mt-3" fill v-model="tabIndex">
            <!-- ORDRE DE PASSAGE -->
            <b-tab>
              <template v-slot:title>
                <font-awesome-icon :icon="['fas', 'table']" />
                Ordre de passage
              </template>
              <div>
                <OrdrePassage :promotion="promotion"/>
              </div>
            </b-tab>
  
          </b-tabs>
        </div>
      </section>
    </div>
  </template>
  
  <script>
import { promotionApi } from "@/_api/promotion.api.js";
import OrdrePassage from "@/components/Admin/OrderPassage.vue";

export default {
  name: "PromotionDetailFormateur",
  props: {
    promotionProp: {
      type: Array,
      default: null,
    },
  },
  components: {
    OrdrePassage,
  },

  data() {
    return {
      tabIndex: 1,
      promotionId: this.$route.params.id,
      promotion: [],
      etudients: [],
      intervention: [],
      pageCountEtudiant: 0,
      pageCountIntervention: 0,
      countIntervention: 0,
      countEtudiant: 0,
      perPage: 9,
      onglet: 1,
      isModalVisible: false,
    };
  },
  computed: {
    isAdmin() {
      // Supposons que cette fonction est utilisée dans le reste du code
      return true;
    },
  },
  methods: {
    getPromotionId() {
      promotionApi.getPromotionByid(this.$route.params.id).then((response) => {
        this.promotion = response;
      });
    },
    reloadExam() {
      // Supposons que cette fonction est utilisée dans le reste du code
    },
    // ... Autres méthodes si nécessaires ...
  },
  created() {
    this.getPromotionId();
  },
};
</script>

  
  <style src="@/assets/styles/Onglet.css"></style>
  <style scoped>
  /* .mon-titre {
    display: flex;
    justify-content: space-around;
  } */
  
  .btn-submit {
    border: 0;
    background-color: inherit;
    border-radius: 100%;
    width: 2.5em;
    margin-left: -3em;
  }
  
  .iconSearch {
    color: brown;
  }
  
  #saisieEtudiant,
  .select {
    border-radius: 20px;
    width: 400px;
    /* background: #000; */
  }
  
  h1 {
    /* border: 1px solid #6c757d; */
    display: flex;
    justify-content: center;
    padding: 0.5em;
    /* padding-left: 2em; */
  }
  
  .mon-dropdown {
    margin-left: 1em;
    margin-top: 0.5em;
  }
  
  .mon-btn {
    height: 2.5em;
    margin-top: 1.5em;
  }
  
  .identite {
    margin-top: 4em;
    margin-bottom: 7em;
  }
  
  .identite>.nom {
    font-size: 1.5em;
  }
  
  #my-card {
    width: 90%;
    padding-bottom: 1em;
    margin-bottom: 5em;
    margin-top: 5em;
  }
  
  #my-card>.card-header {
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
  
  .card-text>span {
    display: inline-block;
    width: 40em;
    padding-left: 3em;
  }
  
  .mon-tr:hover {
    background-color: rgb(216, 213, 213) !important;
    cursor: pointer;
  }
  
  .ma_fenetre {
    margin-bottom: 5em;
  }
  
  .mon-plus {
    font-size: 24px;
    height: 1.5em;
    line-height: 0.7em;
    float: right;
  }
  
  .ma-croix {
    margin-right: 0.6em;
  }
  
  .stickyPosition {
    position: sticky;
    top: 0px;
    z-index: 1;
  }
  
  .modal-import-dg2 {
    margin-inline: 10%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  </style>
  