<template>
  <div class="navHeader">
      <div class="pHeader nav-grid h-100 align-items-center">
        <!-- Button Role -->
        <div >
          <p></p>
        </div>

        <!-- Title  -->
        <div >
              <div class="title-header">
                <h1>Espace étudiant </h1>
              </div>
          </div>

        <!-- Button Deconnexion -->
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

export default {

data(){
    return {
      roles: this.$store.getters.getUtilisateur.rolesDto,
    }
},

methods: {
  logout() {
    authenticationApi.logout().then(() =>
      this.$router.push({
        name: "login",
      })
    );
  },
  goToRole(){
      this.$router.push({ name: "multiRole"});
  },
},
};
</script>

<style scoped>
.navHeader {
background-color: #e11b28;
Height: 6rem;
overflow: hidden;
color: white;
}

.mon-logo {
width: 7em;
position: absolute;
top: 22px;
left: 3em;
}

.btnHeader {
font-size: 25px !important;
font-weight: 500;
border: 5px;
border-radius: 4px;
min-width: 230px;
}

.nav-grid{
display: grid;
grid-template-columns: repeat(3, 1fr)
}

.grid-btn{
display: grid;
grid-template-columns: 0.5fr 0.5fr;
align-items: center;
grid-column-gap: 20px;
}

#logo2 {
width: 152px;
position: absolute;
left: 89%;
top: 3%;
filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
}
.title-header{
text-align: center;
}
.pHeader {
  font-size: 30px;
  font-family: Roboto;
  font-weight: 600;
  height: 50%;
  right: 0%;
}
</style>
