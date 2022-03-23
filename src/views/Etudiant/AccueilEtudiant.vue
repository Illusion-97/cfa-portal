<template>
  <div class="container">
    <div>
      <h1>
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
export default {
  name: "AccueilEtudiant",
  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
  },
  data() {
    return {
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

