<template>
    <section>
        <h1>404</h1>
        <h2>Cette page n'existe pas</h2>

    <v-btn @click="goBack()">
        Go back 
    </v-btn>
    </section>
</template>

<script>
export default {
        name:"not_found",
    
  methods:{
    
    goBack() {
      this.$router.go(-1);
    },
  }
}
    
</script>

<style lang="css" scoped>

</style>