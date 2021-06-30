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
        <router-link
          class="btn btn-info"
          :to="{ name: 'admin_absence_update', params: { id: absenceId } }"
          >Update</router-link
        >
      </b-card-header>
      
      <b-card-text class="identity row ml-5">
        <div class="font-weight-bold col-2">Etudiant :</div>
        <div class="col-4">
          <div v-if="absence.etudiantDto">
            {{ absence.etudiantDto.prenom }} {{ absence.etudiantDto.nom }}
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
  },
  created() {
    absencesApi
      .getById(this.$route.params.id)
      .then((response) => (this.absence = response));
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css"></style>
