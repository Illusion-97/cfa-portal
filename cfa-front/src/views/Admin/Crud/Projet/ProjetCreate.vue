<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label class="mon-label">Nom</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.nom"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="mon-label">Description</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.description">
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <div class="container mt-5">
          <div class="row">
            <div class="">
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
                class="mr-3"
              />
              <button v-on:click="submitFile()" class="btn btn-primary">
                Ajouter
              </button>
            </div>
            <div class="my-3 ml-auto col-md-3" v-if="items.length != 0">
              <b-form inline>
                <label for="pageSelect" class="mr-sm-2">Affichage :</label>
                <b-form-select
                  id="pageSelect"
                  v-model="per_page"
                  class="border-0 opts"
                  size="sm"
                >
                  <b-form-select-option
                    :value="Math.floor(items.length * 0.25)"
                  >
                    {{ (items.length * 0.25) | formatNumber }} sur
                    {{ items.length }}
                  </b-form-select-option>
                  <b-form-select-option :value="Math.floor(items.length * 0.5)">
                    {{ (items.length * 0.5) | formatNumber }} sur
                    {{ items.length }}
                  </b-form-select-option>
                  <b-form-select-option
                    :value="Math.floor(items.length * 0.75)"
                  >
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
      </b-form-group>

      <GroupeListComponent
        v-on:click-list="onClickChildGroupeList"
        :groupeProp="groupe_input"
      />

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import GroupeListComponent from "@/components/List/GroupeListComponent.vue";
import { projetApi } from "@/_api/projet.api.js";
import { fileApi } from "@/_api/file.api.js";

export default {
  name: "projetCreate",
  components: {
    BodyTitle,
    GroupeListComponent,
  },
  data() {
    return {
      vue_title: "Création d'un nouveau Projet",
      btn_form_text: "Ajouter",

      form: {
        nom: "",
        description: "",
        pjCahierDesCharges: "",
        groupeDto: {},
      },

      groupe: null,
    };
  },
  computed: {
    groupe_input() {
      return this.groupe;
    },
  },
  methods: {
    onClickChildGroupeList(groupe) {
      this.form.groupeDto = groupe;
    },
    submit(e) {
      e.preventDefault();
      projetApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_projet_list" }));
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {        
      fileApi.submitFileByDirectoryAndId("projets", this.$store.getters.getUtilisateur.id, this.file).then(() => this.list_reset());
    },
    list_reset() {
      fileApi.getListByDirectoryAndId("projets",this.$store.getters.getUtilisateur.id).then((response) => this.files = response);
    },
    download_file(fileName) {
      fileApi.downloadByDirectoryAndIdAndFilename("projets", this.$store.getters.getUtilisateur.id, fileName);
    },
    delete_file(fileName) {
      fileApi.deleteByDirectoryAndIdAndFilename("projets", this.$store.getters.getUtilisateur.id, fileName).then(() => this.list_reset());
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      projetApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un Projet";
        this.btn_form_text = "Update";
        this.groupe = response.groupeDto;
      });
    }
  },
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

.mon-btn {
  width: 80%;
}

.mon-label {
  margin-left: 2.2em;
  width: 9.7em;
}

.mon-input {
  width: 32em;
}
</style>
