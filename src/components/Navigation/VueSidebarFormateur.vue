<template>
  <div>
    <!-- @/assets/img/institutionnel-logo.png -->
      <VueSidebarMenuAkahon :menuTitle="menuTitle"  :isSearch="isSearch" :menuItems="menuItems" :isMenuOpen="isMenuOpen" :isExitButton="isExitButton" :profileImg="profileImg" :bgColor="bgColor" :menuLogo="menuLogo" />
  </div>

</template>

<script>
  import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
  import Vue from 'vue';

  Vue.use(VueSidebarMenuAkahon);
  export default {
    name: 'VueSidebarFormateur',
      components: {VueSidebarMenuAkahon},
    data() {
      return {
         isSearch: false,
         menuTitle: 'DAWAN' ,
         isMenuOpen: true,
         isExitButton: false,
         profileImg:'',
         bgColor: '#00072d',
         menuLogo:'',
         menuItems: [
           {link: window.location.origin+'/formateur_intervention_detail#/home' ,name: 'Accueil', tooltip: 'Accueil', icon:'bx-home-alt' },
          {link: window.location.origin+ '/formateur_intervention_detail#/formateur/interventions',name: 'Interventions', tooltip: 'interventions', icon:'bx-briefcase-alt' }
         ],
      }
    },
  }
</script>
<style >
 .profile{
   display: none;
 }
</style>