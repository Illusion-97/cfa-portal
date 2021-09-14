<template>
  <section>
    <div id="grid-container">
      <div id="header"></div>
      <div id="trainer-planning">
        <Planning />
      </div>
    </div>
  </section>
</template>

<script>
import Planning from "@/components/utils/Planning.vue";
export default {
  name: "HomeFormateur",
  components: {
    Planning,
  },
};
</script>

<style lang="css" scoped>
#grid-container {
  display: grid;
  grid-template-rows: 55vh 1fr;
  row-gap: 2em;
}
#header{
    grid-row: 1;
    background-color: #f5f5f5;
}
#trainer-planning {
    grid-row: 2;
    margin-bottom: 2em;
}
</style>
