<template>
  <div>
    <h1 class="text-center">Affichage des interventions</h1>
    <TableTemplate :perPage="perPage" :items="items.interventionsDto" :fields="fields" :showBtn="false" />
  </div>
</template>

<script>
  import TableTemplate from "@/components/utils/TableTemplate.vue";
  import { courseFields } from "@/assets/js/fields.js";
  import axios from "axios";
  export default {
    name: "Cours",
    data() {
      return {
        items: [],
        fields: courseFields,
        perPage: 3,
        userId: 3,
      };
    },
    components: {
      TableTemplate,
      // BodyTitle,
    },
    created() {
      axios
        .get(
          `http://localhost:8080/AppliCFABack/formateurs/${this.userId}/interventions`
        )
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => console.error(e));
    },
    computed: {
    },
  };
</script>

<style scoped></style>