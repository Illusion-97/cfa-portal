<template>
    <div>
        <router-link class="router-link" :to="{name:'etudiant_profil'}"> <font-awesome-icon :icon="['fas', 'angle-left']" />  Retour au Profil</router-link>
        <BodyTitle title="Fiche de Poste" />

         <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Identification du poste</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Intitulé du poste :</span>
          <span class="col-md-10"> Concepteur / développeur d'application </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nature du poste : </span>
          <span class="col-md-10">********* </span>
        </b-card-text>
      </b-card>

        <br>

       <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Identite de l'agent</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom - Prenom :</span>
          <span class="col-md-10"> Billon Tanguy </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Status,corps, Catégorie, grade : </span>
          <span class="col-md-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta excepturi officiis pariatur dolorum, magnam quisquam voluptatibus, molestias totam natus rerum labore? Dignissimos alias itaque repudiandae rem possimus nihil laboriosam harum? </span>
        </b-card-text>
      </b-card>

        <br>
       <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Présentation du service</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Mission principale du service :</span>
          <span class="col-md-10"> Dév Appli </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Composition du service : </span>
          <span class="col-md-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta excepturi officiis pariatur dolorum, magnam quisquam voluptatibus, molestias totam natus rerum labore? Dignissimos alias itaque repudiandae rem possimus nihil laboriosam harum? </span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Positionnement de l'agent dans le service : </span>
          <span class="col-md-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta excepturi officiis pariatur dolorum, magnam quisquam voluptatibus, molestias totam natus rerum labore? Dignissimos alias itaque repudiandae rem possimus nihil laboriosam harum? </span>
        </b-card-text>
      </b-card>
        <br>
       <b-card no-body id="card-profil">
        <b-card-header>
          <span class="">Les missions du poste</span>
          
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Mission principale, Raison d'être ou finalité du poste :</span>
          <span class="col-md-10"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi officia, ab quos molestiae fugit, dignissimos nihil nemo atque hic animi odit? Ratione, at ullam. Architecto vel vitae soluta maxime reiciendis. </span>
        </b-card-text>

      </b-card>
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
    name: "FichePoste",
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