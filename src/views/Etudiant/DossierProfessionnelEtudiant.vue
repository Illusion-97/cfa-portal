<template>
    <div v-if="isEtudiant">
      <HeaderEtudiant />
      <NavEtudiant />
      <FooterEtudiant />
      <DossierProfessionnelEtudiant /> 
    </div>
    <div v-else>
      <NotFound/>
    </div>
</template>

<script>
import DossierProfessionnelEtudiant from "@/components/Etudiant/DossierProfessionnelEtudiant.vue";
import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";
import NotFound from "@/views/NotFound.vue";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";

export default {
    name: "etudiant_dossierprofessionnel",
    components: {
      DossierProfessionnelEtudiant,
      FooterEtudiant,
      NavEtudiant,
      HeaderEtudiant,
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
}
</script>

<style scoped>

    .monBody  {
        padding: 0;
    }
</style>