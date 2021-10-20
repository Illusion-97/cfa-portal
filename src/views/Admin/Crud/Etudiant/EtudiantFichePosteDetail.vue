<template>
    <div>
        <BodyTitle title="Fiche de Poste details" />
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
          <span class="">Identification du poste</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Intitulé du poste :</span>
          <span class="col-md-10"> {{ fichePoste.intitule }} </span>
        </b-card-text>


        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nature du poste : </span>
          <span class="col-md-10">{{ fichePoste.nature }}</span>
        </b-card-text>
      </b-card>

        <br>

       <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Identite de l'agent</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom - Prenom :</span>
          <span class="col-md-4"> {{ utilisateur.nom }} {{ utilisateur.prenom }}</span>
          <span class="font-weight-bold col-md-3">Status,corps, Catégorie, grade : </span>
          <span class="col-md-3"> Etudiant </span>
        </b-card-text>
      </b-card>

        <br>
       <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Présentation du service</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Mission principale du service :</span>
          <span class="col-md-10"> {{ fichePoste.mission }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Composition du service : </span>
          <span class="col-md-10"> {{ fichePoste.compositionService }} </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Positionnement de l'agent dans le service : </span>
          <span class="col-md-10">{{ fichePoste.positionnement }}</span>
        </b-card-text>
      </b-card>
        <br>
       <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Les missions du poste</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Mission principale, Raison d'être ou finalité du poste :</span>
          <span class="col-md-10"> {{ fichePoste.missionPrincipale }}</span>
        </b-card-text>

      </b-card>
      
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { fichePosteApi } from "@/_api/fichePoste.api.js";
export default {
    name: "FichePosteDetail",
    components: {
        BodyTitle,
    },
data() {
    return {
      utilisateur: { nom: "", prenom: "" },
      fichePoste: {etudiantDto: {}},
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
        name: "admin_etudiant_fiche_poste_update",
        
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_poste_update",
        
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
    //fichePosteApi.getById(this.$store.getters.getUtilisateur.id).then((response) => (this.fichePoste = response));
    fichePosteApi.getByIdEtudiant(this.$route.params.id).then((response) => (this.fichePoste = response));
    utilisateurApi.getById(this.$route.params.id).then((response) => (this.utilisateur = response));
  },
};
</script>

<style scoped>
.router-link{
    color: black;
}
</style>