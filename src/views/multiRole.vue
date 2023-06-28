<template>
  <div class="container-fluid">
    <h1 style="font-weight: bold; font-size: 24px;" class="d-flex justify-content-center">Bienvenue {{ fullName }}</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" v-for="item in listRoles" :key="item.id">
          <v-app id="inspire">
            <v-card class="mx-auto" max-width="400">
              <v-img class="white--text align-end" height="200px" :src="require('@/assets/img/' + item + '.jpg')"
                :lazy-src="require('@/assets/img/' + item + '.jpg')">
              </v-img>
              <v-card-title>Espace {{ item }}</v-card-title>
              <v-card-text class="text--primary">
                <div>{{ description(item) }}</div>
              </v-card-text>
              <v-card-actions class="text-center">
                <v-btn v-if="listRoles.includes(item)" class="mx-auto" @click="goToRole(item)" color="primary">
                  Accéder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-app>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

export default {
  name: 'test',
  data() {
    return {
      fullName: this.$store.getters.getUtilisateur.fullName,
      roles: this.$store.getters.getUtilisateur.rolesDto,
      listRoles: [],
    };
  },
  async created() {
    await this.fullName;
    await this.roles;
    this.roles.forEach(element => {
      this.listRoles.push(element.intitule.toLowerCase());
    });
  },
  methods: {
    description(role) {
      if (role == "etudiant")
        return "L'étudiant peut consulter son planning, gérer son dossier professionnel ainsi que ses dossiers projets..."
      else if (role == "formateur")
        return "Le formateur peut consulter, gérer ses interventions et consulter les promotions qui lui sont attribuées"
      else if (role == "tuteur")
        return "Le tuteur peut consulter la liste des étudiants qui lui sont attribuées"
      else if (role == "admin")
        return "L'admin peut consulter, ajouter, supprimer, mettre à jour toutes les données"
    },
    goToRole(role) {
      this.$router.push(role);
    },
  }
}
</script>
<style></style>