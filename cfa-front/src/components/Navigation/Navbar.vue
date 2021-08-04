<template>
  <header>
    <router-link :to="{name:'home'}">
      <img src="@/assets/img/institutionnel-logo.png" alt="dawan-logo" id="dawan_logo" class="img-fluid"
        style="margin-left:1em;margin-top:1em;width:50%;" />
    </router-link>
    <nav class="navbar navbar-expand-lg">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'home'}">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'etudiant_espace-peda_accueil'}" v-if="isEtudiant">Espace
              Pédagogique</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'etudiant_profil'}" v-if="isEtudiant">
              Espace Administratif</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'referent_dashboard'}">
              Espace Référent</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'admin_dashboard'}">
              Espace Administrateur </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a @click="logout" class="nav-link" href="#">
            <!-- <font-awesome-icon :icon="['fas', 'power-off']" class="icon" /> -->
            <!-- <b-icon icon="power"></b-icon> -->
            Déconnexion
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import { authenticationApi} from "@/_api/authentication.api.js"
  import { utilisateurService } from "@/_services/utilisateur.service.js"
  export default {
    name: "Navbar",
    components: {},
    computed: {
      isAdmin() {
        return utilisateurService.isAdmin();
      },
      isCEF() {
        return utilisateurService.isCEF();
      },
      isReferent() {
        return utilisateurService.isReferent();
      },
      isFormateur() {
        return utilisateurService.isFormateur();
      },
      isEtudiant() {
        return utilisateurService.isEtudiant();
      },
    },
    methods: {
      logout() {
        authenticationApi.logout()
          .then(() => this.$router.push({
            name: 'login'
          }));
      }
    }
  };
</script>
<!--<style scoped src="@/assets/styles/NavBar.css">
</style>-->
<style scoped>

  header {
    margin-bottom: 50px;
    display: flex;
  }

  nav {
    margin: 0 auto;
  }

  .navbar {
    margin-top: 2em;
    height: 4em;
    /* background-color: #212529; */
    width: 70%;
  }

  .nav-link {
    color: rgb(0, 0, 0) !important;
    font-size: 20px;
    text-transform: uppercase !important;
    font-weight: bold;
  }

  .nav-link:hover {
    text-decoration: underline;
  }


  @media (max-width: 990px) {
    .navbar {
      width: 100%;
      margin: 0;
    }

    #dawan_logo {
      display: none;
    }

    .nav-form {
      justify-content: center;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
    }
  }
</style>