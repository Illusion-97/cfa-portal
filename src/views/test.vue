<template>
    <div class="container-fluid">
        <b-card-body class="d-flex justify-content-center">
            <v-app class="w-50">
                <v-btn class="mr-4" @click="goToAdmin()" color="primary">Admin</v-btn>
                <v-btn class="mr-4" @click="goToFormateur()" color="secondary">Formateur</v-btn>
                <v-btn class="mr-4" @click="goToEtudiant()" color="success">Etudiant</v-btn>
                <v-btn class="mr-4" @click="goToTuteur()" color="error">Tuteur</v-btn>
            </v-app>
        </b-card-body>
    </div>
</template>
<script>

export default {
    name: 'test',
    data() {
        return {
            roles: this.$store.getters.getUtilisateur.rolesDto,
        };
    },
    created() {

    },
    methods: {
        goToAdmin() {
            this.$router.push({
                name: "admin",
            });
        },
        goToFormateur() {
            this.$router.push({
                name: "formateur",
            });
        },
        goToEtudiant() {
            this.$router.push({
                name: "etudiant",
            });
        },
        goToTuteur() {
            this.$router.push({
                name: "tuteur",
            });
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
  
  #saisie,.select{
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