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
            <span v-on:click="updatePassageExamen()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deletePassageExamen()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Intervention :</span>
        <span class="col-md-4">
            <span class="font-weight-bold" >{{ passageExamen.interventionDto.formationDto.titre }}</span>
            <br>
            {{ passageExamen.interventionDto.formationDto.contenu }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Enonce :</span>
        <span class="col-md-4"
          >{{ passageExamen.examenDto.enonce }}</span
        >
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Date de Debut :</span>
        <span class="col-md-4">{{ passageExamen.dateDebut }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Date de Fin :</span>
        <span class="col-md-4">{{ passageExamen.dateFin }}</span>
      </b-card-text>

      
    </b-card>
  </div>
</template>

<script>
import { passageExamenApi } from "@/_api/passageExamen.api.js";
export default {
  name: "passageExamenDetail",
  components: {},
  data() {
    return {
      passageExamenId: this.$route.params.id,
      passageExamen: {interventionDto:{formationDto:{}}, examenDto:{}},
      loading: false,
    };
  },
  created() {
    passageExamenApi.getById(this.$route.params.id).then(response => this.passageExamen = response);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updatePassageExamen() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_passage-examen_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_passage-examen_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_passage-examen_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_passage-examen_update",
        });
      }
    },
    deletePassageExamen() {
      passageExamenApi.deletePassageExamen(this.$route.params.id).then(() => this.goBack());
    },
  }
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css">
</style>