<template>
  <div>
    <!-- <h1>Detail Intervention</h1> -->
    <span @click="goBack" class="h5 icon-link d-block">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
    <div class="alert alert-info" role="alert" :class="showAlert">
      Suppression OK
    </div>
    <div class="card mt-3">
      <div class="card-header">
        <div class="float-right dropstart">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'ellipsis-v']"
              class="icon text-dark"
            />
          </a>
          <div class="dropdown-menu">
            <router-link
              :to="{
                name: 'modifier-intervention',
                params: { id: interventionId },
              }"
              class="icon-link dropdown-item"
            >
              <!-- <font-awesome-icon :icon="['far', 'edit']" class="icon" /> -->
              Modifier
            </router-link>
            <span
              v-on:click="deleteIntervention(interventionId)"
              class="icon-link dropdown-item"
            >
              <!-- <font-awesome-icon :icon="['far', 'edit']" class="icon" /> -->
              Supprimer
            </span>
          </div>
        </div>
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
        formationDto: {},
      },
      loading: false,
      status,
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
        this.status = data.status;
        this.items = data.data;
        // this.items.formationDto = data.formationDto;
      });
    },
    deleteIntervention(id) {
      interventionApi.deleteIntervention(id).then((response) => {
        this.status = response.status;
        if (this.status == 202) {
          this.$router.push({ name: "all-intervention" });
          this.showAlert
        }
      });
    },
  },
  computed: {
    showAlert(){
      if(this.status == 202)
        return 'd-block';
      return 'd-none'
    }
  },
};
</script>

<style scoped>
.icon-link {
  cursor: pointer;
  color: black;
  text-decoration: none;
  /* margin-bottom: 2em; */
}

.icon {
  cursor: pointer;
}
</style>
