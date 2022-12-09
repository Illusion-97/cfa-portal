<template>
  <div class="container">

    <!-- NEW CARD -->
    <div class="info">
      <div class="row">
        <div class="col">
          <!-- NOM -->
          <h2 class="card-name">{{ utilisateur.prenom }} {{ utilisateur.nom }}</h2>
          <br>
          <!-- AVATAR -->
          <img src="@/assets/img/avatar.png" class="avatar" />
        </div>

        <div class="col col-top">
          <!-- INFOS -->
          <span class="contact">
            <font-awesome-icon :icon="['fas', 'envelope']" class="ico" />
            <strong>eMail</strong>
            <br>
            {{ accueil.login }}
            <br />
            <font-awesome-icon :icon="['fas', 'phone']" class="ico" />
            <strong>Téléphone</strong>
            <br>
            {{ accueil.telephone }}
            <br />
            <font-awesome-icon :icon="['fas', 'location-arrow']" class="ico" />
            <strong>Ville</strong>
            <br>
            {{ accueil.ville }}
            <br />
          </span>
        </div>
        <div class="col col-top">
          <!-- PROMO -->
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="ico" />
          <strong>Promotion</strong>
          <br>
          {{ accueil.promotion }}
          <br>
        </div>
        <div class="col col-top">
          <!-- PROJET -->
          <font-awesome-icon :icon="['fas', 'folder']" class="ico" />
          <strong>Nom du projet</strong>
          <ul>
            <li v-for="projet in accueil.projets" :key="projet.id">
              {{ projet[0] }}
            </li>
            <!-- CFA -->
          </ul>

          <!-- GROUPE -->
          <font-awesome-icon :icon="['fas', 'user-friends']" class="ico" />
          <strong>Nom du groupe</strong>
          <br>
          {{ accueil.groupes[0] }}
        </div>
      </div>
    </div>

    <!-- PROCHAIN COURS -->
    <br>
    <b-table-simple small head-variant="light">
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Prochain cours</b-th>
          <b-th>Début</b-th>
          <b-th>Fin</b-th>
          <b-th>Formateur</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td>{{ accueil.prochainCours[0].formationTitre }}</b-td>
          <b-td>{{ accueil.prochainCours[0].interventionDateDebut }}</b-td>
          <b-td>{{ accueil.prochainCours[0].interventionDateFin }}</b-td>
          <b-td>{{ accueil.prochainCours[0].formateurNom!=null ?accueil.prochainCours[0].formateurNom :'Pas de formation'}}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <!-- PROCHAIN COURS -->
    <!-- <br>
    <b-table small head-variant="light" :items="accueil.prochainCours" :fields="fieldsCours"></b-table> -->

    <!-- MEMBRES-->
    <b-table small head-variant="light" :items="tabOut"></b-table>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";

export default {
  name: "AccueilEtudiant",

  data() {
    return {
      accueil: [],
      fieldsCours: [
        {
          key: "formationTitre",
          label: "Prochain Cours",
          // thStyle: { width: "70%" },
        },
        {
          key: "interventionDateDebut",
          label: "Début",
          // thStyle: { width: "70%" },
        },
        {
          key: "interventionDateFin",
          label: "Fin",
          // thStyle: { width: "70%" },
        },
        {
          key: "formateurNom",
          label: "Formateur",
          // thStyle: { width: "70%" },
        },
      ],
      fields: [
        {
          label: "Nom",
          // thStyle: { width: "70%" },
        },
      ],

    };
  },

  methods: {
    tabOut() {

      let tab = [];
      let mb = this.accueil.membreEtudiantDtos[0];

      mb.forEach(function (i) {
        tab.push(
          {
            Nom: i.membreNom,
            Prenom: i.membrePrenom,
            Rôle: i.membreRole[0],
          },
        )
      })

      tab.push({
        Nom: this.accueil.managerNom,
        Prenom: this.accueil.managerPrenom,
        Rôle: this.accueil.managerRole,
      });

      return tab;
    },
  },

  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
  },

  created() {
    etudiantApi
      .getAccueilEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.accueil = data));
  },
};
</script>

<style scoped>
.col-top {
  padding-top: 84px;
}

.avatar {
  width: 187px;
}

.ico {
  margin-right: 7px;
}

.info {
  position: relative;
  width: auto;
}

.promo {
  margin-bottom: 8px;
}

h5 {
  margin-top: 55px;
}

h2 {
  font-weight: bolder;
}

.contact {
  margin-top: 0;
  margin-bottom: 30px;
}

.container {
  margin: 89px 0 0 421px;
  min-height: 340px;
}

ul {
  list-style-type: none;
}

table {
  table-layout: fixed;
}

.info-gauche {
  text-align: end;
  padding-right: 7px;
}

.info-droit {
  padding-left: 7px;
}

.bloc-droit {
  line-height: 1em;
  margin-top: 75px;
}

#bloc-gauche svg {
  margin-right: 7px;
}

#bloc-droit svg {
  margin-left: 7px;
}

ul {
  margin-bottom: 0 !important;
}
</style>