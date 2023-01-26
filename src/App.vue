<template>
  <div id="app">
    <div>
      <router-view v-if="path == 'home'" />
      <div
        v-else-if="
          path == 'formateur' ||
          path == 'referent' ||
          path == 'cef' ||
          path == 'admin'
        "
      >
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
      <div v-else-if="path == 'tuteur'" id="maintuteur">
        <HeaderTuteur />
<<<<<<< HEAD
        <router-view/>
        <FooterTuteur/>
=======
        <router-view />
>>>>>>> 782b1e35b78c034422e79b19ab3c4e950e23157f
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
import FooterTuteur from "@/components/Tuteur/FooterTuteur.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";

export default {
  name: "App",
  components: {
    HeaderFormateur,
    VueSidebarFormateur,
    FooterEtudiant,
    NavEtudiant,
    HeaderEtudiant,
    HeaderTuteur,
    FooterTuteur,
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