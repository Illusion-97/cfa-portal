<template>
  <div id="Groupes">
    <Navbar-Referent />
    <BodyTitle title="Liste des groupes" />

    <div class="container">
      <a href="/referent/creation-groupe" class="btn btn-primary">Créer un groupe</a>
    </div>

    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
    />
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
export default {
  name: "Groupes",
  components: {
    NavbarReferent,
    BodyTitle,
    TableTemplate,
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

