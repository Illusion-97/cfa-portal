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
          {link: window.location.origin+ '/formateur_intervention_detail#/formateur/interventions',name: 'Interventions', tooltip: 'interventions', icon:'bx-briefcase-alt' },
          {link: window.location.origin+ '/formateur_intervention_detail#/formateur/promotions',name: 'Promotions', tooltip: 'Promotions', icon:'bx bxs-megaphone' }
         ],
      }
    },
  }
  //   created() {
    // this.assigneTable();
  // },
  // methods :{
  //   assigneTable : function(){
  //     if(this.$route == "formateur"){
  //       this.menuItems = [
  //           {link: window.location.origin+'/formateur_intervention_detail#/home' ,name: 'Accueil', tooltip: 'Accueil', icon:'bx-home-alt' },
  //         {link: window.location.origin+ '/formateur_intervention_detail#/formateur/interventions',name: 'Interventions', tooltip: 'interventions', icon:'bx-briefcase-alt' }
  //       ]
  //     }
  //     else if(this.$route.name == "etudiant"){
  //       this.menuItems = [
  //           {link: window.location.origin+'/etudiant/accueil' ,name: 'Accueil', tooltip: 'Accueil', icon:'bx-home-alt' }
         
  //       ]
  //     }
  //   },
  //   getRoute :function(){
  //     let route = window.Location.path
  //   }
  // },
  // computed: {
  //   afficher :function(){
  //     return this.$route.path;
  //   }
  // }
</script>
<style >
 .profile{
   display: none;
 }
</style>