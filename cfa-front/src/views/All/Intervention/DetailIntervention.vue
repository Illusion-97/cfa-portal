<template>
  <section>
    <!-- <h1>Detail Intervention</h1> -->
    <span @click="goBack" class="h5 icon-link d-block">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
    <div id="grid-container">
      <div class="card" id="card-detail">
        <div class="card-header">
          <div class="float-right dropstart">
            <a class="" href="#" id="navbardrop" data-toggle="dropdown">
              <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="icon text-dark" />
            </a>
            <div class="dropdown-menu rounded-0">
              <router-link :to="{
                  name: 'modifier-intervention',
                  params: { id: interventionId },
                }" class="icon-link dropdown-item">
                Modifier
              </router-link>
              <span v-on:click="deleteIntervention(interventionId)" class="icon-link dropdown-item">
                Supprimer
              </span>
            </div>
          </div>
          <h2>{{ items.formationDto.titre }}</h2>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-striped table-hover">
            <tbody>
              <tr>
                <th>Intitulé de la formation</th>
                <td>{{ items.formationDto.titre }}</td>
              </tr>
              <tr>
                <th>Date de debut</th>
                <td>{{ items.dateDebut | formatDate }}</td>
              </tr>
              <tr>
                <th>Date de fin</th>
                <td>{{ items.dateFin | formatDate }}</td>
              </tr>
              <tr>
                <th>Formateurs affecté</th>
                <td v-if="trainers.length > 0">
                  <ul class="list-style-none" v-for="t in trainers" :key="t.id">
                    <li>{{t.nom}} {{t.prenom}}</li>
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
      <div id="student-list">
        <span class="btn-toggle" data-toggle="collapse" href="#Collapse1" role="button" aria-expanded="false"
          aria-controls="Collapse1">Afficher les étudiants</span>
        <div class="collapse" id="Collapse1">
          <div class="card card-body border-0">
            <table class="table text-center table-sm">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prenom</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="stud in students" :key="stud.id">
                  <td>{{stud.nom}}</td>
                  <td>{{stud.prenom}}</td>
                  <td>{{stud.login}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="promotion-list">
        <span class="btn-toggle" data-toggle="collapse" href="#Collapse2" role="button" aria-expanded="false"
          aria-controls="Collapse2">Afficher les promotions</span>
        <div class="collapse show" id="Collapse2">
          <div class="card card-body border-0">
            <ul v-for="p in promo" :key="p.id" class="list-style-none">
              <li>{{ p.nom }}</li>
            </ul>
            <!-- <pre>{{ promo }}</pre> -->
          </div>
        </div>
      </div>
      <div id="devoir-list">
        <span class="btn-toggle" data-toggle="collapse" href="#Collapse3" role="button" aria-expanded="false"
          aria-controls="Collapse3">Devoirs</span>
        <div class="collapse" id="Collapse3">
          <div class="card card-body border-0">
            <span v-if="assignements.length > 0">
              <pre>{{assignements}}</pre>
            </span>
            <span v-else class="text-center">
              Aucun devoirs
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    interventionApi
  } from "@/_api/intervention.api.js";
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
        trainers: [],
        loading: false,
        status,
      };
    },
    created() {
      this.getId();
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
          .then((data) => (this.students = data));
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
    },
    computed: {
      showAlert() {
        if (this.status == 202) return "d-block";
        return "d-none";
      },
    },
  };
</script>

<style scoped>
  #grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr repeat(3, 2fr);
    gap: 1em;
  }

  #card-detail {
    grid-column: 2;
    grid-row: 1;
  }

  #student-list {
    grid-row: 2;
    grid-column: 1;
  }

  #promotion-list {
    grid-row: 2;
    grid-column: 2;
  }

  #devoir-list {
    grid-row: 2;
    grid-column: 3;
  }

  .icon-link {
    cursor: pointer;
    color: black;
    text-decoration: none;
    /* margin-bottom: 2em; */
  }

  .icon {
    cursor: pointer;
  }

  .table th {
    border-top: 0;
  }

  .list-style-none {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .btn-toggle {
    border-radius: 0;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .btn-toggle:after {
    content: "";
    position: absolute;
    left: 35%;
    bottom: 0;
    height: 1px;
    width: 30%;
    border-bottom: 1px solid black;
  }
</style>