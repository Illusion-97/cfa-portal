<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Absences" />

    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Date</th>
          <th>Justificatif</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="AbsencesComputed">
        <tr v-for="abs in AbsencesComputed" :key="abs.id">
          <td>
           Du {{ abs.dateDebut }} au {{abs.dateFin}}
          </td>
          <td>{{abs.justificatif }}</td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>

    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
      
    </paginate>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { etudiantApi} from "@/_api/etudiant.api.js";

export default {
  name: "Abscences",
  components: {
    BodyTitle,
  },
  data() {
    return {
      perPage: 10,
      pageCount: 0,
      absences: [],
    };
  },
  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    AbsencesComputed() {
      return this.absences;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },
  methods: {
    pageChange(pageNum) {
     etudiantApi
        .getAbsencesById(this.$store.getters.getUtilisateur.id)
        .then((response) => (this.absences = response));
    },
     refreshList() {
      etudiantApi
        .getAbsencesById(this.$store.getters.getUtilisateur.id)
        .then((response) => (this.absences = response));
      etudiantApi
        .getCountDevoirs()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  }
}
</script>
