<template>
    <div class="NavBar2">

        <div v-if="table[1] == 'EspaceAdministratif'" id="espace-administratif">
            <h6>Mon Espace Administratif</h6>

            <div v-if="table[0] == 'Etudiant'">
                <nav class="mb-3">
                    <b-nav vertical>
                        <a class="nav-item" href="/Etudiant/EspaceAdministratif" v-bind:class="setActiv('/Etudiant/EspaceAdministratif')">Profil</a>
                        <a class="nav-item" href="/Etudiant/EspaceAdministratif/DepotFichier" v-bind:class="setActiv('/Etudiant/EspaceAdministratif/DepotFichier')">Dépôt de Fichier</a>
                        <a class="nav-item" href="/Etudiant/EspaceAdministratif/DemandeConge" v-bind:class="setActiv('/Etudiant/EspaceAdministratif/DemandeConge')">Demande de congés</a>
                    </b-nav>
                </nav>    
            </div>       

                
        </div>
        
    </div>
</template>

<script>
export default {
  name: "VerticalNavbar",
  methods: {
    setActiv(path){
      if(path == this.$router.currentRoute.fullPath)
        return 'active';
    }
  },
  computed: {
    table : function(){
      return this.$router.currentRoute.fullPath.split('/').splice(1);
    },
  }
};
</script>

<style scoped>
    /*@import './assets/styles/VerticalNavBar.css';*/

    .NavBar2{/*
        background-color: lightgreen;*/
        width: 15%;
        float: left;
        text-align: center;
        padding: 2em;
    }

    .nav-item{
        margin: 1em;
        border: #6c757d 2px solid;
        text-decoration: none;
        color: #6c757d;
        height: 2.5em;
        line-height: 2em; /* ATTENTION on centre le texte verticalement "à la main"*/
    }
    .nav-item:hover{
        background-color: #6c757d;
        color: white;
        text-decoration: none;
    }

    .active{
        background-color: lightgrey;
    }
</style>