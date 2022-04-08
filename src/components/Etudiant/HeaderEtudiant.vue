<template>
  <header>
    <img
      src="@/assets/img/institutionnel-logo.png"
      alt="logo"
      class="mon-logo"
    />
    <img
      src="@/assets/img/institutionnel-logo.png"
      alt="logo"
      class="mon-logo"
    />
    <div class="redBanner">
      <h1>Espace étudiant</h1>
      <b-button size="sm" type="button" @click="logout">
        <font-awesome-icon :icon="['fas', 'power-off']" />
        Déconnexion</b-button
      >
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
  min-height: 150px;
}

h1 {
  color: white;
  position: relative;
  top: 1.76em;
  left: 4.4em;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.mon-logo {
  width: 7em;
  position: absolute;
  top: 22px;
  left: 3em;
}

button {
  position: absolute;
  right: 60px;
  top: 100px;
  background-color: #e11b28;
  border: none;
}

button:hover {
  background-color: #e11b28;
  border: none;
}

button svg {
  margin-right: 5px;
}

#logo2 {
  width: 152px;
  position: absolute;
  left: 89%;
  top: 3%;
  filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
}
</style>
