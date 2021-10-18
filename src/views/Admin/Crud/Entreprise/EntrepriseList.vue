<template>
  <div id="entrepriseList">
   
    <BodyTitle title="Liste des entreprises" />
    <EntrepriseListComponent :isAction="true"/>
    
    
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
export default {
  name: "EntrepriseList",
  components: {
    BodyTitle,
    EntrepriseListComponent,
  },
};
</script>
<style scoped>
</style>

