<template>
  <paginate
      class="customPagination"
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination float-right'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
      >
  </paginate>
  <!-- style="margin: 1em 1em 0 0" ancienne pagination -->
</template>

<script>
export default {
  name: "Pagination",
  props:{
    pageCount: {
      Type:Function
    },
    pageChange: {
      Type: Function
    }
  }
}
</script>

<style scoped>

</style>