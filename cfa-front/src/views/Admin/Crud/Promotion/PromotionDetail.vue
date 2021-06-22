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

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Date de début :</span>
          <span class="col-md-4">{{ promotion.dateDebut }}</span>
          <span class="font-weight-bold col-md-2">Date de fin : </span>
          <span class="col-md-4">{{ promotion.dateFin }}</span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-4">{{ promotion.nom }}</span>
        </b-card-text>

    </b-card>

  </div>
</template>

<script>
import { promotionAPi } from "@/_api/promotion.api.js";
export default {
  name: "PromoDetail",
  components: {
  },
  data() {
    return {
      promotionId: this.$route.params.id,
      promotion: {},
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    promotionAPi.getPromotionByid(this.$route.params.id).then(response => this.user = response);
  },
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
