<template>
  <v-card id="wdg2" style="width: 40rem;">
    <v-form ref="form" v-model="valid" >
      <v-card-title class="card-title">
        <h2>Login Dg2</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            id="e-mail-wdg2"
            name="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            v-model="logInUser.email"
            required
            color="grey"
          ></v-text-field>
          <v-text-field
            id="password-wdg2"
            name="password"
            placeholder="Mot de passe"
            v-model="logInUser.password"
            type="password"
            color="grey"
            required
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn btn-danger" text @click="close">
          Annuler
        </v-btn>
        <v-btn
          id="button-login-wdg2"
          color="red darken-1"
          class="btn btn-primary fa-pull-right"
          text
          @click="loginWdg2"
          :disabled="!valid"
        >
          Connexion
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
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

<style lang="scss">
#wdg2 {
  padding: 2rem;
}
</style>
