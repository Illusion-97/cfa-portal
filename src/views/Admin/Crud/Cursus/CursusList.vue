<template>
  <div id="cursusList">
   
    <BodyTitle title="Liste des cursus" />
    <CursusListComponent :isAction="true"/>
    
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import CursusListComponent from "@/components/List/CursusListComponent.vue";
export default {
  name: "CursusList",
  components: {
    BodyTitle,
    CursusListComponent,
  },
  
};
</script>
<style scoped>
</style>

