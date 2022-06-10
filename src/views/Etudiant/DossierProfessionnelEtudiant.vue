
<template>
  <div class="container">
    <h5>Dossiers professionnels</h5>

    <!-- TEST -->
    <b-table small head-variant="light" :items="cursus" :fields="fields">
      <template #cell(Cursus)="data">
        {{ data.item.titre }}
      </template>

      <template #cell(DossierPro)="data">
        <!-- SWITCH -->
        <div v-switch="switchDossier(data, dossierProfessionnel)" class="test">
          <!-- DOSSIER CORRESPONDANT AU CURSUS -->
          <div v-case="'dossier'">
            <b-button size="sm" class="mr-2" variant="primary"> Voir </b-button>
            <b-button size="sm" class="mr-2" variant="primary"
              >Modifier</b-button
            >
            <b-button size="sm" class="mr-2" variant="danger" v-on:click="deleteDossier(dossierProfessionnel.id)"
              >Supprimer</b-button
            >
          </div>

          <!-- PAS DE DOSSIER CORRESPONDANT AU CURSUS -->
          <div v-case="'no'">
            <router-link :to="{ name: 'creer_dossier_pro' }">
              <b-button size="sm" class="mr-2" variant="success">
                Créer
              </b-button>
            </router-link>
            <b-button size="sm" class="mr-2" variant="primary">
              Uploader
            </b-button>
          </div>
          <div v-default>dossier absent</div>
        </div>
      </template>
    </b-table>

    <!-- SWITCH -->
    <b-table small head-variant="light" :items="cursus" :fields="fields">
      <template #cell(Cursus)="data">
        {{ data.item.titre }}
      </template>

      <template #cell(DossierPro)="data">
        <div v-switch="result(data, dossierProfessionnel)" class="test">
          <div v-case="'dossier'">dossier</div>
          <div v-case="'no'">no</div>
          <div v-default>dossier absent</div>
        </div>
      </template>
    </b-table>

    <!-- IF -->
    <b-table small head-variant="light" :items="cursus" :fields="fields">
      <template #cell(Cursus)="data">
        {{ data.item.titre }}
      </template>

      <template #cell(DossierPro)="data">
        <div v-for="items in dossierProfessionnel" :key="items">
          <div v-if="items.cursusDto.id == data.item.id" class="test">
            <!-- <div v-html="legacySystemHTML"></div> -->
            <!-- {{ aaa }} -->
            dossier pro présent
            <b-button size="sm" class="mr-2" variant="primary"> Voir </b-button>
            <b-button size="sm" class="mr-2" variant="primary"
              >Modifier</b-button
            >
            <b-button size="sm" class="mr-2" variant="danger"
              >Supprimer</b-button
            >
          </div>
          <div v-else class="test">
            dossier pro absent
            <b-button size="sm" class="mr-2" variant="success">
              Créer
            </b-button>
            <b-button size="sm" class="mr-2" variant="primary">
              Uploader
            </b-button>
          </div>
        </div>
      </template>
    </b-table>

    <!-- DYNAMIQUE -->
    <b-table small head-variant="light" :items="cursus" :fields="fields">
      <template #cell(Cursus)="data">
        {{ data.item.titre }}
      </template>

      <template #cell(DossierPro)="data">
        <div v-for="items in dossierProfessionnel" :key="items">
          dp id : {{ items.cursusDto.id }} cu id : {{ data.item.id }}
          <div v-if="items.cursusDto.id == data.item.id">
            dossier pro présent
            <b-button size="sm" class="mr-2" variant="primary"> Voir </b-button>
            <b-button size="sm" class="mr-2" variant="primary">
              Modifier
            </b-button>
            <b-button size="sm" class="mr-2" variant="danger">
              Supprimer
            </b-button>
          </div>
          <div v-else>
            dossier pro absent
            <b-button size="sm" class="mr-2" variant="success">
              Créer
            </b-button>
            <b-button size="sm" class="mr-2" variant="primary">
              Modifier
            </b-button>
          </div>
        </div>
      </template>
    </b-table>

    <!-- DUR -->
    <!-- <b-table small head-variant="light" :items="items2" :fields="fields2">
      <template #cell(Dossiers_professionnels)> -->
    <!-- <div v-if="dossierProfessionnel.cursusDto.id === cursus.id">
          dossier présent
        </div> -->
    <!-- <b-button size="sm" class="mr-2" variant="success"> Voir </b-button>
        <b-button size="sm" class="mr-2" variant="primary"> Modifier </b-button>
        <b-button size="sm" class="mr-2" variant="danger"> Supprimer </b-button>
      </template>
    </b-table> -->

    <!-- INFOS -->
    <p id="info">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
      <strong id="title-info">Informations</strong>
      <br />
      <span class="fsize14">
        Les <b>images</b> ou <b>captures d'écrans</b> utilisées dans votre
        dossier professionnel ne doivent pas dépasser <b>400 ko</b> par image,
        et doivent être au format <b>png</b> ou <b>jpg</b>.
        <br />
        Vous pouvez utiliser l'outil gratuit disponible sur
        <a href="https://www.img2go.com/fr/compresser-image"
          >https://www.img2go.com/fr/compresser-image</a
        >
        pour réduire leur taille.
      </span>
    </p>
  </div>
