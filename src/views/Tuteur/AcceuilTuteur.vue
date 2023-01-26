<template>
  <div id="adminDashboard">
    <TuteurListComponent :isAction="true" />
  </div>
</template>

<script>
import TuteurListComponent from "@/components/List/TuteurListCompenent.vue";
export default {
  name: "AdminDashboard",
  components: {
    TuteurListComponent,
  },
};
</script>
<style scoped>
</style>

