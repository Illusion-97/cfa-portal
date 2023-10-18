<template>
  <div class="container-fluid">
    <PromotionListComponent :isAction="true"/>
  </div>
</template>

<script>
import PromotionListComponent from "@/components/List/PromotionListComponent.vue";

export default {
  name: "PromotionList",
  components: {
    PromotionListComponent,
  },
};
</script>
<style scoped>
</style>

