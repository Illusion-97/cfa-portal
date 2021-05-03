<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  name: "BodyTitle",
  props: {
    title: String,
  },
};
</script>

<style scoped>
h1 {
  /* border: 1px solid #6c757d; */
  display: flex;
  justify-content: center;
  padding: 0.5em;
  /* padding-left: 2em; */
}
</style>
