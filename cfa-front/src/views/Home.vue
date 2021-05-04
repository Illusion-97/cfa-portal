<template>
  <div v-if="true">
    <HomeEtudiant />
  </div>
</template>

<script>
import axios from 'axios'
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
    }
  },
  created(){

    let req1 = "http://localhost:8080/AppliCFABack/utilisateurs/" + this.utilisateur.id;
    axios
      .get(req1)
      .then((response) => this.$store.dispatch('setUtilisateur', response.data))
      .catch((error) => console.log(error));

    let req2 = "http://localhost:8080/AppliCFABack/utilisateurs/" + this.utilisateur.id + "/planning";
    axios
      .get(req2)
      .then((response) => this.$store.dispatch('setPlanning', response.data))
      .catch((error) => console.log(error));
  }
};
</script>

<style scoped></style>
