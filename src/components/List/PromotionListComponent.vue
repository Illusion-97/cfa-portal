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

    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="color"
      @dismissed="dismissCountDown = 0"
    >
      {{ message }}
    </b-alert>
    <div class="d-flex justify-content-center">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="red darken-1"
      ></v-progress-circular>
    </div>

    <div class="updateListPromotion">
      <div class="d-flex flex-row align-items-end justify-content-between">
        <form class="form-inline form" @submit="submit">
          <input
            id="saisie"
            name="saisie"
            placeholder="Rechercher"
            type="text"
            class="form-control"
            v-model="saisie"
          />
          <!--<search-bar-component @search="searchSortList"/>-->
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>
        <div class="updateListLocation p-2">
          <button
            name="button2"
            outlined
            @click="openLoginWdg2"
            class="btn btn-outline-info"
          >
            Mise à jour des promotions
          </button>
          <div class="login-wdg2">
            <login-wdg-2
                v-if="showLoginWdg2Card"
                @logInUser="logInUserWdg2"
                @wdg2Close="wdg2Close"
            />
          </div>

        </div>
      </div>

      <!-- <router-link
        class="btn btn-primary"
        :to="{ name: 'admin_promotion_create' }"
        v-if="isAction"
        >Ajouter une promotion</router-link
      > -->
    </div>
    <!-- <small class="form-text info-text ml-1 mt-4">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
      Double-cliquez sur une promotion pour plus d'info
    </small> -->
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Nom de la promo</th>
          <th>Type</th>
          <th>Date de debut</th>
          <th>Date de fin <button @click="sortBy('dateDebut')"> tri </button></th>
          <th>Nombre de Participants
            <button @click="sortAsc">
              <span v-if="opened">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" />
              </span>
              <span v-else>
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />
              </span>
            </button>
          </th>
          <th>Centre dawan</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="promotionsComputed">
        <tr
          v-for="(promotion) in promotionsComputed"
          :key="promotion.id"
          class="mon-tr">

          <td>{{ promotion.title }}</td>
          <td>{{promotion.type}}</td>
          <td>{{ promotion.dateDebut | formatDate }}</td>
          <td>{{ promotion.dateFin | formatDate }}</td>
          <td>{{promotion.nbParticipants}}</td>
          <td>{{ promotion.centreFormationDto.nom }}</td>
          <td>
              <b-button
                block
                variant="info"
                @click="gotoDetailPromotion(promotion)"
              >
                <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" /> voir
              </b-button>
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
import { etudiantApi } from '@/_api/etudiant.api.js';
import { interventionApi } from '@/_api/intervention.api.js';
import LoginWdg2 from "@/components/LoginWdg2.vue";
export default {
  name: "PromotionListComponent",
  components: {
    LoginWdg2
  },
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    promotionProp: {
      type: Object,
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
      dismissCountDown: null,
      opened: false,
      message: "",
      title:"",
      color: "success",
      promotions: [],
      currentPage: 0,
      perPage: 10,
      pageCount: 0,
      saisie: "",
      promotion_input: "",
      showLoginWdg2Card: false,
      showLoginWdg2CardInterventionByPromo: false,
      loading: false,
    };
  },
  computed: {
    promotionsComputed() {
      const uniquePromotions = [];

      this.promotions.forEach((promotion) => {
        const modifiedNom = promotion.nom.split("-");
        modifiedNom.splice(-4)
        if (modifiedNom.includes("titre") && modifiedNom.includes("professionnel")) {
          // Supprimer les mots du tableau
          const indexTitre = modifiedNom.indexOf("professionnel");
          const indexProfessionnel = modifiedNom.indexOf("titre");
          modifiedNom.splice(indexTitre, 1);
          modifiedNom.splice(indexProfessionnel, 1);
        }

        this.title = modifiedNom.join(" ")
        const promotionWithModifiedTitle = {
          ...promotion,
          title: this.title,
        };

        // Vérifier si la promotion existe déjà dans le tableau uniquePromotions
        const existingPromotion = uniquePromotions.find(
            (p) => p.id === promotionWithModifiedTitle.id
        );

        if (!existingPromotion) {
          // La promotion n'existe pas encore, l'ajouter à uniquePromotions
          uniquePromotions.push(promotionWithModifiedTitle);
        }
      });

      return uniquePromotions;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.saisie = this.$route.params.ville;
    if (this.$route.params.ville)
      this.submit();
    else
      this.refreshList();
  },

  methods: {
    submit(e) {
      if (e) 
        e.preventDefault();
         promotionApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
      promotionApi
        .getAllByPage(this.currentPage, this.perPage, this.saisie)
        .then((response) => (this.promotions = response))
    },
    pageChange(pageNum) {
      promotionApi
        .getAllByPageSort(pageNum - 1, this.perPage, 1)
        .then((response) => (this.promotions = response));
    },
    refreshList() {
         promotionApi
        .getCount()
        .then(
          (response) => {this.pageCount = Math.ceil(response / this.perPage)

        promotionApi
        .getAllByPage(this.currentPage, this.perPage)
        .then((response) => {this.promotions = response;
        })
          })
    },
    sortAsc() {
      this.opened = !this.opened;
      },
    deletePromotion(promotionId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
        promotionApi
          .deletePromotion(promotionId)
          .then(() => this.refreshList());
      }
    },

    gotoDetailPromotion(promo) {
      this.$router.push({
        name: "admin_promotion_details",
        params: { id: promo.id },
      });
    },
    openLoginWdg2EtudiantBypromo(promotion,index) {
      let card = document.getElementById('ShowLoginCardEtudiant-'+index)
      card.hidden = !card.hidden
    },
    wdg2CloseEtudiantByPromo(index){
      document.getElementById('ShowLoginCardEtudiant-'+index).hidden = true
    },
    async importInterventionByPromo(value){

      this.showLoginWdg2CardInterventionByPromo = false;
      this.loading = true;

      let promoId = this.promotion.idDg2;

      interventionApi
        .fetchInterventionsDG2ByIdPromotion(value, promoId)
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
           this.refreshList();
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });

    },

    async importEtudiantPromo(value){

      this.showLoginWdg2CardEtudiantByPromo = false;
      this.loading = true;
      //let promoId = promotion.id
      let promoId = this.promotion.idDg2;

      etudiantApi
        .fetchAllEtudiantDG2HttpByIdPromotion(value, promoId)
        .then((response) => {
          console.log(response)
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
           this.refreshList();
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });

    },
    // open the card to let the user login to webservice DG2
    openLoginWdg2() {
      this.showLoginWdg2Card = true;
    },
    // fetch courses from webservice DG2
    async logInUserWdg2(value) {
      this.showLoginWdg2Card = false;
      this.loading = true;
      promotionApi
        .fetchAllPromotionDG2Http({ logInUser: value })
        .then((response) => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = response.data;
          this.loading = false;
           this.refreshList();
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
          this.loading = false;
        });
     
    },
    // close the card for the login to webservice DG2
    wdg2Close(value) {
      this.showLoginWdg2Card = value;
    }
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
