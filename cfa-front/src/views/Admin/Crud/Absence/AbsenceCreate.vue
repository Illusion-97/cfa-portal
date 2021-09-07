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
      <b-form-group>
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

     <b-form-group>
        <b-form-row class="text-align-left">
          <label >Date de début</label>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
              required
            ></b-form-datepicker>
          </div>
            </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label >Date de fin</label>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label>Motif</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.justificatif">
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

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
import { absencesApi } from "@/_api/absence.api.js";
import { etudiantApi } from "@/_api/etudiant.api.js";

export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
  },
  created() {
    if (this.$route.name == "admin_absence_create" || this.$route.name == "referent_absence_create") {
      etudiantApi.getById(this.$route.params.id).then((response) => {
        this.form.etudiantDto = response;
        this.etudiant_input = `${this.form.etudiantDto.prenom} ${this.form.etudiantDto.nom}`;
      });
    } else {
      absencesApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un absence";
        this.btn_form_text = "Update";
        this.etudiant_input = `${this.form.etudiantDto.prenom} ${this.form.etudiantDto.nom}`;
      });
    }
  },
  data() {
    return {
      vue_title: "Création d'une nouvelle absence",
      btn_form_text: "Ajouter",

      form: {
        dateDebut: "",
        dateFin: "",
        justificatif: "",
        etudiantDto: "",
      },

      etudiant_input: "",

      onglet: 0,
    };
  },
  computed: {
  },
  methods: {
    submit(e) {
      e.preventDefault();

      absencesApi.save(this.form).then(() => this.goBack());
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
