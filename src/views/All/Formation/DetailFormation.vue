<template>
  <div class="container-fluid">
    <a @click="goBack()" class="h5" style="cursor:pointer; color:black;text-decoration:none;">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </a>

    <div>Interventions Liées</div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Date Début </th>
          <th>Date Fin </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="interventions">
        <tr v-for="(item) in interventions" :key="item.id" class="mon-tr">
          <td>{{ item.dateDebut }}</td>
          <td>{{ item.dateFin }}</td>
          <td>
              <b-button
                block
                variant="info"
                @click="gotoDetailIntervention(item.id)"
              >
              <span tooltip="Détails promotion" flow="down">
                <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" /> voir
              </span>
              </b-button>
           </td>
        </tr>
      </tbody>
    </table>

    <div>Cursus associés</div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Durée</th>
          <th>Niveau</th>
          <th>Sigle</th>
          <th>Millesime</th>
          <th>Code Titre </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="cursus">
        <tr v-for="(item) in cursus" :key="item.id" class="mon-tr">
          <td>{{ item.titre }}</td>
          <td>{{ item.duree }}</td>
          <td>{{ item.niveau }}</td>
          <td>{{ item.sigle }}</td>
          <td>{{ item.millesime }}</td>
          <td>{{ item.codeTitre }}</td>
          <td>
              <b-button
                block
                variant="info"
                @click="gotoDetailCursus(item.id)"
              >
              <span tooltip="Détails promotion" flow="down">
                <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" /> voir
              </span>
              </b-button>
           </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { formationApi } from "@/_api/formation.api.js";
export default {
  name: "DetailFormation",
  data() {
    return {
      formationId: this.$route.params.id,
      cursus: [],
      interventions: [],
    };
  },
  created() {
    this.getId();
    this.getInterventionsByFormationId();
  },
  methods: {
    getId() {
      formationApi
        .getFormationById(this.formationId)
        .then((data) => (this.cursus = data.cursus));
    },
    getInterventionsByFormationId() {
      formationApi
        .getInterventionsByFormationId(this.formationId)
        .then((data) => (this.interventions = data));
    },
    gotoDetailIntervention(intervention) {
      console.log(intervention)
      this.$router.push({
        name: "admin_intervention_detail",
        params: { id: intervention },
      });
    },
    gotoDetailCursus(cursus) {
      console.log(cursus)
      this.$router.push({
        name: "admin_cursus_detail",
        params: { id: cursus },
      });
    },
    goBack() {
      this.$router.push({ name: "admin_formation_list" });
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
