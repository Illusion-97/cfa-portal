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
           <button type="button" @click="logout" class="btn btn-light"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>    Déconnexion</button>
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
        }
    }
</script>
<style scoped>
.navHeader{
    background-color:#00072d;
    overflow: hidden;
    color:white;
    Height: 4rem;
}

.pHeader{
    font-size: 20px;
    font-family: Roboto;
    font-weight:600;
}

.btn{
    font-size: 20px !important; 
    font-family: Roboto;
    font-weight:600;
    width: 160px;
    border: 5px;
    padding: 0.375rem 0.75rem !important;
}
</style>
