<template>
  <div v-if="isEtudiant" id="mainEtudiant">
      <HeaderEtudiant />
      <NavEtudiant />

      <div v-switch="$route.path">
        <AccueilEtudiant v-case="'/etudiant'"/>
        <CursusEtudiant v-case="'/etudiant/cursus'" />
        <ControleContinuEtudiant v-case="'/etudiant/controle'" />
        <LivretEvaluationEtudiant v-case="'/etudiant/livret'" />
        <DossierProfessionnelEtudiant v-case="'/etudiant/dossierprofessionnel'" /> 
        <DossierPro v-case="'/etudiant/creerdossierpro'" />
        <NotFound v-default/>
      </div>

      <FooterEtudiant />
  </div>
  <NotFound v-else/>
</template>

<script>
import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";
import NotFound from "@/views/NotFound.vue";

import AccueilEtudiant from "@/components/Etudiant/AccueilEtudiant.vue";
import CursusEtudiant from "@/components/Etudiant/CursusEtudiant.vue";
import ControleContinuEtudiant from "@/components/Etudiant/ControleContinuEtudiant.vue";
import LivretEvaluationEtudiant from "@/components/Etudiant/LivretEvaluationEtudiant.vue";
import DossierProfessionnelEtudiant from "@/components/Etudiant/DossierProfessionnelEtudiant.vue";
import DossierPro from "@/components/Etudiant/DossierPro.vue";

//import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";


export default {
    name: "creer_dossier_pro",
    components: {
      AccueilEtudiant,
      CursusEtudiant,
      ControleContinuEtudiant,
      LivretEvaluationEtudiant,
      DossierProfessionnelEtudiant,
      DossierPro,
      FooterEtudiant,
      NavEtudiant,
      HeaderEtudiant,
      NotFound
    },
    data() {
    return {
      userId: this.$store.getters.getUtilisateur.id,
      path: this.$route.path
    };
  },
  computed: {
    isEtudiant() {
      return utilisateurService.isEtudiant();
    }
  },
  // created() {
  //   utilisateurApi
  //     .getPlanningById(this.$store.getters.getUtilisateur.id)
  //     .then((response) => this.$store.dispatch("setPlanning", response));

  //     if(this.$store.getters.getUtilisateur.rolesDto.length == 1 && this.$store.getters.getUtilisateur.rolesDto[0] == "ADMIN"){
  //       this.$router.push({
  //         name: "admin_dashboard",
  //       });
  //     }
  // },
}
</script>

<style scoped>

#mainEtudiant {
  min-height: calc(100vh - 13.2em);
  position: relative;
}
</style>