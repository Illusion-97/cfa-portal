<template>
  <div class="container-fluid">
    <BodyTitle title="Liste des Absences" />

    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Motif</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="AbsencesComputed">
        <tr v-for="(abs, index) in AbsencesComputed" :key="abs.id">
          <td>
           Du {{ abs.dateDebut }} au {{abs.dateFin}}
          </td>
          <td>{{abs.justificatif }}</td>
          <td>
            <div>
              <input
                type="file"
                :ref="'file'+abs.id"
                v-on:change="handleFileUpload(index, 'file'+abs.id)"
                accept="application/pdf"
                class="mr-3"
              />
              <b-button variant="info" v-on:click="submitFile(index)">
                Envoyer un justificatif
              </b-button>
            </div>
           
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
import { fileApi } from "@/_api/file.api.js"

export default {
  name: "Abscences",
  components: {
    BodyTitle,
  },
  data() {
    return {
      files: [],
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
 
  methods: {
    pageChange(pageNum) {
     etudiantApi
        .getAbsencesById(this.$store.getters.getUtilisateur.etudiantDto.id,pageNum - 1, this.perPage)
        .then((response) => (this.absences = response));
    },
     refreshList() {
      etudiantApi
        .getAbsencesById(this.$store.getters.getUtilisateur.etudiantDto.id,this.pageCount, this.perPage)
        .then((response) => (this.absences = response));
      etudiantApi
        .getCountAbsence()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    handleFileUpload(index, ref) {
      this.files[index] = this.$refs[ref][0].files[0];
    },
    submitFile(index) {        
     fileApi.submitFileByDirectoryAndId("utilisateurs", this.$store.getters.getUtilisateur.id, this.files[index]);
    },
  },
  
    created() {
    this.refreshList();
    },
}
</script>

<style scoped>
.form {
  border: 1px solid #6c757d;
  margin-top: 5em;
  padding-top: 2em;
  padding-left: 5em;
  padding-right: 5em;
}

.b-form-textarea {
  height: 200px;
}

#my-table {
  text-align: center;
}

.icon:hover{
  cursor: pointer;
}
</style>
