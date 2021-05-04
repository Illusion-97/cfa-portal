<template>
  <div id="Notes">
    <Navbar-Referent />
    <BodyTitle title="Liste des Notes" />
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnLink="/formateur/blabla"
    />
    <!--
    <div class="container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Note</th>
            <th scope="col">Observation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Etudiant1</td>
            <td>15</td>
            <td>Bon</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Etudiant2</td>
            <td>12</td>
            <td>Moyen</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Etudiant3</td>
            <td>19</td>
            <td>Excellent</td>
          </tr>
        </tbody>
      </table>
    </div>
    -->
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
export default {
  name: "Notes",
  components: {
    NavbarReferent,
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [
        {
          nom: "Etudiant1",
          note: "15",
          observation: "Bon",
        },
        {
          nom: "Etudiant2",
          note: "12",
          observation: "Moyen",
        },
        {
          nom: "Etudiant3",
          note: "20",
          observation: "Excellent",
        },
      ],
    };
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

