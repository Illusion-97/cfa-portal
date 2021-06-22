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
      </b-card-header>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Enonce :</span>
        <span class="col-md-4">{{ examen.enonce }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Formation :</span>
        <span class="col-md-4">
            <span class="font-weight-bold">{{ examen.formationDto.titre }}</span>
            <br>
            {{ examen.formationDto.contenu }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Cursus :</span>
        <span class="col-md-4"
          >{{ examen.cursusDto.titre }}</span
        >
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
export default {
  name: "ExamenDetail",
  components: {},
  data() {
    return {
      examenId: this.$route.params.id,
      examen: {},
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    examenApi.getById(this.$route.params.id).then(response => this.examen = response);
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css">
</style>
