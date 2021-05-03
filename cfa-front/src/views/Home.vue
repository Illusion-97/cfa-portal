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
    planning(){
      return this.$store.getters.getPlanning
    }
  },
  created(){
    let req = "http://localhost:8080/AppliCFABack/utilisateurs/" + this.$store.state.utilisateur.id + "/planning";
    axios
      .get(req)
      .then((response) => this.$store.dispatch('setPlanning', response.data))
      .catch((error) => console.log(error));
  }
};
</script>

<style scoped></style>
