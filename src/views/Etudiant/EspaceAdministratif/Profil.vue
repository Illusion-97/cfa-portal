<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="card mb-3 custom-card">
          <div class="row no-gutters">
            <div class="col-md-4 text-center identity">
              <span class="h1">{{ utilisateur.nom | uppercase }}</span>
              <span class="h2">{{ utilisateur.prenom | capitalize }}</span>
            </div>
            <div class="col-md-8">
              <div class="float-right dropleft">
                <span class="" id="navbardrop" data-toggle="dropdown" style="cursor:pointer;">
                  <b-icon icon="gear" />
                </span>
                <div class="dropdown-menu p-0 rounded-0">
                  <router-link :to="{ name: 'etudiant_profil_update',params:{id:userId} }"
                    class="icon-link dropdown-item">
                    Modifier mes informations
                  </router-link>
                </div>
              </div>
              <div class="card-body user-info">
                <p>
                  <span class="font-weight-bold mr-2">&#64;</span>: {{ utilisateur.login }}
                </p>
                <p>
                  <span class="mr-2">
                    <b-icon icon="geo-alt-fill" /> </span>: {{ adresse | fullAddresse }}
                </p>
                <p>
                  <span class="mr-2">
                    <b-icon icon="telephone-fill" /></span>: {{ utilisateur.telephone }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <router-link class="link" :to="{ name: 'fiche-salarie' }">
            <b-card class="card-btn" header="Fiche Salarié">
              <span class="font-weight-bold" style="font-size:16px">Description : </span>
              <b-card-text>
                Fiche de renseignement du salarié regroupant les informations
                personnelles, les informations relatives au contrat comme les
                horaires etc</b-card-text>
            </b-card>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="link" :to="{ name: 'fiche-poste' }">
            <b-card header="Fiche de Poste" class="card-btn">
              <span class="font-weight-bold" style="font-size:16px">Description : </span>
              <b-card-text>
                Fiche décrivant les objectifs et les caractéristiques du travail,
                suivi de projet etc ..</b-card-text>
            </b-card>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="link" :to="{ name: 'fiche-entreprise' }">
            <b-card class="card-btn" header="Fiche Entreprise">
              <span class="font-weight-bold" style="font-size:16px">Description : </span>
              <b-card-text>
                Regroupe les caractéristique de l'entreprise, les risques
                professionnels et les actions tendant à leur
                réduction</b-card-text>
            </b-card>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="link" :to="{ name: 'etudiant_cerfa' }">
            <b-card class="card-btn" header="Cerfa">
              <span class="font-weight-bold" style="font-size:16px">Description : </span>
              <b-card-text>
              Contrat de l'étudiant</b-card-text>
            </b-card>
          </router-link>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import { utilisateurApi } from "@/_api/utilisateur.api.js";
  export default {
    name: "Profil",
    data() {
      return {
        adresse: {},
        item:{},
        userId : this.$store.getters.getUtilisateur.id
      };
    },
    methods:{
      getUser(){
        utilisateurApi.getById(this.userId)
        .then(response => this.item = response)
      },
      getAdresse(){
        utilisateurApi
          .getAdresseById(this.userId)
          .then((response) => (this.adresse = response));
        }
    },
    computed: {
      utilisateur() {
        return this.item
      },
    },
    created() {
      this.getAdresse();
      this.getUser();
    },
  };
</script>

<style scoped>
  .a {
    outline: none;
    text-decoration: none;
  }

  #dawan-logo {
    width: 15em;
    float: left;
  }

  #iconde-rewrite {
    width: 2em;
  }

  .mon-container {
    margin-bottom: 5em;
  }

  .custom-card {
    /* width: 80em; */
    width: 80%;
    margin: 0 auto;
    padding: 1em;
    border-radius: 0;
  }

  .identity {
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-right: 1px solid rgb(95, 95, 95);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .indentity {
    display: inline;
  }

  #card-profil {
    width: 90%;
    padding-bottom: 1em;
    margin-bottom: 5em;
  }

  #card-profil>.card-header {
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

  .card-text>span {
    display: inline-block;
    width: 40em;
    padding-left: 3em;
  }

  .card-btn {
    /* width: 70%; */
    width: 20em;
    height: 15em;
    border-radius: 0;
    padding: 0.5em;
  }

  .card-btn .card-header {
    background: rgba(185, 57, 57, 0.555);
    border-radius: 0;
    font-size: 23px;
    text-align: center;
  }

  .card-btn .card-body {
    padding: unset;
    margin-top: 0.5em;
    text-align: justify;
  }

  /* .card-btn:hover {
  background-color: #6c757d;
  color: white;
} */

  .link {
    width: 1em;
    color: black;
    text-decoration: none;
    display: block;
  }
</style>