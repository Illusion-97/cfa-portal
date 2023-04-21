<template>
    <section>
        <h1>403 Forbidden</h1>
        <h2>You don't have access to this page</h2>
        
        
    <v-btn @click="goBack()">
        Go back 
    </v-btn>
    </section>
    
</template>

<script>
export default {
name:"forbidden",

  methods:{
    
    goBack() {
      this.$router.go(-1);
    },
  }
}

    
</script>

<style lang="css" scoped>

</style>