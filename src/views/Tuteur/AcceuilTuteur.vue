<template>
<<<<<<< HEAD
    <section>
      <component v-bind:is="currentTabComponent"></component>
    
    </section>
=======
  <div id="adminDashboard">
    <TuteurListComponent :isAction="true" />
  </div>
>>>>>>> 782b1e35b78c034422e79b19ab3c4e950e23157f
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

