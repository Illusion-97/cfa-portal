<template>
  <div id="app">
    <div>
      <router-view v-if="path == 'login'" />
      <div v-else-if="path == 'multiRole'" class="main-space">
        <HeaderMultiRoles />
        <router-view />
      </div>
      <div v-else-if="path == 'formateur' || path == 'referent' || path == 'cef' || path == 'admin'">
        <HeaderFormateur />
        <router-view />
        <VueSidebarFormateur />
      </div>
      <div v-else-if="path == 'etudiant'" id="mainEtudiant">
        <HeaderEtudiant />
        <NavEtudiant />
        <router-view />
        <FooterEtudiant />
      </div>
      <div v-else-if="path == 'tuteur'" class="test">
        <HeaderTuteur />
        <router-view />
        <FooterEtudiant />
      </div>
      <router-view v-else class="monBody" />
    </div>
  </div>
</template>
<script>
import HeaderTuteur from "@/components/Navigation/HeaderTuteur.vue";
import HeaderMultiRoles from "@/components/Navigation/HeaderMultiRoles.vue";
import HeaderFormateur from "@/components/Navigation/HeaderFormateur.vue";
import VueSidebarFormateur from "@/components/Navigation/VueSidebarFormateur.vue";
import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
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
    HeaderMultiRoles,

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
#app{
  margin: 0;
  padding: 0;
}

.monBody {
  float: right;
  padding-left: 5em;
  padding-right: 5em;
}

#mainEtudiant {
  min-height: calc(100vh - 13.2em);
  position: relative;
}


#mainEtudiant .table th {
  /* color: #495057; */
  color: #fff;
  background-color: #565656;
  /* background-color: #b8d8d8; */
  border-color: #565656;
  /* width: 70%; */
}

#mainEtudiant .table td {
}

.main-space{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.test{
  position: absolute;
  left: 0;
  right: 0;
}
</style>