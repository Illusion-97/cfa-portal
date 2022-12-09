<template>

  <!-- CONTAINER UPDATE DOSSIER -->
  <div class="container" v-if="data.item.cursus.dossierProfessionnel">
    <h5>
      Modifier le dossier professionnel :
      <span>{{ data.item.cursus.titre }}</span>
      <!-- <span>{{ data.item.cursus.dossierProfessionnel.cursus.activiteTypes }}</span> -->
    </h5>

    <div v-for="(item, index) in data.item.cursus.dossierProfessionnel.cursus.activiteTypes" :key="index">
      <!-- ACTIVITES TYPES SELECTEURS -->
      <h6>Activité type {{ index + 1 }} : {{ item.libelle }}</h6>

      <!-- OLD LISTE COMPETENCES PRO -->
      <!-- <b-form-select v-model="item[index]" :options="optionsAT(item)" @change="getValue"></b-form-select>
      <br /> -->

      <!--LISTE COMPETENCES PRO -->
      <b-form-select v-model="start" :options="optionsAT(item)" @change="getValue"></b-form-select>
      <br>
    </div>

    <!-- ACTIVITES TYPES MODALE -->
    <b-modal id="exp-pro-modal" size="xl" :title="'Compétence professionnelle : ' + compInModal.libelle" centered
      scrollable no-close-on-esc @hidden="resetModal" hide-footer>

      <!-- FORMULAIRE -->
      <b-form @submit="onSubmit">
        <!-- ACCORDEON EXP 1 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary" class="titre-details-modal volets">1. Décrivez les
              tâches réalisées ou opérations que vous avez
              effectué et dans quelles conditions.
              <i class="fa-solid fa-square-caret-down"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <!-- <b-form-input id="exp1" v-model="expPro.tacheRealisee" name="tacheRealisee"
                placeholder="Tâches réalisées"></b-form-input> -->
                <vue-editor v-model="expPro.tacheRealisee" id="exp1" name="tacheRealisee" placeholder="Tâches réalisées" />
            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 2 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary" class="titre-details-modal volets">2. Précisez les
              moyens utilisés.
              <i class="fa-solid fa-square-caret-down"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <!-- <b-form-input id="exp2" ref="aa" v-model="expPro.moyenUtilise" name="moyenUtilise"
                placeholder="Moyens utilisés"></b-form-input> -->
                <vue-editor v-model="expPro.moyenUtilise" id="exp2" name="moyenUtilise" placeholder="Moyens utilisés" />

            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 3 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="primary" class="titre-details-modal volets">3. Avec qui
              avez-vous travaillé ?
              <i class="fa-solid fa-square-caret-down"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <!-- <b-form-input id="exp3" v-model="expPro.collaborateur" name="collaborateur" placeholder="Collaborateurs">
              </b-form-input> -->
              <vue-editor v-model="expPro.collaborateur" id="exp3" name="collaborateur" placeholder="Collaborateurs" />

            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 4 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="primary" class="titre-details-modal volets">4. Précisez le
              contexte.
              <i class="fa-solid fa-square-caret-down"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <!-- <b-form-input id="exp4" v-model="expPro.contexte" name="contexte" placeholder="Contexte"></b-form-input> -->
              <vue-editor v-model="expPro.contexte" id="exp4" name="contexte" placeholder="Contexte" />

            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 5 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-5 variant="primary" class="titre-details-modal volets">5. Informations
              complémentaires (facultatif).
              <i class="fa-solid fa-square-caret-down"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <!-- <b-form-input id="exp5" v-model="expPro.information" name="information" placeholder="Informations">
              </b-form-input> -->
              <vue-editor v-model="expPro.information" id="exp5" name="information" placeholder="Informations" />
            </b-card-body>

          </b-collapse>
        </b-card>


        <div id="div-save">

          <!-- BOUTON DELETE EXP -->
          <!-- MARCHE PAS -->
          <!-- <div v-if="test()">
              YOOOOOOOOOOOO
          </div> -->
          <!-- <div v-if="res == undefined">
              YOOOOOOOOOOOO
          </div> -->
          <!-- <div v-else>
              XXXXXXXXXX
          </div> -->


          <div v-if="hideDelete == true">
            <b-button size="sm" variant="danger" class="btn-delete" @click="deleteExp()">
              <font-awesome-icon :icon="['fas', 'trash']" />
              <span class="icon-right">Supprimer</span>
            </b-button>
          </div>

          <!-- BOUTON UPDATE -->
          <b-button size="sm" variant="primary" @click="updateExp()" class="btn-delete">
            <i class="fa-solid fa-square-pen"></i>
            <span class="icon-right">Mettre à jour</span>
          </b-button>

        </div>

      </b-form>
    </b-modal>

    <!-- LAUCHN MODALE TEST -->
    <!-- <b-button v-b-modal.modal-success>test modale dossier créer</b-button>
    <br>
    <br>
    <b-button v-b-modal.modal-update-success>test modale dossier mis à jour</b-button> -->

    <!-- MODALE SUCCESS DOSSIER CREE -->
    <b-modal id="modal-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre dossier professionnel a correctement été crée.
      </p>
      <div class="div-ok">
        <b-button variant="primary">
          <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnel'">Ok</router-link>
        </b-button>
      </div>
    </b-modal>

    <!-- MODALE SUCCESS DOSSIER UPDATE -->
    <b-modal id="modal-update-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre expérience professionnelle à correctement été mis à jour.
      </p>
      <div class="div-ok">
        <b-button variant="primary" @click="$bvModal.hide('modal-update-success')">
          Continuer
        </b-button>
      </div>
    </b-modal>

    <!-- MODALE SUCCESS DOSSIER DELETE -->
    <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre expérience professionnelle à correctement supprimé.
      </p>
      <div class="div-ok">
        <b-button variant="primary" @click="$bvModal.hide('modal-delete-success')">
          Continuer
        </b-button>
      </div>
    </b-modal>

  </div>

  <!-- CONTAINER CREER DOSSIER -->
  <div class="container" v-else>
    <h5>
      Créer le dossier professionnel :
      <span>{{ data.item.cursus.titre }}</span>
    </h5>

    <div v-for="(item, index) in data.item.cursus.activiteTypes" :key="index">

      <!-- ACTIVITES TYPES SELECTEURS -->
      <h6>Activité type {{ index + 1 }} : {{ item.libelle }}</h6>

      <b-form-select v-model="start" :options="optionsAT2(item)" @change="getValue2"></b-form-select>
      <!-- <b-form-select v-model="item[index]" :options="optionsAT(item)" @change="getValue"></b-form-select> -->
      <br />
    </div>

    <!-- ACTIVITES TYPES MODALE -->
    <b-modal id="exp-pro-modal" size="xl" :title="'Compétence professionnelle : ' + compInModal.libelle" centered
      scrollable no-close-on-esc @hidden="resetModal" hide-footer>

      <!-- FORMULAIRE -->
      <b-form @submit="onSubmit">
        <!-- ACCORDEON EXP 1 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary" class="titre-details-modal volets">1. Décrivez les
              tâches réalisées ou opérations que vous avez
              effectué et dans quelles conditions.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <vue-editor v-model="expPro.tacheRealisee" id="exp1" name="tacheRealisee" placeholder="Tâches réalisées" />

            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 2 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary" class="titre-details-modal volets">2. Précisez les
              moyens utilisés.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <vue-editor v-model="expPro.moyenUtilise" id="exp2" name="moyenUtilise" placeholder="Moyens utilisés" />

            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 3 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="primary" class="titre-details-modal volets">3. Avec qui
              avez-vous travaillé ?
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <vue-editor v-model="expPro.collaborateur" id="exp3" name="collaborateur" placeholder="Collaborateurs" />

            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 4 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="primary" class="titre-details-modal volets">4. Précisez le
              contexte.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <vue-editor v-model="expPro.contexte" id="exp4" name="contexte" placeholder="Contexte" />
            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 5 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-5 variant="primary" class="titre-details-modal volets">5. Informations
              complémentaires (facultatif).
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <vue-editor v-model="expPro.information" id="exp5" name="information" placeholder="Informations" />

            </b-card-body>
          </b-collapse>
        </b-card>

        <div id="div-save">
          <!-- BOUTON SAVE EXP -->
          <b-button size="sm" variant="success" type="submit">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            <span class="icon-right">Créer</span>
          </b-button>
        </div>

      </b-form>
    </b-modal>

    <!-- MODALE SUCCESS DOSSIER CREE -->
    <b-modal id="modal-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre dossier professionnel a correctement été crée.
      </p>
      <div class="div-ok">
        <b-button variant="primary">
          <router-link class="nav-item first" :to="'/etudiant/dossierprofessionnel'">Ok</router-link>
        </b-button>
      </div>
    </b-modal>

    <!-- MODALE SUCCESS DOSSIER UPDATE -->
    <b-modal id="modal-update-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre expérience professionnelle à correctement été mis à jour.
      </p>
      <div class="div-ok">
        <b-button variant="primary" @click="$bvModal.hide('modal-update-success')">
          Continuer
        </b-button>
      </div>
    </b-modal>

    <!-- MODALE SUCCESS DOSSIER DELETE -->
    <b-modal id="modal-delete-success" centered size="lg" no-close-on-esc hide-footer title="Félicitations !">
      <p>
        <img src="@/assets/img/verifier.png" class="check" />
        Votre expérience professionnelle à correctement supprimé.
      </p>
      <div class="div-ok">
        <b-button variant="primary" @click="$bvModal.hide('modal-delete-success')">
          Continuer
        </b-button>
      </div>
    </b-modal>


  </div>
