<template>
  <div id="app">
    <div>
      <router-view v-if="path == 'home'" />
      <div v-else-if="path == 'formateur'">
        <VueSidebarFormateur />
        <router-view />
      </div>
      <div v-else-if="path == 'etudiant'" id="mainEtudiant">
        <HeaderEtudiant />
        <NavEtudiant />
        <router-view />
        <FooterEtudiant />
      </div>
      <div v-else-if="path == 'admin' || path == 'referent' || path == 'cef'">
        <Navbar />
        <VerticalNavbar />
        <router-view class="monBody col-md-10" />
      </div>
      <router-view v-else class="monBody" />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navigation/Navbar.vue";
import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue";
import VueSidebarFormateur from "@/components/Navigation/VueSidebarFormateur.vue";
import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";

export default {
  name: "App",
  components: {
    Navbar,
    VerticalNavbar,
    VueSidebarFormateur,
    FooterEtudiant,
    NavEtudiant,
    HeaderEtudiant,
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
  background-color: #FF9000;
  /* background-color: #b8d8d8; */
  border-color:#FF9000;
  /* width: 70%; */
  padding: 0.3rem 14px;
}

#mainEtudiant .table td {
  padding: 0.3rem 14px !important;
}

</style>