<template>
  <button @click="sortAsc(dataTable)">
    <span v-if="opened">
      <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" />
    </span>
    <span v-else>
      <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />
    </span>
  </button>
</template>

<script>
export default {
  name: "SortComponent",
  props:{
    dataTable: {
      type: [String, Number,Date],
      require: true
    }
  },
  data(){
    return{
      opened:false
    }
  },
  methods:{
    sortAsc(dataTable){
      this.opened = !this.opened
      dataTable.sortAsc();
    }
  }
}
</script>

<style scoped>

</style>