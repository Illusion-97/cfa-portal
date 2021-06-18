<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_promotion_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Details</span>
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-3">Date de début :</span>
          <span class="col-md-6">{{ promotion.dateDebut }}</span>
          <span class="font-weight-bold col-md-6">Date de fin : </span>
          <span class="col-md-6">{{ promotion.dateFin }}</span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-6">{{ promotion.nom }}</span>
        </b-card-text>

    </b-card>

  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
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
  created() {
    promotionApi.getPromotionByid(this.$route.params.id).then(response => this.promotion = response);
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
