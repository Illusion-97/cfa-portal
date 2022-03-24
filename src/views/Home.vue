<template>
  <section>
    <HomeEtudiant v-if="isEtudiant"/>
    <HomeFormateur v-else-if="isFormateur"/>
    <NotFound v-else/>
  </section>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";
import HomeEtudiant from "@/components/Etudiant/HomeEtudiant.vue";
import HomeFormateur from "@/views/Formateur/HomeFormateur.vue";
import NotFound from "@/views/NotFound.vue"
export default {
  name: "Home",
  components: {
    HomeEtudiant,
    HomeFormateur,
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
      this.$router.push({name: "formateur_home"})
      return utilisateurService.isFormateur();
    },
  },
  created() {
    utilisateurApi
      .getPlanningById(this.$store.getters.getUtilisateur.id)
      .then((response) => this.$store.dispatch("setPlanning", response));

      if(this.$store.getters.getUtilisateur.rolesDto.length == 1 && this.$store.getters.getUtilisateur.rolesDto[0] == "ADMIN"){
        this.$router.push({
          name: "admin_dashboard",
        });
      }
  },
};
</script>

<style scoped></style>
