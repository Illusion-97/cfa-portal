<template>
  <section>
    <HomeEtudiant v-if="isEtudiant" />
    <HomeFormateur v-else-if="isFormateur" />
    <HomeTuteur v-else-if="isTuteur" />
    <NotFound v-else />
  </section>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";
import HomeEtudiant from "@/views/Etudiant/AccueilEtudiant.vue";
import HomeFormateur from "@/views/Formateur/HomeFormateur.vue";
import HomeTuteur from "@/views/Tuteur/AcceuilTuteur.vue";
import NotFound from "@/views/NotFound.vue"
export default {
  name: "Home",
  components: {
    HomeEtudiant,
    HomeFormateur,
    HomeTuteur,
    NotFound
  },
  data() {
    return {
      userId: this.$store.getters.getUtilisateur.id,
    };
  },
  computed: {
    isEtudiant() {
      return utilisateurService.isEtudiant();
    },
    isFormateur() {
      return utilisateurService.isFormateur();
    },
    isTuteur() {
      return utilisateurService.isTuteur();
    },
  },
  created() {

    utilisateurApi
      .getPlanningById(this.$store.getters.getUtilisateur.id)
      .then((response) => this.$store.dispatch("setPlanning", response));

    if (this.$store.getters.getUtilisateur.rolesDto.length == 1 && this.$store.getters.getUtilisateur.rolesDto[0] == "ADMIN") {
      this.$router.push({
        name: "admin_dashboard",
      });
    }
    if (this.isFormateur) {
      this.$router.push({ name: "formateur_home" })
    }
    else if (this.isEtudiant) {
      this.$router.push({ name: "etudiant_accueil" })
    }
    else if (this.isTuteur) {
      this.$router.push({ name: "tuteur_acceuil" })
    }
  },
};
</script>

<style scoped></style>
