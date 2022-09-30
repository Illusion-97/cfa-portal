<template>
  <div id="cursusList">
    <CursusListComponent :isAction="true"/>
  </div>
</template>

<script>
import CursusListComponent from "@/components/List/CursusListComponent.vue";
export default {
  name: "CursusList",
  components: {
    CursusListComponent,
  },
  
};
</script>
<style scoped>
</style>

