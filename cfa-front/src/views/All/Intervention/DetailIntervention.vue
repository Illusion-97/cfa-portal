<template>
  <section>
    <!-- <h1>Detail Intervention</h1> -->
    <span @click="goBack" class="h5 icon-link d-block">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>

    <div id="grid-container">
      <div id="note-information" class="mx-5 mt-2" v-if="items.noteInfoPersonnel">
        <h4>Note d'information</h4>
        <p class="mt-4">{{ this.items.noteInfoPersonnel }}</p>
      </div>
      <div class="card" id="card-detail">
        <div class="card-header">
          <div class="float-right dropstart" v-if="isAdmin || isReferent">
            <a class="" href="#" id="navbardrop" data-toggle="dropdown">
              <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="icon text-dark" />
            </a>
            <div class="dropdown-menu rounded-0">
              <span v-on:click="modifierIntervention" class="icon-link dropdown-item">
                Modifier
              </span>
              <span v-on:click="deleteIntervention(interventionId)" class="icon-link dropdown-item">
                Supprimer
              </span>
            </div>
          </div>
          <h2>{{ items.formationDto.titre }}</h2>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Intitulé de la formation</th>
                <td>{{ items.formationDto.titre }}</td>
              </tr>
              <tr>
                <th>Période</th>
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
                    <li>{{ t.nom }} {{ t.prenom }}</li>
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
        <span :class="{ ma_tuile: true, activ: isEtudiant }" class="mr-5" @click="changementOnglet(1)">
          Etudiants
        </span>
        <span :class="{ ma_tuile: true, activ: isPromotion }" class="mr-5" @click="changementOnglet(2)">
          Promotions
        </span>
        <span :class="{ ma_tuile: true, activ: isDevoir }" class="mr-5" @click="changementOnglet(3)">
          Devoirs
        </span>
        <span :class="{ ma_tuile: true, activ: isAbsence }" @click="changementOnglet(4)">
          Absences
        </span>
      </div>

      <!-- Etudiants -->
      <div :class="{ ma_fenetre: true, collapse: !isEtudiant }">
        <table class="table text-center table-sm">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stud in students" :key="stud.id">
              <td>{{ stud.nom }}</td>
              <td>{{ stud.prenom }}</td>
              <td>{{ stud.login }}</td>
              <td>
                <!-- Detail -->
                <router-link :to="{
                    name: 'formateur_etudiant_detail',
                    params: { id: stud.id },
                  }">
                  detail
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Promotions -->
      <div :class="{ ma_fenetre: true, collapse: !isPromotion }">
        <table class="table text-center table-sm">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="promotion in promotions" :key="promotion.id">
              <td>{{ promotion.nom }}</td>
              <td>
                <!-- Detail -->
                <router-link :to="{
                    name: 'formateur_promotion_detail',
                    params: { id: promotion.id },
                  }">
                  detail
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Devoirs -->
      <div :class="{ ma_fenetre: true, collapse: !isDevoir }">
        <table class="table text-center table-sm">
          <thead>
            <tr>
              <th scope="col">Enonce</th>
              <th scope="col">Date debut</th>
              <th scope="col">Date Fin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assignement in assignements" :key="assignement.id">
              <td>{{ assignement.enonce }}</td>
              <td>{{ assignement.dateDebut | formatDate }}</td>
              <td>{{ assignement.dateFin | formatDate }}</td>
              <td>
                <!-- Detail -->
                <router-link :to="{
                    name: 'formateur_devoir_detail',
                    params: { id: assignement.id },
                  }">
                  detail
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Absences -->
      <div :class="{ ma_fenetre: true, collapse: !isAbsence }">
        <div class="card card-body border-0">
          <table class="table text-center table-sm">
            <thead>
              <tr>
                <th scope="col">Etudiant</th>
                <th scope="col">Date debut</th>
                <th scope="col">Date Fin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="absence in absences" :key="absence.id">
                <td>
                  {{ absence.etudiantDto.prenom }} {{ absence.etudiantDto.nom }}
                </td>
                <td>{{ absence.dateDebut | formatDate }}</td>
                <td>{{ absence.dateFin | formatDate }}</td>
                <td>
                  <!-- Detail -->
                  <router-link :to="{
                      name: 'formateur_absence_detail',
                      params: { id: absence.id },
                    }">
                    detail
                  </router-link>
                </td>
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
  export default {
    name: "DetailIntervention",
    data() {
      return {
        interventionId: this.$route.params.id,
        items: {
          formationDto: {},
        },
        students: [],
        promotions: [],
        assignements: [],
        absences: [],
        trainers: [],
        loading: false,
        status,

        onglet: 1,
      };
    },
    computed: {
      showAlert() {
        if (this.status == 202) return "d-block";
        return "d-none";
      },
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
      }
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
      getId() {
        interventionApi.getInterventionById(this.interventionId).then((data) => {
          this.status = data.status;
          this.items = data.data;
          this.promo = this.items.promotionsDto;
          // this.items.formationDto = data.formationDto;
        });
      },
      modifierIntervention() {
        let route = this.$route.path.split("/").splice(1);
        if (route[0] == "admin") {
          this.$router.push({
            name: "modifier-intervention",
          });
        } else {
          this.$router.push({
            name: "referent_modifier_intervention",
          });
        }
      },
      deleteIntervention(id) {
        interventionApi.deleteIntervention(id).then((response) => {
          this.status = response.status;
          if (this.status == 202) {
            this.$router.push({
              name: "all-intervention",
            });
            this.showAlert;
          }
        });
      },
      getStudents() {
        interventionApi
          .findStudentsByPromoInterventionId(this.interventionId)
          .then((data) => (this.students = data))
          .then(() => this.getAbsences());
      },
      getAssignement() {
        interventionApi
          .findAssignementByInterventionId(this.interventionId)
          .then((data) => (this.assignements = data));
      },
      getTrainer() {
        interventionApi
          .findTrainerByInterventionId(this.interventionId)
          .then((data) => (this.trainers = data));
      },
      getAbsences() {
        for (let i = 0; i < this.students.length; i++) {
          absencesApi
            .getAllByIdEtudiant(this.students[i].id)
            .then((data) => {
              //data est un array, on veut pas un array d'array donc on fait element par element
              for (let j = 0; j < data.length; j++) {
                this.absences.push(data[j]);
              }
            });
        }
      },
      goToStudentDetail(id) {
        const routeData = this.$router.resolve({
          name: 'referent_etudiant_detail',
          params: {
            id: id
          }
        });
        window.open(routeData.href, '_blank')
      },
      changementOnglet(onglet) {
        this.onglet = onglet;
      },
    }
  }
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
  }

  .mon-container-body {
    padding-left: 10%;
    padding-right: 10%;
  }

  .mon-container-tuile {
    margin-bottom: 1em;
    text-align: center;
  }

  .ma_fenetre {
    width: 600px;
    margin: 0 auto;
  }

  .ma_tuile {
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
  }

  .icon-link {
    cursor: pointer;
    color: black;
    text-decoration: none;
    /* margin-bottom: 2em; */
  }

  .table th {
    border-top: 0;
  }

  .table-custom {
    text-align: center;
  }

  .table-custom tbody>tr:hover {
    background-color: rgba(192, 18, 18, 0.466);
    cursor: pointer;
  }

  .list-style-none {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>