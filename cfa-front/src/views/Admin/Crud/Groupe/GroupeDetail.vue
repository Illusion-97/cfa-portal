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
        <div>
          <span class="mon-label">Groupe : </span>
          <span class="group-nom">{{ groupe.nom }}</span>
        </div>

        <router-link
          class="btn btn-info"
          :to="{ name: 'admin_groupe_update', params: { id: groupeId } }"
          >Update</router-link
        >
      </b-card-header>

      <div class="offset-1 col-10">
        <p class="mon-label ">Etudiants :</p>
        <table class="table">
          <thead class="">
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
                <div
                  v-for="promotion in etudiant.promotionsDto"
                  :key="promotion.id"
                >
                  {{ promotion.nom }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import { groupeApi } from "@/_api/groupe.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "GroupeDetail",
  components: {},
  data() {
    return {
      groupeId: this.$route.params.id,
      groupe: { nom: "" },
      loading: false,

      etudiants: [{ nom: "", promotionsDto: [{ nom: "" }] }],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    refreshList() {
      groupeApi
        .getEtudiants(this.groupeId)
        .then((response) => (this.etudiants = response));
    },
  },
  created() {
    groupeApi
      .getById(this.groupeId)
      .then((response) => (this.groupe = response));

    this.refreshList();
  },
  computed: {
    etudiantsComputed() {
      return this.etudiants;
    },
  },
};
</script>

<style scoped></style>
