<template>
    <div>
        <router-link class="router-link" :to="{name:'etudiant_profil'}"> <font-awesome-icon :icon="['fas', 'angle-left']" />  Retour au Profil</router-link>
        <BodyTitle title="Fiche de l'entreprise" />

        <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Identification de l'entreprise</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom de l'entreprise :</span>
          <span class="col-md-10"> {{ ficheEntreprise.entrepriseDto.raisonSociale }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-10">{{ ficheEntreprise.entrepriseDto.adresseSiegeDto.numero}}, {{ ficheEntreprise.entrepriseDto.adresseSiegeDto.rue}}, {{ ficheEntreprise.entrepriseDto.adresseSiegeDto.ville}} </span>
          <!--<span class="font-weight-bold col-md-2">Logo : </span>
          <span class="col-md-4"> IMG </span>-->
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Historique succinct :</span>
          <span class="col-md-10"> {{ ficheEntreprise.historique }} </span>
        </b-card-text>
        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom du (ou de la) dirigeant(e) actuel(e) :</span>
          <span class="col-md-10"> {{ ficheEntreprise.nomDirigeant }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Secteur d'activité : </span>
          <span class="col-md-4"> {{ ficheEntreprise.secteurActivite }} </span>
          <span class="font-weight-bold col-md-2">Type dorganisation : </span>
          <span class="col-md-4"> {{ ficheEntreprise.organisationType }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Combien de salariés compte-elle ? : </span>
          <span class="col-md-4"> {{ ficheEntreprise.nbSalarie }} </span>
          <span class="font-weight-bold col-md-2">Chiffre d'affaire annuel ? </span>
          <span class="col-md-4"> {{ ficheEntreprise.chiffreAffaireAnnuel }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Descritpion de son activité : </span>
          <span class="col-md-4"> {{ficheEntreprise.activiteDescription}} </span>
          <span class="font-weight-bold col-md-2">Type d'usagers / clients auxquels elle rend service :</span>
          <span class="col-md-4"> {{ficheEntreprise.clientType}} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Profils de formations : </span>
          <span class="col-md-4"> {{ficheEntreprise.formationProfil}} </span>
          <span class="font-weight-bold col-md-2">Métiers erxercés par ses salariés :</span>
          <span class="col-md-4"> {{ficheEntreprise.metiersExerces}} </span>
        </b-card-text>
      </b-card>
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { ficheEntrepriseApi } from "@/_api/ficheEntreprise.api.js";
export default {
    name: "FicheEntreprise",
    components: {
        BodyTitle,
    },
    data() {
    return {
      ficheEntreprise: {entrepriseDto:{adresseSiegeDto:{}}},
    };
  },
  computed: {
    
  },
  methods: {
  },
  created() {
    ficheEntrepriseApi.getById(this.$store.getters.getUtilisateur.id).then((response) => (this.ficheEntreprise = response));
  },
};
</script>

<style scoped>
.router-link{
    color: black;
}
</style>
