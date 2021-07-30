<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Projets" />
    <ProjetListComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import ProjetListComponent from "@/components/Referent/ProjetListComponent.vue";

export default {
  name: "ProjetListe",
  components: {
    BodyTitle,
    ProjetListComponent,
  },
};
</script>

<style scoped></style>
