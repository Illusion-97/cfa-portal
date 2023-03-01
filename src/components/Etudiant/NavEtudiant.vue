<template>
  <div>
    <SideBarComponentFormateur :menuTitle="menuTitle" :isSearch="isSearch"  :isMenuOpen="isMenuOpen"
      :isExitButton="isExitButton" :profileImg="profileImg" :bgColor="bgColor" :menuLogo="menuLogo" />
  </div>
</template>
<script>
import SideBarComponentFormateur from "@/components/Navigation/SideBarComponentEtudiant.vue";

export default {
  name: "VueSidebarFormateur",
  components: { SideBarComponentFormateur },
  data() {
    return {
      userRole: "",
      isSearch: false,
      menuTitle: "DAWAN",
      isMenuOpen: true,
      isExitButton: false,
      profileImg: "",
      bgColor: "#e11b28",
      menuLogo: "",
 

    };
  },

};
</script>
<style >
.profile .profile-details {
  display: none !important;
}
</style>
