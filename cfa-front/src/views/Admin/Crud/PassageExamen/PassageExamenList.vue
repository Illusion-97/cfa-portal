<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des PassageExamens" />
    <PassageExamenListComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import PassageExamenListComponent from "@/components/List/PassageExamenListComponent.vue";

export default {
  name: "PassageExamenListe",
  components: {
    BodyTitle,
    PassageExamenListComponent,
  },
};
</script>

<style scoped></style>
