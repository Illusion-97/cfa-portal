<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Devoirs" />
    <DevoirListComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import DevoirListComponent from "@/components/List/DevoirListComponent.vue";

export default {
  name: "DevoirListe",
  components: {
    BodyTitle,
    DevoirListComponent,
  },
};
</script>

<style scoped></style>

