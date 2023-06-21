<template>
  <button @click="sortAsc">
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
  props: {
    dataTable: {
      required: true
    }
  },
  data() {
    return {
      opened: false
    };
  },
  methods: {
    sortAsc() {
      this.opened = !this.opened;
      if (Array.isArray(this.dataTable)) {
        const sortedDataTable = [...this.dataTable];
        sortedDataTable.sort((a, b) => a - b);
        this.$emit("update:dataTable", sortedDataTable);
      } else {
        console.error("this.dataTable is not an array");
      }
    }
  }
};
</script>

<style scoped>

</style>