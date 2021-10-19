<template>
    <div id="referentDashboard">
      
       <BodyTitle title="Liste des documents administratifs" />

       Liste des documents administratifs
      
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "Administratif",
  components: {
      BodyTitle,
  },
};
 
</script>
<style scoped>
.opts,
label {
  color: black;
}
.table {
  text-align: center;
}
.icon:hover {
  cursor: pointer;
}
</style>

