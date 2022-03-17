<template>
    <header>
        <img src="@/assets/img/institutionnel-logo.png" alt="logo" class="mon-logo" />
        <div class="redBanner">
            <h1>Espace étudiant</h1>
            <button type="button" @click="logout" class="btn btn-light"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>    Déconnexion</button>
        </div>
    </header>
</template>

<script>
    import { authenticationApi } from "@/_api/authentication.api.js";

    export default {
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
    .redBanner {
        background-color: #e11b28;
        width: 80vw;
        padding: 100px 0 30px 100px;
        border-radius: 10px 0 0 10px;
        display: flex;
        justify-content: space-between;
    }

    h1 {
        color: white;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .mon-logo {
        width: 7em;
        margin-left: 5em;
        margin-right: 15em;
    }

    .btn-light {
        margin: 80px 50px 0 0;
    }
</style>
