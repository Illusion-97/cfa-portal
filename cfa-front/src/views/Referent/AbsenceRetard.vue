<template>
  <div id="AbsenceRetard">
    <!-- <Navbar-Referent /> -->
    <BodyTitle title="Liste des Absences / Retards" />
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      btnTxt="Signaler une absence"
      :showBtn="true"
      btnLink="/formateur/blabla"
    />
    <!-- 
    <div class="container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">DateDebut</th>
            <th scope="col">DateFin</th>
            <th scope="col">Justificatif</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Etudiant1</td>
            <td>15/02/2021</td>
            <td>16/02/2021</td>
            <td>Certificat médical</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Etudiant2</td>
            <td>15/02/2021</td>
            <td>15/02/2021</td>
            <td>Aucun motif</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Etudiant3</td>
            <td>15/02/2021</td>
            <td>17/02/2021</td>
            <td>Certificat médical</td>
          </tr>
        </tbody>
      </table>
      <br />
      <a href="/referent/CreationAbsenceRetard" class="link"
        >Déclarer une absence / retard</a>
    </div> -->
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
// import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { absences_latesFields } from "@/assets/js/fields.js";
export default {
  name: "AbsenceRetard",
  components: {
    // NavbarReferent,
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [
        {
          eleve: { nom: "sydaphasavanh", prenom: "kanha" },
          dateDebut: "2021-03-15",
          dateFin: "2021-03-15",
          motif: "aucune",
        },
        {
          eleve: { nom: "billon", prenom: "tanguy" },
          dateDebut: "2021-03-15",
          dateFin: "2021-03-15",
          motif: "aucune",
        },
        {
          eleve: { nom: "potier", prenom: "nicolas" },
          dateDebut: "2021-03-15",
          dateFin: "2021-03-15",
          motif: "aucune",
        },
        {
          eleve: { nom: "atia", prenom: "ali-haidar" },
          dateDebut: "2021-03-15",
          dateFin: "2021-03-15",
          motif: "aucune",
        },
      ],
      fields: absences_latesFields,
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
