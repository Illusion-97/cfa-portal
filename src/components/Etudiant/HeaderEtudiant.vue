<template>
  <header>
    <img
      src="@/assets/img/institutionnel-logo.png"
      alt="logo"
      class="mon-logo"
    />
    <div class="redBanner">
      <h1>Espace étudiant</h1>
      <button type="button" @click="logout" class="btn btn-light">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon" />
        Déconnexion
      </button>
    </div>
  </header>
</template>

<script>
import { authenticationApi } from "@/_api/authentication.api.js";

export default {
  methods: {
    logout() {
      authenticationApi.logout().then(() =>
        this.$router.push({
          name: "login",
        })
      );
    },
  },
};
</script>

<style scoped>
.redBanner {
  background-color: #e11b28;
  width: 100%;
  padding: 25px 0 30px 100px;
  display: flex;
  justify-content: space-between;
}

h1 {
  color: white;
  position: relative;
  top: 46px;
  left: 70px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.mon-logo {
  width: 7em;
  margin-left: 3em;
  margin-right: 15em;
  position: absolute;
  top: 22px;
}

.btn-light {
  margin: 80px 50px 0 0;
  background-color: #e9ecef;
}

#logo2 {
  width: 152px;
  position: absolute;
  left: 89%;
  top: 3%;
  filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
}
</style>
