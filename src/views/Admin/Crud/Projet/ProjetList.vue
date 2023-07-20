<template>
  <div class="container-fluid">
    <ProjetListComponent :isAction="true"/>
  </div>
</template>

<script>
import ProjetListComponent from "@/components/List/ProjetListComponent.vue";

export default {
  name: "ProjetListe",
  components: {
    ProjetListComponent,
  },
};
</script>

<style scoped></style>
