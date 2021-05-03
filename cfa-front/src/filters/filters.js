// FILTRES VUEJS
import Vue from "vue";

Vue.filter("uppercase", function (value) { // les mots sont en majuscule
    if (!value) return "";
    value = value.toString();
    return value.toUpperCase();
});

Vue.filter("capitalize", function (value) { // premiere letter en majuscule
    if (!value) return "";  
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formatNumber", function(value) { // formate les nombres en son entier inferieur
  if (typeof value != "number") {
    value = parseInt(value);
    Math.floor(value);
  }
  return Math.floor(value);
});