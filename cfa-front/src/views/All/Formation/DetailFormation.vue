<template>
  <section>
    <div id="bg-detail">
      <span @click="goBack" class="h5 icon-link text-light">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
        Precedent
      </span>
      <div class="float-right mr-2" style="font-size:20px">
        <a class="" href="#" id="navbardrop" data-toggle="dropdown">
          <font-awesome-icon :icon="['fas', 'sliders-h']" class="icon text-light" />
        </a>
        <div class="dropdown-menu dropleft rounded-0">
          <router-link :to="{name: 'admin_formation_update',
              params: { id: formationId },}" class="icon-link dropdown-item">
            Modifier
          </router-link>
          <span v-on:click="deleteFormation(formationId)" class="icon-link dropdown-item">
            Supprimer
          </span>
          <div class="dropdown-divider"></div>
          <router-link :to="{ name: 'admin_intervention_create'}" class="icon-link dropdown-item">
            Ajouter une intervention
          </router-link>
        </div>
      </div>
      <h1 class="">{{ item.titre }}</h1>
      <div id="grid-container">
        <div id="card-detail">
          <div class="card card-info">
            <p>
              <span class="font-weight-bold">Intitulé de la formation: </span>
              {{ item.titre }}
            </p>
            <p>
              <span class="font-weight-bold">Description :</span>
              {{ item.contenu }}
            </p>
            <p><span class="font-weight-bold">Cursus associé: </span>
              <ul v-if="item.cursusLstDto.length > 0">
                <li v-for="cursus in item.cursusLstDto" :key="cursus.id">
                  {{cursus.titre}}
                </li>
              </ul>
              <span v-else>Aucun cursus</span>
            </p>
          </div>
        </div>
        <div id="card-intervention">
          <div class="card card-info-intervention">
            <div class="card-header">
              Prochaines sessions d'intervention
            </div>
            <small class="form-text info-text ml-1">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
                Double-cliquez sur une session pour plus d'info.
            </small>
            <table class="table text-center">
              <tbody>
                <tr>
                  <th>Date de debut</th>
                  <th>Date de fin</th>
                </tr>
                <tr v-for="itv in interventions" :key="itv.id" @dblclick="getDetail(itv.id)">
                  <td>{{ itv.dateDebut | formatDate }}</td>
                  <td>{{ itv.dateFin | formatDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { formationApi } from "@/_api/formation.api.js";
  export default {
    name: "DetailFormation",
    data() {
      return {
        formationId: this.$route.params.id,
        item: {
          cursusLstDto: {},
        },
        interventions: [],
        loading: false,
      };
    },
    created() {
      this.getId();
      this.getInterventionsByFormationId();
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getId() {
        formationApi
          .getFormationById(this.formationId)
          .then((data) => (this.item = data));
      },
      getInterventionsByFormationId() {
        formationApi
          .getInterventionsByFormationId(this.formationId)
          .then((data) => (this.interventions = data));
      },
      deleteFormation(id) {
        formationApi.deleteFormation(id).then((res) => {
          if (res.status == 202)
            this.$router.push({
              name: "all-formation",
            });
        });
      },
      getDetail(id) {
        this.$router.push({
          name: "admin_intervention_detail",
          params: {
            id: id
          }
        })
      }
    },
    computed: {},
  };
</script>

<style scoped>
  h1 {
    color: #fff;
    position: relative;
    top: 25%;
    text-align: center;
  }

  #bg-detail {
    background-image: linear-gradient(rgba(22, 22, 22, 0.877),
        rgba(116, 116, 116, 0.294)),
      url("~@/assets/img/books.jpg");
    /* background-size: 100vh; */
    background-position: bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 30vh;
    padding: 0.5em;
  }

  .icon-link {
    cursor: pointer;
    color: black;
    text-decoration: none;
    /* margin-bottom: 2em; */
  }

  #grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(2, 1fr); */
    gap: 1em;
    position: relative;
    top: 8em;
  }

  #card-detail {
    grid-column: 1 / span 3;
    grid-row: 1;
  }

  .card-info {
    margin-left: 1em;
    padding: 0.5em;
    /* margin: 0 auto; */
  }

  #card-intervention {
    grid-column: 4;
  }

  .card-info-intervention {
    margin-right: 1em;
  }

  .table th {
    border-top: 0;
  }

  .table tr {
    cursor: pointer;
  }

  .table tr:hover:first-child {
    background-color: inherit;
    cursor: auto;
  }

  .table tr:hover {
    background-color: rgba(160, 158, 158, 0.144);
  }


  .list-style-none {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* .btn-toggle {
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
  } */
</style>