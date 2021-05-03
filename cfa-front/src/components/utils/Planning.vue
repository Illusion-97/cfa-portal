<template>
  <table class="table">
    {{edt}}
    <thead>
      <tr>
        <th scope="col">
          <p>Lundi</p>
          <p>{{ dateSemaine[0] | formatDate }}</p>
        </th>
        <th scope="col">
          <p>Mardi</p>
          <p>{{ dateSemaine[1] | formatDate }}</p>
        </th>
        <th scope="col">
          <p>Mercredi</p>
          <p>{{ dateSemaine[2] | formatDate }}</p>
        </th>
        <th scope="col">
          <p>Jeudi</p>
          <p>{{ dateSemaine[3] | formatDate }}</p>
        </th>
        <th scope="col">
          <p>Vendredi</p>
          <p>{{ dateSemaine[4] | formatDate }}</p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div>
            <p>Titre Formation/intervention</p>
            <p>petite description Formation ?</p>
            <p>formateur</p>
          </div>
        </td>
        <td>
          <p>Titre Formation/intervention</p>
          <p>petite description Formation ?</p>
          <p>formateur</p>
        </td>
        <td>
          <p>Titre Formation/intervention</p>
          <p>petite description Formation ?</p>
          <p>formateur</p>
        </td>
        <td>
          <p>Titre Formation/intervention</p>
          <p>petite description Formation ?</p>
          <p>formateur</p>
        </td>
        <td>
          <p>Titre Formation/intervention</p>
          <p>petite description Formation ?</p>
          <p>formateur</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export default {
  name: "Planning",
  props: {
    date: Date,
  },
  computed: {
    edt() {
      //On veut récupérer l'edt de la semaine correspondant à la date donnée en propriété du composant

      let result = [];
      let edtTot = this.$store.getters.getPlanning;
      //on vérifie toutes les journée (dates)
      for (let i = 0; i < edtTot.length; i++) {
        //Si l'écart entre ma date de référence et la date testée est > 6 jours, on passe
        if (Math.abs(this.date - edtTot[i].date) > 6 * 24 * 60 * 60 * 1000)
          //ATTENTION resultat en millisecondes => 6 jours * 24 h * 60 minutes * 60 secondes * 1000 (millisecondes)
          continue;
        //Date.getDay() : 0 Dimanche et 6 pour Samedi
        //On remet à lundi -> Dimanche ou on garde Doimanche -> Samedi (comme bootstrap calendar)

        // Le format de edtTot[i].date est : yyyy-mm-dd
        let tempSplit = edtTot[i].date.split("-");
        //On récupère sour format Date pour pouvoir .getDay()
        //On month-1 car il y a décalage : bdd 1janv-12dec js : 0janv-11dec
        tempSplit[1] = parseInt(tempSplit[1]) - 1;
        let tempDate = new Date(
          tempSplit[0],
          tempSplit[1].toString(),
          tempSplit[2]
        );

        if (this.date.getTime() == tempDate.getTime()) {
          //Si le même jours que ma date de référence
          result.push(edtTot[i]); // => on ajoute a notre edt de la semaine
        } else if (this.date.getTime() < tempDate.getTime()) {
          //Si this.date est avant edtTot[i].date
          if (this.date.getDay() < tempDate.getDay()) {
            //On compare les jours pour savoir si la même semaine. Si oui, on ajoute
            result.push(edtTot[i]);
          }
        } else {
          //Si this.date est après edtTot[i].date
          if (this.date.getDay() > tempDate.getDay()) {
            //On compare les jours pour savoir si la même semaine. Si oui, on ajoute
            result.push(edtTot[i]);
          }
        }
      }
      
      return this.triage(result);
    },
    dateSemaine() {
      let dif = this.date.getDay() - 1;

      let year = this.date.getFullYear();
      let month = this.date.getMonth();
      let day = this.date.getDate() - dif;

      let arr = [
        new Date(year, month, day),
        new Date(year, month, day + 1),
        new Date(year, month, day + 2),
        new Date(year, month, day + 3),
        new Date(year, month, day + 4),
      ];

      return arr;
    },
  },
  methods: {
    triage(data){ //ATTENTION, work in progress
      //On trie le résultat dans un jolie tableau
      let edtTrie;

      for (let iJours = 0; iJours < 5; iJours++) {
        let maJournee;
        for (let i = 0; i < data.length; i++) {
          if (this.dateSemaine[iJours].getTime() == data[i].date.getTime()) {
            maJournee.push(data[i]);
          }
        }
        edtTrie.push(maJournee);
      }
      console.log("balise");
      console.log("edtTrie = " + edtTrie);

      return edtTrie;
    }
  },
};
</script>

<style scoped>
table {
  text-align: center;
  vertical-align: middle;
}
</style>
