<template>
    <section>
      <component v-bind:is="currentTabComponent"></component>
    
    </section>
</template>

<script>


export default {
  name: "Tuteur",
  data() {
    return {


    };
  },
}
</script>

<style scoped>

</style>