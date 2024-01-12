<template>
    <div>
      <PromotionListAdmin :isAction="true"/>
    </div>
  </template>
  
  <script>
  
  import PromotionListAdmin from "@/components/List/PromotionListAdmin.vue";
  
  export default {
    name: "PromotionsAdmin",
    components: {
        PromotionListAdmin,
    },
  };
  </script>
  <style scoped>
  </style>