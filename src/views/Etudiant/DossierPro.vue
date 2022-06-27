<template>
  <div class="container">
    <h5>
      Constituer un dossier professionnel :
      <span>{{ data.item.titre }}</span>
    </h5>
    <div v-for="(item, index) in activites" :key="item">
      <!-- ACTIVITES TYPES SELECTEURS -->
      <h6>Activité type {{ index + 1 }} : {{ item.libelle }}</h6>
      <b-form-select
        v-model="selected[index]"
        :options="optionsAT(item)"
        @change="checkAT(index)"
      ></b-form-select>

      <!-- ACTIVITES TYPES MODALE -->
      <b-modal
        id="new-exp-modale"
        size="xl"
        centered
        scrollable
        no-close-on-esc
        hide-footer
        title="TITRE"
      >
        <!-- FULLACCORDION -->
        <div>
          <!-- ACCORDEON EXP 1 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle.accordion-1
                variant="primary"
                class="titre-details-modal volets"
                >1. Décrivez les tâches réalisées ou opérations que vous avez
                effectué et dans quelles conditions.
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <!-- INSERT EXP -->
                <b-form-input
                  id="exp1"
                  v-model="form.experienceProfessionnelles.tacheRealisee"
                  name="tacheRealisee"
                  placeholder="FAIRE LE WYSIWYG"
                  required
                ></b-form-input>

                <!-- <b-form-input
                      id="exp1"
                      placeholder="TACHES REALISEES"
                      required
                    ></b-form-input> -->

                <!-- <b-card-text>{{ text }}</b-card-text> -->
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- ACCORDEON EXP 2 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle.accordion-2
                variant="primary"
                class="titre-details-modal volets"
                >2. Précisez les moyens utilisés.
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder=""
                  rows="8"
                ></b-form-textarea>
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- ACCORDEON EXP 3 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle.accordion-3
                variant="primary"
                class="titre-details-modal volets"
                >3. Avec qui avez-vous travaillé ?
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder=""
                  rows="8"
                ></b-form-textarea>
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- ACCORDEON EXP 4 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle.accordion-4
                variant="primary"
                class="titre-details-modal volets"
                >4. Précisez le contexte.
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-4"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder=""
                  rows="8"
                ></b-form-textarea>
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- ACCORDEON EXP 5 -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle.accordion-5
                variant="primary"
                class="titre-details-modal volets"
                >5. Informations complémentaires (facultatif).
                <i class="bi bi-caret-down-square-fill"></i>
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-5"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder=""
                  rows="8"
                ></b-form-textarea>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <!-- BTN SAVE -->
        <div id="div-save">
                <b-button size="sm" variant="success" type="submit">
                  <font-awesome-icon :icon="['fas', 'check-circle']" />
                  <span class="icon-right">Enregistrer</span>
                </b-button>
        </div>
      </b-modal>

      <br />
    </div>

    <label>
      <h5>Ancien Code</h5>
      <strong>Cursus</strong>
    </label>

    <!-- <br />
    <br />
    ***********
    <br />
    ***********
    <br />
    ***********
    <br />
    <br /> -->

    <!-- <b-form-select
        v-model="selectActivite"
        :options="optionsActivite"
        @change="checkActiviteType1"
        @submit="onSubmit"
      ></b-form-select> -->

    <!-- SELECT Principal-->
    <b-form-select v-model="select1" :options="optionsSelect1"></b-form-select>

    <!-- SELECT CDA-->
    <div v-if="select1 == 'cda'">
      <div id="div-label">
        <label for=""><strong>Activités types</strong></label>
      </div>

      <b-form-select
        v-model="selectActivite"
        :options="optionsActivite"
        @change="checkActiviteType1"
        @submit="onSubmit"
      ></b-form-select>

      <select class="form-select custom-select">
        <option value="cda">Activité type 2 CDA</option>
        <option value="cda">Activité enregistrée 1</option>
        <option value="cda">Activité enregistrée 2</option>
        <option value="cda">Activité enregistrée 3</option>
        <option value="cda">{{ test() }}</option>
      </select>

      <select class="form-select custom-select">
        <option value="mpil">Activité type 3 CDA</option>
        <option value="mpil">Activité enregistrée 1</option>
        <option value="mpil">Activité enregistrée 2</option>
        <option value="mpil">Activité enregistrée 3</option>
      </select>

      <select
        @change="checkAnnexesCDA"
        v-model="annexesCDA"
        class="form-select custom-select"
      >
        <option value="null">Annexes</option>
        <option value="experience">
          Ajouter une expérience professionnelle
        </option>
        <option>Activité enregistrée 1</option>
        <option>Activité enregistrée 2</option>
        <option>Activité enregistrée 3</option>
      </select>
    </div>

    <!-- SELECT MPIL-->
    <!-- <div v-if="select1 == 'mpil'">
      <div id="div-label">
        <label for=""><strong>Activités types</strong></label>
      </div>

      <select class="form-select custom-select">
        <option value="mpil">Activité type 1 MPIL</option>
        <option value="mpil">Activité enregistrée 1</option>
        <option value="mpil">Activité enregistrée 2</option>
        <option value="mpil">Activité enregistrée 3</option>
      </select>
      <select class="form-select custom-select">
        <option value="mpil">Activité type 2 MPIL</option>
        <option value="mpil">Activité enregistrée 1</option>
        <option value="mpil">Activité enregistrée 2</option>
        <option value="mpil">Activité enregistrée 3</option>
      </select>
      <select class="form-select custom-select">
        <option value="mpil">Activité type 3 MPIL</option>
        <option value="mpil">Activité enregistrée 1</option>
        <option value="mpil">Activité enregistrée 2</option>
        <option value="mpil">Activité enregistrée 3</option>
      </select>
      <select
        @change="checkAnnexesMPIL"
        v-model="annexesMPIL"
        class="form-select custom-select"
      >
        <option value="null">Annexes</option>
        <option value="experience">
          Ajouter une expérience professionnelle
        </option>
        <option>Activité enregistrée 1</option>
        <option>Activité enregistrée 2</option>
        <option>Activité enregistrée 3</option>
      </select>
    </div> -->

    <!--modale Nouvelle experience professionnelle-->
    <b-modal
      id="exp-pro-modal"
      size="xl"
      title="Exemple de compétence : Activité-type 3 -CDA"
      centered
      scrollable
      no-close-on-esc
      @hidden="resetModal"
      hide-footer
    >
      <!-- FORMULAIRE -->
      <b-form @submit="onSubmit">
        <template>
          <div v-if="select1 == 'cda'"></div>
          <div v-if="select1 == 'mpil'"></div>

          <div v-if="selectActivite == 'aep'">
            <b-form-select
              v-model="selectAjouterActivite"
              :options="optionsSelectAjouterActivite"
            ></b-form-select>
            <div
              v-if="selectAjouterActivite != null"
              class="accordion accordeon-groupe"
              role="tablist"
            >
              <!-- ACCORDEON EXP 1 -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle.accordion-1
                    variant="primary"
                    class="titre-details-modal volets"
                    >1. Décrivez les tâches réalisées ou opérations que vous
                    avez effectué et dans quelles conditions.
                    <i class="bi bi-caret-down-square-fill"></i>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <!-- INSERT EXP -->
                    <b-form-input
                      id="exp1"
                      v-model="form.experienceProfessionnelles.tacheRealisee"
                      name="tacheRealisee"
                      placeholder="TACHES REALISEES"
                      required
                    ></b-form-input>

                    <!-- <b-form-input
                      id="exp1"
                      placeholder="TACHES REALISEES"
                      required
                    ></b-form-input> -->

                    <!-- <b-card-text>{{ text }}</b-card-text> -->
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- ACCORDEON EXP 2 -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle.accordion-2
                    variant="primary"
                    class="titre-details-modal volets"
                    >2. Précisez les moyens utilisés.
                    <i class="bi bi-caret-down-square-fill"></i>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-form-textarea
                      id="textarea-rows"
                      placeholder=""
                      rows="8"
                    ></b-form-textarea>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- ACCORDEON EXP 3 -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle.accordion-3
                    variant="primary"
                    class="titre-details-modal volets"
                    >3. Avec qui avez-vous travaillé ?
                    <i class="bi bi-caret-down-square-fill"></i>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-form-textarea
                      id="textarea-rows"
                      placeholder=""
                      rows="8"
                    ></b-form-textarea>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- ACCORDEON EXP 4 -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle.accordion-4
                    variant="primary"
                    class="titre-details-modal volets"
                    >4. Précisez le contexte.
                    <i class="bi bi-caret-down-square-fill"></i>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-4"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-form-textarea
                      id="textarea-rows"
                      placeholder=""
                      rows="8"
                    ></b-form-textarea>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- ACCORDEON EXP 5 -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle.accordion-5
                    variant="primary"
                    class="titre-details-modal volets"
                    >5. Informations complémentaires (facultatif).
                    <i class="bi bi-caret-down-square-fill"></i>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-5"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-form-textarea
                      id="textarea-rows"
                      placeholder=""
                      rows="8"
                    ></b-form-textarea>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <div id="div-save">
                <b-button size="sm" variant="success" type="submit">
                  <font-awesome-icon :icon="['fas', 'check-circle']" />
                  <span class="icon-right">Enregistrer</span>
                </b-button>
              </div>
            </div>
          </div>
        </template>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { cursusApi } from "@/_api/cursus.api.js";
