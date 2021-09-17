<template>
    <div>
        <BodyTitle title="Fiche de l'entreprise" />
         <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-info" v-on:click=updateFichePoste>
              Modifier 
            </button>
        </div>
        <br>
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
    name: "ficheEntrepriseDetail",
    components: {
        BodyTitle,
    },
data() {
    return {
      ficheEntreprise: {etudiantDto: {}},
      loading: false,
    };
  },
  computed: {
    
  },
  methods: {
      goBack() {
      this.$router.go(-1);
    },
    updateFichePoste(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_entreprise_update",
        
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_entreprise_update",
        
      });
      }
      /*else {
        this.$router.push({
        name: "formateur_note_update",
        
      });
      }
      else {
        this.$router.push({
        name: "cef_note_update",
      });
      }*/
    },
  },
  created() {
    ficheEntrepriseApi.getByIdEtudiant(this.$route.params.id).then((response) => (this.ficheEntreprise = response));
  },
};
</script>

<style scoped>
.router-link{
    color: black;
}
</style>