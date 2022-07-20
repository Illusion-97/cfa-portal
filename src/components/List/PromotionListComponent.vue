<template>
  <div class="container-fluid">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Promotion</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="promotion_input"
          disabled="disabled"
        />
      </div>
      <div class="updateListPromotion">
      <button name="button2" outlined @click="openLoginWdg2" class="btn btn-info">
        Mise à jour des promotions 
      </button>
      <div class="login-wdg2">
        <login-wdg-2
          v-if="showLoginWdg2Card"
          @logInUser="logInUserWdg2"
          @wdg2Close="wdg2Close"
        />
      </div>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="red darken-1"
      ></v-progress-circular>
    <br>
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          placeholder="Rechercher"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <!-- <router-link
        class="btn btn-primary"
        :to="{ name: 'admin_promotion_create' }"
        v-if="isAction"
        >Ajouter une promotion</router-link
      > -->
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
          <th>Centre dawan</th>
          <!-- <th>Action</th>  -->
        </tr>
      </thead>
      <tbody v-if="promotionsComputed">
        <tr
          v-for="promotion in promotionsComputed"
          :key="promotion.id"
          class="mon-tr"
          v-on:click="clickList(promotion)"
          @dblclick="dblClick(promotion)">
          <td>{{ promotion.nom }}</td>
          <td>{{ promotion.dateDebut | formatDate }}</td>
          <td>{{ promotion.dateFin | formatDate }}</td>
          <td>{{ promotion.centreFormationDto.nom }}</td>
          <!-- <td>
            <button
              class="btn btn-danger"
              v-on:click="deletePromotion(promotion.id)"
            >
              Supprimer
            </button>
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
    </paginate>
  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
import LoginWdg2 from "../LoginWdg2.vue";
export default {
  name: "PromotionListComponent",
  components: {
    LoginWdg2,
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    promotionProp: {
      default: null,
    },
  },
  watch: {
    promotionProp() {
      if (this.promotionProp != null)
        this.promotion_input = `${this.promotionProp.nom}`;
    },
  },
  data() {
    return {
      promotions: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      promotion_input: "",
      showLoginWdg2Card: false,
      loading: false,
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
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
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
      if (res) {
        promotionApi
          .deletePromotion(promotionId)
          .then(() => this.refreshList());
      }
    },
    clickList(promotion) {
      this.promotion_input = promotion.nom;
      this.$emit("click-list", promotion);
    },
    dblClick(promotion){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_promotion_detail', params: { id: promotion.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_promotion_detail', params: { id: promotion.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_promotion_detail', params: { id: promotion.id }});
      else if(route[0]== 'cef') this.$router.push({name:'cef_promotion_detail', params: { id: promotion.id }});
      else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_promotion_detail', params: { id: promotion.id }});

    },
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
      this.$alert("Fonctionnalité en cours de production");
      this.wdg2Close();
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      promotionApi.fetchAllPromotionsDG2Http({ logInUser: value }); // methode à créer dans le service _api
      this.loading = false;
      //this.$.push({ name: "admin_promotion" });
    },
    // close the card for the login to webservice DG2
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
