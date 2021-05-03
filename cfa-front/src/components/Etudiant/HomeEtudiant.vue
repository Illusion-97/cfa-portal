<template>
  <div class="row">
    <div class="col-md-2" align="center">
      <div class="identite">
        <p class="nom">{{ utilisateur.prenom }} {{ utilisateur.nom }} </p>
        <p class="email">{{ utilisateur.login }}</p>
      </div>

      <b-calendar v-model="date" value-as-date></b-calendar>
      
    </div>

    <div class="col-md-10">
      <div class="row mb-5">
        <div class="col-md-3">
          <b-card header="Formateur Référent">
            <b-card-text>
              {{ formateurReferent.prenom }} {{ formateurReferent.nom }}
              {{ formateurReferent.login }}
              <!-- En attendant -->
              <p>{{ utilisateur.prenom }} {{ utilisateur.nom }}</p>
              <p>{{ utilisateur.login }}</p>
            </b-card-text>
          </b-card>
        </div>

        <div class="offset-1 col-md-3">
          <b-card header="Référent de la promotion">
            <b-card-text>
              {{ promotionReferent.prenom }} {{ promotionReferent.nom }}
              {{ promotionReferent.login }}
              <!-- En attendant -->
              <p>{{ utilisateur.prenom }} {{ utilisateur.nom }}</p>
              <p>{{ utilisateur.login }}</p>
            </b-card-text>
          </b-card>
        </div>

        <div class="offset-1 col-md-3">
          <b-card header="Manager">
            <b-card-text>
              {{ manager.prenom }} {{ manager.nom }}
              {{ manager.login }}
              <!-- En attendant -->
              <p>{{ utilisateur.prenom }} {{ utilisateur.nom }}</p>
              <p>{{ utilisateur.login }}</p>
            </b-card-text>
          </b-card>
        </div>
      </div>

      <div class="row"> 
        <div class="my-btn-div col-md-11">
          <button type="button" class="btn btn-primary" @click="previousWeek()">Précédente</button>
          <button type="button" class="btn btn-primary" @click="nextWeek()">Suivante</button>
        </div>

        <div class="col-md-11">
          <Planning v-bind:date="dateAujourdhui"/>
        </div>
      </div>
      
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
      date : new Date(2021,2,25),
    };
  },
  computed: {
    planning(){
      return this.$store.getters.getPlanning
    },
    utilisateur(){
      return this.$store.getters.getUtilisateur
    },
    dateAujourdhui() {
      return this.date;
    },
  },
  created() {
    axios
      .get("")
      .then((response) => (this.formateurReferent = response.data))
      .catch((error) => console.log(error));

    axios
      .get("")
      .then((response) => (this.promotionReferent = response.data))
      .catch((error) => console.log(error));

    axios
      .get("")
      .then((response) => (this.manager = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    nextWeek() {
      let newDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
      newDate.setDate(this.date.getDate() + 7);
      this.date = newDate;
    },
    previousWeek() {
      let newDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
      newDate.setDate(this.date.getDate() - 7);
      this.date = newDate;
    }
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

.card-header {
  font-size: 1.35em;
}

.card-text {
  font-size: 1.2em;
}

.my-btn-div{
  display: flex;
  justify-content:space-between;
  margin-bottom: 1%;
}
</style>