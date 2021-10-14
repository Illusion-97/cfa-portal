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
          <label>Etudiant</label>
          <div class="mon-input">
            <b-form-input
              type="text"
              v-model="etudiant_input"
              disabled="disabled"
            >
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label>Note</label>
          <div class="mon-input">
            <b-form-input type="number" v-model="form.noteObtenu">
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label>Observations</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.observations">
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <div class="mon-container-tuile">
        <div
          :class="{
            btn: true,
            'btn-primary': true,
            ma_tuile: false,
            activ: isExamen,
          }"
          @click="changementOnglet(1)"
        >
          Examen
        </div>
        <div
          :class="{
            btn: true,
            'btn-primary': true,
            ma_tuile: false,
            activ: isDevoir,
          }"
          @click="changementOnglet(2)"
        >
          Devoir
        </div>
      </div>

      <PassageExamenListComponent
        v-on:click-list="onClickChildPassageExamenList"
        :passageExamenProp="passageExamen_input"
        :class="{ collapse: !isExamen }"
      />

      <DevoirListComponent
        v-on:click-list="onClickChildDevoirList"
        :devoirProp="devoir_input"
        :class="{ collapse: !isDevoir }"
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
import PassageExamenListComponent from "@/components/List/PassageExamenListComponent.vue";
import DevoirListComponent from "@/components/List/DevoirListComponent.vue";
import { noteApi } from "@/_api/note.api.js";
import { etudiantApi } from "@/_api/etudiant.api.js";

export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
    PassageExamenListComponent,
    DevoirListComponent,
  },
  created() {
    if (this.$route.name == "admin_note_create" || this.$route.name == "referent_note_create" || this.$route.name == "cef_note_create") {
      etudiantApi.getById(this.$route.params.id).then((response) => {
        this.form.etudiantDto = response;
        this.etudiant_input = `${this.form.etudiantDto.prenom} ${this.form.etudiantDto.nom}`;
      });
    } else {
      noteApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'une note";
        this.btn_form_text = "Update";
        this.etudiant_input = `${this.form.etudiantDto.prenom} ${this.form.etudiantDto.nom}`;
      });
    }
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

      etudiant_input: "",

      onglet: 0,
    };
  },
  computed: {
    passageExamen_input() {
      return this.form.examenDto;
    },
    devoir_input() {
      return this.form.devoirDto;
    },
    isExamen() {
      if (this.onglet == 1) return true;
      else return false;
    },
    isDevoir() {
      if (this.onglet == 2) return true;
      else return false;
    },
  },
  methods: {
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    onClickChildPassageExamenList(passageExamen) {
      //La note correspond soit a un devoir, soit a un examen
      this.form.examenDto = passageExamen;
      this.form.devoirDto = {};
    },
    onClickChildDevoirList(devoir) {
      //La note correspond soit a un devoir, soit a un examen
      this.form.devoirDto = devoir;
      this.form.examenDto = { examenDto: {} };
    },
    submit(e) {
      e.preventDefault();

      //si on a pas de examenDto (on check avec une prop), on le met a null pour eviter les erreur 500
      if (!this.form.examenDto.dateDebut) {
        this.form.examenDto = null;
      }
      //si on a pas de devoirDto (on check avec une prop), on le met a null pour eviter les erreur 500
      if (!this.form.devoirDto.enonce) {
        this.form.devoirDto = null;
      }

      noteApi.save(this.form).then(() => this.goBack());
    },
    goBack() {
      this.$router.go(-1);
    },
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

.mon-btn {
  width: 80%;
}

#form-group {
  margin-left: 1.8em;
}

label {
  width: 10em;
  padding-left: 0.2em;
}

.mon-input {
  width: 37.2%;
}

.mon-container-tuile {
  margin-bottom: 2em;
  margin-top: 2em;
  margin-left: 1.5em;
}

.ma_tuile {
  width: 8em;
  margin-right: 1em;
}

.ma_tuile:hover {
  background-color: #6c757d;
  color: white;
  cursor: pointer;
}

.activ {
  background-color: #28a745;
}
</style>
