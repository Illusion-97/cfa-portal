<template>
  <section>
    <!-- <h1>Detail Intervention</h1> -->
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <div id="grid-container">
      <div
        id="note-information"
        class="mx-5 mt-2"
        v-if="items.noteInfoPersonnel"
      >
        <h4>
          <span style="font-size:13px"> 
          <font-awesome-icon
                :icon="['far', 'sticky-note']"
                class="icon text-dark"/>
          </span> 
            Note d'information
        </h4>
        <p class="mt-4">{{ this.items.noteInfoPersonnel }}</p>
      </div>
      <div class="card" id="card-detail">
        <div class="card-header">
          <div class="float-right dropstart" v-if="isAdmin || isReferent">
            <a class="" href="#" id="navbardrop" data-toggle="dropdown">
              <font-awesome-icon
                :icon="['fas', 'ellipsis-v']"
                class="icon text-dark"
              />
            </a>
            <div class="dropdown-menu rounded-0">
              <span
                v-on:click="modifierIntervention"
                class="icon-link dropdown-item"
              >
                Modifier
              </span>
              <span
                v-on:click="deleteIntervention(interventionId)"
                class="icon-link dropdown-item"
              >
                Supprimer
              </span>
            </div>
          </div>
          <h2>{{ items.formationDto.titre }}</h2>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>Intitulé de la formation</th>
                <td>{{ items.formationDto.titre }}</td>
              </tr>
              <tr>
                <th>Dates</th>
                <td>
                  Du
                  <span class="font-weight-bold">
                    {{ items.dateDebut | formatDate }}
                  </span>
                  au
                  <span class="font-weight-bold">
                    {{ items.dateFin | formatDate }}
                  </span>
                </td>
              </tr>
              <!-- <tr>
                <th>Date de fin</th>
                <td>{{ items.dateFin | formatDate }}</td>
              </tr> -->
              <tr>
                <th>Formateurs affecté</th>
                <td v-if="trainers.length > 0">
                  <ul class="list-style-none" v-for="t in trainers" :key="t.id">
                    <li>{{ t.utilisateurDto.nom }} {{ t.utilisateurDto.prenom }}</li>
                  </ul>
                </td>
                <td v-else>
                  <span>Aucun formateurs affecté</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mon-container-body">
      <div class="mon-container-tuile">
        <span
          :class="{ ma_tuile: true, activ: showEtudiant }"
          class="mr-5"
          @click="changementOnglet(1)"
        >
          Etudiants
        </span>
        <span
          :class="{ ma_tuile: true, activ: showPromotion }"
          class="mr-5"
          @click="changementOnglet(2)"
        >
          Promotions
        </span>
        <span
          :class="{ ma_tuile: true, activ: showDevoir }"
          class="mr-5"
          @click="changementOnglet(3)"
        >
          Devoirs
        </span>
        <span
          :class="{ ma_tuile: true, activ: showAbsence }"
          @click="changementOnglet(4)"
        >
          Absences
        </span>
      </div>

      <!-- Etudiants -->
      <div :class="{ ma_fenetre: true, collapse: !showEtudiant }">
        <table class="table text-center table-sm table-custom">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="stud in students"
              :key="stud.id"
              @click="goToStudentDetail(stud.id)"
              title="Cliquez pour plus de detail"
            >
              <td>{{ stud.utilisateurDto.nom }}</td>
              <td>{{ stud.utilisateurDto.prenom }}</td>
              <td>{{ stud.utilisateurDto.login }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Promotions -->
      <div :class="{ ma_fenetre: true, collapse: !showPromotion }">
        <ul class="list-style-none text-center">
          <li v-for="promotion in promo" :key="promotion.id">
            <router-link
              :to="goToPromotionDetail(promotion.id)"
              target="_blank"
              title="Cliquez pour plus de detail"
              class="text-dark"
            >
              {{ promotion.nom }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Devoirs -->
      <div :class="{ ma_fenetre: true, collapse: !showDevoir }">
        <p v-if="assignements.length == 0" class="text-center">Aucun devoirs</p>
        <table class="table text-center table-sm table-custom" v-else>
          <thead>
            <tr>
              <th scope="col">Enonce</th>
              <th scope="col">Date de debut</th>
              <th scope="col">Date de fin</th>
              <th><span @click="ajouterDevoir()">+</span></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="assignement in assignements"
              :key="assignement.id"
              @click="goToDevoirDetail(assignement.id)"
              title="Cliquez pour plus de detail"
            >
              <td>{{ assignement.enonce }}</td>
              <td>{{ assignement.dateDebut | formatDate }}</td>
              <td>{{ assignement.dateFin | formatDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Absences -->
      <div :class="{ ma_fenetre: true, collapse: !showAbsence }">
        <div class="card card-body border-0">
          <table class="table text-center table-sm table-custom">
            <thead>
              <tr>
                <th scope="col">Etudiant</th>
                <th scope="col">Date debut</th>
                <th scope="col">Date Fin</th>
                <th><span @click="ajouterAbsence()">+</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="absence in absences"
                :key="absence.id"
                @click="goToAbsenceDetail(absence.id)"
                title="Cliquez pour plus de detail"
              >
                <td>
                  {{ absence.etudiantDto.utilisateurDto.prenom }} {{ absence.etudiantDto.utilisateurDto.nom }}
                </td>
                <td>{{ absence.dateDebut | formatDate }}</td>
                <td>{{ absence.dateFin | formatDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";
import { absencesApi } from "@/_api/absence.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";
export default {
  name: "DetailIntervention",
  data() {
    return {
      interventionId: this.$route.params.id,
      items: {
        formationDto: {},
      },
      students: [],
      promo: [],
      assignements: [],
      absences: [],
      trainers: [],
      status,

      onglet: 1,
      routeSplited :  this.$route.path.split("/").splice(1)
    };
  },
  computed: {
    // showAlert() {
    //   if (this.status == 202) return "d-block";
    //   return "d-none";
    // },
    showEtudiant() {
      if (this.onglet == 1) return true;
      else return false;
    },
    showPromotion() {
      if (this.onglet == 2) return true;
      else return false;
    },
    showDevoir() {
      if (this.onglet == 3) return true;
      else return false;
    },
    showAbsence() {
      if (this.onglet == 4) return true;
      else return false;
    },
    isAdmin() {
      return utilisateurService.isAdmin();
    },
    isReferent() {
      return utilisateurService.isReferent();
    },
    isFormateur() {
      return utilisateurService.isFormateur();
    },
  },
  created() {
    this.getId();
    //On a besoin de this.students.length pour getAbsences
    this.getStudents();
    this.getAssignement();
    this.getTrainer();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // Intervention
    getId() {
      interventionApi.getInterventionById(this.interventionId).then((data) => {
        this.status = data.status;
        this.items = data.data;
        this.promo = this.items.promotionsDto;
      });
    },
    modifierIntervention() {
      const route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({name: "admin_intervention_update",});
      } else  if (route[0] == "referent") {
        this.$router.push({name: "referent_intervention_update",});
      }
    },
    deleteIntervention(id) {
      interventionApi.deleteIntervention(id).then((response) => {
        this.status = response.status;
        if (this.status == 202) {
          this.showAlert;          
          this.goBack();
        }
      });
    },
    // Etudiant
    getStudents() {
      interventionApi
        .findStudentsByPromoInterventionId(this.interventionId)
        .then((data) => (this.students = data))
        .then(() => this.getAbsences());
    },
    goToStudentDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      let routeData;
      switch (this.routeSplited[0]) {
        case "admin":
          routeData = this.$router.resolve({
            name: "admin_etudiant_detail",
            params: {
              id: id,
            },
          });
          break;
        case "referent":
          routeData = this.$router.resolve({
            name: "referent_etudiant_detail",
            params: {
              id: id,
            },
          });
          break;
        case "formateur":
          routeData = this.$router.resolve({
            name: "formateur_etudiant_detail",
            params: {
              id: id,
            },
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },
    // Devoir
    getAssignement() {
      interventionApi
        .findAssignementByInterventionId(this.interventionId)
        .then((data) => (this.assignements = data));
    },
    goToDevoirDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      let routeData;
      switch (this.routeSplited[0]) {
        case "admin":
          routeData = this.$router.resolve({
            name: "admin_devoir_detail",
            params: {
              id: id,
            },
          });
          break;
        case "referent":
          routeData = this.$router.resolve({
            name: "referent_devoir_detail",
            params: {
              id: id,
            },
          });
          break;
        case "formateur":
          routeData = this.$router.resolve({
            name: "formateur_devoir_detail",
            params: {
              id: id,
            },
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },
    ajouterDevoir(){
      const route = this.$route.path.split("/").splice(1);
      switch (route[0]) {
        case "admin":
          this.$router.push({
            name: "admin_devoir_create",
          });
          break;
        case "referent":
           this.$router.push({
            name: "referent_devoir_create",
          });
          break;
        case "formateur":
           this.$router.push({
            name: "formateur_devoir_create",
          });
          break;
      }
    },
    // Formateur
    getTrainer() {
      interventionApi
        .findTrainerByInterventionId(this.interventionId)
        .then((data) => (this.trainers = data));
    },
    // Absence
    getAbsences() {
      for (let i = 0; i < this.students.length; i++) {
        absencesApi.getAllByIdEtudiant(this.students[i].id).then((data) => {
          //data est un array, on veut pas un array d'array donc on fait element par element
          for (let j = 0; j < data.length; j++) {
            this.absences.push(data[j]);
          }
        });
      }
    },
    goToAbsenceDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      let routeData;
      switch (this.routeSplited[0]) {
        case "admin":
          routeData = this.$router.resolve({
            name: "admin_absence_detail",
            params: {
              id: id,
            },
          });
          break;
        case "referent":
          routeData = this.$router.resolve({
            name: "referent_absence_detail",
            params: {
              id: id,
            },
          });
          break;
        case "formateur":
          routeData = this.$router.resolve({
            name: "formateur_absence_detail",
            params: {
              id: id,
            },
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },
    ajouterAbsence(){
      const route = this.$route.path.split("/").splice(1);
      switch (route[0]) {
        case "admin":
          this.$router.push({
            name: "admin_absence_create",
          });
          break;
        case "referent":
           this.$router.push({
            name: "referent_absence_create",
          });
          break;
        case "formateur":
           this.$router.push({
            name: "formateur_absence_create",
          });
          break;
      }
    },
    // Promotion
    goToPromotionDetail(id) {
      // const route = this.$route.path.split("/").splice(1);
      switch (this.routeSplited[0]) {
        case "admin":
          return {name: "admin_promotion_detail",params: {id: id}};
        case "referent":
          return { name: "referent_promotion_detail", params: { id: id } };
        case "formateur":
          return {name: "formateur_promotion_detail",params: {id: id}};
      }
    },
    // Other
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
  },
};
</script>

<style src="@/assets/styles/Onglet.css"></style>

<style scoped>
#grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  margin-bottom: 3em;
}

#card-detail {
  grid-column: 2 / span 2;
  grid-row: 1;
  border-radius: 0;
}

.card-header {
  /* background-color: #a5303d61; */
  border-radius: 0;
  border-bottom: 0;
}

.mon-container-tuile {
  margin-bottom: 1em;
  text-align: center;
}

.ma_fenetre {
  width: 600px;
  margin: 0 auto;
}

/* .ma_tuile {
  font-size: 18px;
  text-transform: uppercase;
  border-bottom: 1px solid black;
  padding: 0 4em;
  padding-top: 0.25em;
}

.ma_tuile:hover {
  cursor: pointer;
  background-color: rgba(165, 165, 165, 0.26);
}

.activ {
  border-bottom: 2px solid rgb(49, 49, 170);
  color: rgb(9, 49, 170);
  font-weight: bold;
}

.activ:hover {
  background-color: unset;
  cursor: default;
} */

.icon-link {
  cursor: pointer;
  color: black;
  text-decoration: none;
  /* margin-bottom: 2em; */
}

.table-custom {
  text-align: center;
}

.table th {
  border-top: 0;
}

tr th {
  background: rgba(204, 198, 198, 0.329);
}

.table-custom tr:first-child {
  background-color: unset;
}

.table-custom tbody > tr:hover {
  background-color: rgba(18, 122, 192, 0.466);
  cursor: pointer;
}

.list-style-none {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
