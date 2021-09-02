<template>
  <div>
    <span @click="goBack" class="h5 icon-link d-block">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
      Precedent
    </span>
    <div id="grid-container">
      <div class="card" id="card-detail">
        <div class="card-header d-flex justify-content-between">
          <h2>{{item.titre}}</h2>
          <div class="dropstart">
            <a class="" href="#" id="navbardrop" data-toggle="dropdown">
              <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="icon-link text-dark" />
            </a>
            <div class="dropdown-menu rounded-0">
              <router-link :to="{
                  name: 'modifier-formation',
                  params: { id: formationId },
                }" class="icon-link dropdown-item">
                Modifier
              </router-link>
              <span v-on:click="deleteFormation(formationId)" class="icon-link dropdown-item">
                Supprimer
              </span>
            </div>
          </div>
          <!-- <h2>{{ items.formationDto.titre }}</h2> -->
        </div>
        <div class="card-body">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr>
                <th>Intitulé de la formation</th>
                <td>{{ item.titre }}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{{item.contenu}}</td>
                <!-- <td v-if="trainers.length > 0">
                  <ul class="list-style-none" v-for="t in trainers" :key="t.id">
                    <li>{{t.nom}} {{t.prenom}}</li>
                  </ul>
                </td>
                <td v-else>
                  <span>Aucun formateurs affecté</span>
                </td> -->
              </tr>
              <tr>
                <th>Cursus</th>
                <td>
                  <ul class="list-style-none">
                    <span v-for="cursus in item.cursusLstDto" :key="cursus.id">{{cursus.titre}}</span>
                    <span v-if="item.cursusLstDto.length == 0">Aucun cursus</span>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="intervention-list">
        <div class="card intervention-card">
          <div class="card-header">
            <h3>Interventions</h3>
          </div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab perferendis corrupti consequatur, cumque eos, est ullam quas neque nulla dolorem totam! Distinctio maxime optio et, sit illum molestiae. Fugiat, est!
        </div>
      </div>
      <!-- <div id="student-list">
        <span class="btn-toggle" data-toggle="collapse" href="#Collapse1" role="button" aria-expanded="false"
          aria-controls="Collapse1">Afficher les étudiants</span>
        <div class="collapse" id="Collapse1">
          <div class="card card-body border-0"> -->
            <!-- <table class="table text-center table-sm">
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
            </table> -->
          <!-- </div>
        </div>
      </div> -->

      <!-- <div id="promotion-list">
        <span class="btn-toggle" data-toggle="collapse" href="#Collapse2" role="button" aria-expanded="false"
          aria-controls="Collapse2">Afficher les promotions</span>
        <div class="collapse show" id="Collapse2">
          <div class="card card-body border-0"> -->
            <!-- <ul v-for="p in promo" :key="p.id" class="list-style-none">
              <li>{{ p.nom }}</li>
            </ul> -->
            <!-- <pre>{{ promo }}</pre> -->
          <!-- </div>
        </div>
      </div> -->
      <!-- <div id="devoir-list">
        <span class="btn-toggle" data-toggle="collapse" href="#Collapse3" role="button" aria-expanded="false"
          aria-controls="Collapse3">Devoirs</span>
        <div class="collapse" id="Collapse3">
          <div class="card card-body border-0"> -->
            <!-- <span v-if="assignements.length > 0">
              <pre>{{assignements}}</pre>
            </span>
            <span v-else class="text-center">
              Aucun devoirs
            </span> -->
          <!-- </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { formationApi } from "@/_api/formation.api.js";
  export default {
    name: "DetailIntervention",
    data() {
      return {
        formationId: this.$route.params.id,
        item: {
          cursusLstDto: {}
        },
        loading: false,
      };
    },
    created() {
      this.getId();
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getId() {
        formationApi
          .getFormationById(this.formationId)
          .then((data) => {
            this.item = data;
          });
      },
      deleteFormation(id) {
        formationApi.deleteFormation(id).then(res => {
          if (res.status == 202)
            this.$router.push({
              name: 'all-formation'
            })
        })
      }
    },
    computed: {},
  };
</script>

<style scoped>
  .icon-link {
    cursor: pointer;
    color: black;
    text-decoration: none;
    /* margin-bottom: 2em; */
  }

  #grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 1em;
  }

  #card-detail {
    grid-column: 2;
    grid-row: 1;
  }
  
  #intervention-list {
    grid-column: 1/ span 3;
  }

.intervention-card {
  width: 70%;
  margin: 0 auto;
}
  /* #student-list {
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
  } */

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
    left: 180px;
    bottom: 0;
    height: 1px;
    width: 30%;
    border-bottom: 1px solid black;
  }
</style>