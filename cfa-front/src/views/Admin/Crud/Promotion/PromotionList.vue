<template>
  <div class="container-fluid">
   
    <BodyTitle title="Liste des promotions" />
    <PromotionListComponent :isAction="true"/>
    
  
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import PromotionListComponent from "@/components/List/PromotionListComponent.vue";
export default {
  name: "PromotionList",
  components: {
    BodyTitle,
    PromotionListComponent,
  },
};
</script>
<style scoped>
</style>

