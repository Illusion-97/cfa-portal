<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label id="label">Note</label>
          <div id="input">
            <b-form-input type="number" v-model="form.noteObtenu"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label id="label">Observations</label>
          <div id="input">
            <b-form-input type="text" v-model="form.observations"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <EtudiantListComponent
        v-on:click-list="onClickChildEtudiantList"
        :etudiantProp="etudiant_input"
      />

      <PassageExamenListComponent
        v-on:click-list="onClickChildPassageExamenList"
        :passageExamenProp="passageExamen_input"
      />

      <DevoirListComponent
        v-on:click-list="onClickChildDevoirList"
        :devoirProp="devoir_input"
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
import EtudiantListComponent from "@/components/List/EtudiantListComponent.vue";
import PassageExamenListComponent from "@/components/List/PassageExamenListComponent.vue";
import DevoirListComponent from "@/components/List/DevoirListComponent.vue";
import { noteApi } from "@/_api/note.api.js";

export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
    EtudiantListComponent,
    PassageExamenListComponent,
    DevoirListComponent,
  },
  data() {
    return {
      vue_title: "Création d'une nouvelle note",
      btn_form_text: "Ajouter",

      form: {
        noteObtenu: null,
        observations: "",
        etudiantDto: {},
        examenDto: {},
        devoirDto: {},
      },

      etudiant: null,
      passageExamen: null,
      devoir: null,
    };
  },
  computed: {
    etudiant_input() {
      return this.etudiant;
    },
    passageExamen_input() {
      return this.passageExamen;
    },
    devoir_input() {
      return this.devoir;
    },
  },
  methods: {
    onClickChildEtudiantList(etudiant) {
      this.form.etudiantDto = etudiant;
    },
    onClickChildPassageExamenList(passageExamen) {
      this.form.examenDto = passageExamen;
    },
    onClickChildDevoirList(devoir) {
      this.form.devoirDto = devoir;
    },
    submit(e) {
      e.preventDefault();
      noteApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_note_list" }));
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      noteApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un note";
        this.btn_form_text = "Update";
        this.etudiant = response.etudiantDto;
        this.passageExamen = response.examenDto;
        this.devoir = response.devoirDto;
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
  
  #saisie {
    width: 70%;
    margin-right: 5%;
  }
  
  .mon-btn{
    width: 80%;
  }
  
#form-group{
  margin-left: 1.8em;
}

#label{
  width: 10em;
  padding-left: 0.2em;;
}

#input{
  width: 37.2%
}
</style>
