<template>
    <h1>{{title}}</h1>
</template>

<script>
export default {
  name: "BodyTitle",
  props: ["title"],
};

</script>

<style scoped>
h1{
    border: 1px solid #6c757d;
    padding: 0.5em;
    padding-left: 2em;
  }
</style>