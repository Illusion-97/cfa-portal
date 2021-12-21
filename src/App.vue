<template>
  <div id="app">
    <div>
      <div v-if="table[0] != 'login'">
        <Navbar/>
      </div>

      <div v-if="table[0] == 'home'">
        <router-view />
      </div>
      <div v-else-if=" table[0] == 'formateur'">
        <router-view class="px-5"/>
      </div>
      <div v-else>
        <VerticalNavbar class="col-md-2" />
        <div class="monBody col-md-10">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navigation/Navbar.vue";
import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    VerticalNavbar,
  },
  methods: {},
  computed: {
    table() {
      // return this.$route.path;
      return this.$route.path.split("/").splice(1);
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
</style> -->
