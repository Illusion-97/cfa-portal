<template>
    <div class="NavBar2">

        <div v-if="table[1] == 'espace-administratif'" id="espace-administratif">
            <h6>Mon Espace Administratif</h6>

            <div v-if="table[0] == 'etudiant'">
                <nav class="mb-3">
                    <b-nav vertical>
                        <router-link class="nav-item" :to="{name:'etudiant_profil'}">Profil</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_documents_administratifs'}">Documents administratifs</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_conge'}">Demande de congés</router-link>
                    </b-nav>
                </nav>    
            </div> 

            
                  
        </div>
        <div v-if="table[1] == 'espace-pedagogique'" id="espace-pedagogique">
            <h6>Mon Espace Pedogique</h6>

            <div v-if="table[0] == 'etudiant'">
                <nav class="mb-3">
                    <b-nav vertical>
                        <router-link class="nav-item" :to="{name:'etudiant_espace-peda_cursus'}">Mon cursus</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_espace-peda_devoirs'}">Devoirs</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_espace-peda_notes'}">Bulletin de notes</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_espace-peda_dossier-pro'}">Dossier professionel</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_espace-peda_absences'}">Absences / Retards</router-link>
                        <router-link class="nav-item" :to="{name:'etudiant_espace-peda_evaluation-formation'}">Evaluation Formation</router-link>
                    </b-nav>
                </nav>    
            </div> 

            
                  
        </div>
        <div v-if="table[0] == 'referent'" id="referent">
            <h6>Mon Espace</h6>

            
                <nav class="mb-3">
                    <b-nav vertical>
                        <router-link class="nav-item" :to="{name:'referent_dashboard'}">Home</router-link>
                        <router-link class="nav-item" :to="{name:'referent_cours'}">Cours</router-link>
                        <router-link class="nav-item" :to="{name:'referent_etudiant'}">Etudiant</router-link>
                        <router-link class="nav-item" :to="{name:'referent_notes'}">Notes</router-link>
                        <router-link class="nav-item" :to="{name:'referent_document-administratif'}">Administratif</router-link>
                        <router-link class="nav-item" :to="{name:'referent_absence-retard'}">Absences / Retards</router-link>
                        <router-link class="nav-item" :to="{name:'referent_groupe-projet'}">Groupes / Projets</router-link>
                    </b-nav>
                </nav>    
                  
        </div>

        <div v-if="table[0] == 'admin'" id="admin">
            <h6>Mon Espace Admin</h6>
            
                <nav class="mb-3">
                    <b-nav vertical>
                        <router-link class="nav-item" :to="{name:'admin_dashboard'}">Home</router-link>
                        <router-link class="nav-item" :to="{name:'referent_cours'}">Cours</router-link>
                        <router-link class="nav-item" :to="{name:'referent_etudiant'}">Etudiant</router-link>
                        <router-link class="nav-item" :to="{name:'referent_notes'}">Notes</router-link>
                        <router-link class="nav-item" :to="{name:'referent_document-administratif'}">Administratif</router-link>
                        <router-link class="nav-item" :to="{name:'referent_absence-retard'}">Absences / Retards</router-link>
                        <router-link class="nav-item" :to="{name:'referent_groupe-projet'}">Groupes / Projets</router-link>
                        <router-link class="nav-item" :to="{name:'admin_conge_list'}">Congés</router-link>
                        <router-link class="nav-item" :to="{name:'admin_examen_list'}">Examens</router-link>
                    </b-nav>
                </nav>    
                  
        </div>
        
    </div>
</template>

<script>
export default {
  name: "VerticalNavbar",
  methods: {
  },
  computed: {
    table : function(){
      return this.$route.path.split('/').splice(1);
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

    .router-link-exact-active{
        background-color: lightgrey;
    }
</style>