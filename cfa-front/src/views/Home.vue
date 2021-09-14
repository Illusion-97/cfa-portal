<template>  
<section>
  <div v-if="isEtudiant">
    <HomeEtudiant />
  </div>
  <div v-if="isFormateur">
    <HomeFormateur/>
  </div>
</section>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js"
import { utilisateurService } from "@/_services/utilisateur.service.js"
import HomeEtudiant from '@/components/Etudiant/HomeEtudiant.vue';
import HomeFormateur from '@/components/Formateur/HomeFormateur.vue'
export default {
  name: "Home",
  components: {
    HomeEtudiant,
    HomeFormateur
  },
  data(){
    return {
      userId:this.$store.getters.getUtilisateur.id,
    }
  },
  computed: {
    isEtudiant(){
      return utilisateurService.isEtudiant();
    },
    isFormateur(){
      return utilisateurService.isFormateur();
    }
  },
  created(){
    utilisateurApi
    .getPlanningById(this.$store.getters.getUtilisateur.id)
    .then((response) => this.$store.dispatch('setPlanning', response));   
  }
};
</script>

<style scoped></style>
