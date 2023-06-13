<template>
  <div>
    <v-text-field v-model="searchQuery" label="Recherche" @input="performSearch" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    performSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>