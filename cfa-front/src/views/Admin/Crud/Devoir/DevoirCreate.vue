<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label class="mon-label">Enonce</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.enonce"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

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
import InterventionListComponent from "@/components/List/InterventionListComponent.vue";
import { devoirApi } from "@/_api/devoir.api.js";

export default {
  name: "DevoirCreate",
  components: {
    BodyTitle,
    InterventionListComponent,
  },
  data() {
    return {
      vue_title: "Création d'un nouveau devoir",
      btn_form_text: "Ajouter",

      form: {
        enonce: "",
        dateDebut: "",
        dateFin: "",
        interventionDto: {},
      },

      intervention: null,
    };
  },
  computed: {
    intervention_input() {
      return this.intervention;
    },
  },
  methods: {
    onClickChildInterventionList(intervention) {
      this.form.interventionDto = intervention;
    },
    submit(e) {
      e.preventDefault();
      devoirApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_devoir_list" }));
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      devoirApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un devoir";
        this.btn_form_text = "Update";
        this.intervention = response.interventionDto;
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

.mon-label{
margin-left: 2.2em;
width: 9.7em;
}

.mon-input{
  width: 32em;
}
</style>
