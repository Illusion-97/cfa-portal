<template>
    <div>
  
        <SideBarComponentFormateur :menuTitle="menuTitle"  :isSearch="isSearch" :menuItems="menuItems" :isMenuOpen="isMenuOpen" :isExitButton="isExitButton" :profileImg="profileImg" :bgColor="bgColor" :menuLogo="menuLogo" />
    </div>
</template>

<script>
  import SideBarComponentFormateur from "@/components/Navigation/SideBarComponentFormateur.vue";

export default {

   name: 'VueSidebarFormateur',
      components: {SideBarComponentFormateur},
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
            {link: "formateur_home" ,name: 'Accueil', icon:'bx-home-alt' },
            {link: "formateur_intervention" ,name: 'Interventions', icon:'bx bxs-megaphone' },
            {link: "formateur_promotion_list" ,name: 'Promotions', icon:'bx-briefcase-alt' }
         ],
      }
    },
  }

</script>
<style scoped>
.profile{
   display: none;
 }
</style>