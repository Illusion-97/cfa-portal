<template>
  <header>
    <router-link :to="{name:'home'}">
      <img src="@/assets/img/institutionnel-logo.png" alt="dawan-logo" id="dawan_logo" />
    </router-link>
    <nav class="navbar navbar-expand-lg">
      <a data-toggle="collapse" href="#navbarNav" aria-controls="navbarNav" aria-expanded="false" id="toggle" >
        <font-awesome-icon :icon="['fas','bars']" class="text-dark"></font-awesome-icon>
      </a>
      <div class="mx-auto" id="navbarNav">
        <ul class="navbar-nav">
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
          <li class="nav-item" id="on-responsive">
            <a @click="logout" class="nav-link" href="#">
              Déconnexion
              <b-icon icon="box-arrow-right"></b-icon>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
  const nav = document.getElementById('navbarNav')
  const width = screen.width
  if (width < 1388)
    nav.className = "bg-danger"
  else
    nav.className = "bg-success"
</script>

<script>
  import {
    authenticationApi
  } from "@/_api/authentication.api.js"
  import {
    utilisateurService
  } from "@/_services/utilisateur.service.js"
  export default {
    name: "Navbar",
    components: {},
    computed: {
      collapse() {
        const width = screen.width
        console.log(width);
        switch (width) {
          case 1388:
            return 'bg-dark'
          default:
            return 'bg-danger'
        }
      },
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
    margin-bottom: 4em;
    display: flex;
  }

  #dawan_logo {
    margin-left: 1em;
    margin-top: 1em;
    width: 50%;
  }

  .navbar {
    margin-top: 2em;
    height: 4em;
    /* background-color: #212529; */
    width: 100%;
  }

  #toggle {
    font-size: 25px;
    display: none;
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



  @media (max-width: 1388px) {
    .navbar {
      margin-top: 0;
      height: 100%;
      text-align: center;
      /* justify-content: center; */
    }

    #toggle {
      position: relative;
      display: block;
    }

    #navbarNav {
      margin: 0 auto;
    }

    .navbar-expand-lg .navbar-nav {
      flex-direction: column;
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