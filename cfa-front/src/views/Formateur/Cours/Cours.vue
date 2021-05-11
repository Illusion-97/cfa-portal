<template>
  <div>
    <!-- <BodyTitle title="Affichage des cours" /> -->
    <h1 class="text-center">Affichage des cours</h1>
    <TableTemplate :perPage="perPage" :items="items.interventionsDto" :fields="fields" :showBtn="false"
      btnLink="formateur_ajouter-cours" />
      {{items.interventionsDto}}
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
        perPage: 10,
        userId: 3
      };
    },
    components: {
      TableTemplate,
      // BodyTitle,
    },
    created() {
      axios
        .get(`${this.$apiUrl}/AppliCFABack/formateurs/${this.userId}/interventions`)
        .then((response) => {
          this.items = response.data;
          // console.log(this.items.interventionsDto);
        })
        .catch((e) => console.error(e));
    },
  };
</script>

<style scoped></style>