<template>
  <div class="navHeader ">
    <div class="nav-grid">
      <!-- LOGO -->
      <div class="logo" >
        <img src="../../../src/assets/img/institutionnel-logo.png"
             alt="Menu Icon" class="img">
      </div>

      <div class="title-header">
        <h1>Espace Tuteur</h1>
      </div>

      <!-- BUTTON DECONNEXION -->
        <div class="grid-btn">
          <div class="flex-btn-role">
            <button v-if="roles.length > 1" type="button" @click="goToRole"  class="role-btn btn-light">
              <font-awesome-icon :icon="['fas', 'user']" /> Roles
            </button>
          </div>

          <div class="flex-btn-logout">
            <button type="button" @click="logout" class="logout-btn btn-light">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon" />
              Déconnexion
            </button>
          </div>
        </div>
    </div>
  </div>
</template>


<script>
import { authenticationApi } from "@/_api/authentication.api.js";
import  Icon  from '../../assets/img/LOGO.png';
export default {
  name: "HeaderFormateur",
  props: {
    menuTitle: {
      type: String,
      default: "Dawan",
    },
    menuIcon: {
      type: String,
      default: Icon,
    },
    menuLogo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      roles: this.$store.getters.getUtilisateur.rolesDto,
      headerDisplay: "",
      logOut: "" + window.location.origin + "/#/login",
      title: "Bienvenue sur le portail CFA",
    };
  },
  computed: {},
  methods: {
    goToRole() {
      this.$router.push({ name: "multiRole" });
    },
    logout() {
      authenticationApi
        .logout()
        .then(() => this.$router.push({ name: "login" }));
    },
  },
};
</script>

<style scoped>


.navHeader {
  background-color: #00072d;
  overflow: hidden;
  color: white;
  height: 6rem;
}
.nav-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
}
.grid-btn{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.logo{
  display: flex;
  align-items: center;
  padding-left: 60px;
}
.img{
  height: 90px; width: 90px
}

.title-header{
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-header{
  display: flex;
  align-items: center;
  justify-content: right ;
  padding-right: 30px;
}
.flex-btn-logout{
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout-btn{
  font-size: 20px !important;
  font-weight: 500;
  border: 5px;
  border-radius: 4px;
  height: 30px;
  min-width: 180px !important;
}

.flex-btn-role{
  display: flex;
  align-items: center;
  justify-content: right;
}
.role-btn{
  font-size: 20px !important;
  font-weight: 500;
  border: 5px;
  border-radius: 4px;
  min-width: 110px;
}



</style>
