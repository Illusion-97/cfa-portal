<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Congés" />

    <TableTemplate
      :perPage="perPage"
      :items="congesComputed"
      :fields="fields"
      class="table-template"
    />
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { leaveFields } from "@/assets/js/fields.js";
import { congeApi } from "@/_api/conge.api.js";

export default {
  name: "CongeList",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      conges: [],
      fields: leaveFields,
      perPage: 10,
    };
  },
  computed: {
    congesComputed() {
      return this.conges;
    },
  },
  created() {
    congeApi.getAllConges().then((response) => (this.conges = response));        
  },
};
</script>

<style scoped></style>
