<template>
  <div class="container">
    <h5>Dossiers professionnels</h5>

    <b-table small head-variant="light" :items="cursus" :fields="fields">
      <template #cell(Cursus)="data">
        {{ data.item.titre }}
      </template>

      <template #cell(DossierPro)="data">
        <!-- SWITCH -->
        <div v-switch="switchDossier(data, dossierProfessionnel)" class="">
          <!-- DOSSIER CORRESPONDANT AU CURSUS -->
          <div v-case="'dossier'" class="div-btn-right">
            <b-button size="sm" class="mr-2" variant="primary">
              <i class="bi bi-eye"></i>
              Voir
            </b-button>
            <b-button size="sm" class="mr-2" variant="primary">
              <i class="bi bi-pencil"></i>
              Modifier</b-button
            >
            <b-button
              size="sm"
              class="mr-2"
              variant="danger"
              v-on:click="
                deleteDossier(
                  dossierProfessionnel,
                  getDossierId(data, dossierProfessionnel)
                )
              "
            >
              <i class="bi bi-dash-circle"></i>
              Supprimer</b-button
            >
          </div>

          <!-- PAS DE DOSSIER CORRESPONDANT AU CURSUS -->
          <div v-case="'no'" class="div-btn-right">
            <router-link
              :to="{
                name: 'creer_dossier_pro',
                query: { data: data },
              }"
            >
              <b-button size="sm" class="mr-2" variant="success">
                <i class="bi bi-plus-circle"></i>
                Créer
              </b-button>
            </router-link>
             <b-button size="sm" class="mr-2" variant="primary">
              <i class="bi bi-arrow-up-circle"></i>
              Uploader
            </b-button>
          </div>

          <div v-default>dossier absent</div>
        </div>
      </template>
    </b-table>

    <!-- INFOS -->
    <p id="info">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
      <strong id="title-info">Informations</strong>
      <br />
      <span class="fsize14">
        Les <b>images</b> ou <b>captures d'écrans</b> utilisées dans votre
        dossier professionnel ne doivent pas dépasser <b>400 ko</b> par image et
        doivent être au format <b>png</b> ou <b>jpg</b>.
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
import "bootstrap-icons/font/bootstrap-icons.css";

import Vue from "vue";
import VSwitch from "v-switch-case";
Vue.use(VSwitch);

export default {
  name: "DossierProfessionnelEtudiant",
  data() {
    return {
      cursus: [],
      dossierProfessionnel: [],
      fields: [
        // "Cursus", "DossierPro",
        {
          key: "Cursus",
          label: "Cursus",
          thStyle: { width: "70%" },
        },
        {
          key: "DossierPro",
          label: "",
        },
      ],
      file1: null,
    };
  },

  methods: {
    switchDossier(data, dossierProfessionnel) {
      // console.dir(
      //   "*****************dossierProfessionnel > " +
      //     JSON.stringify(dossierProfessionnel, null, 4)
      // )

      // console.log('data.item.id ' + data.item.id)

      // console.log('dossierProfessionnel ' + dossierProfessionnel[0].cursusDto.id)
      // console.log('dossierProfessionnel ' + dossierProfessionnel[1].cursusDto.id)

      let matchDossier;
      matchDossier = dossierProfessionnel.find(
        (element) => element.cursusDto.id == data.item.id
      );

      if (typeof matchDossier != "undefined") {
        // console.log('dossier');

        return "dossier";
      } else {
        // console.log('no');

        return "no";
      }
    },

    deleteDossier(dossierProfessionnel, getDossierId) {
      // getDossierId(dossierProfessionnel);

      console.log("getDossierId > " + getDossierId),
        // console.log("Dans deleteDossier() > "),

        console.dir(
          "dossierProfessionnel > " +
            JSON.stringify(dossierProfessionnel[0], null, 4)
        );

      // console.log("dossierProfessionnel.id > " + dossierProfessionnel.id)

      dossierProfessionnelApi.deleteDossierProfessionnel(
        // console.log("dossierProfessionnel.id > " + dossierProfessionnel.id),

        // console.log(
        //   "etudiantDto.id > " +
        //     this.$store.getters.getUtilisateur.etudiantDto.id
        // ),

        getDossierId,
        this.$store.getters.getUtilisateur.etudiantDto.id,
        console.log("Dossier Id correctement effacé > " + getDossierId)
      );
    },

    getDossierId(data, dossierProfessionnel) {
      // console.dir(
      //   "dossierProfessionnel > " +
      //     JSON.stringify(dossierProfessionnel, null, 4)
      // );

      let gdos;
      gdos = dossierProfessionnel.find(
        (element) => element.cursusDto.id == data.item.id
      );

      console.dir("gdos > " + JSON.stringify(gdos, null, 4));

      console.log("gdos.cursusDto.id > " + gdos.cursusDto.id);

      return gdos.id;
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
/* .div-btn-right {
  display: flex;
  flex-flow: row-reverse;
} */
.dnone {
  display: none;
}
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