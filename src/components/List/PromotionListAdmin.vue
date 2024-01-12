<template>
    <!-- <div> -->
      <div class="container-fluid">
  
        <div class="header-list mr-4 mt-4 ml-4 mb-0">
          <!-- BARRE DE RECHERCHE -->
          <form class="form-inline" @submit="submit">
            <input
              id="saisie"
              name="saisie"
              placeholder="Rechercher"
              type="text"
              class="form-control"
              v-model="saisie"
            />
            <button class="btn-submit" type="submit">
              <font-awesome-icon :icon="['fas', 'search']" class="icon" />
            </button>
          </form>
        </div><br/>
  
        <!-- LIST DES PROMOTIONS -->
        <div class="row d-flex justify-content-arround p-2 scrol">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Ville</th>
                <th scope="col">Titre</th>
                <th scope="col">Date de début</th>
                <th scope="col">Durée</th>
                <th scope="col">Date de fin</th>
                <th scope="col">Détails</th>
              </tr>
            </thead>
            <tbody v-if="promotions">
              <tr v-for="(promotion) in promotions" :key="promotion.id">
                <th scope="row">{{ promotion.centreFormationAdresseVille != null ? promotion.centreFormationAdresseVille : "Pas de ville" }}</th>
                <td>{{ promotion.nom }}</td>
                <td>{{ promotion.dateDebut | formatDate }}</td>
                <td>{{ getMoths(promotion) }}M</td>
                <td>{{ promotion.dateFin | formatDate }}</td>
                <td>
                  <button @click="click(promotion)" class="btn btn-info pr-3">
                    <font-awesome-icon class="mr-1 ml-1" :icon="['fas', 'eye']" /> 
                    Voir 
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <paginate
          class="customPagination"
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
  import {promotionApi} from "@/_api/promotion.api.js";
  
  export default {
    name: "PromotionListComponent",
    components: {
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
        perPage: 7,
        pageCount: 0,
        nb: 0,
        saisie: "",
        promotion_input: "",
        currentPage: 0,
        stopScrol: false,
        loading: false,
      };
    },
    created() {
      this.refreshList();
    },
    methods: {
      // OTHER
      getMoths(promotion) {
        return this.getPeriod(promotion) * 12;
      },
      //A voir pour supprimer
      getPeriod(promotion) {
        let debut = new Date(promotion.dateDebut);
        let fin = new Date(promotion.dateFin);
        return new Number(
          (fin.getTime() - debut.getTime()) / 31536000000
        ).toFixed(0);
      },
      submit(e) {
        e.preventDefault();
        this.refreshList();
      },
      // PROMOTION  recuperer toutes les promo 
      getList() {
        promotionApi
          .getCount(this.saisie)
          .then((response) => {  this.pageCount = Math.ceil(response.nb / this.perPage)}),
        
        promotionApi
          .getAllByPage(this.currentPage, this.perPage, this.choix, this.saisie)
          .then((response) => { this.promotions = response})
      },
      pageChange(currentPage) {
        promotionApi
          .getAllByPage(currentPage - 1, this.perPage, this.choix, "")
          .then((response) => { this.promotions = response });
      },
      clickList(promotion) {
        this.promotion_input = promotion.nom;
        this.$emit("click-list", promotion);
      },
      click(promotion) {
          this.$router.push({
            name: "admin_promotion_detail_order_passage",
            params: { id: promotion.id },
          });
      },
      refreshList() {
      promotionApi
        .getCount()
        .then(
          (response) => {
            this.pageCount = Math.ceil(response / this.perPage)

            promotionApi
              .getAllByPage(this.currentPage, this.perPage, this.choix,"")
              .then((response) => {
                this.promotions = response;
              })
          })
    },
    },
  };
  </script>
  <style scoped src="@/assets/styles/CrudListComponent.css">
  </style>
  <style scoped>
  
  .card-Promotions {
    border-radius: 5px;
    min-height: 17rem;
  }
  .card-Promotions {
    border: 3px solid red;
    cursor: pointer;
  }
  </style>
  