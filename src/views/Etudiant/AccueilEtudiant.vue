<template>
  <div class="container">
    <b-row>
      <!-- Bloc gauche -->
      <b-col cols="5">
        <div id="bloc-gauche">
          <h2>{{ utilisateur.prenom }} {{ utilisateur.nom }}</h2>
          <span class="contact">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            {{ utilisateur.login }}
            <br />
            <font-awesome-icon :icon="['fas', 'phone']" />
            {{ utilisateur.telephone }}
            <br />
            <font-awesome-icon :icon="['fas', 'location-arrow']" />
            {{ utilisateur.adresseDto.numero }} {{ utilisateur.adresseDto.rue }}
            {{ utilisateur.adresseDto.codePostale }}
            {{ utilisateur.adresseDto.ville }}

            <br />
          </span>
        </div>
      </b-col>

      <!-- Bloc droit -->
      <b-col cols="7" class="bloc-droit">
        <div id="bloc-droit">
          <p>
            <b-row>
              <b-col cols="5" class="info-gauche">
                <strong>Promotion</strong>
                <font-awesome-icon :icon="['fas', 'graduation-cap']" />
              </b-col>
              <b-col cols="7" class="info-droit">
                <ul>
                  <li v-for="promotion in promotions" :key="promotion.id" class="promo">
                    {{ promotion.nom }}
                  </li>
                </ul>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="5" class="info-gauche">
                <strong>Nom du projet</strong>
                <font-awesome-icon :icon="['fas', 'folder']" />
              </b-col>
              <b-col cols="7" class="info-droit">
                <ul>
                  <!-- <li v-for="projet in projets" :key="projet.id">
                    {{ projet.nom }}
                  </li> -->
                  CFA
                </ul>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="5" class="info-gauche">
                <strong>Numéro du groupe</strong>
                <font-awesome-icon :icon="['fas', 'user-friends']" />
              </b-col>
              <b-col cols="7" class="info-droit">
                <ul>
                  <li v-for="groupe in groupes" :key="groupe.id">
                    {{ groupe.nom }}
                  </li>
                </ul>
              </b-col>
            </b-row>
          </p>
        </div>
      </b-col>
    </b-row>

    <!-- <br />
    <b-table small head-variant="light" :items="tableauComputed"></b-table>
    <br />
    <b-table small head-variant="light" :items="tab" :fields="fields"></b-table> -->

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

    };
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

    tab() {

      let tab = this.arr;
      let manager = this.cef;
      // let tuteur = this.formateurReferent;

      tab.push(
        {
          nom: manager.nom,
          prenom: manager.prenom,
          role: "Manager",
        },
        // {
        //   nom: tuteur.nom,
        //   prenom: tuteur.prenom,
        //   role: "Tuteur",
        // },
      );

      // this.membres.forEach(function (e) {
      //   this.tab2.push(
      //     {
      //       nom: e.utilisateurDto.nom,
      //       prenom: e.utilisateurDto.prenom,
      //       role: "Membre du groupe",
      //     }
      //   )
      // });

      return tab;

    },

    tab3(){
      let tab = this.arr;

      tab.push(
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
        
      return tab;
    }
  },

  created() {
    etudiantApi
      .getPromotions(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.promotions = data));

    // etudiantApi
    //   .getFormateurReferent(this.$store.getters.getUtilisateur.etudiantDto.id)
    //   .then((data) => (this.formateurReferent = data));

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
  margin-top: 50px;
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