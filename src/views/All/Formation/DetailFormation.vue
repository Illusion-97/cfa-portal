<template>
  <div class="container-fluid">
    <a @click="goBack()" class="h5" style="cursor:pointer; color:black;text-decoration:none;">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
      Précédent
    </a>
    <BodyTitle :title="titre" />
    <div>
      <p class="font-weight-bold" style="font-size: 20px; word-break: break-all">Interventions Liées</p>
    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Date Début </th>
          <th>Date Fin </th>
          <th width="13%">Action</th>
        </tr>
      </thead>
      <tbody v-if="interventions">
        <tr v-for="(item) in interventions" :key="item.id" class="mon-tr">
          <td>{{ item.dateDebut }}</td>
          <td>{{ item.dateFin }}</td>
          <td>
            <b-button block variant="info" @click="gotoDetailIntervention(item.id)">
              <span tooltip="Détail de l'intervention" flow="down">
                <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" /> voir
              </span>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <p class="font-weight-bold" style="font-size: 20px; word-break: break-all">Cursus associés</p>
    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Durée</th>
          <th>Niveau</th>
          <th>Sigle</th>
          <th>Millesime</th>
          <th>Code Titre </th>
          <th width="13%">Action</th>
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
            <b-button block variant="info" @click="gotoDetailCursus(item.id)">
              <span tooltip="Détail du cursus" flow="down">
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
import BodyTitle from "@/components/utils/BodyTitle.vue";
import {formationApi} from "@/_api/formation.api.js";

export default {
  name: "DetailFormation",
  components: {
    BodyTitle,
  },
  data() {
    return {
      formationId: this.$route.params.id,
      titre: "",
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
        .then((data) => (this.cursus = data.cursus, this.titre = data.titre, console.log(this.titre)));
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
