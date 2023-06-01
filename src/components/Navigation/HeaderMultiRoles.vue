<template>
    <div class="navHeader mb-4">
        <b-row class="pHeader h-100 d-flex align-items-center">

            <!-- LOGO -->
            <div class="logo-details" style="margin: 6px 14px 0 14px">
                <img v-if="menuLogo" :src="menuLogo" alt="menu-logo" class="menu-logo icon" />
                <i v-else class="bx icon" :class="menuIcon" />
                <div class="logo_name">
                    {{ menuTitle }}
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
    background-color: #ff9900;
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

.Titre {
    width: 45%;
    text-align: right;
}
</style>
  