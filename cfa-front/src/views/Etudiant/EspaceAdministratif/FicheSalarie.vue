<template>
    <div>
        <router-link class="router-link" :to="{name:'etudiant_profil'}"> <font-awesome-icon :icon="['fas', 'angle-left']" />  Retour au Profil</router-link>
        <BodyTitle title="Fiche de Salarié" />
    </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
    name: "FicheSalarie",
    components: {
        BodyTitle,
    },
}
</script>

<style scoped>
.router-link{
    color: black;
}
</style>