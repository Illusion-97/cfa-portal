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
            {{ utilisateur.adresseDto.numero }} {{ utilisateur.adresseDto.rue }}
            {{ utilisateur.adresseDto.codePostale }}
            {{ utilisateur.adresseDto.ville }}
            <br />
          </span>
        </div>
        <div class="col col-top">
          <!-- PROMO -->
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="ico" />
          <strong>Promotion</strong>
          <ul>
            <li v-for="promotion in promotions" :key="promotion.id">
              {{ promotion.nom }}
            </li>
          </ul>
          <br>
        </div>
        <div class="col col-top">
          <!-- PROJET -->
          <font-awesome-icon :icon="['fas', 'folder']" class="ico" />
          <strong>Nom du projet</strong>
          <ul>
            <li v-for="projet in projets" :key="projet.id">
              {{ projet.nom }}
            </li>
            <!-- CFA -->
          </ul>

          <!-- GROUPE -->
          <font-awesome-icon :icon="['fas', 'user-friends']" class="ico" />
          <strong>Nom du groupe</strong>
          <ul>
            <li v-for="groupe in groupes" :key="groupe.id">
              {{ groupe.nom }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <br />
    <b-table small head-variant="light" :items="tableauComputed"></b-table> -->

    <br />
    <b-table small head-variant="light" :items="tab" :fields="fields"></b-table>

    <!-- TABLEAU DUR POUR EXEMPLE -->
    <br />
    <b-table small head-variant="light" :items="tab3" :fields="fields"></b-table>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { projetApi } from "@/_api/projet.api.js";
import { groupeApi } from "@/_api/groupe.api.js";
import { promotionApi } from "@/_api/promotion.api.js";

export default {
  name: "AccueilEtudiant",

  data() {
    return {
      promotions: [],
      projets: [],
      cef: [],
      // formateurReferent: [],
      membres: [],
      groupes: [],

      fields: [
        {
          key: "nom",
          label: "Nom",
          // thStyle: { width: "70%" },
        },
        {
          key: "prenom",
          label: "Prenom",
          // thStyle: { width: "20%" },
        },
        {
          key: "role",
          label: "Rôle",
          // thStyle: { width: "10%" },
        },
      ],

      arr: [],
      arr3: [],

    };
  },

  mounted() {
  },

  beforeMount(){
  },

  methods: {
    tab() {

      let tab = this.arr;
      let manager = this.cef;
      console.log("cef " + this.cef.nom);

      tab.push(
        {
          nom: manager.nom,
          prenom: manager.prenom,
          role: "Manager",
        }
      );

      console.dir("tab > " + JSON.stringify(tab, null, 4));
      return tab;
    },
  },

  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },

    tableauComputed() {
      // CEF / MANAGER
      let cefNom = this.cef.nom;
      let cefPrenom = this.cef.prenom;

      let tab = [
        {
          Nom: cefNom,
          Prenom: cefPrenom,
          Rôle: "Manager",
        },
      ];

      // MAITRE D'APPRENTISSAGE / TUTEUR
      let maitreNom = this.formateurReferent.nom;
      let maitrePrenom = this.formateurReferent.prenom;

      tab.push({
        Nom: maitreNom,
        Prenom: maitrePrenom,
        Rôle: "Tuteur",
      });

      // MEMBRES
      let membres = this.membres;
      membres.forEach(function (item) {
        tab.push({
          Nom: item.utilisateurDto.nom,
          Prenom: item.utilisateurDto.prenom,
          Rôle: "Membre du groupe",
        });
      });
      return tab;
    },

    tab3() {
      let tab3 = this.arr3;

      tab3.push(
        {
          nom: "Baron Gomez",
          prenom: "Laurence",
          role: "Manager",
        },
        {
          nom: "Merckling",
          prenom: "Jerome",
          role: "Tuteur",
        },
        {
          nom: "Chevallereau",
          prenom: "Valentin",
          role: "Membre du groupe",
        },
        {
          nom: "Ben Gamra",
          prenom: "Feres",
          role: "Membre du groupe",
        },
        {
          nom: "Pires",
          prenom: "William",
          role: "Membre du groupe",
        },
        {
          nom: "Charpentier",
          prenom: "Remy",
          role: "Membre du groupe",
        },

      );

      return tab3;
    }
  },

  created() {
    etudiantApi
      .getPromotions(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.promotions = data));

    etudiantApi
      .getGroupes(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((response) => (this.groupes = response));

    projetApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.projets = data));

    groupeApi
      .getEtudiants(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.membres = data));

    promotionApi
      .getCef(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((response) => (this.cef = response));
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