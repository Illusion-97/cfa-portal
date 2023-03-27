<template>
  <section>
    <HomeEtudiant v-if="isEtudiant" />
    <HomeFormateur v-else-if="isFormateur" />
    <HomeTuteur v-else-if="isTuteur" />
    <HomeReferent v-else-if="isReferent" />
    <HomeCEF v-else-if="isCEF" />
    <HomeAdmin v-else-if="isAdmin" />
    <NotFound v-else />
  </section>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";
import HomeEtudiant from "@/views/Etudiant/AccueilEtudiant.vue";
import HomeFormateur from "@/views/Formateur/HomeFormateur.vue";
import HomeReferent from "@/views/Tuteur/AcceuilTuteur.vue";
import HomeAdmin from "@/views/Tuteur/AcceuilTuteur.vue";
import HomeCEF from "@/views/Tuteur/AcceuilTuteur.vue";
import HomeTuteur from "@/views/Tuteur/AcceuilTuteur.vue";
import NotFound from "@/views/NotFound.vue"
export default {
  name: "Home",
  components: {
    HomeEtudiant,
    HomeFormateur,
    HomeReferent,
    HomeAdmin,
    HomeCEF,
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
    isReferent() {
      return utilisateurService.isReferent();
    },
    isCEF() {
      return utilisateurService.isCEF();
    },
    isAdmin() {
      return utilisateurService.isAdmin();
    },
  },
  created() {

    utilisateurApi
      .getPlanningById(this.$store.getters.getUtilisateur.id)
      .then((response) => this.$store.dispatch("setPlanning", response));

    if (this.isFormateur) {
      this.$router.push({ name: "formateur_home" })
    }
    else if (this.isEtudiant) {
      this.$router.push({ name: "etudiant_accueil" })
    }
    else if (this.isTuteur) {
      this.$router.push({ name: "tuteur_acceuil" })
    }
    else if (this.isReferent) {
      this.$router.push({ name: "referent_dashboard" })
    }
    else if (this.isCEF) {
      this.$router.push({ name: "cef_dashboard" })
    }
    else if (this.isAdmin) {
      this.$router.push({ name: "admin_dashboard" })
    }
  },
};
</script>

<style scoped></style>
