<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Notes" />

    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Notes</th>
          <th>Observations</th>
          <th>Devoir</th>
          <th>Examen</th>
        </tr>
      </thead>
      <tbody v-if="devoirsComputed">
        <tr v-for="devoir in devoirsComputed" :key="devoir.id">
          <td>
            {{ devoir.noteObtenu }}
          </td>
          <td>{{devoir.observations }}</td>
          <td>
            <!-- {{note.devoirDto.enonce}} -->
          </td>
          <td>
            <!-- {{note.examenDto.examenDto.enonce}} -->
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
      devoirs: [],
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
        .getDevoirsById(this.$store.getters.getUtilisateur.id,pageNum - 1, this.perPage)
        .then((response) => (this.devoirs = response));
    },
    refreshList() {
      etudiantApi
        .getDevoirsById(this.$store.getters.getUtilisateur.id,this.pageCount, this.perPage)
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

