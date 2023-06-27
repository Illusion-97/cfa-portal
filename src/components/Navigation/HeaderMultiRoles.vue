<template>
    <div class="navHeader">
        <b-row class="pHeader align-items-center">

            <!-- LOGO -->
            <div class="logo-details" style="margin: 6px 14px 0 14px">
                <!-- <img v-if="menuLogo" :src="menuLogo" alt="menu-logo" class="menu-logo icon" />
                <i v-else class="bx icon" :class="menuIcon" />
                <div class="logo_name">
                    {{ menuTitle }}
                </div> -->
                <div>
                    <img :src="menuIcon" alt="Menu Icon" style="font-size: 40px;">
                </div>
            </div>

            <div class="Titre">
                <h1>Choisissez un rôle</h1>
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
  display: flex;
  align-items: center;
  margin-bottom: 5%;
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
    font-weight: 500;
    width: 120%;
    height: 100%;
    border: 5px;
    right: 100%;
    border-radius: 4px;
}

.Titre {
    width: 45%;
    text-align: right;
}
</style>
  