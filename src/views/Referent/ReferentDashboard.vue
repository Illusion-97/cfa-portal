<template>
  <div class="container-fluid">
   
    <BodyTitle title="Liste des promotions" />

    
    <div class="header-list">
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          placeholder="Rechercher"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

    </div>
        <small class="form-text info-text ml-1 mt-4">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
        Double-cliquez sur une promotion pour plus d'info
    </small>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Nom de la promo</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <!-- <th>Action</th> -->
        </tr>
      </thead>
      <tbody v-if="promotionsComputed">
        <tr v-for="promotion in promotionsComputed" :key="promotion.id" @dblclick="promotionDetail(promotion.id)" style="cursor:pointer;">
          <!-- <td>{{ promotion.id }} </td> -->
          <td>{{ promotion.nom }}</td>
          <td>{{ promotion.dateDebut | formatDate}}</td>
          <td>{{ promotion.dateFin | formatDate}}</td>
          <!-- <td>
            <router-link class="btn btn-info" :to="{name:'referent_promotion_detail', params: { id: promotion.id }}">Détails</router-link>
            &nbsp;
          </td> -->
        </tr>
      </tbody>
    </table>
    
    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination float-right'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
      >
    </paginate>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "PromotionList",
  components: {
    BodyTitle,
  },
  data() {
    return {
      promotions: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",
    
    };
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },

  methods: {

    submit(e) {
      e.preventDefault();
      promotionApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.promotions = response));
      promotionApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      promotionApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.promotions = response));
    },
    refreshList() {
      promotionApi
        .getAllPromotions(0, this.perPage)
        .then((response) => (this.promotions = response));
      promotionApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    promotionDetail(id){
      this.$router.push({name:'referent_promotion_detail', params: { id: id }})
    },
    deletePromotion(promotionId) {
      promotionApi.deletePromotion(promotionId).then(() => this.refreshList());
    },

  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>

<style scoped >
/* .header-list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form{
  width: 40%;
}

#saisie{
  width: 70%;
  margin-right: 5%;
} */
</style>

