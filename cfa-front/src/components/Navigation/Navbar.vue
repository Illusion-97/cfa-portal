<template>
  <section>
    <nav class="navbar navbar-expand-lg" id="mainNav">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/home">
          <img
            src="@/assets/img/institutionnel-logo.png"
            alt="logo"
            style="width:50%"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars ml-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase mx-auto py-4 py-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'home' }"
                :class="{ 'router-link-active': false }"
                >Accueil</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'etudiant_espace-peda_accueil' }"
                v-if="isEtudiant"
              >
                Espace Pédagogique</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'etudiant_administratif' }"
                v-if="isEtudiant"
              >
                Espace Administratif</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'formateur' }"
                v-if="isFormateur"
              >
                Espace formateur</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'referent_dashboard' }"
                v-if="isReferent"
              >
                Espace Référent</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'admin_dashboard' }" v-if="isAdmin">
                Espace Administrateur
              </router-link>
            </li>
            <li class="nav-item" id="on-responsive">
              <a @click="logout" class="nav-link logout" href="#">
                Déconnexion
                <b-icon icon="box-arrow-right"></b-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>
<script src="@/assets/js/script.js"></script>
<script>
import { authenticationApi } from "@/_api/authentication.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";

export default {
  name: "navbar",
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
      authenticationApi
        .logout()
        .then(() => this.$router.push({ name: "login" }));
    },
  },
};
</script>

<style scoped src="@/assets/styles/navbar.css"></style>
