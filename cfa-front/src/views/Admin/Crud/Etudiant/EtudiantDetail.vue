<template>
  <div class="container-fluid">
    <BodyTitle :title="title" />

    <div class="col-md-10">
      <div class="row mb-5">
        <div class="col-md-3">
          <b-card header="Formateur Référent">
            <div>
              <p>
                {{ etudiant.formateurReferentDto.prenom }}
                {{ etudiant.formateurReferentDto.nom }}
              </p>
              <p>{{ etudiant.formateurReferentDto.login }}</p>
            </div>
          </b-card>
        </div>
        <div class="col-md-3">
          <b-card header="Manager">
            <div>
              <p>
                {{ etudiant.managerDto.prenom }} {{ etudiant.managerDto.nom }}
              </p>
              <p>{{ etudiant.managerDto.login }}</p>
            </div>
          </b-card>
        </div>
      </div>
    </div>

    <div class="mon-container-tuile">
      <div class="ma-tuile">Promotions</div>
      <div class="ma-tuile">Groupes</div>
      <div class="ma-tuile">Notes</div>
      <div class="ma-tuile">Absences</div>
      <div class="ma-tuile">Congés</div>
    </div>

    <!-- Promotions -->
    <div class="">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Groupes -->
    <div class="">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Notes -->
    <div class="">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Absences -->
    <div class="">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Congés -->
    <div class="">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { etudiantApi } from "@/_api/etudiant.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "EtudiantDetail",
  components: {
    BodyTitle,
  },
  created() {
    etudiantApi
      .getById(this.$route.params.id)
      .then((response) => (this.etudiant = response));
  },
  data() {
    return {
      etudiant: {},
    };
  },
  computed: {
    title() {
      return "Etudiant : " + this.etudiant.prenom + " " + this.etudiant.nom;
    },
  },
  methods: {
    clickPromotion(promotion) {
      console.log(promotion);
    },
  },
};
</script>

<style scoped>
.mon-container-tuile {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
}

.ma-tuile {
  width: 10em;
  height: 5em;
  /*TODO un centrage plus "jolie"*/
  line-height: 4em;
  color: #6c757d;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border: 5px #6c757d solid;
  border-radius: 30px;
}

.ma-tuile:hover {
  background-color: #6c757d;
  color: white;
  cursor: pointer;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}
</style>
