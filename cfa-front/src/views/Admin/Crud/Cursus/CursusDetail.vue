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
        <span class="">Details</span>
        <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateCursus()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteCursus()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
      </b-card-header>

      <b-card-text class="identity row ml-6">
        <span class="font-weight-bold col-md-2">Titre : </span>
        <span class="">{{ cursus.titre }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-6">
        <span class="font-weight-bold col-md-4 mb-2">Promotions associées :</span>
        <table class="table table-striped table-hover text-center ml-5 mr-5">
          <thead>
            <tr>
              <th>Nom de la promo</th>
              <th>Date de debut</th>
              <th>Date de fin</th>
            </tr>
          </thead>
          <tbody v-if="promotionsComputed">
            <tr
              v-for="promotion in promotionsComputed"
              :key="promotion.id"
              class="mon-tr"
              v-on:click="detail(promotion.id)"
            >
              <td>{{ promotion.nom }}</td>
              <td>{{ promotion.dateDebut | formatDate }}</td>
              <td>{{ promotion.dateFin | formatDate }}</td>
            </tr>
          </tbody>
        </table>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { cursusApi } from "@/_api/cursus.api.js";
export default {
  name: "CursusDetail",
  components: {},
  data() {
    return {
      cursusId: this.$route.params.id,
      cursus: {},
      promotions: [],
      loading: false,
    };
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
  },
  created() {
    cursusApi
      .getById(this.$route.params.id)
      .then((response) => (this.cursus = response));
    cursusApi
      .getPromotionsById(this.$route.params.id)
      .then((response) => (this.promotions = response));
  },
  methods :{
    
    goBack() {
      this.$router.go(-1);
    },
    detail(id) {
      this.$router.push({ name: "admin_promotion_detail", params: { id: id } });
    },
    updateCursus() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_cursus_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_cursus_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_cursus_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_cursus_update",
        });
      }
    },
    deleteCursus() {
      cursusApi.deleteCursus(this.$route.params.id).then(() => this.goBack());
    },
  }
};
</script>

<style scoped>
#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
}

#my-card > .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 25px;
}

.card-text {
  display: flex;
  justify-content: space-between;
}

.card-text > span {
  display: inline-block;
  width: 40em;
  padding-left: 3em;
}
</style>
