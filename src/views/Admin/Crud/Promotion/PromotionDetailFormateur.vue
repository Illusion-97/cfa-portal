<template>
  <div class="container-fluid">
 

    <!-- <BodyTitle :title="promotion.nom" /> -->
    
    <h1>
      {{ promotion.nom }}
    </h1>
      <section>
 <div>
  <b-tabs content-class="mt-3" fill>
    <b-tab  active>
       <template v-slot:title>
          <font-awesome-icon :icon="['fas', 'user-graduate']" class="icon"/>   Etudiants
      </template>
        <div >

              <table class="table">
                <thead class="">
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="etudiant in promotion.etudiantsDto"
                    :key="etudiant.id"
                    @dblclick="clickEtudiant(etudiant)"
                    class="mon-tr"
                  >
                    <td>{{ etudiant.utilisateurDto.prenom }}</td>
                    <td>{{ etudiant.utilisateurDto.nom }}</td>
                    <td>{{ etudiant.utilisateurDto.login }}</td>
                    <td>
                        {{etudiant.utilisateurDto.telephone }}
                    </td>
                  </tr>
                </tbody>
              </table>
        </div>
    </b-tab>
    <b-tab >
     <template v-slot:title>
          <font-awesome-icon :icon="['fas', 'business-time']" class="icon"/>   Interventions
      </template>
        <div  id="interventions">
          <table class="table">
            <thead class="">
              <tr>
                <th>Formation</th>
                <th>Heures dispensées</th>
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
                <td>35 (à rajouter)</td>
                <td>{{ intervention.dateDebut | formatDate }}</td>
                <td>{{ intervention.dateFin | formatDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

    </b-tab>
    <b-tab >
        <template v-slot:title>
          <font-awesome-icon :icon="['fas', 'file-alt']" class="icon"/>   Examens
      </template>

      <ExamensPromotionsListCompoenent @custom-event-notes="setMessage" />
  
    </b-tab>
    <b-tab >
        <template v-slot:title>
          <font-awesome-icon :icon="['fas', 'sort-numeric-up-alt']" class="icon"/>   Notes
      </template>
         <h2 class="text-center mt-5 mb-5">
         {{title}}
          </h2>
    <div v-bind:class="[afficherNotes]" >
      <AjouterNotes />
    </div>
       

    </b-tab>
  </b-tabs>
</div>


    
    <!-- Etudiants -->
 

 
    </section>
  </div>
</template>

<script>
// import BodyTitle from "@/components/utils/BodyTitle.vue";
import { promotionApi } from "@/_api/promotion.api.js";
import { centreFormationApi } from "@/_api/centreFormation.api.js";
import ExamensPromotionsListCompoenent from '@/components/List/ExamensPromotionsListCompoenent.vue';
import AjouterNotes from '@/components/Formateur/AjouterNotes.vue';

export default {
  name: "PromotionDetailFormateur",
  components: {
    ExamensPromotionsListCompoenent,
    AjouterNotes,
  
    // BodyTitle,
  },
    props : {
      title: {
          type: String,
                    default: "Selectioner un examen"
            }
        },
    data() {
    return {
      // AjouterNotes: {
      //   ouvert : false,
      //   titre : "qsddqd"
      // },
      afficherNotes:'d-none',
      promotionId: this.$route.params.id,
      promotion: {
        cursusDto: {},
        referentPedagogiqueDto: {},
        cefDto: {utilisateurDto:{}},
        interventionsDto: [{formationDto: {}}],
        etudiantDto: [{utilisateurDto: {}}]
      },
      itemsEtudients : [],
      ville: "",
      onglet: 1,
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
     setMessage(payload) {
            this.title = payload.examen;
            this.afficherNotes ='';
        },
    goBack() {
      this.$router.go(-1);
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    clickEtudiant(etudiant) {
      let route = this.$route.path.split("/").splice(1);
        if (route[0] == "admin") {this.$router.push({name: "admin_etudiant_detail",params: {id: etudiant.id,},});
        } else if(route[0] == "referent") {this.$router.push({name: "referent_etudiant_detail",params: {id: etudiant.id,},});
        }else if(route[0] == "cef") {this.$router.push({name: "cef_etudiant_detail",params: {id: etudiant.id,},});
        }
      },

    clickIntervention(intervention) {
      let route = this.$route.path.split("/").splice(1);
        if (route[0] == "admin") {this.$router.push({name: "intervention-detail",params: {id: intervention.id,},});
        } else if (route[0] == "referent") {this.$router.push({name: "referent-intervention-detail",params: {id: intervention.id,},});
        } else if (route[0] == "cef") {this.$router.push({name: "cef-intervention-detail",params: {id: intervention.id,},});
        }
      },

    updatePromotion() {
      let route = this.$route.path.split("/").splice(1);

      if (route[0] == "admin") this.$router.push({name: "admin_promotion_update"});
      else if (route[0] == "referent") this.$router.push({name: "referent_promotion_update"});
      else if (route[0] == "cef") this.$router.push({name: "cef_promotion_update"});
      
    },
    deletePromotion() {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
        promotionApi
          .deletePromotion(this.$route.params.id)
          .then(() => this.goBack());
      }
    },
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

<style src="@/assets/styles/Onglet.css"></style>
<style scoped>
/* .mon-titre {
  display: flex;
  justify-content: space-around;
} */

h1 {
  /* border: 1px solid #6c757d; */
  display: flex;
  justify-content: center;
  padding: 0.5em;
  /* padding-left: 2em; */
}

.mon-dropdown{
  margin-left: 1em;
  margin-top: 0.5em;
}

.mon-btn {
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

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

.ma_fenetre {
  margin-bottom: 5em;
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