import { activiteTypeApi } from "@/_api/activiteType.api.js";

export default {
  name: "Selects",
  components: {},
  data: function () {
    return {
      //DATA TRANSFERT DEPUIS ROUTER-LINK
      data: this.$route.query.data,

      entriesSelect2: [],
      annexesCDA: null,
      annexesMPIL: null,
      select1: null,
      cursus: [],
      activites: [],
      options: [],
      selected: [null, null, null],

      form: {
        id: 0,
        nom: "",
        cursus: {
          id: 0,
          titre: "",

          activiteTypes: {
            id: 0,
            libelle: "",

            competenceProfessionnelles: {
              id: 0,
              libelle: "",
            },
          },
        },

        experienceProfessionnelles: {
          id: 0,
          tacheRealisee: "",
          moyenUtilise: "",
          collaborateur: "",
          contexte: "",
          information: "",
          competenceProfessionnelleId: 0,
        },
      },

      // SELECT CONSTITUER DOSSIER
      optionsSelect1: [
        { value: null, text: "Choisir un cursus" },
        { value: "cda", text: "Concepteur développeur d'applications" },
        { value: "mpil", text: "Manager de projet en ingénierie logicielle" },
      ],

      // SELECT ACTIVITES TYPES
      selectActivite: null,
      optionsActivite: [
        { value: null, text: "Activité type 1 CDA" },
        { value: "aep", text: "Ajouter une expérience professionnelle" },
        { value: "o1", text: "Activité enregistrée 1" },
        { value: "o2", text: "Activité enregistrée 2" },
        { value: "o3", text: "Activité enregistrée 3" },
      ],

      // SELECT DE LA MODLAE
      selectAjouterActivite: null,
      optionsSelectAjouterActivite: [
        { value: null, text: "Compétences professionnelles" },
        { value: "b", text: "Concevoir une application" },
        {
          value: "c",
          text: "Collaborer à la gestion d'un projet informatique et à l'organisation de l'environnement de développement",
        },
        { value: "d", text: "Développer des composants métier" },
        { value: "e", text: "Construire une application organisée en couches" },
        { value: "f", text: "Développer une application mobile" },
        {
          value: "g",
          text: "Préparer et exécuter les plans de tests d'une application",
        },
        {
          value: "h",
          text: "Préparer et exécuter le déploiement d'une application",
        },
      ],
    };
  },

  methods: {
    checkAnnexesCDA: function () {
      if (this.annexesCDA == "experience") {
        this.$bvModal.show("exp-pro-modal");
      }
    },

    checkAnnexesMPIL: function () {
      if (this.annexesMPIL == "experience") {
        this.$bvModal.show("exp-pro-modal");
      }
    },

    checkActiviteType1: function () {
      if (this.selectActivite == "aep") {
        this.$bvModal.show("exp-pro-modal");
      }
    },

    // LANCE MODALE APRES AJOUTER ACTIVITE
    checkAT(index) {
      if (this.selected[index] == "aep") {
        // console.dir("this > " + JSON.stringify(this.selected[index], null, 4));
        this.$bvModal.show("new-exp-modale");
      }
      // let transAT = "";
      // transAT = this.optionsAT(item).text;
      // console.log("transAT" + transAT);
    },

    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },

    save() {},

    // ENVOIE FORMULAIRE
    onSubmit(event) {
      event.preventDefault();

      dossierProfessionnelApi.saveDossierProfessionnel(
        // console.log("ici"),
        console.dir("form > " + JSON.stringify(this.form, null, 4)),
        // console.log("etudiant id > " + this.$store.getters.getUtilisateur.etudiantDto.id),
        this.form,
        this.$store.getters.getUtilisateur.etudiantDto.id
      );
    },

    // OPTIONS DES ACTIVITES TYPES
    optionsAT(item) {
      let tab = [
        { value: null, text: "+ Ajouter une expérience professionnelle à :" },
      ];

      if (item.competencesProfessionnellesDto) {
        // console.dir("tab > " + JSON.stringify(tab, null, 4));

        for (let i = 0; i < item.competencesProfessionnellesDto.length; i++) {
          // console.log("item.competencesProfessionnellesDto[i].libelle > " + item.competencesProfessionnellesDto[i].libelle);
          tab.push({
            value: "aep",
            text: item.competencesProfessionnellesDto[i].libelle,
          });
        }
      }

      // console.dir("tab > " + JSON.stringify(tab, null, 4));
      return tab;
    },

    test() {},
  },

  created() {
    cursusApi.getAllCursus().then((data) => (this.cursus = data));

    activiteTypeApi
      .getAllByIdPromotion(this.data.item.id)
      .then((data) => (this.activites = data));
  },
};
</script>

<style scoped>
/* TEMPORAIRE BUG */
footer {
  display: none;
}
.custom-select {
  margin-bottom: 5px;
}
.bi {
  position: relative;
  top: 4px;
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
