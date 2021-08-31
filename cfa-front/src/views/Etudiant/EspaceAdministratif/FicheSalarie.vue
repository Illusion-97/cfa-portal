<template>
    <div>
        <router-link class="router-link" :to="{name:'etudiant_profil'}"> <font-awesome-icon :icon="['fas', 'angle-left']" />  Retour au Profil</router-link>
        <BodyTitle title="Fiche de Salarié" />

        <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Etat Civil</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-4"> prenom </span>
          <span class="font-weight-bold col-md-2">Prenom : </span>
          <span class="col-md-4">nom </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Civilité :</span>
          <span class="col-md-4"> Monsieur </span>
          <span class="font-weight-bold col-md-2">Nom de naissance : </span>
          <span class="col-md-4"> ****** </span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-10">numero rue </span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Ville : </span>
          <span class="col-md-4">ville</span>
          <span class="font-weight-bold col-md-2">Code Postal : </span>
          <span class="col-md-4">codePostal</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Pays : </span>
          <span class="col-md-4">France</span>
          <span class="font-weight-bold col-md-2">Nationalité : </span>
          <span class="col-md-4">Française</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Naissance le : </span>
          <span class="col-md-4">00/00/0000 à *******</span>
          <span class="font-weight-bold col-md-2">Dépt : </span>
          <span class="col-md-4">00</span>
        </b-card-text>

        <b-card-text class="row ml-5">
          <span class="font-weight-bold col-md-2">Email : </span>
          <span class="col-md-4">blabla@dawan.fr</span> 
          <span class="font-weight-bold col-md-2">Téléphone : </span>
          <span class="col-md-4">00.00.00.00.00</span>
        </b-card-text>
      </b-card>

        <br>

      <b-card no-body id="card-profil">
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

        
      </b-card>
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
    name: "FicheSalarie",
    components: {
        BodyTitle,
    },
}
</script>

<style scoped>
.router-link{
    color: black;
}
</style>