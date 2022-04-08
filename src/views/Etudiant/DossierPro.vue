<template>
  <div class="container">
    <h5>Constituer un dossier professionnel</h5>

    <!-- select Principal-->
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
      ></b-form-select>

      <select class="form-select custom-select">
        <option value="cda">Activité type 2 CDA</option>
        <option value="cda">Activité enregistrée 1</option>
        <option value="cda">Activité enregistrée 2</option>
        <option value="cda">Activité enregistrée 3</option>
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
    <div v-if="select1 == 'mpil'">
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
    </div>

    <!--modale Nouvelle experience professionnelle-->
    <b-modal
      id="exp-pro-modal"
      size="xl"
      title="Exemple de compétence : Activité-type 3 -CDA"
      centered
      scrollable
      no-close-on-esc
      @hidden="resetModal"
    >
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
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-1
                  variant="primary"
                  class="titre-details-modal"
                  >1. Décrivez les tâches réalisées ou opérations que vous avez
                  effectué et dans quelles conditions.
                </b-button>
              </b-card-header>
              <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder=""
                    rows="8"
                  ></b-form-textarea>
                  <!-- <b-card-text>{{ text }}</b-card-text> -->
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-2
                  variant="primary"
                  class="titre-details-modal"
                  >2. Précisez les moyens utilisés.
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

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-3
                  variant="primary"
                  class="titre-details-modal"
                  >3. Avec qui avez-vous travaillé ?
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

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-4
                  variant="primary"
                  class="titre-details-modal"
                  >4. Précisez le contexte.
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

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-5
                  variant="primary"
                  class="titre-details-modal"
                  >5. Informations complémentaires (facultatif).
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
        </div>
      </template>
      <template #modal-footer="{ save }">
        <b-button size="sm" variant="success" @click="save()">
          <font-awesome-icon :icon="['fas', 'check-circle']" />
          <span class="icon-right">Enregistrer</span>
          </b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Selects",
  components: {},
  data: function () {
    return {
      entriesSelect2: [],
      annexesCDA: null,
      annexesMPIL: null,
      select1: null,
      optionsSelect1: [
        { value: null, text: "--Cursus--" },
        { value: "cda", text: "Concepteur développeur d'applications" },
        { value: "mpil", text: "Manager de projet en ingénierie logicielle" },
      ],

      selectActivite: null,
      optionsActivite: [
        { value: null, text: "Activité type 1 CDA" },
        { value: "aep", text: "Ajouter une expérience professionnelle" },
        { value: "o1", text: "Activité enregistrée 1" },
        { value: "o2", text: "Activité enregistrée 2" },
        { value: "o3", text: "Activité enregistrée 3" },
      ],
      selectAjouterActivite: null,
      optionsSelectAjouterActivite: [
        { value: null, text: "Compétence professionnelle" },
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
    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },
    save() {},
  },
};
</script>

<style scoped>
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

.icon-right{
  margin-left: 7px;
}
</style>
