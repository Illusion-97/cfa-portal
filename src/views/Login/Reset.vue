<template>
  <div class="wrapper fadeInDown">
    <form id="ResetForm" @submit="submit">
      <div class="form-horizontal">
        <div class="form-group">

          <div class="col-md-offset-2 col-md-12">
            <h2>Réinitialisation du mot de passe</h2>
          </div>
        </div>

      <div class="form-group fadeIn second">
        <div class="col-md-offset-2 col-md-4">
            <label for="Password" class="control-label fadeIn third">Mot de passe</label>
          </div>

          <div class="col-md-12">
            <input
              name="password"
              type="password"
              v-model="password"
              :class="{'form-control fadeIn third': true, 'is-invalid my-is-invalid': isInvalidInput}"
              placeholder="Password"
              autocomplete="password"
              required
              @input="isInvalidInputFalse()"
            />
            </div>
        </div>

        <div class="form-group fadeIn second">
          <div class="col-md-offset-2 col-md-5">
            <label for="ConfirmPassword" class="control-label fadeIn third"
              >Confirmation mot de passe</label
            >
          </div>
          <div class="password col-md-12">
            <input
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              :class="{
                'form-control fadeIn third': true,
                'is-invalid my-is-invalid': isInvalidInput,
              }"
              placeholder="Mot de Passe"
              autocomplete="current-password"
              required
              @input="isInvalidInputFalse()"
            />
          </div>
        </div>

      <div v-if="errorPassword.checkPassword">
        {{ errorPassword.checkPassword }}
      </div>

      <div class="justify-center cardActionForgot">
        <button color="error" class="btn btn-primary" 
                :disabled="
            valid ||
            password.length == 0 ||
            confirmPassword.length == 0 ||
            password != confirmPassword"
            type="submit">
            Modifier le mot de passe
          </button>
          
        <div class="link">
          <router-link :to="{name: 'login'}">
             Retour à l'écran de connexion 
          </router-link>
        </div>
      </div>
    </div>
  </form>
</div>
</template>


<script>
import router from "../../router/router";
import {validationMixin} from "vuelidate";
import {minLength, required, sameAs,} from "vuelidate/lib/validators";
import resetService from "../../_services/resetService";
import ResetPassword from "../../_helpers/ResetPassword";

// const alpha = helpers.regex(
//   "alpha",
//   /^(?=.*[a-z])(?=.*[A-ZÀ-ȕ])(?=.*[0-9])(?=.*[\(\)\,\-\_\.\, !@#\$%\^&\*])/
// );

export default {
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(8) },
    confirmPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs("password"),
    },
  },

  data: () => ({
    password: "",
    confirmPassword: "",
    status: "",
    sucessfulServerResponse: "",
    serverError: "",
    valid: false,
    token: "default",
    errorPassword: { checkPassword: null },
    isInvalidInput: false,
  }),

  computed: {
    // passwordErrors() {
    //   const errors = [];
    //   if (!this.$v.password.$dirty) return errors;
    //   !this.$v.password.minLength &&
    //     errors.push(this.$t("errorFrontEnd.shortPassword"));
    //   !this.$v.password.required &&
    //     errors.push(this.$t("errorFrontEnd.requiredPassword"));
    //   !this.$v.password.alpha &&
    //     errors.push(this.$t("errorFrontEnd.invalidPasswordLenght"));
    //   return errors;
    // },
    // confirmErrors() {
    //   const errors = [];
    //   if (!this.$v.confirmPassword.$dirty) return errors;
    //   !this.$v.confirmPassword.sameAsPassword &&
    //     errors.push(this.$t("errorFrontEnd.identicalPassword"));
    //   return errors;
    // }
  },

  created() {
    this.getUrlToken();
  },

  methods: {
    getUrlToken() {
      if(this.$route.query.token){
        this.token = this.$route.query.token;
      }
      else if(this.token == "default"){
        router.push("/login");
      }
        
    },
    isInvalidInputFalse(){
      this.isInvalidInput = false;
    },

    submit() {
        const resetpassword = new ResetPassword(this.token, this.password);
        resetService.reset(resetpassword).then((data) => {
          if (data.status == 500) {
            this.errorPassword.checkPassword = "Lien invalide ou expiré. Veuillez réutiliser le formulaire d'envoi de mail.";
          }
            else if (data.status != 200) {
            this.errorPassword.checkPassword =
              "Mot de passe identique à l'ancien.";
          } else {
            this.errorPassword.checkPassword = "Mot de passe modifié ! Vous serez redirigé vers la page de connexion d'ici quelques secondes.";
            setTimeout( () => router.push("/login"), 5000);
          }
        });
    },
  },
};
</script>

<style scoped>

.my-invalid-feedback{
  width: 100%;
  margin-top: 0.25rem;
  font-size: 100%;
  color: #dc3545;
}

.my-is-invalid{
  border:  2px solid #dc3545  !important;
}

/* BASIC */

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: justify;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  margin-top: 5em;
  margin-left: -10em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 30px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"],
button {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover,
button:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active,
button:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="email"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}

.navbar-other {
  background-color: #98dcff;
  font-size: 18px;
}

.navbar-other a {
  color: white;
}

.hr {
  height: 2px;
  margin: 60px 0 50px 0;
  background: rgba(255, 255, 255, 0.2);
}
.foot-lnk {
  text-align: center;
}
</style>
