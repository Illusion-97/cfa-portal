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
          <span class="col-md-10"> Concepteur / développeur d'application </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-4">********* </span>
          <span class="font-weight-bold col-md-2">Logo : </span>
          <span class="col-md-4"> IMG </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Historique succinct :</span>
          <span class="col-md-10"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero aut est repudiandae eius. Numquam deleniti minima quisquam nisi tenetur, perspiciatis fuga. Beatae culpa similique nam incidunt perspiciatis soluta in quae? </span>
        </b-card-text>
        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom du (ou de la) dirigeant(e) actuel(e) :</span>
          <span class="col-md-10"> ******* </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Secteur d'activité : </span>
          <span class="col-md-4"> ********* </span>
          <span class="font-weight-bold col-md-2">Type dorganisation : </span>
          <span class="col-md-4"> ********* </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Combien de salariés compte-elle ? : </span>
          <span class="col-md-4"> ********* </span>
          <span class="font-weight-bold col-md-2">Chiffre d'affaire annuel ? </span>
          <span class="col-md-4"> ********* </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Descritpion de son activité : </span>
          <span class="col-md-4"> ********* </span>
          <span class="font-weight-bold col-md-2">Type d'usagers / clients auxquels elle rend service :</span>
          <span class="col-md-4"> ********* </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Profils de formations : </span>
          <span class="col-md-4"> ********* </span>
          <span class="font-weight-bold col-md-2">Métiers erxercés par ses salariés :</span>
          <span class="col-md-4"> ********* </span>
        </b-card-text>
      </b-card>
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
    name: "FicheEntreprise",
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
