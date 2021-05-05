<template>
  <div class="body">
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          <b-card no-body id="card-profil">
            <b-card-header>
              <span class="">Profil</span>
              <a href="/">
                <font-awesome-icon :icon="['fas', 'edit']" class="text-white" />
              </a>
            </b-card-header>

            <b-card-text class="identity">
              <span>Prenom : {{ utilisateur.prenom }}</span>
              <span>Nom : {{ utilisateur.nom }}</span>
            </b-card-text>

            <b-card-text>
              <span>
                Adresse : {{/*utilisateur.adresseDto.ligne*/}}
                {{/*utilisateur.adresseDto.rue*/}}
              </span>
            </b-card-text>

            <b-card-text>
              <span>ville : {{/*utilisateur.adresseDto.ville*/}}</span>
              <span>Code Postal : {{/*utilisateur.adresseDto.codePostal*/}}</span>
            </b-card-text>

            <b-card-text>
              <span>email : {{ utilisateur.login }}</span>
              <span>téléphone : {{/*utilisateur.telephone*/}}</span>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <b-card class="card-btn" @click="toFiche(0)" header="Fiche Salarié">
          <b-card-text>Fiche de renseignement du salarié regroupant informations
            personnelles, les informations relatives au contrat comma les
            horaires etc</b-card-text>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-btn" @click="toFiche(1)" header="Fiche de Poste">
          <b-card-text>Fiche décrivant les objectifs et les caractéristiques du travail,
            suivi de projet etc ..</b-card-text>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-btn" @click="toFiche(2)" header="Fiche Entreprise">
          <b-card-text>Regroupe les caractéristique de l'entreprise, les risques
            professionnels et les actions tendant à leur réduction</b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profil",
    components: {},
    data() {
      return {
      };
    },
    computed: {
      planning(){
        return this.$store.getters.getPlanning
      },
      utilisateur(){
        return this.$store.getters.getUtilisateur
      },
    },
    methods: {
      toFiche(index) {
        switch (index) {
          case 0:
            window.location.href = "/";
            break;
          case 1:
            window.location.href = "/";
            break;
          case 2:
            window.location.href = "/";
            break;
        }
      },
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
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-around; */
    /*
    background-color: green;*/
    /* width: 100%; */
    margin-bottom: 5em;
  }

  .indentity {
    display: inline;
  }

  #card-profil {
    width: 100%;
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
    /*
    background-color: yellow;*/
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
    height: 13em;
  }

  .card-btn:hover {
    background-color: #6c757d;
    color: white;
  }
</style>