<template>
    <div class="NavBar2">

        <div v-if="table[1] == 'espace-administratif'" id="espace-administratif">
            <h6>Mon Espace Administratif</h6>

            <div v-if="table[0] == 'etudiant'">
                <nav class="mb-3">
                    <b-nav vertical>
                        <a class="nav-item" href="/etudiant/espace-administratif/profil" v-bind:class="setActiv('/etudiant/espace-administratif/profil')">Profil</a>
                        <a class="nav-item" href="/etudiant/espace-administratif/depot-fichier" v-bind:class="setActiv('/etudiant/espace-administratif/depot-fichier')">Dépôt de Fichier</a>
                        <a class="nav-item" href="/etudiant/espace-administratif/demande-conge" v-bind:class="setActiv('/etudiant/espace-administratif/demande-conge')">Demande de congés</a>
                    </b-nav>
                </nav>    
            </div> 

            
                  
        </div>
        <div v-if="table[1] == 'espace-pedagogique'" id="espace-pedagogique">
            <h6>Mon Espace Administratif</h6>

            <div v-if="table[0] == 'etudiant'">
                <nav class="mb-3">
                    <b-nav vertical>
                        <a class="nav-item" href="/etudiant/espace-pedagogique/cursus" v-bind:class="setActiv('/etudiant/espace-pedagogique/cursus')">Mon cursus</a>
                        <a class="nav-item" href="/etudiant/espace-pedagogique/devoirs" v-bind:class="setActiv('/etudiant/espace-pedagogique/devoirs')">Devoirs</a>
                        <a class="nav-item" href="/etudiant/espace-pedagogique/notes" v-bind:class="setActiv('/etudiant/espace-pedagogique/notes')">Bulletin de notes</a>
                        <a class="nav-item" href="/etudiant/espace-pedagogique/dossierPro" v-bind:class="setActiv('/etudiant/espace-pedagogique/dossierPro')">Dossier professionel</a>
                        <a class="nav-item" href="/etudiant/espace-pedagogique/absences" v-bind:class="setActiv('/etudiant/espace-pedagogique/absences')">Absences / Retards</a>
                        <a class="nav-item" href="/etudiant/espace-pedagogique/evaluationFormation" v-bind:class="setActiv('/etudiant/espace-pedagogique/evaluationFormation')">Evaluation Formation</a>
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