<template>
  <div class="container-fluid" id="container">
    <div id="dos">
      <h2>Dossiers professionnels</h2>

      <!-- TABLEAU TEST -->
      <b-table small head-variant="light" :items="dp.promotions" :fields="fields">
        <template #cell(Cursus)="data">
          {{ data.item.cursus.titre }}
        </template>

        <template #cell(DossierPro)="data">

          <!-- IF DOSSIER PRESENT -->
          <div v-if="data.item.cursus.dossierProfessionnel != null">
            <div class="div-btn-right">

              <!-- BOUTON VOIR -->
              <b-button size="sm" class="mr-2" variant="primary" v-on:click="
              voirDossier(data.item.id)">
                <!-- <i class="bi bi-eye"></i> -->
                <i class="fa-solid fa-file-pdf"></i> Voir
              </b-button>

              <!-- BOUTON UPDATE -->
              <router-link :to="{
                name: 'modifier_dossier_pro',
                query: { data: data },
              }">
                <b-button size="sm" class="mr-2" variant="primary" v-on:click="
                updateDossier()">
                  <i class="fa-solid fa-square-pen"></i>
                  Modifier
                </b-button>
              </router-link>

              <!-- BOUTON DELETE -->
              <!-- <b-button size="sm" class="mr-2" variant="danger" v-on:click="
              deleteDossier(data.item.cursus.dossierProfessionnel.id)">
                <i class="bi bi-dash-circle"></i>
                Supprimer
              </b-button> -->
            </div>
          </div>

          <!-- ELSE DOSSIER ABSENT -->
          <div v-else>
            <div class="div-btn-right">

              <!-- BOUTON CREER -->
              <router-link :to="{
                name: 'creer_dossier_pro',
                query: { data: data },
              }">
                <b-button size="sm" class="mr-2" variant="success">
                  <i class="fa-solid fa-square-plus"></i>
                  Créer
                </b-button>
              </router-link>

              <!-- BOUTON UPDATE -->
              <b-button size="sm" class="mr-2" variant="primary">
                <i class="fa-solid fa-cloud"></i>
                Uploader
              </b-button>
            </div>
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
          <a href="https://www.img2go.com/fr/compresser-image">https://www.img2go.com/fr/compresser-image</a>
          pour réduire leur taille.
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
//erreur avec l'import à corriger import "bootstrap-icons/font/bootstrap-icons.css";


// SWITCH
// import Vue from "vue";
// import VSwitch from "v-switch-case";
// Vue.use(VSwitch);

export default {
  name: "DossierProfessionnelEtudiant",
  data() {
    return {
      cursus: [],
      dp: [],
      dossierProfessionnel: [],

      fields: [
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
    deleteDossier(id) {
      dossierProfessionnelApi.deleteDossierProfessionnel(id);
    },

    voirDossier(promotionId) {
      window.open(
        "http://localhost:8085/dossierProfessionnel/dossier-professionnel/" +
        this.$store.getters.getUtilisateur.etudiantDto.id +
        "/" +
        promotionId
      );
    },

    updateDossier() {
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

      return gdos.id;
    },
  },

  created() {
    dossierProfessionnelApi
      .getAllDossierProfessionnelByEtudiantAndByCursus(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.dp = data));
  },
};
</script>

<style scoped>
h2 {
  font-weight: bolder;
}

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

/* .test {
  margin-top: 10px;
} */

/* .container {
  margin: 89px 0 0 421px;
  min-height: 340px;
} */
#container 
    {
      width: 75%;
      margin: 5% 0 0 3%;
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