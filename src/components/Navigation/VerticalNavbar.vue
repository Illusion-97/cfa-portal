<template>
  <div class="NavBar2">
    <div v-if="table[1] == 'espace-administratif'" id="espace-administratif">
      <h5>Espace Administratif</h5>

      <div v-if="table[0] == 'etudiant'">
        <nav class="mb-3">
          <b-nav vertical>
            <router-link class="nav-item" :to="{ name: 'etudiant_profil' }">Profil</router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_documents_administratifs' }">Documents administratifs
            </router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_conge' }">Demande de congés</router-link>
          </b-nav>
        </nav>
      </div>
    </div>

    <div v-if="table[1] == 'espace-pedagogique'" id="espace-pedagogique">
      <h5>Espace Pedogique</h5>

      <div v-if="table[0] == 'etudiant'">
        <nav class="mb-3">
          <b-nav vertical>
            <router-link class="nav-item" :to="{ name: 'etudiant_espace-peda_cursus' }">Mon cursus</router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_espace-peda_devoirs' }">Devoirs</router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_espace-peda_notes' }">Bulletin de notes</router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_espace-peda_dossier-pro' }">Dossier professionnel
            </router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_espace-peda_dossier-projet' }">Dossier projet
            </router-link>
            <router-link class="nav-item" :to="{ name: 'etudiant_espace-peda_absences' }">Absences / Retards
            </router-link>
          </b-nav>
        </nav>
      </div>
    </div>

    <div v-if="table[0] == 'referent'" id="referent">
      <h5>Espace Referent</h5>

      <nav class="mb-3">
        <b-nav vertical>

          <router-link class="nav-item" :to="{name:'referent_promotions'}">Promotions</router-link>
          <!-- <router-link class="nav-item" :to="{name:'referent_intervention'}">Intervention</router-link> -->
          <router-link class="nav-item" :to="{name:'referent_etudiant'}">Etudiant</router-link>
          <router-link class="nav-item" :to="{name:'referent_notes'}">Notes</router-link>
          <!-- <router-link class="nav-item" :to="{name:'referent_document-administratif'}">Administratif</router-link> -->
          <router-link class="nav-item" :to="{name:'referent_groupe-projet'}">Groupes / Projets</router-link>
        </b-nav>
      </nav>
    </div>

    <div v-if="table[0] == 'admin'" id="admin">
      <div>
        <h5>Espace Administrateur</h5>

        <nav class="mb-3">
          <b-nav vertical>

            <router-link class="nav-item" :to="{ name: 'admin_utilisateur' }">Utilisateurs</router-link>
            <router-link class="nav-item" :to="{ name: 'admin_formation_list' }">Formations</router-link>
            <router-link class="nav-item" :to="{ name: 'admin_cursus_list' }">Cursus</router-link>
            <router-link class="nav-item" :to="{ name: 'admin_promotion_list' }">Promotions</router-link>
            <!-- <router-link class="nav-item" :to="{name:'all-intervention'}">Interventions</router-link> -->
            <router-link class="nav-item" :to="{ name: 'admin_entreprise_list' }">Entreprise</router-link>
            <router-link class="nav-item" :to="{ name: 'admin_centreFormation_list' }">Centre de Formation</router-link>
            <router-link class="nav-item" :to="{ name: 'admin_adresse_list' }">Adresse</router-link>
            <!-- <router-link class="nav-item" :to="{ name: 'admin_etudiant_cerfa' }">Cerfa</router-link> -->
          </b-nav>
        </nav>
      </div>
    </div>

    <div v-if="table[0] == 'cef'" id="cef">
      <div>
        <h5>Espace Cef</h5>

        <nav class="mb-3">
          <b-nav vertical>
            <router-link class="nav-item" :to="{name:'cef_centreFormation_list'}">Centre de Formation</router-link>
            <router-link class="nav-item" :to="{name:'cef_promotions'}">Promotions</router-link>
            <router-link class="nav-item" :to="{name:'cef_cours'}">Intervention</router-link>
            <router-link class="nav-item" :to="{name:'cef_etudiant'}">Etudiant</router-link>
            <router-link class="nav-item" :to="{name:'cef_cursus_list'}">Cursus</router-link>
            <router-link class="nav-item" :to="{name:'cef_projet_list'}">Projets</router-link>
            <router-link class="nav-item" :to="{name:'cef_groupe_list'}">Groupes</router-link>
            <router-link class="nav-item" :to="{name:'cef_document_administratif'}">Administratif</router-link>
            <!-- <router-link class="nav-item" :to="{name:'all-intervention'}">Interventions</router-link> -->

          </b-nav>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    utilisateurService
  } from "@/_services/utilisateur.service.js";

  export default {
    name: "VerticalNavbar",
    methods: {},
    computed: {
      table: function () {
        return this.$route.path.split("/").splice(1);
      },
      isFormateur() {
        return utilisateurService.isFormateur();
      },
    },
  };
</script>
<!--<style scoped>
  /*@import './assets/styles/VerticalNavBar.css';*/

  .NavBar2 {
   width: 15%;
    float: left;
    text-align: center;
    padding: 2em;
  }

  .nav-item {
    margin: 1em;
    border: #6c757d 2px solid;
    text-decoration: none;
    color: #6c757d;
    height: 2.5em;
    line-height: 2em;
    /* ATTENTION on centre le texte verticalement "à la main"*/
  }

  .nav-item:hover {
    background-color: #6c757d;
    color: white;
    text-decoration: none;
  }

  .router-link-exact-active {
    background-color: lightgrey;
  }
</style> -->
<style scoped>
  .NavBar2 {
    width: 15%;
    float: left;
    text-align: center;
    padding: 2em;
  }

  .nav-item {
    margin-bottom: 1em;
    border-bottom: 1px solid black;
    color: black;
    height: 2.5em;
    line-height: 2em;
    /* ATTENTION on centre le texte verticalement "à la main"*/
  }

  .nav-item:first-child {
    margin-top: 1em;
  }

  .nav-item:hover {
    /* background-color: #6c757d; */
    /* color: #b3334a; */
    color: brown;
    text-decoration: none;
    font-weight: bold;
    /* margin-left: 0.5em; */
  }

  .router-link-active {
    color: brown;
    /* border-bottom: 1px solid brown; */
    font-weight: bold;
  }
</style>