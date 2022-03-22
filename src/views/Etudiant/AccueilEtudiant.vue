<template>
  <div class="container">
    <div>
      <h1>
      Referent prédagogique dynamique : 
      <br>
      Nom :
      {{ manager.prenom }} 
      <br>
      Prénom :
      {{ promotionComputed.referentPedagogiqueDto.prenom }}
      <br>
      Mail :
      <br>
      {{ utilisateur.prenom }} {{ utilisateur.nom }}
      </h1>
      <p class="email-text">{{ utilisateur.login }}</p>
      <p>Concepteur développeur d'applications ( Promotion 2022 - Bordeaux)
        <br>
        Nom du projet : CFA
      </p>
      <b-table striped hover :items="items"></b-table>
    </div>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
export default {
  name: "AccueilEtudiant",
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
  data() {
    return {
      formateurReferent: {},
      promotions: [],
      groupes: [{
        id: "",
        nom: ""
      }],
      manager: {},
      items: [
        {Nom: "Bos", prenom: "Lionel", Rôle: "Tuteur" },
        {Nom: "James Baudot ", prenom: "Frederic", Rôle: "CEF" },
        {Nom: "Chevallereau", prenom: "Valentin", Rôle: "Membre du groupe" },
        {Nom: "Bengamra", prenom: "Feres", Rôle: "Membre du groupe" },
        {Nom: "Pires", prenom: "William", Rôle: "Membre du groupe" },
        {Nom: "Charpentier", prenom: "Remy", Rôle: "Membre du groupe" },
      ],
    };
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
};
</script>

<style scoped>
h5 {
  margin-top: 55px;
}

.email-text {
  font-size: 20px;
  margin-top: 20px;
  font-weight: 500;
}

.container {
  margin: 49px 0 0 421px;}
</style>

