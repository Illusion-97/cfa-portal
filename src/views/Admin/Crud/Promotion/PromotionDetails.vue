<template>
  <div>
    <br>
      <v-btn color="back-color" class="back" @click="goBack()">
        <v-icon>
          mdi-arrow-left
        </v-icon>
        Précédent
      </v-btn>
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
  methods: {
  goBack() {
      this.$router.go(-1);
    },
  }
};
</script>
<style>
.back-color {
  background-color: #00072d !important;
  color: white !important;
  margin-left: 16px;
}
</style>
