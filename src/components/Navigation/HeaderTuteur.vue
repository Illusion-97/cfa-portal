<template>
  <div class="navHeader ">
    <div class="grid-header align-items-center">
      <!-- LOGO -->
      <div class="logo-details" style="margin: 6px 14px 0 14px;">
        <!-- <img v-if="menuLogo" :src="menuLogo" alt="menu-logo" class="menu-logo icon" />
        <i v-else class="bx icon" :class="menuIcon"  style="font-size: 40px;" /> -->
          <div>
            <img :src="menuIcon" alt="Menu Icon" style="font-size: 40px;">
          </div>
        <!-- <div class="logo_name" style="font-size: 24px;">
          {{ menuTitle }}
        </div> -->
      </div>

      <div class="Titre">
        <h1>Espace Tuteur</h1>
      </div>

      <!-- BUTTON DECONNEXION -->
        <div  class="grid-btn">
          <div style="text-align: right">
            <button v-if="roles.length > 1" type="button" @click="goToRole" class="btnHeader btn-light">
              <font-awesome-icon :icon="['fas', 'user']" /> Roles</button>
          </div>

          <div>
            <button type="button" @click="logout" class="btnHeader btn-light">
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");

.navHeader {
  background-color: #00072d;
  color: white;
  height: 6rem;
}
.grid-header{
  display: grid;
  grid-template-columns: repeat(3,1fr);
}
.grid-btn{
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  align-items: center;
  grid-column-gap: 20px;
}
.logo-details {
  padding-left: 5%;
  display: flex;
  align-items: center;
  margin-bottom: 5%;
}


.pHeader {
  font-size: 30px;
  font-weight: 600;
  height: 50%;
  right: 0%;
}

.navHeader .logo-details {
  height: 6rem;
}

.logo_name{


}
.btnHeader {
  font-size: 25px !important;
  font-weight: 500;
  border: 5px;
  border-radius: 4px;
  min-width: 230px;
}

.Titre {
  text-align: center;
}


</style>
