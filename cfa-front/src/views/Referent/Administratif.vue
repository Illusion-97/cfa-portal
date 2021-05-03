<template>
    <div id="referentDashboard">
      <Navbar-Referent />
       <BodyTitle title="Liste des documents administratifs" />

       Liste des documents administratifs
      
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "Administratif",
  components: {
      NavbarReferent,
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

