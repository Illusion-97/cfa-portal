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

    <div class="mon-titre">
      <BodyTitle :title="promotion.nom" class="mb-5" />
      <button class="btn btn-info mon-btn" v-on:click=updatePromo>
              Update
            </button>
    </div>

    <div class="row">
      <div class="col-md-3" align="center">
        <div class="identite">
          <p class="nom">{{ promotion.cursusDto.titre }}</p>
          <p>{{ promotion.dateDebut }} - {{ promotion.dateFin }}</p>
          <p>{{ ville }}</p>
        </div>
      </div>

      <div class="col-md-9">
        <div class="row mb-5">
          <div class="offset-3 col-md-4">
            <b-card header="Referent Pedagogique">
              <div>
                <p>
                  {{ promotion.referentPedagogiqueDto.prenom }}
                  {{ promotion.referentPedagogiqueDto.nom }}
                </p>
                <p>{{ promotion.referentPedagogiqueDto.login }}</p>
              </div>
            </b-card>
          </div>
          <div class="offset-1 col-md-4">
            <b-card header="Conseillé emploi formation">
              <div>
                <p>
                  {{ promotion.cefDto.prenom }}
                  {{ promotion.cefDto.nom }}
                </p>
                <p>{{ promotion.cefDto.login }}</p>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>

    <div class="mon-container-tuile">
      <div
        :class="{
          btn: true,
          'btn-primary': true,
          ma_tuile: true,
          activ: isEtudiant,
        }"
        @click="changementOnglet(1)"
      >
        Etudiants
      </div>
      <div
        :class="{
          btn: true,
          'btn-primary': true,
          ma_tuile: true,
          activ: isIntervention,
        }"
        @click="changementOnglet(2)"
      >
        Interventions
      </div>
    </div>

    <!-- Etudiants -->
    <div :class="{ ma_fenetre: true, collapse: !isEtudiant }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Groupes</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="etudiant in promotion.etudiantsDto"
            :key="etudiant.id"
            @dblclick="clickEtudiant(etudiant)"
            class="mon-tr"
          >
            <td>{{ etudiant.prenom }} {{ etudiant.nom }}</td>
            <td>{{ etudiant.login }}</td>
            <td>
              <div v-for="groupe in etudiant.groupesDto" :key="groupe.id">
                {{ groupe.nom }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Interventions -->
    <div :class="{ ma_fenetre: true, collapse: !isIntervention }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Formation</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="intervention in promotion.interventionsDto"
            :key="intervention.id"
            @dblclick="clickIntervention(intervention)"
            class="mon-tr"
          >
            <td>{{ intervention.formationDto.titre }}</td>
            <td>{{ intervention.dateDebut }}</td>
            <td>{{ intervention.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { promotionApi } from "@/_api/promotion.api.js";
import { centreFormationApi } from "@/_api/centreFormation.api.js";
export default {
  name: "PromoDetail",
  components: {
    BodyTitle,
  },
  data() {
    return {
      promotionId: this.$route.params.id,
      promotion: {
        cursusDto: {},
        referentPedagogiqueDto: {},
        cefDto: {},
        interventionsDto: [{ formationDto: {} }],
      },
      ville: "",

      onglet: 0,
      isModalVisible: false,
    };
  },
  computed: {
    isEtudiant() {
      if (this.onglet == 1) return true;
      else return false;
    },
    isIntervention() {
      if (this.onglet == 2) return true;
      else return false;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    clickEtudiant(etudiant) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_detail",
        params: { id: etudiant.id },
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_detail",
        params: { id: etudiant.id },
      });
      }
    },
    clickIntervention(intervention) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "intervention-detail",
        params: { id: intervention.id },
      });
      }
      else {
        this.$router.push({
        name: "referent-intervention-detail",
        params: { id: intervention.id },
      });
      }
    },
    updatePromo(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_promotion_update",
        
      });
      }
      else {
        this.$router.push({
        name: "referent_promotion_update",
       
      });
      }
    },

    clickUpdatePromo(promo){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_promotion_update",
        params: { id: promo.id },
      });
      }
      else {
        this.$router.push({
        name: "referent_promotion_update",
        params: { id: promo.id },
      });
      }

    }
  },
  created() {
    promotionApi.getPromotionByid(this.$route.params.id).then((response) => {
      this.promotion = response;
      centreFormationApi
        .getById(this.promotion.centreFormationDto.id)
        .then((response) => (this.ville = response.adresseDto.ville));
    });
  },
};
</script>

<style scoped>
.mon-titre{
  display: flex;
  justify-content: space-around;
}

.mon-btn{
  height: 2.5em;
  margin-top: 1.5em;
}

.identite {
  margin-top: 4em;
  margin-bottom: 7em;
}

.identite > .nom {
  font-size: 1.5em;
}

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

.mon-container-tuile {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
  padding-right: 80%;
}

.ma_tuile {
  width: 8em;
}

.ma_tuile:hover {
  background-color: #6c757d;
  color: white;
  cursor: pointer;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

.ma_fenetre {
  margin-bottom: 5em;
}

.activ {
  background-color: #28a745;
}

.mon-plus {
  font-size: 24px;
  height: 1.5em;
  line-height: 0.7em;
  float: right;
}

.ma-croix {
  margin-right: 0.6em;
}
</style>
