<template>
  <div class="card" id="wdg2">
    <form ref="form">
      <div class="card-title">
        <span class="headline">title</span>
      </div>
      <div class="card-text">
        <div class="container">
          <text-field
            id="e-mail-wdg2"
            v-model="logInUser.email"
            :rules="emptyField"
            required
            color="grey"
          >email</text-field>
          <text-field
            id="password-wdg2"
            v-model="logInUser.password"
            :rules="emptyField"
            type="password"
            color="grey"
            required
          >mdp</text-field>
        </div>
      </div>
      <card-actions>
        <spacer></spacer>
        <button color="red darken-1" text @click="close">
          Cancel
        </button>
        <button
          id="button-login-wdg2"
          color="red darken-1"
          text
          @click="loginWdg2"
          :disabled="!valid"
        >
          login
        </button>
      </card-actions>
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
    //   this.$nextTick(() => {
    //     this.logInUser = Object.assign({}, this.defaultItem);
    //   });
    //   this.$refs.form.reset();
    //   this.$emit('wdg2Close', false);
    },
    loginWdg2() {
    //   if (this.$refs.form.validate()) {
    //     this.$emit('logInUser', this.logInUser);
    //   }
    }
  },
};
</script>

<style lang="scss">
#wdg2 {
  padding: 2rem;
}
</style>
