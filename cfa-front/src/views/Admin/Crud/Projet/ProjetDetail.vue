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
        <span class="font-weight-bold">Projet : {{ projet.nom }}</span>
        <router-link
          class="btn btn-info"
          :to="{ name: 'admin_projet_update', params: { id: projetId } }"
          >Update</router-link
        >
      </b-card-header>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Description :</span>
        <span class="">{{ projet.description }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Groupe :</span>
        <span class="">{{ projet.groupeDto.nom }}</span>
      </b-card-text>
      <table
        class="table table-bordered table-striped table-hover offset-1 col-10">
        <thead class="thead-dark">
          <tr>
            <th>Prenom Nom</th>
            <th>Email</th>
            <th>Promotions</th>
          </tr>
        </thead>
        <tbody v-if="etudiantsComputed">
          <tr v-for="etudiant in etudiantsComputed" :key="etudiant.id">
            <td>{{ etudiant.prenom }} {{ etudiant.nom }}</td>
            <td>{{ etudiant.login }}</td>
            <td>
              <p
                v-for="promotion in etudiant.promotionsDto"
                :key="promotion.id"
              >
                {{ promotion.nom }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script>
import { projetApi } from "@/_api/projet.api.js";
import { groupeApi } from "@/_api/groupe.api.js";
export default {
  name: "ProjetDetail",
  components: {},
  data() {
    return {
      projetId: this.$route.params.id,
      projet: {},
      loading: false,

      etudiants: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    refreshList() {
      groupeApi
        .getEtudiants(this.projetId)
        .then((response) => (this.etudiants = response));
    },
  },
  created() {
    projetApi
      .getById(this.projetId)
      .then((response) => (this.projet = response));

    this.refreshList();
  },
  computed: {
    etudiantsComputed() {
      return this.etudiants;
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css"></style>