</template>

<script>
import { cursusApi } from "@/_api/cursus.api.js";
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";

import Vue from "vue";
import VSwitch from "v-switch-case";
Vue.use(VSwitch);

export default {
  name: "DossierProfessionnelEtudiant",
  data() {
    return {
      cursus: [],
      dossierProfessionnel: [],
      // legacySystemHTML: `
      //   <p>Please <strong>enter</strong> your name to continue.</p>`,

      // DYNAMIQUE
      fields: ["Cursus", "DossierPro"],

      // DUR
      // fields2: ["Cursus", "Dossiers_professionnels"],
      // items2: [
      //   { Cursus: "CDA 2022" },
      //   { Cursus: "Concepteur designer UI 2021" },
      //   { Cursus: "Designer web" },
      //   { Cursus: "Administrateur d'infrastructures sécurisées" },
      // ],
    };
  },

  methods: {
    switchDossier: function (data, dossierProfessionnel) {
      // console.log("CURSUS ID -> " + data.item.id);
      // console.log("DP ID [0] ->" + dossierProfessionnel[0].cursusDto.id);

      let matchDossier;
      matchDossier = dossierProfessionnel.find(
        (element) => element.cursusDto.id == data.item.id
      );

      // console.log("Math Dossier -> " + matchDossier);

      if (typeof matchDossier != "undefined") {
        // console.log('dossier')
        return "dossier";
      } else {
        // console.log('no')
        return "no";
      }

      // switch (data.item.id) {
      //   default:
      //     return "no id";
      //   case 0:
      //     return "id 0";
      //   case 1:
      //     return "id 1";
      //   case 2:
      //     return "id 2";
      //   case 3:
      //     return "id 3";
      // }
    },

    // deleteDossier() {
    //   dossierProfessionnelApi.deleteDossierProfesionnel(dossierId);
    // },

    result: function (data, dossierProfessionnel) {
      // console.log("yaaaaaaaaaaaaaa");
      // console.log(data.item.id);

      dossierProfessionnel.forEach((element) => {
        let result;
        // console.log("*************");
        if (element.cursusDto.id == data.item.id) {
          console.log(
            "result = dossier - > dossierId : " +
              element.cursusDto.id +
              " cursusId : " +
              data.item.id
          );
          result = "dossier";
        } else {
          console.log(
            "result = dossier absent - > dossierId : " +
              element.cursusDto.id +
              " cursusId : " +
              data.item.id
          );
        }
        // console.log("result : " + result);
        return result;
      });
    },
  },

  computed: {
    tableauComputed() {
      let cursus = this.cursus;
      // let dossierProfessionnel = this.dossierProfessionnel;

      let tab = [];

      cursus.forEach(function (item) {
        tab.push({
          Cursus: item.titre,
        });
      });
      return tab;
    },
  },

  created() {
    cursusApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.cursus = data));

    dossierProfessionnelApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.dossierProfessionnel = data));
  },
};
</script>

<style scoped>
.oui {
  color: red;
}
.test {
  margin-top: 10px;
}
.container {
  margin: 89px 0 0 421px;
}

.fa-folder-open {
  color: #4caf50;
}

.fa-upload {
  color: #4caf50;
}

.redOu {
  color: red;
  font-style: italic;
}

.table {
  margin-top: 30px;
}

.consignes {
  margin: 30px 0 0 0;
}

#btn-creer-dossier {
  margin: 0 auto;
  display: block;
}

.card {
  max-width: 30rem !important;
  margin-right: 30px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.card .btn {
  width: auto;
}

#div-cards-dossier {
  display: flex;
  margin-bottom: 30px;
}

.card-text {
  font-size: 14px;
}

.fsize14 {
  font-size: 14px;
}

#info {
  margin-bottom: 50px;
}

#div-cards-dossier h4 {
  font-size: 1.25rem;
}

.card-body .btn {
  width: -webkit-fill-available;
}

a:hover {
  text-decoration: none;
}

h5 {
  margin-bottom: 31px;
  font-weight: bolder;
}

h4 {
  font-size: 1rem !important;
  font-weight: bolder;
}

#title-info {
  padding-left: 7px;
}
</style>