<template>
  <div>
    <h1>Detail Intervention</h1>
    <router-link :to="{ name: 'all-intervention' }" class="h5" style="cursor:pointer; color:black;text-decoration:none;">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
    <!-- <p class="h2">{{ items.formationDto.titre }}</p> -->
    <!-- {{ items }} -->
    <!-- <b-card :header="items.formationDto.titre" header-tag="h1">
      <div class="d-flex justify-content-center">
        <b-card-text class="me-2">
          Date debut : {{ items.dateDebut | formatDate }}
        </b-card-text>
        <b-card-text>
          Date fin : {{ items.dateFin | formatDate }}
          </b-card-text>
      </div>
      <b-card-text>Contenu : {{items.formationDto.contenu}}</b-card-text>
      <div v-for="promo in items.promotionDto" :key="promo.id">
        <b-card-text>{{promo.nom}}</b-card-text>
      </div>
    </b-card> -->
    <b-card class="mt-3 col" header="Default form result">
      <pre class="m-0">{{ items }}</pre>
    </b-card>
  </div>
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";
export default {
  name: "DetailIntervention",
  data() {
    return {
      interventionId: this.$route.params.id,
      items: [],
      loading: false,
    };
  },
  created() {
    this.getId();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getId() {
      interventionApi
        .getInterventionById(this.interventionId)
        .then((data) => (this.items = data));
    },
  },
  computed: {},
};
</script>

<style scoped></style>
