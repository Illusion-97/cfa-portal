<template>
  <div class="container-fluid">
    <h1 style="font-weight: bold; font-size: 24px;">Bienvenue {{ fullName }}</h1>
    <v-app>
    <b-card-body class="d-flex justify-content-center">
      <v-container>
        <v-btn v-if="listRoles.includes('ADMIN')" class="mr-4" @click="goToAdmin()" color="primary">Admin</v-btn>
        <v-btn v-if="listRoles.includes('FORMATEUR')" class="mr-4" @click="goToFormateur()" color="warning">Formateur</v-btn>
        <v-btn v-if="listRoles.includes('TUTEUR')" class="mr-4" @click="goToTuteur()" color="success">Tuteur</v-btn>
        <v-btn v-if="listRoles.includes('ETUDIANT')" class="mr-4" @click="goToEtudiant()" color="error">Etudiant</v-btn>
      </v-container>
    </b-card-body>
    </v-app>
  </div>
</template>
<script>

export default {
  name: 'test',
  data() {
    return {
      fullName : this.$store.getters.getUtilisateur.fullName,
      roles: this.$store.getters.getUtilisateur.rolesDto,
      listRoles: [],
    };
  },
  async created() {
    await this.fullName;
    console.log(this.fullName)
    await this.roles;
    this.roles.forEach(element => {
      this.listRoles.push(element.intitule);
    });
  },
  methods: {
    goToAdmin() {
      this.$router.push("admin");
    },
    goToFormateur() {
      this.$router.push("formateur");
    },
    goToEtudiant() {
      this.$router.push("etudiant");
    },
    goToTuteur() {
      this.$router.push("tuteur");
    },
  }
}
</script>
<style>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list>form {
  width: 50%;
}

#saisie,
.select {
  border-radius: 20px;
  width: 400px;
  /* background: #000; */
}

.btn-submit {
  border: 0;
  background-color: inherit;
  border-radius: 100%;
  width: 2.5em;
  margin-left: -3em;
}

#groupe-input {
  width: 50%;
}

.table th {
  border-top: 0;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

.delete-input:hover {
  cursor: pointer;
}

#main-cr-prj {
  background-color: none;
  margin: 0% 0% 0% 3%;
  min-width: 1170px;
  min-height: 100%;
}

.v-btn-toggle {
  width: 14%;
}

#btn-retour {
  margin-left: 94%;
}

#x {
  margin: 0% 2% 0% 0%;
}
</style>