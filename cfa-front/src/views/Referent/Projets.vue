<template>
  <div id="Projets">
    <Navbar-Referent />
    <BodyTitle title="Liste des projets" />

    <div class="container">
      <a href="/referent/CreationProjet" class="btn btn-primary">Créer un projet</a>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "Projets",
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

