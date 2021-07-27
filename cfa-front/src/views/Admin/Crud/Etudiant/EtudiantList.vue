<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Etudiants" />
    <EtudiantListComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import EtudiantListComponent from "@/components/List/EtudiantListComponent.vue";

export default {
  name: "DevoirListe",
  components: {
    BodyTitle,
    EtudiantListComponent,
  },
};
</script>

<style scoped></style>