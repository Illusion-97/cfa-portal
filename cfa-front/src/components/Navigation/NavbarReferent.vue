<template>
  <header>
    <b-navbar toggleable="lg" class="navbar">
      <b-navbar-brand href="#">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/img/institutionnel-logo.png" alt="" id="dawan_logo" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" class="border-0"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        
        <b-navbar-nav>
          <b-nav-item href="/" class=" a-link">Home</b-nav-item>
              <b-nav-item class=" a-link" href="/referent/dashboard">
                  Promotion
              </b-nav-item>
              <b-nav-item class=" a-link" href="/referent/cours">
                  Cours
              </b-nav-item>
              <b-nav-item class=" a-link" href="/referent/etudiants">
                  Etudiant
              </b-nav-item>
              <b-nav-item class=" a-link" href="/referent/notes">
                  Notes
              </b-nav-item>
              <b-nav-item class=" a-link" href="/referent/administratif">
                  Administratif
              </b-nav-item>
              <b-nav-item class=" a-link" href="/referent/absence-retard">
                  Absences / Retards
              </b-nav-item>
              <b-nav-item class=" a-link" href="/referent/groupe-projet">
                  Groupes / Projets
              </b-nav-item>
        </b-navbar-nav>      
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "NavbarReferent",
  components: {
  },
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
  /*@import './assets/styles/NavBar.css';*/

  header {
    margin-bottom: 50px;
  }

  .navbar {
    margin-top: 3em;
    height: 4em;
    background-color: #212529;
    /* width: 70%; */
  }
  
  .a-link,
  .nav-form {
    background-color: #212529;
  }
  
  .navbar-light .navbar-nav .nav-link {
    color: #fff;
    font-size: 20px;
  }
  
  .input-search {
    background-color: #212529;
    border: none;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    outline: none;
    color: rgba(255, 255, 255, 0.877);
  }
  
  .input-search:focus {
    outline: solid #212529
  }
  
  .input-search::placeholder {
    color: rgb(168, 168, 168);
    font-size: 15px;
  }
  
  .btn-search {
    background-color: rgba(226, 27, 40, 0.65);
    border: none;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
  }
  
  
  @media (max-width: 990px) {
    .navbar {
      width: 100%;
      margin: 0;
    }
  
    #dawan_logo {
      display: none;
    }
  
    .nav-form {
      justify-content: center;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
    }
  }
</style>

