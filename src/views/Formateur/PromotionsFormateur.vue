<template>
  <div>
    <PromotionListFormateur :isAction="true"/>
  </div>
</template>

<script>

import PromotionListFormateur from "@/components/List/PromotionListFormateur.vue";

export default {
  name: "PromotionsFormateur",
  components: {
    PromotionListFormateur,
  },
};
</script>
<style scoped>
</style>