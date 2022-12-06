<template>
  <div>
       <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </a>
    <PromotionDetailFormateur />
  </div>
</template>

<script>
  import PromotionDetailFormateur from '@/views/Admin/Crud/Promotion/PromotionDetailFormateur.vue'
export default {
  name: "PromotionDetail",
  components: {
    PromotionDetailFormateur,
  },
};
</script>
