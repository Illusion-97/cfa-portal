<template>
  <div v-if="isEtudiant">
    <HomeEtudiant />
  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js"
import { utilisateurService } from "@/_services/utilisateur.service.js"
import HomeEtudiant from '@/components/Etudiant/HomeEtudiant.vue'
export default {
  name: "Home",
  components: {
    HomeEtudiant
  },
  computed: {
    utilisateur(){
      return this.$store.getters.getUtilisateur
    },
    planning(){
      return this.$store.getters.getPlanning
    },
    isEtudiant(){
      return utilisateurService.isEtudiant();
    }
  },
  created(){
    utilisateurApi.getByIdWithObject(1).then((response) => this.$store.dispatch('setUtilisateur', response));
    utilisateurApi.getPlanningById(1).then((response) => this.$store.dispatch('setPlanning', response));
  }
};
</script>

<style scoped></style>
