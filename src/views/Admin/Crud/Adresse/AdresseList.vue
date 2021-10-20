<template>
  <div id="adresseList">
   
    <BodyTitle title="Liste des adresses" />
    <AdresseListComponent :isAction="true"/>

  
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import AdresseListComponent from "@/components/List/AdresseListComponent.vue";

export default {
  name: "AdresseList",
  components: {
    BodyTitle,
    AdresseListComponent,
  },
  
};
</script>
<style scoped>
</style>

