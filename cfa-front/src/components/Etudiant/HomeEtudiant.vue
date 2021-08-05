<template>
  <!-- <div class="container-fluid">
    <div class="row">

      <div class="col-md-2" align="center">
        <div class="identite">
          <p class="nom">{{ utilisateur.prenom }} {{ utilisateur.nom }} </p>
          <p class="email">{{ utilisateur.login }}</p> 
        </div>
      </div>

      <div class="col-md-10">
        <div class="row mb-5">
          <div class="col-md-3">
            <b-card header="Formateur Référent">
              <b-card-text>
                <p>{{ formateurReferent.prenom }} {{ formateurReferent.nom }}</p>
                <p>{{ formateurReferent.login }}</p> 
              </b-card-text>
            </b-card>
          </div>

          <div class="offset-1 col-md-3">
            <b-card header="Référent de la promotion">
              <b-card-text>
                <p>{{ promotionComputed.referentPedagogiqueDto.prenom }} {{ promotionComputed.referentPedagogiqueDto.nom }}</p>
                <p>{{ promotionComputed.referentPedagogiqueDto.login }}</p> 
              </b-card-text>
            </b-card>
          </div>

          <div class="offset-1 col-md-3">
            <b-card header="Manager">
              <b-card-text>
                <p>{{ manager.prenom }} {{ manager.nom }}</p>
                <p>{{ manager.login }}</p> 
              </b-card-text>
            </b-card>
          </div>
        </div>
    </div>
  </div>
</div> -->
  <div id="grid-container">
    <div id="grid-container2">
      <div class="identite ">
        <p class="nom">{{ utilisateur.prenom }} {{ utilisateur.nom }} </p>
        <p class="email">{{ utilisateur.login }}</p>
      </div>
      <div class="card p-3">
      <div class="formateur-ref text-center">
        <p class="font-weight-bold h5">Formateur referent : </p>
        <p class="my-1">{{ formateurReferent.prenom }} {{ formateurReferent.nom }}</p>
        <p>{{ formateurReferent.login }}</p>
      </div>
      <div class="referent-peda text-center">
        <p class="font-weight-bold h5">Referent pedagogique : </p>
          <p class="my-1">{{ promotionComputed.referentPedagogiqueDto.prenom }} 
            {{ promotionComputed.referentPedagogiqueDto.nom }}
          </p>
          <p>{{ promotionComputed.referentPedagogiqueDto.login }}</p>
      </div>
      <div class="manager text-center">
        <p class="font-weight-bold h5">Manager : </p>
        <p class="my-1">{{ manager.prenom }} {{ manager.nom }}</p>
        <p>{{ manager.login }}</p>
      </div>

      </div>
    </div>

    <div id="student-planning">
      <Planning />
    </div>
  </div>

</template>

<script>
  //ATTENTION : un étudiant a potentiellement plusieurs promotions
  //affichage du referent de promotion ? tous ? un seul ? si un seul, lequel ?
  //Pour l'instant, on affiche le referent de la premiere promotion recu par l'api
  import {
    etudiantApi
  } from "@/_api/etudiant.api.js";
  import Planning from "@/components/utils/Planning.vue";
  export default {
    name: "HomeEtudiant",
    components: {
      Planning,
    },
    data() {
      return {
        formateurReferent: {},
        promotion: {
          referentPedagogiqueDto: {
            nom: "",
            prenom: "",
            login: ""
          }
        },
        manager: {},
      };
    },
    computed: {
      utilisateur() {
        return this.$store.getters.getUtilisateur;
      },
      promotionComputed() {
        return this.promotion;
      },
      formateurReferentComputed() {
        return this.formateurReferent;
      }
    },
    created() {
      etudiantApi.getFormateurReferent(this.$store.getters.getUtilisateur.id).then(data => this.formateurReferent =
        data);
      etudiantApi.getPromotions(this.$store.getters.getUtilisateur.id).then(data => this.promotion = data);
      etudiantApi.getManager(this.$store.getters.getUtilisateur.id).then(data => this.manager = data);
    },
    methods: {}
  };
</script>

<style scoped>
  .identite {
    text-align: center;
    grid-column: 1;
    grid-row: 1;
    /* margin-left: 5em; */
    /* margin-top: 4em;
  margin-bottom: 7em;
   */
  }

  .identite>.nom {
    font-size:25px;
  }

  .identite>.email {
    font-size: 25px;
  }

  .card {
    width: 20em;
    margin: 0 auto;
    border-radius: 0;
    /* height: 11em; */
  }

  .card-header {
    font-size: 20px;
  }

  .card-text {
    font-size: 1.2em;
  }

  #grid-container {
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr;
  }


  #student-planning {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    justify-content: center;
  }

  #grid-container2 {
    grid-row: 1;
    grid-column: 1;
    /* display: grid; */
    /* grid-template-rows: 100px repeat(3, 150px); */
    /* grid-template-rows: 1fr; */
    margin-left: 1em;
}
  
</style>