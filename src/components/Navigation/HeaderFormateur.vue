<template>
    <div class="navHeader">
        <b-row class="pHeader h-100 d-flex align-items-center">
            <b-col class=" col-9 d-flex justify-content-center">
                <div class="title-header">
                    <div v-if="isAdmin">
                        {{ path }} - Espace admin
                    </div>
                    <div v-if="isCEF">    
                        {{ title }} - Espace CEF
                    </div>
                    <div v-if="isFormateur">
                        {{ path }} - Espace Formateur
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
        data(){
            return {
                logOut : ""+window.location.origin+"/#/login",
                title: "Bienvenue sur le portail CFA",
            }
        },
         computed: {
            path(){
                return this.changeDisplay();
            },
            getUtilisateur(){
                return this.$store.getters.getUtilisateur;
            },
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
        methods: {
            logout() {
                authenticationApi
                .logout()
                .then(() => this.$router.push(
                   {name:"login"}
                ))
            },
            changeDisplay(){
                console.log(this.$route.path.split("/").splice(2)[0])
                // console.log(this.$route.path.split("/").splice(3)[0])
                if (this.$route.path.split("/").splice(2)[0] == 'centresFormation'){
                    if(this.$route.path.split("/").splice(2)[0] == 'centresFormation' 
                    && this.$route.path.split("/").splice(3)[0] == 'details'){
                        return "Promotion du centre ..."
                    }
                    return "Centres de formation";
                } else if (this.$route.path.split("/").splice(2)[0] == 'promotion' &&
                this.$route.path.split("/").splice(3)[0] == 'details') {
                    return "Détails d'une promotion"
                } else {
                    return this.$route.path.split("/").splice(2)[0].substring(0,1).toUpperCase()+
                    this.$route.path.split("/").splice(2)[0].substring(1)
                }
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
