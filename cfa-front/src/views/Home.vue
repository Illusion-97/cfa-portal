<template>
  <div>
    {{ interventions }}
  </div>
</template>

<script>
import interventionStore from "@/store/intervention.js";
export default {
  name: "Home",
  data() {
    return {
      state: interventionStore.state,
    };
  },
  components: {},
  computed: {
    interventions() {
      return this.state.interventions;
    },
  },
};
</script>

<style scoped></style>
