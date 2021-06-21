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
            <b-form-input type="text" v-model="form.description"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

       <b-form-group>
        <b-form-row class="text-align-left">
          <div class="mon-label">Cahier des Charges</div>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.pjCahierDesCharges"> </b-form-input>
          </div>
        </b-form-row>
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

.mon-label{
margin-left: 2.2em;
width: 9.7em;
}

.mon-input{
  width: 32em;
}
</style>
