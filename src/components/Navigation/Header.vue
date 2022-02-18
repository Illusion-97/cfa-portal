<template>
    <div class="navHeader d-flex justify-content-around align-items-center">
        <div class>
        </div>
        <div class="pHeader">
            <div>
                {{ title }}
            </div>
        </div>
        <div id="header" class="pHeader mr-4 "> 
           <button type="button" @click="logout" class="btnHeader btn-light"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>    Déconnexion</button>
        </div>
    </div>
</template>

<script>
import { authenticationApi } from "@/_api/authentication.api.js";
    export default {
        name:'Header',
        props : {
            title: {
                type: String,
                    default: "Bienvenue sur le portail CFA"
            }
        }, 
         methods: {
            logout() {
                authenticationApi
                .logout()
                .then(() => this.$router.push({
                name: "login"
                }));
            },
        },
    }
</script>
<style>
.navHeader{
    background-color:#00072d;
    overflow: hidden;
    color:white;
    Height: 5rem;
}

.pHeader{
    font-size: 20px;
    font-family: Roboto;
    font-weight:600;
}

.btnHeader{
    font-size: 20px !important; 
    font-family: Roboto;
    font-weight: 500;
    width: 160px;
    height: 45px;
    border: 5px;
    
}
</style>
