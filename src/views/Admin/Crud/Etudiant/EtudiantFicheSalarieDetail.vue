<template>
    <div>
        <BodyTitle title="Fiche de Salarié" />

        <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Etat Civil</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-4"> {{ utilisateur.nom }} </span>
          <span class="font-weight-bold col-md-2">Prenom : </span>
          <span class="col-md-4">{{ utilisateur.prenom }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Civilité :</span>
          <span class="col-md-4"> {{ utilisateur.civilite }} </span>
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-4"> {{ adresse.numero }} {{ adresse.rue }} </span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Ville : </span>
          <span class="col-md-4">{{ adresse.ville }}</span>
          <span class="font-weight-bold col-md-2">Code Postal : </span>
          <span class="col-md-4">{{ adresse.codePostal }}</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Naissance le : </span>
          <span class="col-md-4">{{ utilisateur.dateDeNaissance }}</span>
          <span class="font-weight-bold col-md-2">Email : </span>
          <span class="col-md-4">{{ utilisateur.login }}</span> 
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Téléphone : </span>
          <span class="col-md-10">{{ utilisateur.telephone }}</span>
        </b-card-text>
      </b-card>

        <br>

      <!--<b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Données salarié</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Date entrée :</span>
          <span class="col-md-4"> 00/00/0000 </span>
          <span class="font-weight-bold col-md-2">Date anciennetée : </span>
          <span class="col-md-4">00/00/0000 </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">IBAN :</span>
          <span class="col-md-4"> FR** **** **** **** **** **** *** </span>
          <span class="font-weight-bold col-md-2">BIC : </span>
          <span class="col-md-4"> ****** </span>
        </b-card-text>
      </b-card>

      
        <br>

      <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Dernier contrat</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Profession :</span>
          <span class="col-md-4"> ** </span>
          <span class="font-weight-bold col-md-2">Type de contrat : </span>
          <span class="col-md-4">CDD </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Du :</span>
          <span class="col-md-10"> 00/00/0000 au 00/00/0000 </span>
        </b-card-text>

        
      </b-card>-->
      <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
    name: "FicheSalarieDetail",
    components: {
        BodyTitle,
    },
data() {
    return {
      utilisateur: { etudiantDto: {}},
      adresse: {etudiantDto: {}},
      loading: false,
    };
  },
  computed: {

  },
  methods: {
      goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    //fichePosteApi.getById(this.$store.getters.getUtilisateur.id).then((response) => (this.fichePoste = response));
    //fichePosteApi.getByIdEtudiant(this.$route.params.id).then((response) => (this.fichePoste = response));
    utilisateurApi.getById(this.$route.params.id).then((response) => (this.utilisateur = response));
    utilisateurApi.getAdresseById(this.$route.params.id).then((response) => (this.adresse = response));
  },
};
</script>

<style scoped>
.router-link{
    color: black;
}
</style>