<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label class="mon-label">Nom</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.nom" required> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="mon-label">Description</label>
          <div class="mon-input">
            <b-form-textarea
              type="text"
              v-model="form.description"
              rows="3"
              max-rows="6"
            >
            </b-form-textarea>
          </div>
        </b-form-row>
      </b-form-group>

      <GroupeListComponent
        v-on:click-list="onClickChildGroupeList"
        v-on:delete_input="onClickDeleteInput"
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
import { fileFields } from "@/assets/js/fields.js";

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
        groupeDto: null,
      },

      groupe: null,

      //Pour les files
      files: [],
      fields: fileFields,
      file: "",
    };
  },
  computed: {
    groupe_input() {
      return this.groupe;
    },

    //Pour les files
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
    routeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onClickChildGroupeList(groupe) {
      this.form.groupeDto = groupe;
    },
    onClickDeleteInput(){
      this.form.groupeDto = null;
    },
    submit(e) {
      e.preventDefault();
      projetApi
        .save(this.form)
        .then((response) => {
          //Quand on créer l'objet, on ajoute la pj sur le serveur, après la création du dossier (donc de l'objet)
          if (this.file != "") this.submitFile(response.id);
        })
        .then(() => this.goBack());
    },

    //Pour la piece jointe
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile(id) {
      if (this.file)
        fileApi
          .submitFileByDirectoryAndId("projets", id, this.file)
          .then(() => this.list_reset(id));
    },
    list_reset(id) {
      fileApi
        .getListByDirectoryAndId("projets", id)
        .then((response) => (this.files = response));
    },
    download_file(id, fileName) {
      fileApi.downloadByDirectoryAndIdAndFilename("projets", id, fileName);
    },
    delete_file(id, fileName) {
      fileApi
        .deleteByDirectoryAndIdAndFilename("projets", id, fileName)
        .then(() => this.list_reset(id));
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

      this.list_reset(this.$route.params.id);
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
