<template>
  <div>
    <h1>Detail Intervention</h1>
    <button class="btn btn-outline-info px-5" @click="goBack()">go back</button>
    <p class="h2">{{ items.formationDto.titre }}</p>
    {{ items }}
  </div>
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";
export default {
  data() {
    return {
      interventionId: this.$route.params.id,
      items: [],
      loading: false,
    };
  },
  created() {
    interventionApi
      .getInterventionById(this.interventionId)
      .then((data) => (this.items = data));
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
