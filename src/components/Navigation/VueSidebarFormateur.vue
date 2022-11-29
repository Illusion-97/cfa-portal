<template>
  <div>
    <SideBarComponentFormateur :menuTitle="menuTitle" :isSearch="isSearch" :menuItems="items" :isMenuOpen="isMenuOpen"
      :isExitButton="isExitButton" :profileImg="profileImg" :bgColor="bgColor" :menuLogo="menuLogo" />
  </div>
</template>
<script>
import SideBarComponentFormateur from "@/components/Navigation/SideBarComponentFormateur.vue";
import { utilisateurService } from "@/_services/utilisateur.service.js";

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
      bgColor: "#00072d",
      menuLogo: "",
      menuItemsFormateur: [
        { link: "formateur_home", name: "Accueil", icon: "bx-home-alt" },
        {
          link: "formateur_intervention",
          name: "Interventions",
          icon: "bx bxs-megaphone",
        },
        {
          link: "formateur_promotion_list",
          name: "Promotions",
          icon: "bx-briefcase-alt",
        },
      ],
      menuItemsAdmin: [
        { link: "admin_utilisateur", name: "Utilisateur", icon: "bx-user" },

        { link: "admin_cursus_list", name: "Cursus", icon: "bx-certification" },
        { link: "admin_formation_list", name: "Formations", icon: "bx-book" },
        {
          link: "admin_intervention_list",
          name: "Interventions",
          icon: "bx bxs-megaphone",
        },
        {
          link: "admin_promotion_list",
          name: "Promotions",
          icon: "bx-briefcase-alt",
        },
        {
          link: "admin_entreprise_list",
          name: "Entreprises",
          icon: "bx-building-house",
        },
        {
          link: "admin_centreFormation_list",
          name: "Centres de formation",
          icon: "bx-home-circle",
        },
        { link: "admin_adresse_list", name: "Adresse", icon: "bx-map-pin" },
      ],
    };
  },
  methods: {
    findUserRole() {
      if (utilisateurService.isAdmin()) {
        this.items = this.menuItemsAdmin
      } else if (utilisateurService.isFormateur()) {
        this.items = this.menuItemsFormateur;
      }
    },
  },
  created() {
    this.findUserRole();
  },
};
</script>
<style >
.profile .profile-details {
  display: none !important;
}
</style>