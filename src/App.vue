<template>
  <div id="app">
      <router-view v-if="path == 'home'" />
      <div v-else-if="path == 'formateur'">
        <HeaderFormateur />
        <VueSidebarFormateur />
        <router-view class="px-5" />
      </div>
      <div v-else-if="path == 'etudiant'" id="mainEtudiant">
        <HeaderEtudiant />
        <NavEtudiant />
        <router-view />
        <FooterEtudiant />
      </div>
      <div v-else-if="path == 'admin' || path == 'referent' || path == 'cef'" >
        <Navbar />
        <VerticalNavbar />
        <router-view class="monBody col-md-10"/>
      </div>
      <router-view v-else class="monBody" />
    </div> 
</template>
<script>

import Navbar from "@/components/Navigation/Navbar.vue";
import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue";

import HeaderFormateur from './components/Navigation/HeaderFormateur.vue';
import VueSidebarFormateur from"@/components/Navigation/VueSidebarFormateur.vue";

import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";

export default {
  name: "App",
  components: {
    Navbar,
    VerticalNavbar,
    HeaderFormateur,
    VueSidebarFormateur,
    FooterEtudiant,
    NavEtudiant,
    HeaderEtudiant
  },
  methods: {},
  computed: {
    path() {
      return this.$route.path.split("/").splice(1)[0];
    }
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
</style>