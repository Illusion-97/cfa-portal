<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Examens" />
    <ExamenListeComponent :isAction="true"/>
    <router-link
      :to="{ name: 'cef_cours' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </router-link>
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
