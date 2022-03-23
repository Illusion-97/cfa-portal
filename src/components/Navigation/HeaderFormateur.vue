<template>
    <!-- <div class="navHeader d-flex justify-content-center">
       <div class="d-flex">
            <div class="d-flex align-items-center">
                {{ title }}
            </div>
       </div>
        <div class="pHeader mr-4"> 
           <button type="button" @click="logout" class="btnHeader btn-light"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>    Déconnexion</button>
        </div>
    </div> -->
    <div class="navHeader">
        <b-row class="pHeader h-100 d-flex align-items-center">
            <b-col class=" col-9 d-flex justify-content-center">
                <div class="title-header">
                    {{ title }}
                </div>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <div>
                    <button type="button" @click="logout" class="btnHeader btn-light "><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>    Déconnexion</button>
                </div>
            </b-col>    
        </b-row>
    </div>
</template>

<script>
import { authenticationApi } from "@/_api/authentication.api.js";
    export default {
        name:'HeaderFormateur',
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
<style scoped>
.navHeader{
    background-color:#00072d;
    overflow: hidden;
    color:white;
    Height: 6rem;
}

.pHeader{
    font-size: 30px;
    font-family: Roboto; 
    font-weight:600; 
    height: 50%;
    right: 0%;
    
}

.btnHeader{
    position: relative;
    font-size: 25px !important; 
    font-family: Roboto;
    font-weight: 500;
    width: 120%;
    height: 100%;
    border: 5px; 
    right: 100%
}

</style>
