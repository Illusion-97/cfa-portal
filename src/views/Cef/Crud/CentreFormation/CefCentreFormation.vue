<template>
  <div id="centreFormationList">
   
    <BodyTitle title="Liste des centres de formations" />
    <CentreFormationListComponent :isAction="true"/>

  
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import CentreFormationListComponent from "@/components/List/CentreFormationListComponent.vue";

export default {
  name: "CentreFormationList",
  components: {
    BodyTitle,
    CentreFormationListComponent,
  },
  
};
</script>
<style scoped>
</style>

