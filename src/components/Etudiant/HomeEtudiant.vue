<template>
  <div id="grid-container">
    <div id="grid-container2">  
    <ul id="list-lien">
      <li>
        <router-link class="nav-item first" :to="{ name: 'etudiant_espace-peda_cursus' }">Cursus</router-link>
      </li>
      <li>
        <router-link class="nav-item border-right-0" :to="{ name: 'etudiant_espace-peda_devoirs' }">Devoirs</router-link>
      </li>
      <li>
        <router-link class="nav-item border-right-0" :to="{ name: 'etudiant_espace-peda_notes' }">Bulletin de notes</router-link>
      </li>
      <li>
        <router-link class="nav-item last" :to="{ name: 'etudiant_espace-peda_absences' }">Absences / Retards</router-link>
      </li>
    </ul>
      <div id="identite">
        <p class="nom">{{ utilisateur.prenom }} {{ utilisateur.nom }}</p>
        <p class="email">{{ utilisateur.login }}</p>
      </div>
    </div>
    <div id="student-info">
      <div class="card py-0 px-3 ml-3">
        <div class="card-header">
          Information
        </div>
        <div class="formateur-ref text-center">
          <p class="font-weight-bold h5">Formateur referent :</p>
          <p class="my-1">
            {{ formateurReferent.prenom }} {{ formateurReferent.nom }}
          </p>
          <p>{{ formateurReferent.login }}</p>
        </div>
        <div class="referent-peda text-center">
          <p class="font-weight-bold h5">Referent pedagogique :</p>
          <p class="my-1">
            {{ promotionComputed.referentPedagogiqueDto.prenom }}
            {{ promotionComputed.referentPedagogiqueDto.nom }}
          </p>
          <p>{{ promotionComputed.referentPedagogiqueDto.login }}</p>
        </div>
        <div class="manager text-center">
          <p class="font-weight-bold h5">Manager :</p>
          <p class="my-1">{{ manager.prenom }} {{ manager.nom }}</p>
          <p>{{ manager.login }}</p>
        </div>
      </div>
    </div>

    <div id="student-info_bis">
      <div class="card py-0 px-3 mr-3">
        <div class="card-header">
          Information cursus
        </div>
        <div class="promo text-center">
          <p class="font-weight-bold h5">Promotion actuelle :</p>
          <p class="my-1">{{ promotionComputed.nom }}</p>
        </div>
        <div class="groupe text-center">
          <p class="font-weight-bold h5">Groupe projet actuel :</p>
          <p class="my-2">{{ groupesComputed[0].nom }}</p>
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
        promotions: [],
        groupes: [{
          id: "",
          nom: ""
        }],
        manager: {},
      };
    },
    computed: {
      utilisateur() {
        return this.$store.getters.getUtilisateur;
      },
      promotionComputed() {
        let promotion = {
          referentPedagogiqueDto: "",
        };
        for (let i = 0; i < this.promotions.length; i++) {
          let dateDebut = new Date(this.promotions[i].dateDebut);
          let dateFin = new Date(this.promotions[i].dateFin);
          if (
            dateDebut.getTime() <= Date.now() &&
            dateFin.getTime() >= Date.now()
          ) {
            promotion = this.promotions[i];
          }
        }
        return promotion;
      },
      groupesComputed() {
        return this.groupes;
      },
      formateurReferentComputed() {
        return this.formateurReferent;
      },
    },
    created() {
      etudiantApi
        .getFormateurReferent(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.formateurReferent = data));
      etudiantApi
        .getPromotions(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.promotions = data));
      etudiantApi
        .getManager(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.manager = data));
      etudiantApi
        .getGroupes(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((response) => (this.groupes = response));
    },
    methods: {},
  };
</script>

<style scoped>
  #grid-container {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-rows: 55vh 2fr;
    row-gap: 2em;
  }

  #grid-container2,
  #student-info,
  #student-info_bis {
    background-color: #d0d0d0c4;
  }

  #list-lien {
    /* grid-column: 2; */
    grid-row: 1;
    list-style: none;
    display: flex;
    justify-content: center;
    margin-top: 1em;
  /* z-index: 1; */
  }

  #list-lien .nav-item {
    /* text-transform: uppercase; */
    font-style: italic !important;
    color: black;
    padding: 0.1em 4em;
    /* border: 1px solid black; */
    background: #fff; 
  }

  #list-lien .nav-item:hover {
    text-decoration: none;
    background: #c000009a;
  }

  #list-lien .first {
    border-radius: 20px 0 0 20px;
    border-right: 0;
  }

  #list-lien .last {
    border-radius: 0 20px 20px 0;
  }

  #grid-container2 {
    grid-row: 1;
    grid-column: 2;
    display: grid;
    grid-template-rows: 0.5fr 3fr;
  }
  #identite {
    text-align: center;
    /* grid-column: 2; */
    grid-row: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* border: 1px solid black; */
  }

  #identite>.nom {
    font-size: 35px;
    text-transform: uppercase;
  }

  #identite>.email {
    font-size: 20px;
  }

  #student-info {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #student-info_bis {
    grid-column: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #student-planning {
    grid-row: 2;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
  }

  .card {
    width: 18.5em;
    margin: 0 auto;
    border-radius: 0;
    /* height: 11em; */
  }

  .card-header {
    font-size: 20px;
    background-color: inherit;
    text-align: center;
    margin-bottom: 1em;
    margin-top: 0;
  }

  .card-text {
    font-size: 1.2em;
  }
</style>