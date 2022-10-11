<template>
  <div id="adresseList">
    <AdresseListComponent :isAction="true"/>
  </div>
</template>

<script>
import AdresseListComponent from "@/components/List/AdresseListComponent.vue";

export default {
  name: "AdresseList",
  components: {
    AdresseListComponent,
  },
  
};
</script>
<style scoped>
</style>

