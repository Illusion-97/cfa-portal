<template>
<<<<<<< HEAD
     <div class="navHeader mb-4">
        <b-row class="pHeader h-100 d-flex align-items-center">
            <router-link class="navHeader" to="/tuteur">
                <div
      class="logo-details"
      style="margin: 6px 14px 0 14px;"
    >
      <img
        v-if="menuLogo"
        :src="menuLogo"
        alt="menu-logo"
        class="menu-logo icon"
      >
      <i
        v-else
        class="bx icon"
        :class="menuIcon"
      />
      <div class="logo_name">
        {{ menuTitle }}
      </div>
      <i
        class="bx"
        id="btn"
        @click="isOpened = !isOpened"
      />
    </div>
        </router-link>
            <b-col class=" col-9 d-flex justify-content-center">
                <div class="title-header">
                    <div v-if="isTuteur">
                        {{ path }} - Espace Tuteur
                    </div>
                </div>
            </b-col>
            <b-col class="d-flex justify-content-end">
                
                <div>
                    <button  type="button" @click="logout" class="btnHeader btn-light "><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>Déconnexion</button>
                </div>
            </b-col>    
        </b-row>
    </div>
=======
  <div class="navHeader mb-4">
    <b-row class="pHeader h-100 d-flex align-items-center">

        <!-- LOGO -->
      <div class="logo-details" style="margin: 6px 14px 0 14px">
        <img
          v-if="menuLogo"
          :src="menuLogo"
          alt="menu-logo"
          class="menu-logo icon"
        />
        <i v-else class="bx icon" :class="menuIcon" />
        <div class="logo_name">
          {{ menuTitle }}
        </div>
      </div>

      <!-- BUTTON DECONNEXION -->
      <b-col class="d-flex justify-content-end">
        <div>
          <button type="button" @click="logout" class="btnHeader btn-light">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon" />
            Déconnexion
          </button>
        </div>
      </b-col>
    </b-row>
  </div>
>>>>>>> 782b1e35b78c034422e79b19ab3c4e950e23157f
</template>


<script>
import { authenticationApi } from "@/_api/authentication.api.js";

<<<<<<< HEAD
import { utilisateurService } from "@/_services/utilisateur.service.js";
import { authenticationApi } from "@/_api/authentication.api.js";




    export default {
        name:'HeaderTuteur',
        data(){
            return {
                headerDisplay: "",
                logOut : ""+window.location.origin+"/#/login",
                title: "Bienvenue sur le portail CFA",
            }
        },
         computed: {
            
            getUtilisateur(){
                return this.$store.getters.getUtilisateur;
            },
            isTuteur() {
                return utilisateurService.isTuteur();
            },       
        },

        props: {
            
            menuTitle: {
              type: String,
              default: 'Dawan',
            },
            menuLogo: {
              type: String,
              default: '',
            },
            menuIcon: {
              type: String,
              default: 'bxl-c-plus-plus',
            },
          },

        methods: {
            logout() {
                authenticationApi
                .logout()
                .then(() => this.$router.push(
                   {name:"login"}
                ))
            },
           
        }
    }
=======
export default {
  name: "HeaderFormateur",
  props: {
    menuTitle: {
      type: String,
      default: "Dawan",
    },
    menuIcon: {
      type: String,
      default: "bxl-c-plus-plus",
    },
    menuLogo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      headerDisplay: "",
      logOut: "" + window.location.origin + "/#/login",
      title: "Bienvenue sur le portail CFA",
    };
  },
  computed: {},
  methods: {
    logout() {
      authenticationApi
        .logout()
        .then(() => this.$router.push({ name: "login" }));
    },
  },
};
>>>>>>> 782b1e35b78c034422e79b19ab3c4e950e23157f
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");
.navHeader {
  background-color: #00072d;
  overflow: hidden;
  color: white;
  height: 6rem;
}

.logo-details {
    padding-left: 5%;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}


.pHeader {
  font-size: 30px;
  font-family: Roboto;
  font-weight: 600;
  height: 50%;
  right: 0%;
}
 
.navHeader .logo-details {
    height: 100px;
    display: flex;
    align-items: center;
    position: relative;
  }



.btnHeader {
  position: relative;
  font-size: 25px !important;
  font-family: Roboto;
  font-weight: 500;
  width: 120%;
  height: 100%;
  border: 5px;
  right: 100%;
}
</style>
