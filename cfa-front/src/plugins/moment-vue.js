import Vue from "vue";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
Vue.use(VueMoment, { moment });
Vue.filter("formatDate", (value) => { // Transforme la date aux format Jour/Mois/Année
  if (value)
    return moment(value)
      .tz("Europe/Paris")
      .format("DD/MM/YYYY")
      .toString();
});
