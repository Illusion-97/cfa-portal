<template>
  <div class="container">
    <h5>Contrôles continus</h5>
    <div>
      <b-table small head-variant="light" :items="tableauComputed"></b-table>
    </div>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
export default {
  name: "ControleContinuEtudiant",
  data() {
    return {
      notesEtudiant: [],
    };
  },
  computed: {
    tableauComputed() {
      let notesEtudiant = this.notesEtudiant;
      let tab = [];

      notesEtudiant.forEach(function (item) {
        tab.push({
          Promotion: item.promotion,
          Titre: item.examen,
          Date: item.date,
          Note: item.noteObtenue,
        });
      });
      return tab;
    },
  },
  created() {
    
    etudiantApi
      .getNotesByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.notesEtudiant = data));
  },
};
</script>

<style scoped>
h5 {
  margin: 0 0 30px 0;
  font-weight: bolder;
}
.container {
  margin: 89px 0 0 421px;
}
</style>
