<template>
  <div>
    {{ formationId }}
    {{item}}
  </div>
</template>

<script>
import { formationApi } from "../../../_api/formation.api";
export default {
  data() {
    return {
      formationId: this.$route.params.id,
      item: [],
    };
  },
  methods: {},
  created() {
    formationApi
      .getFormationById(this.formationId)
      .then((data) => (this.item = data));
  },
};
</script>

<style></style>
