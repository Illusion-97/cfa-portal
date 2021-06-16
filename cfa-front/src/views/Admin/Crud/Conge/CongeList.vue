<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Congés" />
    <CongeListComponent :isAction="true" :api="testapi"/>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import CongeListComponent from "@/components/List/CongeListComponent.vue";
import { congeApi } from "@/_api/conge.api.js";

export default {
  name: "CongeList",
  components: {
    BodyTitle,
    CongeListComponent,
  },
  data() {
    return {
      testapi: congeApi,
    };
  },
  methods:{
    test(){
      this.testapi.getById(2).then((response)=>console.log("testApi response",response));
    }
  },
  created(){
    this.test();
  },
};
</script>

<style scoped>
</style>
