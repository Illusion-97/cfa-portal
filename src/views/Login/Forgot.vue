<template>
  <div class="wrapper fadeInDown">
    <v-card  width="400" height="400" align="center">
    <form id="EmailForm">
      <div class="form-horizontal">
        <div class="form-group">

          <div class="col-md-offset-2 col-md-12">
            <h2>Vous avez oublié votre mot de passe ?</h2>
          </div>
        </div>

      <div class="form-group fadeIn second">
        <div class="col-md-offset-2 col-md-12">
            <label for="Email" class="control-label fadeIn third">Contactez votre administrateur pour réinitialiser votre mot de passe.</label>
          </div>
        </div>

      <div class="justify-center cardActionForgot">
        <button color="error" class="btn btn-primary" @click="goBack">
            Retour
          </button>
      </div>
    </div>
  </form>
</v-card>
</div>
</template>



<script>
import router from "../../router/router"
import {validationMixin} from "vuelidate";
import {email, required} from "vuelidate/lib/validators";
import EmailRecover from "../../_helpers/EmailRecover";
import mailService from "../../_services/mailService";

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

  data: () => ({
    email: "",
    token: "",
    errorMail: { checkMail: null },
    status: "",
    valid: false,
    isInvalid: false,
    isInvalidInput: false,
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
    isInvalidInputFalse(){
      this.isInvalidInput = false;
    },
    goBack() {
      this.$router.push({ name: 'login' });
    },
    submit() {
      if (this.$v.form.$invalid) {
        this.email = "";
        this.errorMail.checkMail = "Veuillez respecter le format suivant : nom@entreprise.fr ";
      } else {
        const user = new EmailRecover(this.email);
        mailService.mail(user).then((data) => {
          if (data.status == 500) {
            this.errorMail.checkMail = "Erreur serveur. Veuillez contacter l'administrateur ou réessayer ultérieurement.";
          } 
          else if((data.status != 200) && (data.status != 500)) {
            this.errorMail.checkMail = "Erreur : L'adresse mail est incorrecte ou n'existe pas !";
          }
          else {
            this.errorMail.checkMail = "Un e-mail vous a été envoyé et contient un lien pour réinitialiser votre mot de passe. Vous serez redirigé vers la page de connexion d'ici quelques secondes.";
            setTimeout( () => router.push("/login"), 6000)
          }
        });
      }
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
