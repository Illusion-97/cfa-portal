<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Notes" />
    <NoteListeComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NoteListeComponent from "@/components/List/NoteListComponent.vue";

export default {
  name: "NoteListe",
  components: {
    BodyTitle,
    NoteListeComponent,
  },
};
</script>

<style scoped>
</style>
