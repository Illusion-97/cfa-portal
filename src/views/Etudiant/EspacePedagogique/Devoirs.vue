<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des devoirs" />

    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Enoncé</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Intervention</th>
        </tr>
      </thead>
      <tbody v-if="devoirsComputed">
        <tr v-for="devoir in devoirsComputed" :key="devoir.id">
          <td>
            {{ devoir.enonce }}
          </td>
          <td>
            {{devoir.dateDebut }}
          </td>
          <td>
            {{devoir.dateFin}}
          </td>
          <td>
            {{devoir.interventionDto.formationDto.titre}}
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
  name: "Notes",
  components: {
    BodyTitle,
  },
  data() {
    return {
      devoirs: [{interventionDto: {formationDto: {}}}],
      perPage: 10,
      pageCount: 0,

      
    };
  },
 computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    devoirsComputed() {
      return this.devoirs;
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
        .getDevoirsById(this.$store.getters.getUtilisateur.etudiantDto.id,pageNum - 1, this.perPage)
        .then((response) => (this.devoirs = response));
    },
    refreshList() {
      etudiantApi
        .getDevoirsById(this.$store.getters.getUtilisateur.etudiantDto.id,this.pageCount, this.perPage)
        .then((response) => (this.devoirs = response));
      etudiantApi
        .getCountDevoirs()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>

