<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
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
        <button type="submit" class="btn-hover color-9">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import GroupeListComponent from "@/components/List/GroupeListComponent.vue";
import {projetApi} from "@/_api/projet.api.js";
import {fileApi} from "@/_api/file.api.js";
import {fileFields} from "@/assets/js/fields.js";

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

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.buttons .router-link {
    margin: 10%;
    text-align: center;
}

.btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-1 {
    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-2 {
    background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
    box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.btn-hover.color-3 {
    background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7);
    box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.btn-hover.color-4 {
    background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
    box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
}
.btn-hover.color-5 {
    background-image: linear-gradient(to right, #0ba360, #3cba92, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.btn-hover.color-6 {
    background-image: linear-gradient(to right, #009245, #FCEE21, #00A8C5, #D9E021);
    box-shadow: 0 4px 15px 0 rgba(83, 176, 57, 0.75);
}
.btn-hover.color-7 {
    background-image: linear-gradient(to right, #6253e1, #852D91, #A3A1FF, #F24645);
    box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
}
.btn-hover.color-8 {
    background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}
.btn-hover.color-9 {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.btn-hover.color-10 {
        background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a , #FBB03B);
    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
.btn-hover.color-11 {
       background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
}
</style>
