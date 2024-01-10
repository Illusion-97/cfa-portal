import Vue from "vue";

import App from "./App.vue";

import "@babel/polyfill";
import "mutationobserver-shim";
import vuetify from "@/plugins/vuetify";
import "./plugins/vuetify";
import "./plugins/bootstrap-vue";
import "./plugins/fontawesome-vue";
import "./plugins/moment-vue";
import "./_helpers/filters";
import "./assets/styles/style.css";

import DatetimePicker from "vuetify-datetime-picker";
import jQuery from "jquery";
import router from "./router/router.js";
import store from "./store/store.js";
import axios from "axios";
import Paginate from "vuejs-paginate";

// import VueCookies from 'vue-cookies'

let bootstrap = require("bootstrap");
Vue.use(bootstrap);

Vue.use(DatetimePicker);

global.jQuery = jQuery;
Vue.config.productionTip = false;
Vue.component("paginate", Paginate);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Vue.use(VueCookies)
Vue.filter("etatLivret", function (value) {
  let res = "";
  switch (value) {
    case "ENATTENTEDEVALIDATION":
      res = "En attente de validation par le formateur.";
      break;
    case "VALIDEPARLEFORMATEUR":
      res = "Validé par le formateur.";
      break;
    case "VALIDEPARLETUDIANT":
      res = "Validé par l'étudiant.";
      break;
  }

  return res;
});
new Vue({
  created() {
    const html = document.documentElement; // returns the html tag
    html.setAttribute("lang", "fr");
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
