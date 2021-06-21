<template>
    <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_passageExamen_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
    
    <b-card no-body id="my-card">
      <b-card-header>
        <span class="">Detail</span>
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
      passageExamen: {},
      loading: false,
    };
  },
  created() {
    passageExamenApi.getById(this.$route.params.id).then(response => this.passageExamen = response);
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css">
</style>