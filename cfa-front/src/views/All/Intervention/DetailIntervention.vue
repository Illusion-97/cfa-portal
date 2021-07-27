<template>
  <div>
    <!-- <h1>Detail Intervention</h1> -->
    <span @click="goBack" class="h5 icon-link d-block" >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
    <div class="card mt-3">
      <div class="card-header">
        
        <router-link :to="{ name: 'modifier-intervention',params:{id:interventionId} }" class="h5 icon-link float-right"
          >
          <font-awesome-icon :icon="['far', 'edit']" class="icon" />
          Modifier
        </router-link>
        <h2>{{ items.formationDto.titre }}</h2>
      </div>
      <div class="card-body">
        <pre class="m-0">{{ items }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
  import { interventionApi } from "@/_api/intervention.api.js";
  export default {
    name: "DetailIntervention",
    data() {
      return {
        interventionId: this.$route.params.id,
        items: {
          formationDto: {}
        },
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
        interventionApi.getInterventionById(this.interventionId).then((data) => {
          this.items = data;
          this.items.formationDto = data.formationDto;
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