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
    detail(id) {
      this.$router.push({ name: "admin_promotion_detail", params: { id: id } });
    },
    goBack() {
      this.$router.go(-1);
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
