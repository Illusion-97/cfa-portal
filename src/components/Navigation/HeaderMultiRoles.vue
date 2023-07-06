<template>
    <div class="navHeader">

          <div class="nav-grid">
            <!-- LOGO -->
            <div class="logo" >
              <img src="../../../src/assets/img/institutionnel-logo.png"
                   alt="Menu Icon" class="img">
            </div>

            <div class="title-header">
                <h1>Choisissez un rôle</h1>
            </div>

            <!-- BUTTON DECONNEXION -->
            <div class="btn-header">
              <button type="button" class="logout-btn btn-light" @click="logout" >
                <font-awesome-icon :icon="['fas', 'sign-out-alt']"/>
                Déconnexion
              </button>
            </div>

          </div>
    </div>
</template>
<script>
import { authenticationApi } from "@/_api/authentication.api.js";
export default {
    name: "HeaderFormateur",
    props: {
        menuTitle: {
            type: String,
            default: "Dawan",
        },
        menuLogo: {
            type: String,
            default: "",
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
.logout-btn{
  font-size: 20px !important;
  font-weight: 500;
  border: 5px;
  border-radius: 4px;
  height: 30px;
  min-width: 180px !important;
}
</style>
  