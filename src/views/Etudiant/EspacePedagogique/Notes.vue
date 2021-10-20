<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Notes" />

    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Notes</th>
          <th>Observations</th>
          <th>Devoir/Examen</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="notesComputed">
        <tr v-for="note in notesComputed" :key="note.id">
          <td>
            {{ note.noteObtenu }}
          </td>
          <td>{{note.observations }}</td>
          
          <td v-if="note.devoirDto !=null">
            {{note.devoirDto.enonce}}
          </td>
          <td v-else-if="note.examenDto !=null">
            {{note.examenDto.examenDto.enonce}}
          </td>
          <td v-else>
            NaN
          </td>
          <td> <router-link
              class="btn btn-info"
              :to="{ name: 'etudiant_espace-peda_notesdetails', params: { id: note.id } }"
              >Detail</router-link></td>
          <!-- <td v-if="note.examenDto != null">
            {{note.examenDto.examenDto.enonce}}
          </td>
          <td v-else>
            NaN
          </td> -->
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
      notes: [],
      perPage: 10,
      pageCount: 0,

      
    };
  },
 computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    notesComputed() {
      return this.notes;
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
        .getNotesById(this.$store.getters.getUtilisateur.etudaintDto.id,pageNum - 1, this.perPage)
        .then((response) => (this.notes = response));
    },
    refreshList() {
      etudiantApi
        .getNotesById(this.$store.getters.getUtilisateur.etudiantDto.id,this.pageCount, this.perPage)
        .then((response) => (this.notes = response));
      etudiantApi
        .getCountNotes()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>

