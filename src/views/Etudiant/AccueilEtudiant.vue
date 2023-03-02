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
            {{ utilisateur.login }}
            <br />
            <font-awesome-icon :icon="['fas', 'phone']" class="ico" />
            <strong>Téléphone</strong>
            <br>
            {{ utilisateur.telephone }}
            <br />
            <font-awesome-icon :icon="['fas', 'location-arrow']" class="ico" />
            <strong>Ville</strong>
            <br>
            {{ utilisateur.adresseDto.ville }}
            <br />
          </span>
        </div>
        <div class="col col-top">
          <!-- PROMO -->
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="ico" />
          <strong>Promotion actuel</strong>
          <br>
          <!-- <li v-for="etudiant.promotionsDto " :key="etudiant.id">
              {{ etudiant.promotionsDto }}
            </li> -->
          {{ etudiant.promotionsDto[0].cursusDto.titre }}
          <br>
        </div>
        <div class="col col-top">
          <!-- PROJET -->
          <font-awesome-icon :icon="['fas', 'folder']" class="ico" />
          <strong>Nom du projet</strong>
          <ul>
            <li>
              {{ etudiant.groupesDto[0].projetsDto[0].nom }}
            </li>
          </ul>

          <!-- GROUPE -->
          <font-awesome-icon :icon="['fas', 'user-friends']" class="ico" />
          <strong>Nom du groupe</strong>
          <br>
            {{ etudiant.groupesDto[0].nom }}
        </div>
      </div>
    </div>

    <!-- PROCHAIN COURS -->
    <br>
    <div id="student-planning">
      <PlanningEtudiant />
    </div>

    <!-- PROCHAIN COURS -->
    <!-- <br>
    <b-table small head-variant="light" :items="accueil.prochainCours" :fields="fieldsCours"></b-table> -->

    <!-- MEMBRES-->
    <b-table small head-variant="light" :items="tabOut"></b-table>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import PlanningEtudiant from "@/components/utils/PlanningEtudiant.vue";
export default {
  name: "AccueilEtudiant",
  components: {
    PlanningEtudiant
  },

  data() {
    return {
      item: {},
      etudiantId:this.$store.getters.getUtilisateur.etudiantDto.id,
      utilisateurId: this.$store.getters.getUtilisateur.id,
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

    getEtudiant(){
        etudiantApi.getById(this.etudiantId)
        .then(response => this.item = response)
      },
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
    etudiant(){
      return this.item
    }
  },

  created() {
    this.getEtudiant();
    console.log(this.etudiantId);
    etudiantApi
      .getGroupes(this.utilisateurId)
      .then((data) => (this.groupes = data));
      
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
  margin: 89px auto;
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

/* #student-planning {
    grid-row: 2;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
  } */
</style>