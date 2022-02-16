<template>
  <div id="app">
    <div>
      <div v-if="path != 'login' && path != 'forgot-password' && path != 'reset-password'">
        <!-- <Navbar /> -->
      </div>

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
       <div v-else-if="path == 'etudiant'">
         <div>
           
         </div>
          <router-view />
      </div>
      <div v-else>
        <!-- <VerticalNavbar class="col-md-2" /> -->
        <div class="monBody col-md-10">
          <router-view />
        </div>
      </div>
    </div> 
  </div>
</template>
<script>

// import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue";
import VueSidebarFormateur from"@/components/Navigation/VueSidebarFormateur.vue";
// import Navbar from "@/components/Navigation/Navbar.vue";
import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue";
import Header from './components/Navigation/Header.vue';
export default {
  name: "App",
  components: {
    VerticalNavbar,
    // Navbar,
    // VerticalNavbar,
    Header,
    VueSidebarFormateur,
    // SinglePageEtudiant,
  },
  methods: {},
  computed: {
    path() {
      // return this.$route.path;
      return this.$route.path.split("/").splice(1)[0];
    },
    show() {
      return "true";
    },
  },

};
</script>
<style>
.monBody {
  float: right;
  padding-left: 5em;
  padding-right: 5em;
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