<template>
  <header>
    <b-navbar toggleable="lg" class="navbar">
      <b-navbar-brand href="#">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/institutionnel-logo.png" alt="" id="dawan_logo" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" class="border-0"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/" class=" a-link">Home</b-nav-item>
          <b-nav-item class=" a-link" to="/espace-pedagogique">
            Espace pedagogique
          </b-nav-item>
          <b-nav-item class=" a-link" to="/espace-administrative">
            Espace administrative
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form class="nav-form">
            <b-form-input
              size="sm"
              class="mr-sm-2 input-search"
              placeholder="Search"
              style="width:200px;"
            />
            <b-button
              size="sm"
              class="my-2 my-sm-0 px-4 btn-search"
              type="submit"
              variant="danger"
            >
              Search
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <Breadcrumb /> -->
  </header>
</template>

<script>
// import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";
export default {
  name: "Navbar",
  components: {
    // Breadcrumb,
  },
};
</script>

<style scoped>
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
