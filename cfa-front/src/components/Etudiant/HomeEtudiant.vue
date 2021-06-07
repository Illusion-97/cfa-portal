<template>
  <div class="container-fluid">
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
    <Planning/>  
  </div>
</div>
  
</template>

<script>

//ATTENTION : un étudiant a potentiellement plusieurs promotions
//affichage du referent de promotion ? tous ? un seul ? si un seul, lequel ?
//Pour l'instant, on affiche le referent de la premiere promotion recu par l'api
import { etudiantApi } from "@/_api/etudiant.api.js";
import Planning from "@/components/utils/Planning.vue";
export default {
  name: "HomeEtudiant",
  components: {
    Planning,
  },
  data() {
    return {
      formateurReferent: {},
      promotion: {referentPedagogiqueDto: {nom: "", prenom: "", login: ""}},
      manager: {},
    };
  },
  computed: {
    utilisateur(){
      return this.$store.getters.getUtilisateur;
    },
    promotionComputed(){
      return this.promotion;
    },
    formateurReferentComputed(){
      return this.formateurReferent;
    }
  },
  created() {
    etudiantApi.getFormateurReferent(1).then(data => this.formateurReferent = data);
    etudiantApi.getPromotions(1).then(data => this.promotion = data);
    etudiantApi.getManager(1).then(data => this.manager = data);
  },
  methods: {
  }
};
</script>

<style scoped>
.identite {
  margin-top: 4em;
  margin-bottom: 7em;
}

.identite > .nom {
  font-size: 1.5em;
}

.identite > .email {
  font-size: 1.2em;
}

.card{
  height: 11em;
}

.card-header {
  font-size: 1.35em;
}

.card-text {
  font-size: 1.2em;
}

</style>