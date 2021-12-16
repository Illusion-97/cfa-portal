<template>
  <form id="EmailForm" @submit="submitMail" lazy-validation>
    <div width="400" height="475" align="center" class="cardForgot">
      <div primary-title class="title">Titre </div>
      <div>blablab</div>

      <div>
        <input
          v-model="email"
          :error-messages="emailErrors"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
      </div>

      <!-- <div v-if="errorMail.checkMail">
        {{ errorMail.checkMail }}
      </div> -->

      <div class="justify-center cardActionForgot">
        <input
          type="buton"
          :disabled="!valid || email.length == 0"
          color="primary"
          @click="submitMail()"
        >
          {{  }}
        />
        <input type="button" color="primary" :to="'/'">
          {{  }}
        />
      </div>
    </div>
  </form>
</template>



<script>
import VueRecaptcha from "vue-recaptcha";
import { validationMixin } from "vuelidate";
import { required, email} from "vuelidate/lib/validators";

// const alpha = helpers.regex(
//   "alpha",
//   /^(?=.*[a-z])(?=.*[A-ZÀ-ȕ])(?=.*[0-9])(?=.*[\(\)\,\-\_\.\, !@#\$%\^&\*])/
// );

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    form: ["email"],
  },

  components: {
    VueRecaptcha,
  },

  data: () => ({
    show1: false,
    show2: false,
    password: "",
    confirmPassword: "",
    email: "",
    token: "",
    errorMail: { checkMail: null },
    status: "",
    sucessfulServerResponse: "",
    serverError: "",
    valid: false,
  }),

  computed: {
    /*emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push(this.$t("errorFrontEnd.invalidEmail"));
      !this.$v.email.required &&
        errors.push(this.$t("errorFrontEnd.requiredEmail"));
      return errors;
    },*/
  },
  methods: {
    submitMail() {
      if (this.$v.form.$invalid) {
        this.email = "";
      } else {/*
        const user = new EmailRecover(this.email);
        mailService.mail(user).then((data) => {
          if (data.status == 500) {
            this.errorMail.checkMail = this.$t("forgotPassword.errorAPI");
          } 
          else if((data.status != 200) && (data.status != 500)) {
            this.errorMail.checkMail = this.$t("forgotPassword.errorMail");
          }
          else {
            this.errorMail.checkMail = this.$t("forgotPassword.sendMail");
            setTimeout( () => router.push("/" + this.$i18n.locale), 6000)
          }
        });*/
      }
    },
  },
};
</script>

<style>
#styled-input {
  height: 40px;
  font-size: 15pt;
}
.styled-input label[for] {
  height: 40px;
  font-size: 15pt;
}

.cardForgot {
  padding: 2rem 2rem;
}

.button {
  width: 100%;
}

.cardAction {
  padding: 0 1rem;
}

.cardActionForgot {
  padding: 1rem;
}

.v-application .title {
  font-size: 1.5rem !important;
  justify-content: center;
}
</style>
