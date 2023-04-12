<template>
  <div class="container-fluid" id="container">
    <!-- NEW CARD -->
    <div class="info">
      <div class="row">
        <div class="col">
          <!-- NOM -->
          <h2 class="card-name">
            {{ utilisateur.prenom }} {{ utilisateur.nom }}
          </h2>
          <br />
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
            <div v-if="utilisateur.telephone">
              {{ utilisateur.telephone }}
            </div>
            <div v-else-if="utilisateur.telephoneFixe">
              {{ utilisateur.telephoneFixe }}
            </div>
            <div v-else>
              Pas de numéro de téléphone renseigner.
            </div>
            <font-awesome-icon :icon="['fas', 'location-arrow']" class="ico" />
            <strong>Ville</strong>
            <br>
            <div>
              {{ utilisateur.adresseDto ? utilisateur.adresseDto.ville : "Pas de ville renseigner." }}
            </div>
            <br />
          </span>
        </div>
        <div class="col col-top" v-if="etudiant.promotionsDto != 0">
          <!-- PROMO -->
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="ico" />
          <strong>Promotions</strong>
          <br>
          <li v-for="item in etudiant.promotionsDto" :key="item.id">
            {{ item.cursusDto.titre }}
          </li>
          <!-- {{ etudiant.promotionsDto[0].cursusDto.titre }} -->
          <br>
        </div>
        <div class="col col-top" v-else>Pas de promotion actuel.</div>
        <div class="col col-top" v-if="projets.length != 0">
          <!-- PROJET -->
          <font-awesome-icon :icon="['fas', 'folder']" class="ico" />
          <strong>Nom du projet</strong>
          <li v-for="item in projets" :key="item.id">
            {{ item.nom }}
          </li>
          <!-- GROUPE -->
          <font-awesome-icon :icon="['fas', 'user-friends']" class="ico" />
          <strong>Nom du groupe</strong>
          <br>
          <li v-for="item in etudiant.groupesDto" :key="item.id">
            {{ item.nom }}
          </li>
        </div>
        <div class="col col-top" v-else>Aucun projet créer.</div>
      </div>
    </div>

    <!-- PROCHAIN COURS -->
    <br>
    <div id="student-planning" v-if="this.$store.getters.getPlanning">
      <PlanningEtudiant />
    </div>
    <div v-else>Pas de planning.</div>

    <!-- PROCHAIN COURS -->
    <!-- <br>
    <b-table small head-variant="light" :items="accueil.prochainCours" :fields="fieldsCours"></b-table> -->

    <!-- MEMBRES-->
    <!-- <b-table small head-variant="dark" :items="tabOut"></b-table> -->
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { projetApi } from "@/_api/projet.api.js";
import PlanningEtudiant from "@/components/utils/PlanningEtudiant.vue";
import { utilisateurApi } from "@/_api/utilisateur.api.js";

export default {
  name: "AccueilEtudiant",
  components: {
    PlanningEtudiant,
  },

  data() {
    return {
      item: {},
      projets: [],
      etudiantId: this.$store.getters.getUtilisateur.etudiantDto.id,
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
    getEtudiant() {
      etudiantApi
        .getById(this.etudiantId)
        .then((response) => (this.item = response));
    },
    tabOut() {
      let tab = [];
      let mb = this.accueil.membreEtudiantDtos[0];

      mb.forEach(function (i) {
        tab.push({
          Nom: i.membreNom,
          Prenom: i.membrePrenom,
          Rôle: i.membreRole[0],
        });
      });

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
    etudiant() {
      return this.item;
    },
  },

  created() {
    utilisateurApi
      .getPlanningById(this.$store.getters.getUtilisateur.id)
      .then((response) => this.$store.dispatch("setPlanning", response));

    if (this.$store.getters.getUtilisateur.rolesDto.length == 1 && this.$store.getters.getUtilisateur.rolesDto[0] == "ADMIN") {
      this.$router.push({
        name: "admin_dashboard",
      });
    }
    if (this.isFormateur) {
      this.$router.push({ name: "formateur_home" })
    }

    this.getEtudiant();
    etudiantApi
      .getGroupes(this.utilisateurId)
      .then((data) => (this.groupes = data));

    projetApi.getByIdEtudiant(this.etudiantId).then((data) => (this.projets = data));
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

.contact {
  margin-top: 0;
  margin-bottom: 30px;
}

/* .container {
  margin: 89px 0 0 421px;
  min-height: 340px;
} */

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
