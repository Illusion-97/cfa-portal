<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Congés" />
    <CongeListComponent :isAction="true"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import CongeListComponent from "@/components/List/CongeListComponent.vue";

export default {
  name: "CongeList",
  components: {
    BodyTitle,
    CongeListComponent,
  },
};
</script>

<style scoped>
</style>