</template>

<script>
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { experiencesApi } from "@/_api/experiences.api.js";
import { cursusApi } from "@/_api/cursus.api.js";
import { activiteTypeApi } from "@/_api/activiteType.api.js";
import { VueEditor } from "vue2-editor";

export default {
  name: "Selects",
  components: {
    VueEditor
  },
  data: function () {
    return {
      //DATA TRANSFERT DEPUIS ROUTER-LINK
      data: this.$route.query.data,
      text: "test",
      select1: null,
      cursus: [],
      activites: [],
      options: [],
      selectActivite: [],
      compInModal: [],
      expPro: [],
      activitesByCursus: [],
      hideDelete: false,
      start: null,

      tempActivite: [],
      tempCompetence: [],

      dpId: 0,

      form: {
        id: 0,
        nom: "",

        cursus: {
          id: 0,
          titre: "",

          activiteTypes: [{
            id: 0,
            libelle: "",

            competenceProfessionnelles: [{
              id: 0,
              libelle: ""
            }],
          }],
        },

        experienceProfessionnelles: [{
          id: 0,
          tacheRealisee: "",
          moyenUtilise: "",
          collaborateur: "",
          contexte: "",
          information: "",
          competenceProfessionnelleId: 0
        }],
      },

      formExp: {
        id: 0,
        tacheRealisee: "",
        moyenUtilise: "",
        collaborateur: "",
        contexte: "",
        information: "",
        competenceProfessionnelleId: 0,
      }

    };
  },

  methods: {

    // RESET MODALE
    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },

    // LANCE LA MODALE DE LA COMPETENCE CHOISIE
    getValue(value) {
      this.compInModal = value;

      // console.dir(
      //   "compInModal > " + JSON.stringify(this.compInModal, null, 4)
      // );

      this.$bvModal.show("exp-pro-modal");
      this.tempCompetence = value;

      // ENVOYER L'OBJET COMPETENCE PRO
      this.expPro;
      let res2 = {
        id: 0,
        tacheRealisee: "",
        moyenUtilise: "",
        collaborateur: "",
        contexte: "",
        information: "",
        competenceProfessionnelleId: 0
      }

      let res = this.compInModal.experienceProfessionnelles.find(e => e.competenceProfessionnelleId == this.compInModal.id)

      console.dir(
        "res > " + JSON.stringify(res, null, 4)
      );

      this.expPro = res || res2;

      // SWITCH DELETE EXP PRO
      if (this.expPro.tacheRealisee ||
        this.expPro.moyenUtilise ||
        this.expPro.collaborateur ||
        this.expPro.contexte ||
        this.expPro.information) {
        this.hideDelete = true;
      } else {
        this.hideDelete = false;
      }

    },

    // LANCE LA MODALE DE LA COMPETENCE CHOISIE
    getValue2(value) {
      this.compInModal = value;

      // console.dir(
      //   "compInModal > " + JSON.stringify(this.compInModal, null, 4)
      // );

      this.$bvModal.show("exp-pro-modal");
      this.tempCompetence = value;
    },

    // OPTIONS DES ACTIVITES TYPES - MODIFIER
    optionsAT(item) {
      let tab = [
        {
          value: null,
          text: "+ Ajouter une expérience professionnelle à la compétence :",
          disabled: true,
        },
      ];

      // console.dir(
      //   "item.competenceProfessionnelles > " +
      //   JSON.stringify(item.competenceProfessionnelles, null, 4)
      // );

      if (item.competenceProfessionnelles) {
        for (let i = 0; i < item.competenceProfessionnelles.length; i++) {

          let disableValue;

          const found = item.competenceProfessionnelles[i].experienceProfessionnelles.find(e => e.competenceProfessionnelleId == item.competenceProfessionnelles[i].id)

          // SANS EXP PRO
          if (found == undefined) {
            disableValue = false;

            tab.push({
              value: item.competenceProfessionnelles[i],
              text: item.competenceProfessionnelles[i].libelle,
              disabled: disableValue,

            });

            // AVEC EXP PRO
          } else {
            disableValue = true;

            tab.push({
              value: item.competenceProfessionnelles[i],
              html: '<span>&#x2705</span> ' + item.competenceProfessionnelles[i].libelle
            });
          }
        }
      }
      return tab;
    },

    // OPTIONS DES ACTIVITES TYPES2
    optionsAT2(item) {
      let tab = [
        {
          value: null,
          text: "+ Ajouter une expérience professionnelle à :",
          disabled: true,
        },
      ];

      if (item.competenceProfessionnelles) {
        for (let i = 0; i < item.competenceProfessionnelles.length; i++) {

          tab.push({
            value: item.competenceProfessionnelles[i],
            text: item.competenceProfessionnelles[i].libelle,
            disabled: false,
          });

          // <img src="@/assets/img/verifier.png" class="check" />
        }
      }
      return tab;
    },

    // ENVOIE FORMULAIRE
    onSubmit(event) {
      event.preventDefault();
      dossierProfessionnelApi
        .saveDossierProfessionnel(
          this.$store.getters.getUtilisateur.etudiantDto.id,
          {
            id: 0,
            nom: "",

            cursus: {
              id: this.data.item.cursus.id,
              titre: this.data.item.cursus.titre,

              activiteTypes: [{
                id: 0,
                libelle: "",

                competenceProfessionnelles: [{
                  id: this.tempCompetence.id,
                  libelle: this.tempCompetence.libelle
                }],
              }],
            },

            experienceProfessionnelles: [{
              id: 0,
              tacheRealisee: this.expPro.tacheRealisee,
              moyenUtilise: this.expPro.moyenUtilise,
              collaborateur: this.expPro.collaborateur,
              contexte: this.expPro.contexte,
              information: this.expPro.information,
              competenceProfessionnelleId: this.tempCompetence.id
            }],
          },
        )
        // REDIRECTION
        .then(() =>
          this.$bvModal.hide("exp-pro-modal"),
          this.$bvModal.show("modal-success")
        );
    },

    updateExp() {

      dossierProfessionnelApi
        .updateDossierProfessionnel(
          // [{
          //   id: this.expPro.id,
          //   tacheRealisee: this.expPro.tacheRealisee,
          //   moyenUtilise: this.expPro.moyenUtilise,
          //   collaborateur: this.expPro.collaborateur,
          //   contexte: this.expPro.contexte,
          //   information: this.expPro.information,
          //   competenceProfessionnelleId: this.tempCompetence.id,
          //   dossierProfessionnelId: this.data.item.cursus.dossierProfessionnel.id,
          //   version: this.expPro.version
          // }]

          {
            id: this.data.item.cursus.dossierProfessionnel.id,
            nom: "",
            cursus: {
              id: this.data.item.cursus.id,
              titre: "",
              activiteTypes: [
                {
                  id: "",
                  libelle: "",
                  numeroFiche: "",
                  competenceProfessionnelles: [
                    {
                      id: this.compInModal.id,
                      libelle: "",
                      numeroFiche: this.compInModal.numeroFiche,
                      version: 0,
                      experienceProfessionnelles: null
                    }
                  ],
                  version: 0
                }
              ],
              version: 0
            },
            experienceProfessionnelles: [
              {
                id: this.expPro.id,
                tacheRealisee: this.expPro.tacheRealisee,
                moyenUtilise: this.expPro.moyenUtilise,
                collaborateur: this.expPro.collaborateur,
                contexte: this.expPro.contexte,
                information: this.expPro.information,
                competenceProfessionnelleId: this.tempCompetence.id,
                dossierProfessionnelId: this.data.item.cursus.dossierProfessionnel.id,
                version: this.expPro.version
              }
            ],
            version: 0
          }
          , this.$store.getters.getUtilisateur.etudiantDto.id

        )

        // REDIRECTION
        .then(() =>
          this.$bvModal.hide("exp-pro-modal"),
          this.$bvModal.show("modal-update-success"),
        );
    },

    deleteExp() {
      experiencesApi
        .deleteById(this.expPro.id)

        // REDIRECTION
        .then(() =>
          this.$bvModal.hide("exp-pro-modal"),
          this.$bvModal.show("modal-delete-success"),

          // TEST MARCHE PAS 
          // this.optionsAT()
        );


    }

  },

  created() {
    cursusApi
      .getAllCursus().then((data) => (this.cursus = data));

    activiteTypeApi
      .getAllByIdPromotion(this.data.item.id)
      .then((data) => (this.activites = data));

    activiteTypeApi
      .getActiviteTypesByCursus(this.data.item.id)
      .then((data) => (this.activitesByCursus = data));

    // console.log("Dossier Professionnel > " + this.data);
    // console.dir(
    //   "data > " +
    //   JSON.stringify(this.data, null, 4)
    // );

    // console.log("************" + this.data.item.cursus.dossierProfessionnel.id);

    // setDpId(){
    //      // Dossier professionnel ID
    //      if (data.item.cursus.dossierProfessionnel !== null) {
    //     console.log("data.item.cursus.dossierProfessionnel.id : " + data.item.cursus.dossierProfessionnel.id);
    //     return this.dpId = data.item.cursus.dossierProfessionnel.id
    //   } else {
    //     return 0
    //   }
    // }

  },
};
</script>

<style scoped>
/* TEMPORAIRE BUG */
footer {
  display: none;
}

.modal-title {
  font-weight: bolder;
}

.fa-square-caret-down {
  position: relative;
  top: 4px;
}

.btn-delete {
  margin-right: 7px;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: white;
  text-decoration: none;
}

.check {
  width: 20px;
}

.div-ok {
  justify-content: flex-end;
  display: flex;
}

.custom-select {
  margin-bottom: 5px;
}

.bi {
  position: relative;
  top: 2px;
}

.volets {
  display: flex;
  justify-content: space-between;
}

#div-save {
  justify-content: flex-end;
  display: flex;
}

#div-label {
  margin-top: 10px;
}

h5 {
  margin: 0 0 30px 0;
  font-weight: bolder;
}

.container {
  margin: 89px 0 0 421px;
  min-height: 340px;
}

select {
  display: block;
}

.accordeon-groupe {
  margin-top: 15px;
}

.titre-details-modal {
  text-align: left;
  padding: 6px 25px;
}

.card-header button {
  background-color: #e11b28 !important;
  border-color: #e11b28 !important;
}

.icon-right {
  margin-left: 7px;
}
</style>
