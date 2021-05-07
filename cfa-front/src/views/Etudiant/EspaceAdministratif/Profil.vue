<template>
  <div class="container-fluid">
      <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Profil</span>
          <router-link :to="{ name: 'home' }">
            <!-- <font-awesome-icon :icon="['fas', 'edit']" class="text-white" /> -->
          </router-link>
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Prenom :</span>
          <span class="col-md-4">{{ utilisateur.prenom }}</span>
          <span class="font-weight-bold col-md-2">Nom : </span>
          <span class="col-md-4">{{ utilisateur.nom }}</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-10">{{ adresse.numero }} {{ adresse.rue }}</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Ville : </span>
          <span class="col-md-4">{{ adresse.ville }}</span>
          <span class="font-weight-bold col-md-2">Code Postal : </span>
          <span class="col-md-4">{{ adresse.codePostal }}</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Email : </span>
          <span class="col-md-4">{{ utilisateur.login }}</span> 
          <span class="font-weight-bold col-md-2">Téléphone : </span>
          <span class="col-md-4">{{/*utilisateur.telephone*/}}</span>
        </b-card-text>
      </b-card>

    <div class="row">
      <div class="col-md-4">
        <router-link class="link" :to="{name:'fiche-salarie'}" >
            <b-card class="card-btn" header="Fiche Salarié">
              <b-card-text
                >Fiche de renseignement du salarié regroupant informations
                personnelles, les informations relatives au contrat comma les
                horaires etc</b-card-text>
            </b-card>
        </router-link>
        
      </div>

      <div class="col-md-4">
        <router-link class="link" :to="{name:'fiche-poste'}">
          <b-card  header="Fiche de Poste" class="card-btn">
            <b-card-text
              >Fiche décrivant les objectifs et les caractéristiques du travail,
              suivi de projet etc ..</b-card-text>
          </b-card>
        </router-link>
      </div>

      
      <div class="col-md-4">
        <router-link class="link" :to="{name:'fiche-entreprise'}">
          <b-card class="card-btn" header="Fiche Entreprise">
            <b-card-text
              >Regroupe les caractéristique de l'entreprise, les risques
              professionnels et les actions tendant à leur réduction</b-card-text>
          </b-card>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profil",
  components: {},
  data() {
    return {
      adresse: { id: "", numero: "", rue: "", ville: "", codePostal: "" },
    };
  },
  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
  },
  methods: {
  },
  created() {
    let req =
      this.$apiUrl +
      "AppliCFABack/utilisateurs/" +
      7 +
      "/adresse";

    axios
      .get(req)
      .then((response) => (this.adresse = response.data))
      .catch((error) => console.log(error));
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

.indentity {
  display: inline;
}

#card-profil {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
}

#card-profil > .card-header {
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

.card-btn {
  /* width: 70%; */
  width: 20em;
  height: 13em;
}

.card-btn:hover {
  background-color: #6c757d;
  color: white;
  /* cursor: pointer; */
}

.link{
  width: 1em;
  color: black;
  text-decoration: none;
  display: block;
}
</style>
