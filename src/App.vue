<template>
  <div id="app">
    <div>
      <router-view v-if="path == 'login'" />
      <div v-else-if=" path == 'formateur' || path == 'referent' || path == 'cef' || path == 'admin'">
        <VueSidebarFormateur />
        <HeaderFormateur />
        <router-view />
      </div>
      <div v-else-if="path == 'etudiant'" id="mainEtudiant">
        <HeaderEtudiant />
        <NavEtudiant />
        <router-view />
        <FooterEtudiant />
      </div>
      <div v-else-if="path == 'tuteur'">
        <HeaderTuteur />
        <router-view />
        <CSSTuteur />
      </div>
      <router-view v-else class="monBody" />
    </div>
  </div>
</template>
<script>
import HeaderTuteur from "@/components/Navigation/HeaderTuteur.vue";
import HeaderFormateur from "@/components/Navigation/HeaderFormateur.vue";
import VueSidebarFormateur from "@/components/Navigation/VueSidebarFormateur.vue";
import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";
import CSSTuteur from "@/assets/styles/StyleTuteur.css";

export default {
  name: "App",
  components: {
    HeaderFormateur,
    VueSidebarFormateur,
    FooterEtudiant,
    NavEtudiant,
    HeaderEtudiant,
    HeaderTuteur,
    CSSTuteur,
  },
  methods: {},
  computed: {
    path() {
      return this.$route.path.split("/").splice(1)[0];
    },
  },
};
</script>
<style>
.monBody {
  float: right;
  padding-left: 5em;
  padding-right: 5em;
}

#mainEtudiant {
  min-height: calc(100vh - 13.2em);
  position: relative;
}

#mainEtudiant *:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

#mainEtudiant .table th {
  /* color: #495057; */
  color: #fff;
  background-color: #565656;
  /* background-color: #b8d8d8; */
  border-color: #565656;
  /* width: 70%; */
  padding: 0.3rem 14px;
}

#mainEtudiant .table td {
  padding: 0.3rem 14px !important;
}
</style>