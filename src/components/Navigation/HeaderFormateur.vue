<template>
    <div class="navHeader">
        <b-row class="pHeader h-100 d-flex align-items-center">
            <b-col class=" col-9 d-flex justify-content-center">
                <div class="title-header">
                    <!-- <div class="text-center">{{ title }}</div> -->
                    <div class="text-center">{{subTitle}}</div>
                    <div v-if="isAdmin">
                        {{ title }} - admin
                    </div>
                    <div v-if="isCEF">    
                        {{ title}} - CEF
                    </div>
                </div>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <div>
                    <button  type="button" @click="logout" class="btnHeader btn-light "><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>    Déconnexion</button>
                </div>
            </b-col>    
        </b-row>
    </div>
</template>

<script>
import { authenticationApi } from "@/_api/authentication.api.js";
import { utilisateurService } from "@/_services/utilisateur.service.js";
    export default {
        name:'HeaderFormateur',
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
        props : {
            title: {
                type: String,
                    default: "Bienvenue sur le portail CFA"
            },
             subTitle: {
                type: String,
                default: ""
            }
        }, 
        data(){
            return{
                logOut : ""+window.location.origin+"/#/login"
            }
        },
         methods: {

            logout() {
              
                authenticationApi
                .logout()
                .then(() => this.$router.push(
                   {name:"login"}
                ))
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
