<template>
  <div class="container-fluid">
    <div class="header-list">
        <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Promotion</label>
        <input class="col-9 form-control" type="text" :value="promotion_input" disabled="disabled"/>
      </div>
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn btn-outline-secondary" type="submit">Recherche</button>
      </form>

      <router-link class="btn btn-primary" :to="{ name: 'admin_promotion_create' }"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Nom de la promo</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="promotionsComputed">
        <tr v-for="promotion in promotionsComputed" :key="promotion.id" class="mon-tr" v-on:dblclick="detail(promotion.id)" v-on:click="clickList(promotion)">
          <td>{{ promotion.nom }}</td>
          <td>{{ promotion.dateDebut }}</td>
          <td>{{ promotion.dateFin }}</td>
          <td>
            <button class="btn btn-danger" v-on:click="deletePromotion(promotion.id)">
              Delete
            </button>
          </td>
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
      :container-class="'pagination'"
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
import { promotionApi } from "@/_api/promotion.api.js";
export default {
  name: "PromotionListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    promotionProp: {
      default: null,
    }
  },
  watch: {
    promotionProp(){
      if (this.promotionProp != null) 
        this.promotion_input = `${this.promotionProp.nom}`;
    }
  },
  data() {
    return {
      promotions: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",

      promotion_input: "",
    
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
    deletePromotion(promotionId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
      promotionApi.deletePromotion(promotionId).then(() => this.refreshList());
      }
    },
    clickList(promotion) {
      this.promotion_input = promotion.nom;
      this.$emit('click-list',promotion);
    },
    detail(id) {
      if (this.isAction)
        this.$router.push({ name: "admin_promotion_detail", params: { id: id } });
    },

  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">
</style>

