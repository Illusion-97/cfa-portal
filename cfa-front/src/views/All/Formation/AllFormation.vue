<template>
  <div>
    <TableTemplate :items="items" :fields="fields" :currentPage="currentPage" :perPage="perPage" />
    {{ items }}
  </div>
</template>

<script>
  import TableTemplate from "@/components/utils/TableTemplate.vue";
  import { formationApi } from "@/_api/formation.api.js";
  import { formationFields } from "@/assets/js/fields.js";
  export default {
    name: "Formation",
    components: {
      TableTemplate,
    },
    data() {
      return {
        items: [],
        fields: formationFields,
        currentPage: 1,
        perPage: 10,
      };
    },
    created() {
      this.fillList();
    },
    methods: {
      fillList() {
        formationApi
          .getAllFormation()
          // .getFormation(this.currentPage, this.perPage)
          .then((data) => (this.items = data));
      },
    },
  };
</script>

<style scoped>
.title {
  background-color: red;
}

  </style>