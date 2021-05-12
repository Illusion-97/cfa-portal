<template>
  <div>
    <h1>Detail Cours</h1>
    {{items}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      interventionId: this.$route.params.id,
      items: [],
    };
  },
  created() {
    axios
      .get(`${this.$apiUrl}/AppliCFABack/interventions/${this.interventionId}/formation`)
      .then((response) => {
        this.items = response.data;
        // console.log(this.items.interventionsDto);
      })
      .catch((e) => console.error(e));
  },
};
</script>

<style scoped></style>
