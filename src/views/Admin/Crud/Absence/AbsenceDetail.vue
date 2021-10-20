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
        <span class="">Detail d'absence</span>
        <!-- <button class="btn btn-info" v-on:click=updateAbsence>
              Update
            </button> -->
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span
              v-on:click="updateAbsence()"
              class="icon-link dropdown-item"
            >
              Modifier
            </span>
            <span
              v-on:click="deleteAbsence()"
              class="icon-link dropdown-item"
            >
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <b-card-text class="identity row ml-5">
        <div class="font-weight-bold col-2">Etudiant :</div>
        <div class="col-4">
          <div v-if="absence.etudiantDto">
            {{ absence.etudiantDto.utilisateurDto.prenom }} {{ absence.etudiantDto.utilisateurDto.nom }}
          </div>
        </div>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <div class="font-weight-bold col-2">Date de début :</div>
        <div class="col-4">{{ absence.dateDebut }}</div>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <div class="font-weight-bold col-2">Date de fin :</div>
        <div class="col-4">{{ absence.dateFin }}</div>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <div class="font-weight-bold col-2">Motif :</div>
        <div class="col-4">{{ absence.justificatif }}</div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { absencesApi } from "@/_api/absence.api.js";

export default {
  name: "absenceDetail",
  components: {},
  data() {
    return {
      absenceId: this.$route.params.id,
      absence: { etudiantDto: {} },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateAbsence() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_absence_update",
        });
      } else if (route[0] == "referent"){
        this.$router.push({
          name: "referent_absence_update",
        });
      }
      else if (route[0] == "formateur"){
        this.$router.push({
        name: "formateur_absence_update",
        
      });
      }
      else if (route[0] == "cef"){
        this.$router.push({
        name: "cef_absence_update",
      });
      }
    },
    deleteAbsence(){
      absencesApi.deleteAbsence(this.$route.params.id).then(() => this.goBack());
    }
  },
  created() {
    absencesApi
      .getById(this.$route.params.id)
      .then((response) => (this.absence = response));this.$router.push()
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css"></style>
