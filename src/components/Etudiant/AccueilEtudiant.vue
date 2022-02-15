<template>
<div class="container">
    <h5>Bienvenue sur votre espace personnel {{ utilisateur.prenom }}. </h5>
</div>
</template>

<script>
export default {
    name: "AccueilEtudiant",
    computed: {
      utilisateur() {
        return this.$store.getters.getUtilisateur;
      },
    }
}
</script>

<style scoped>
h5 {
  margin: 99px 0 0 55px;
}
</style>
