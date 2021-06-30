<template>
  <div>
    <!-- <h1>Detail Intervention</h1> -->
    <span @click="goBack" class="h5 icon-link d-block" >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
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
    <!-- <b-card class="mt-3 col" header="Default form result">
      <pre class="m-0">{{ items }}</pre>
    </b-card> -->
    <div class="card mt-3">
      <div class="card-header">
        
        <router-link :to="{ name: 'modifier-formation',params:{id:formationId} }" class="h5 icon-link float-right">
          <font-awesome-icon :icon="['far', 'edit']" class="icon" />
          Modifier
        </router-link>
        <h2>{{ items.titre }}</h2>
      </div>
      <div class="card-body">
        <pre class="m-0">{{ items }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
  import { formationApi } from "@/_api/formation.api.js";
  export default {
    name: "DetailIntervention",
    data() {
      return {
        formationId: this.$route.params.id,
        items: {},
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
        formationApi
        .getFormationById(this.formationId)
        .then((data) => {
          this.items = data;
        });
      },
    },
    computed: {},
  };
</script>

<style scoped>
.icon-link {
  cursor: pointer;
  color:black;
  text-decoration:none;
  /* margin-bottom: 2em; */
}
.icon {cursor: pointer;}
</style>