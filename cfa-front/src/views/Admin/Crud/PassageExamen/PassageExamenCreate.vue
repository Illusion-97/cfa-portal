<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <ExamenListComponent
        v-on:click-list="onClickChildExamenList"
        :examenProp="examen_input"
      />

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="mon-label">Date de début</label>
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
          <div class="mon-label">Date de fin</div>
          <div class="mon-input">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>      

      <InterventionListComponent
        v-on:click-list="onClickChildInterventionList"
        :interventionProp="intervention_input"
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
import ExamenListComponent from "@/components/List/ExamenListComponent.vue";
import InterventionListComponent from "@/components/List/InterventionListComponent.vue";
import { passageExamenApi } from "@/_api/passageExamen.api.js";

export default {
  name: "PassageExamenCreate",
  components: {
    BodyTitle,
    ExamenListComponent,
    InterventionListComponent,
  },
  data() {
    return {
      vue_title: "Création d'un nouveau Passage d'examen",
      btn_form_text: "Ajouter",

      form: {
        dateDebut: "",
        dateFin: "",
        interventionDto: {},
        examenDto: {},
      },

      intervention: null,
      examen: null,
    };
  },
  computed: {
    examen_input() {
      return this.examen;
    },
    intervention_input() {
      return this.intervention;
    },
  },
  methods: {
    onClickChildExamenList(examen) {
      this.form.examenDto = examen;
    },
    onClickChildInterventionList(intervention) {
      this.form.interventionDto = intervention;
    },
    submit(e) {
      e.preventDefault();
      passageExamenApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_passage-examen_list" }));
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      passageExamenApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un Passage d'examen";
        this.btn_form_text = "Update";
        this.intervention = response.interventionDto;
        this.examen = response.examenDto;
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
