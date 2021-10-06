<template>
  <div class="container-fluid">
    <div class="row">
      <div class="offset-2 col-md-10">
        <div class="row">
          <div class="my-btn-div col-md-12">
            <span type="button" class="next-prev" @click="previousWeek()">
              <b-icon icon="chevron-double-left"></b-icon>
              Précédent
            </span>
            <span type="button" class="next-prev" @click="nextWeek()">
              Suivant
              <b-icon icon="chevron-double-right"></b-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2" align="center">
        <b-calendar
          v-model="date"
          value-as-date
          hide-header
          :start-weekday="1"
          :date-disabled-fn="dateDisabled"
        ></b-calendar>
      </div>
      <div class="col-md-10">
        <table class="table">
          <thead>
            <tr>
              <th>
                <p>Lundi</p>
                <p>{{ dateSemaine[0] | formatDate }}</p>
              </th>
              <th>
                <p>Mardi</p>
                <p>{{ dateSemaine[1] | formatDate }}</p>
              </th>
              <th>
                <p>Mercredi</p>
                <p>{{ dateSemaine[2] | formatDate }}</p>
              </th>
              <th>
                <p>Jeudi</p>
                <p>{{ dateSemaine[3] | formatDate }}</p>
              </th>
              <th>
                <p>Vendredi</p>
                <p>{{ dateSemaine[4] | formatDate }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="item in edt" :key="item.id">
                <div
                  v-for="intervention in item"
                  :key="intervention.id"
                  class="intervention">
                  <p class="font-weight-bold h5">
                    {{ intervention.formationDto.titre }}
                  </p>
                  <p class="text-justify">
                    {{ intervention.formationDto.contenu }}
                  </p>
                  <div
                    v-for="formateur in intervention.formateurDto"
                    :key="formateur.id">
                    <p>
                      <span class="font-weight-bold">Formateur : </span>
                      {{ formateur.prenom }} {{ formateur.nom }}
                    </p>
                  </div>
                  <router-link v-if="isFormateur"
                    :to="{ name: 'formateur_intervention_detail',
                      params: { id: intervention.idIntervention },}">
                    <font-awesome-icon
                      :icon="['fas', 'external-link-alt']"
                      class="icon text-primary"/>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { utilisateurService } from "@/_services/utilisateur.service.js";
export default {
  name: "Planning",
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    dateAujourdhui() {
      return this.date;
    },
    edt() {
      this.date.setHours(0, 0, 0, 0);

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

        let tempDate = this.stringToDate(edtTot[i].date);

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

      // return result;
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
    isFormateur() {
      return utilisateurService.isFormateur();
    },
    isEtudiant(){
      return utilisateurService.isEtudiant();
    }
  },
  methods: {
    triage(data) {
      //On trie le résultat dans un jolie tableau
      let edtTrie = [];

      for (let iJours = 0; iJours < 5; iJours++) {
        let maJournee = [];

        for (let i = 0; i < data.length; i++)
          if (
            this.dateSemaine[iJours].getTime() ==
            this.stringToDate(data[i].date).getTime()
          )
            maJournee.push(data[i]);

        edtTrie.push(maJournee);
      }

      return edtTrie;
    },
    stringToDate(maDate) {
      // Le format de edtTot[i].date est : yyyy-mm-dd
      let tempSplit = maDate.split("-");
      //On récupère sour format Date pour pouvoir .getDay()
      //On month-1 car il y a décalage : bdd 1janv-12dec js : 0janv-11dec
      tempSplit[1] = parseInt(tempSplit[1]) - 1;
      let result = new Date(
        tempSplit[0],
        tempSplit[1].toString(),
        tempSplit[2]
      );

      return result;
    },
    nextWeek() {
      let newDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate()
      );
      newDate.setDate(this.date.getDate() + 7);
      this.date = newDate;
    },
    previousWeek() {
      let newDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate()
      );
      newDate.setDate(this.date.getDate() - 7);
      this.date = newDate;
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay();
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6;
    },
  },
};
</script>

<style scoped>
table {
  text-align: center;
  table-layout: fixed;
  min-height: 400px;
}

.my-btn-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
}

.intervention {
  margin-top: 1em;
}

.next-prev:hover {
  font-weight: bold;
}

.table {
  width: 95%;
  margin: 0 auto;
}
.table thead th,
.table td,
.table th {
  border: 0;
  /* border-right: 1px solid black; */
}
</style>
