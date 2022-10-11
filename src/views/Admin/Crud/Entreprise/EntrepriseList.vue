<template>
  <div id="entrepriseList">
    <EntrepriseListComponent :isAction="true"/>
  </div>
</template>

<script>
import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
export default {
  name: "EntrepriseList",
  components: {
    EntrepriseListComponent,
  },
};
</script>
<style scoped>
</style>

