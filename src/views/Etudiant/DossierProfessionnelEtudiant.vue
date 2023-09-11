<template>
  <div class="container-fluid" id="container">
    <div id="dos">
      <h2>Dossiers professionnels</h2>

      <!-- TABLEAU TEST -->
      <b-table small head-variant="dark" :items="dp.promotions" :fields="fields"
        v-if="dp.promotions != 0 && this.$store.getters.getUtilisateur.etudiantDto">
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
            
       
      <b-button type="file" id="fileImport" size="sm" class="mr-2" variant="primary" @click.prevent="openModal(data.item.cursus.id)">
      <i class="fa-solid fa-cloud"></i>
      Uploader
    </b-button>
    <router-link :to="{
                name: 'etudiant_dossierpro',
                query: { data: data },
              }">
    <b-modal v-model="showModalUpload"  @ok="uploadFile" @cancel="resetModal" centered
      scrollable no-close-on-esc>
      <b-form-group label="Nom du dossier professionnel">
        <b-form-input id="nom" v-model="nom"/>  
      </b-form-group>
      <b-form-file v-model="file" label="Choisir un fichier" />
    </b-modal>
 </router-link>

    <!--MODALE SUCCESS-->
    <b-modal  id="modal-create-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre DossierProfessionnel est correctement été importé.
      </p>
      <div class="div-ok">
        <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnels'">
          <b-button variant="primary" @click="$bvModal.hide('modal-create-success')">
          Continuer
        </b-button>
                  </router-link>
      </div>
    </b-modal> 
   <!--<input id="fileImport" v-model="fileImport" @change="uploadFile"/>--> 
  </div>
          </div>

        </template>
      </b-table>
      <ul v-else>
        <li>Pas de dossier professionnel.</li>
      </ul>

      <h4>
  <router-link
    :to="{
      name: 'etudiant_dossierpro',
    }"
    class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" 
  >
    Mes Dossiers Professionnels
  </router-link>
</h4>


      <!-- INFOS -->
      <p id="info" v-if="dp.promotions != 0 && this.$store.getters.getUtilisateur.etudiantDto">
        <br/>
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
      fileImport: {},
      showModalUpload: false,
      cursusId:0,
      file: null,
      nom:"",
      test:"",
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
      dossierProfessionnelApi
        .updateDossierProfessionnel(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.dp = data));
    },

    openModal(cursusId) {
      this.showModalUpload = true;
      this.cursusId = cursusId;
    },
    resetModal() {
      this.nom = '';
      this.file = null;
      this.showModalUpload = false;
    },

    uploadFile() {
  const etudiantId = this.$store.getters.getUtilisateur.etudiantDto.id; 
  dossierProfessionnelApi.handleFileUpload(etudiantId, this.cursusId, this.file, this.nom)
    .then(data => {
      this.$router.push('/etudiant/dossierprofessionnels');
      this.resetModal();
      this.dp = data;

    })
    .catch(error => {
      console.error(error);
    });
  },

    getDossierId(data, dossierProfessionnel) {
      let gdos;

      gdos = dossierProfessionnel.find(
        (element) => element.cursusDto.id == data.item.id
      );
      return gdos.id;
    },
  },

  created() {
    dossierProfessionnelApi
      .getAllDossierProfessionnelByEtudiantAndByCursus(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.dp = data));
      
  }
};

  /*uploadFile() {
    dossierProfessionnelApi
      .generateDossierProByStudentAndPromo(this.$store.getters.getDossierId.etudiantDto.id.promotionId)
      .then(data => {
        this.dp = data;
      })
      .catch(error => {
        console.error(error);
      });
    },*/



 
  </script>

<style scoped src="@/assets/styles/StyleEtudiant.css">
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
