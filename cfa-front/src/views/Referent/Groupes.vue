<template>
  <div id="Groupes">
    <Navbar-Referent />
    <BodyTitle title="Liste des groupes" />

    <div class="container">
      <a href="/referent/CreationGroupe" class="btn btn-primary">Créer un groupe</a>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "Groupes",
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

