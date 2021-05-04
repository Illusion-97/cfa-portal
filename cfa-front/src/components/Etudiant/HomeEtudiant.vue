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
                <p>{{ promotionReferent.prenom }} {{ promotionReferent.nom }}</p>
                <p>{{ promotionReferent.login }}</p>
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
import axios from "axios";
import Planning from "@/components/utils/Planning.vue";
export default {
  name: "HomeEtudiant",
  components: {
    Planning,
  },
  data() {
    return {
      formateurReferent: {},
      promotionReferent: {},
      manager: {},
    };
  },
  computed: {
    utilisateur(){
      return this.$store.getters.getUtilisateur;
    },
  },
  created() {
    let req1 = "http://localhost:8080/AppliCFABack/etudiants/" + this.utilisateur.id + "/formateurReferent";
    axios
      .get(req1)
      .then((response) => (this.formateurReferent = response.data))
      .catch((error) => console.log(error));

    let req2 = "http://localhost:8080/AppliCFABack/promotions/" + this.utilisateur.id + "/referent";
    axios
      .get(req2)
      .then((response) => (this.promotionReferent = response.data))
      .catch((error) => console.log(error));

    let req3 = "http://localhost:8080/AppliCFABack/etudiants/" + this.utilisateur.id + "/manager";
    axios
      .get(req3)
      .then((response) => (this.manager = response.data))
      .catch((error) => console.log(error));
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