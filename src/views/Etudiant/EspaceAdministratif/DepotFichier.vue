<template>
  <div>
    <BodyTitle title="Liste des documents administratifs" />

    <div class="container mt-5">
      <div class="row">
        <div class="">
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            class="mr-3"
            accept="application/pdf"
          />
          <button v-on:click="submitFile()" class="btn btn-primary">Ajouter</button>
        </div>
        <div class="my-3 ml-auto col-md-3" v-if="items.length != 0">
            <b-form inline>
              <label for="pageSelect" class="mr-sm-2">Affichage :</label>
              <b-form-select id="pageSelect" v-model="per_page" class="border-0 opts" size="sm">
                <b-form-select-option :value="Math.floor(items.length * 0.25)">
                  {{ (items.length * 0.25) | formatNumber }} sur
                  {{ items.length }}
                </b-form-select-option>
                <b-form-select-option :value="Math.floor(items.length * 0.5)">
                  {{ (items.length * 0.5) | formatNumber }} sur
                  {{ items.length }}
                </b-form-select-option>
                <b-form-select-option :value="Math.floor(items.length * 0.75)">
                  {{ (items.length * 0.75) | formatNumber }} sur
                  {{ items.length }}
                </b-form-select-option>
                <b-form-select-option :value="items.length">
                  Tout afficher
                </b-form-select-option>
              </b-form-select>
            </b-form>
          </div>
        <b-table
          id="my-table"
          striped
          small
          :items="items"
          :fields="fields"
          :per-page="per_page"
          :current-page="currentPage"
        >
          <template #cell(name_dl)="data">
            <font-awesome-icon
              :icon="['fas', 'arrow-down']"
              class="icon text-success"
              @click="download_file(data.value)"
            />
          </template>

          <template #cell(name_delete)="data">
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="icon text-danger"
              @click="delete_file(data.value)"
            />
          </template>
        </b-table>
        <b-pagination
          class="pages ml-auto border-0"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="per_page"
          aria-controls="my-table"
          size="sm"
        >
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { fileApi } from "@/_api/file.api.js"
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { fileFields } from "@/assets/js/fields.js";
export default {
  name: "DepotFichier",
  components: {
    BodyTitle,
  },
  data() {
    return {
      files: [],
      fields: fileFields,
      per_page: 10,
      currentPage: 1,
      file: "",
    };
  },
  computed: {
    items() {
      let result = [];      
      
      for (let i = 0; i < this.files.length; i++) {
        let table = { name: "", name_dl: "", name_delete: "" };

        table.name = this.files[i];
        table.name_dl = this.files[i];
        table.name_delete = this.files[i];

        result.push(table);
      }

      return result;
    },
    rows() {
      return this.items.length;
    },
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {        
      fileApi.submitFileByDirectoryAndId("utilisateurs", this.$store.getters.getUtilisateur.id, this.file).then(() => this.list_reset());
    },
    list_reset() {
      fileApi.getListByDirectoryAndId("utilisateurs",this.$store.getters.getUtilisateur.id).then((response) => this.files = response);
    },
    download_file(fileName) {
      fileApi.downloadByDirectoryAndIdAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, fileName);
    },
    delete_file(fileName) {
      fileApi.deleteByDirectoryAndIdAndFilename("utilisateurs", this.$store.getters.getUtilisateur.id, fileName).then(() => this.list_reset());
    },
  },
  created() {
    this.list_reset();
  },
};
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
