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
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateGroupe()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteGroupe()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
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
   updateGroupe() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_groupe_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_groupe_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_groupe_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_groupe_update",
        });
      }
    },
    deleteGroupe() {
      groupeApi.deleteGroupe(this.$route.params.id).then(() => this.goBack());
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
