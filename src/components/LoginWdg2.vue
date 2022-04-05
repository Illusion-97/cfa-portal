<template>
  <div class="card" id="wdg2" style="width: 40rem;">
    <form ref="form">
      <div class="card-title">
        <h2>Login Dg2</h2>
      </div>
      <div class="card-text">
        <div class="container">
          <input
            id="e-mail-wdg2"
            name="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            v-model="logInUser.email"
            required
            color="grey"
          />
          <input
            id="password-wdg2"
            name="password"
            placeholder="Mot de passe"
            v-model="logInUser.password"
            type="password"
            color="grey"
            required
          />
        </div>
      </div>
      <div class="card-body">
        <br>
        <button class="btn btn-danger" text @click="close">
          Annuler
        </button>
        <button
          id="button-login-wdg2"
          color="error"
          class="btn btn-primary fa-pull-right"
          text
          
          @click="loginWdg2"
          :disabled="!valid"
        >
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import LogInUser from "../models/LogInUser"

export default {
  name: "LoginWdg2",
  data: () => ({
    valid: true,
    logInUser: new LogInUser(null, null),
    defaultItem: new LogInUser(null, null),
    // emptyField: [(v) => !!v || i18n.t("errorFrontEnd.requiredField")],
  }),
  watch: {
  },
  mounted() {},
  methods: {
    close() {
      this.$nextTick(() => {
        this.logInUser = Object.assign({}, this.defaultItem);
      });
      this.$refs.form.reset();
      this.$emit('wdg2Close', false);
    },
    loginWdg2() {
      if (this.$refs.form.validate()) {
        this.$emit('logInUser', this.logInUser);
      }
    }
  },
};
</script>

<style src="@/assets/styles/LogDg2.css">
#wdg2 {
  padding: 2rem;
}
</style>
