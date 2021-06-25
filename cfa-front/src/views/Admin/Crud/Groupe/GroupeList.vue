<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Groupes" />
    <GroupeListComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import GroupeListComponent from "@/components/List/GroupeListComponent.vue";

export default {
  name: "GroupeListe",
  components: {
    BodyTitle,
    GroupeListComponent,
  },
};
</script>

<style scoped></style>
