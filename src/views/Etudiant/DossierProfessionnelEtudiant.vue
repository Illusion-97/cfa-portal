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
          <div>
            <!-- {{ getDossierId(data, dossierProfessionnel) }} -->
          </div>

          <!-- DOSSIER CORRESPONDANT AU CURSUS -->
          <div v-case="'dossier'">
            <b-button size="sm" class="mr-2" variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path
                  d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                />
              </svg>
              Voir
            </b-button>
            <b-button size="sm" class="mr-2" variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-dash-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                />
              </svg>
              Supprimer</b-button
            >
          </div>

          <!-- PAS DE DOSSIER CORRESPONDANT AU CURSUS -->
          <div v-case="'no'">
            <router-link
              :to="{ 
                name: 'creer_dossier_pro',
                query: {data : data}
                }">
                {{data.item.titre}}

              <b-button size="sm" class="mr-2" variant="success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                  />
                </svg>
                Créer
              </b-button>
            </router-link>
            <b-button size="sm" class="mr-2" variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                />
              </svg>
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
        { key: "Cursus", label: "Cursus" },
        { key: "DossierPro", label: "" },
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