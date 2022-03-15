<template>
  <div id="app">
    <div>
      <div v-if="path == 'home'">
        <router-view />
      </div>
      <div v-else-if="path == 'formateur'">
          <div>
          <Header />
          </div>
          <div>
             <VueSidebarFormateur />
          </div>
          <router-view class="px-5" />
      </div>
      <div v-else-if="path == 'etudiant'" id="mainEtudiant">
        <HeaderEtudiant />
        <NavEtudiant />
        <router-view />
        <FooterEtudiant />
      </div>
        <div v-else-if="path == 'admin' || path == 'referent' || path == 'cef'" >
          <Navbar />
          <VerticalNavbar class="col-md-2" />
          <div class="monBody col-md-10">
            <router-view />
          </div>
      </div>
      <div v-else >
          <div class="monBody col-md-10">
            <router-view />
          </div>
      </div>
    </div> 
  </div>
</template>
<script>

import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue";
import VueSidebarFormateur from"@/components/Navigation/VueSidebarFormateur.vue";
import Navbar from "@/components/Navigation/Navbar.vue";

import Header from './components/Navigation/Header.vue';

import FooterEtudiant from "@/components/Etudiant/FooterEtudiant.vue";
import NavEtudiant from "@/components/Etudiant/NavEtudiant.vue";
import HeaderEtudiant from "@/components/Etudiant/HeaderEtudiant.vue";

export default {
  name: "App",
  components: {
     Navbar,
     VerticalNavbar,
    Header,
    VueSidebarFormateur,
    FooterEtudiant,
    NavEtudiant,
    HeaderEtudiant
  },
  methods: {},
  computed: {
    path() {
      // return this.$route.path;
      return this.$route.path.split("/").splice(1)[0];
    }
  },

};
</script>
<style>
.monBody {
  float: right;
  padding-left: 5em;
  padding-right: 5em;
}
#mainEtudiant {
  min-height: calc(100vh - 13.2em);
  position: relative;
}
</style>
<!--
<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    email: "test",
                    password: "test"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>
-->