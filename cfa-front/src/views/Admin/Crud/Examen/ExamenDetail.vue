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

    <b-card no-body id="my-card">
      <b-card-header>
        <span class="">Detail</span>
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateExamen()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteExamen()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Enonce :</span>
        <span class="col-md-4">{{ examen.enonce }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Formation :</span>
        <span class="col-md-4">
            <span class="font-weight-bold">{{ examen.formationDto.titre }}</span>
            <br>
            {{ examen.formationDto.contenu }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Cursus :</span>
        <span class="col-md-4"
          >{{ examen.cursusDto.titre }}</span
        >
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
export default {
  name: "ExamenDetail",
  components: {},
  data() {
    return {
      examenId: this.$route.params.id,
      examen: {formationDto:{},cursusDto:{}},
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateExamen() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_examen_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_examen_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_examen_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_examen_update",
        });
      }
    },
    deleteExamen() {
      examenApi.deleteExamen(this.$route.params.id).then(() => this.goBack());
    },
  },
  created() {
    examenApi.getById(this.$route.params.id).then(response => this.examen = response);
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css">
</style>
