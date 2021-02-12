<template>
  <div>
    <b-breadcrumb class="ariane">
      <b-breadcrumb-item  v-for="(tbl,index) of table" v-bind:href="paths[index]" v-bind:key="tbl">{{tbl}}</b-breadcrumb-item>
    </b-breadcrumb>
  </div>  
</template>

<script>
export default {
  name: "Breadcrumb",
  computed: {
    table : function(){
      return this.$router.currentRoute.fullPath.split('/').splice(1);
    },
    paths : function(){
      let result = [this.table.length];
      result[0] = "/" + this.table[0];
      for(let i = 1; i < this.table.length; i++){
        result[i] = result[i-1] + '/' + this.table[i];
      }
      return result;
    }
  }
};

</script>

<style scoped>
.ariane {
  margin-left: 11em;
  background-color: inherit;
}
</style>
