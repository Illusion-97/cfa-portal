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
          <label class="col-1">Date de début</label>
          <div class="col-5 pr-5">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
              required
            ></b-form-datepicker>
          </div>
          <div class="col-1">Date de fin</div>
          <div class="col-5">
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
          <div class="col-1">Motif</div>
          <div class="col-5 pr-5">
            <b-form-input type="text" v-model="form.motif"> </b-form-input>
          </div>
          <label class="col-1">Type de congé</label>
          <div class="col-5">
            <b-form-select
              :options="types"
              v-model="form.type"
              required
            ></b-form-select>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Status du congé</label>
          <div class="col-5 pr-5">
            <b-form-select
              :options="status"
              v-model="form.status"
              required
            ></b-form-select>
          </div>
          <div class="col-1">Utilisateur</div>
          <div class="col-5">
            <b-form-input
              type="text"
              v-model="utilisateur_input"
              disabled="disabled"
            >
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
import { congeApi } from "@/_api/conge.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
  },
  created() {
    this.refreshList();

    if (this.$route.name == "admin_conge_create" || this.$route.name == "referent_conge_create" || this.$route.name == "cef_conge_create") {
      utilisateurApi.getById(this.$route.params.id).then(response => {
        this.form.utilisateurDto = response
        this.utilisateur_input = `${this.form.utilisateurDto.prenom} ${this.form.utilisateurDto.nom}`;
      });
    } else {
      congeApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Modifier un congé";
        this.utilisateur_input = `${response.utilisateurDto.prenom} ${response.utilisateurDto.nom}`;
        this.btn_form_text = "Update";
      });
    }
  },
  data() {
    return {
      vue_title: "Nouveau congé",
      btn_form_text: "Ajouter",

      form: {
        dateDebut: "",
        dateFin: "",
        motif: "",
        type: "",
        status: "",
        utilisateurDto: "",
      },
      utilisateur_input: "",

      types: [
        { text: "Maladie", value: "MALADIE" },
        { text: "Payé", value: "PAYE" },
        { text: "Sans solde", value: "SANS_SOLDE" },
      ],

      status: [
        { text: "Confirmé", value: "CONFIRME" },
        { text: "Refusé", value: "REFUSE" },
        { text: "En attente", value: "EN_ATTENTE" },
      ],

      utilisateurs: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",
    };
  },
  computed: {
    utilisateursComputed() {
      return this.utilisateurs;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    recherche(e) {
      e.preventDefault();

      utilisateurApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.utilisateurs = response));
      utilisateurApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    clickList(utilisateur) {
      this.form.utilisateurDto = utilisateur;
      this.utilisateur_input = `${utilisateur.prenom} ${utilisateur.nom}`;
    },
    submit(e) {
      e.preventDefault();

      congeApi.save(this.form).then(() => this.goBack());
    },
    pageChange(pageNum) {
      // console.log("pageNum : ", pageNum);
      utilisateurApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.utilisateurs = response));
    },
    refreshList() {
      utilisateurApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.utilisateurs = response));
      utilisateurApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudCreate.css"></style>
