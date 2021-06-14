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
    isEtudiant(){
      return utilisateurService.isEtudiant();
    },
  },
  created(){
    utilisateurApi.getPlanningById(this.$store.getters.getUtilisateur.id).then((response) => this.$store.dispatch('setPlanning', response));   
  }
};
</script>

<style scoped></style>
