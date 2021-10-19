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
            <span v-on:click="updateDevoir()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteDevoir()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Intervention :</span>
        <span class="col-md-4">
            <span class="font-weight-bold" >{{ devoir.interventionDto.formationDto.titre }}</span>
            <br>
            {{ devoir.interventionDto.formationDto.contenu }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Enonce :</span>
        <span class="col-md-4"
          >{{ devoir.enonce }}</span
        >
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Date de Debut :</span>
        <span class="col-md-4">{{ devoir.dateDebut }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Date de Fin :</span>
        <span class="col-md-4">{{ devoir.dateFin }}</span>
      </b-card-text>

      
    </b-card>
  </div>
</template>

<script>
import { devoirApi } from "@/_api/devoir.api.js";
export default {
  name: "devoirDetail",
  components: {},
  data() {
    return {
      devoirId: this.$route.params.id,
      devoir: {interventionDto:{formationDto:{}}},
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateDevoir() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_devoir_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_devoir_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_devoir_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_devoir_update",
        });
      }
    },
    deleteDevoir() {
      devoirApi.deleteDevoir(this.$route.params.id).then(() => this.goBack());
    },
  },
  created() {
    devoirApi.getById(this.$route.params.id).then(response => this.devoir = response);
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css">
</style>