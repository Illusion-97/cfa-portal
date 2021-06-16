<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Examens" />
    <ExamenListeComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import ExamenListeComponent from "@/components/List/ExamenListComponent.vue";

export default {
  name: "ExamenListe",
  components: {
    BodyTitle,
    ExamenListeComponent,
  },
};
</script>

<style scoped>
</style>
