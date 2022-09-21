<template>
  <div>
    <PromotionDetailFormateur />
  </div>
</template>

<script>
// import BodyTitle from "@/components/utils/BodyTitle.vue";
// import { promotionApi } from "@/_api/promotion.api.js";
// import { centreFormationApi } from "@/_api/centreFormation.api.js";
  import PromotionDetailFormateur from '@/views/Admin/Crud/Promotion/PromotionDetailFormateur.vue'
export default {
  name: "PromoDetail",
  components: {
    // BodyTitle,
    PromotionDetailFormateur,
  },
  // data() {
  //   return {
  //   };
  // },
  // computed: {
  // },
  // methods: {
  //   clickEtudiant(etudiant) {
  //     let route = this.$route.path.split("/").splice(1);
  //       if (route[0] == "admin") {this.$router.push({name: "admin_etudiant_detail",params: {id: etudiant.id,},});
  //       } else if(route[0] == "referent") {this.$router.push({name: "referent_etudiant_detail",params: {id: etudiant.id,},});
  //       }else if(route[0] == "cef") {this.$router.push({name: "cef_etudiant_detail",params: {id: etudiant.id,},});
  //       }
  //     },

  //   clickIntervention(intervention) {
  //     let route = this.$route.path.split("/").splice(1);
  //       if (route[0] == "admin") {this.$router.push({name: "intervention-detail",params: {id: intervention.id,},});
  //       } else if (route[0] == "referent") {this.$router.push({name: "referent-intervention-detail",params: {id: intervention.id,},});
  //       } else if (route[0] == "cef") {this.$router.push({name: "cef-intervention-detail",params: {id: intervention.id,},});
  //       }
  //     },
  // }
};
</script>
