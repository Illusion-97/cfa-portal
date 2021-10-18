// FILTRES VUEJS
import Vue from "vue";

Vue.filter("uppercase", function (value) { // les mots sont en majuscule
  if (!value) return "";
  value = value.toString();
  return value.toUpperCase();
});

Vue.filter("lowercase", function (value) { // les mots sont en majuscule
  if (!value) return "";
  value = value.toString();
  return value.toLowerCase();
});

Vue.filter("capitalize", function (value) { // premiere letter en majuscule
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formatNumber", function (value) { // formate les nombres en son entier inferieur
  if (typeof value != "number") {
    value = parseInt(value);
    Math.floor(value);
  }
  return Math.floor(value);
});

Vue.filter("twoDigits", function (value) { // arondi le nombre au centième
  if (typeof value != "number" || !value)
    return '';

  let result = value * 100;
  result = Math.round(result);
  result = result / 100;
  return result;
});

Vue.filter("fullAddresse", (value) => {
  if (typeof value.rue === 'undefined' && typeof value.ville === 'undefined' && typeof value.codePostal === 'undefined')
    return "Non précisé"
  return `${value.numero} ${value.rue} ${value.ville} ${value.codePostal}`
})

Vue.filter("fullName", value => {
  if (typeof value.nom === 'undefined' && typeof value.prenom === 'undefined')
    return ""
  return `${value.nom} ${value.prenom}`
})