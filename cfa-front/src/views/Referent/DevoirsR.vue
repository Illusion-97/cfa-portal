<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Devoirs" />
    <DevoirListComponent :isAction="true"/>
    <router-link
      :to="{ name: 'referent_intervention_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
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
