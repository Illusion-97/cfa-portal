<template>
  <div class="container">
    <h5>Constituer un dossier professionnel</h5>

    <!-- select Principal-->
    <b-form-select v-model="select1" :options="optionsSelect1"></b-form-select>

    <div id="div-label"><label for="">Activités types</label></div>
    
    <!-- SELECT CDA-->
    <div v-if="select1 == 'cda'">

      <b-form-select v-model="selectActivite" :options="optionsActivite" @change="checkActiviteType1"></b-form-select>

      <select class="form-select">
        <option value="cda">Activité type 2 CDA</option>
        <option value="cda">Option 1</option>
        <option value="cda">Option 2</option>
        <option value="cda">Option 3</option>
      </select>
        <select class="form-select">
        <option value="mpil">Activité type 3 CDA</option>
        <option value="mpil">Option 1</option>
        <option value="mpil">Option 2</option>
        <option value="mpil">Option 3</option>
      </select>
      <select @change="checkAnnexesCDA" v-model="annexesCDA" class="form-select">
        <option value="null">Annexes</option>
        <option value="experience">Ajouter une expérience professionnelle</option>
        <option >Exemple 2</option>
        <option >Exemple 3</option>
      </select>
  </div>

    <!-- SELECT MPIL-->
    <div v-if="select1 == 'mpil'">
      <select class="form-select">
      <option value="mpil">Activité type 1 MPIL</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
      </select>
      <select class="form-select">
      <option value="mpil">Activité type 2 MPIL</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
      </select>
      <select class="form-select">
      <option value="mpil">Activité type 3 MPIL</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
      </select>
      <select @change="checkAnnexesMPIL" v-model="annexesMPIL" class="form-select">
      <option value="null">Annexes</option>
      <option value="experience">Ajouter une expérience professionnelle</option>
      <option >Exemple 2</option>
      <option >Exemple 3</option>
      </select>
    </div>

    <!--modale Nouvelle experience professionnelle-->
    <b-modal id="exp-pro-modal"
              title="Exemple de compétence : Activité-type 3 -CDA"
              centered
              scrollable
              no-close-on-esc
              @hidden="resetModal"
    >
      <template >
        <div v-if="select1 == 'cda'">

        </div>
        <div v-if="select1 == 'mpil'">

        </div>

        <div v-if="selectActivite == 'aep'">
            <b-form-select v-model="selectAjouterActivite" :options="optionsSelectAjouterActivite"></b-form-select>
            <div v-if="selectAjouterActivite != null" class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                    <!-- <b-card-text>{{ text }}</b-card-text> -->
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <!-- <b-card-text>{{ text }}</b-card-text> -->
                  </b-card-body>
                </b-collapse>
              </b-card>

              
            </div>
        </div>

      </template>
      <template #modal-footer="{ save }">
          <b-button size="sm" variant="danger" @click="save()">Enregistrer</b-button>
      </template>
    </b-modal>
</div>
</template>

<script>
export default {
   name: "Selects",
   components: {
    },
  data: function () {
    return {
      entriesSelect2: [],
      annexesCDA: null,
      annexesMPIL: null,
      select1: null,
        optionsSelect1: [
          { value: null, text: '--Cursus--' },
          { value: 'cda', text: 'Concepteur développeur d\'applications' },
          { value: 'mpil', text: 'Manager de projet en ingénierie logicielle' }
        ],

        selectActivite: null,
        optionsActivite: [
          { value: null, text: 'Activité type 1 CDA' },
          { value: 'aep', text: 'Ajouter une expérience professionnelle' },
          { value: 'o1', text: 'Option 1' },
          { value: 'o2', text: 'Option 2' },
          { value: 'o3', text: 'Option 3' }
        ],
        selectAjouterActivite: null,
        optionsSelectAjouterActivite: [
          { value: null, text: 'Compétence professionnelle' },
          { value: 'b', text: 'Concevoir une application' },
          { value: 'c', text: 'Collaborer à la gestion d\'un projet informatique et à l\'organisation de l\'environnement de développement' },
          { value: 'd', text: 'Développer des composants métier' },
          { value: 'e', text: 'Construire une application organisée en couches' },
          { value: 'f', text: 'Développer une application mobile' },
          { value: 'g', text: 'Préparer et exécuter les plans de tests d\'une application' },
          { value: 'h', text: 'Préparer et exécuter le déploiement d\'une application' }
        ]
    };
  },
  methods: {
    checkAnnexesCDA: function () {
      if (this.annexesCDA == "experience") {
        this.$bvModal.show('exp-pro-modal');
      }
    },
    checkAnnexesMPIL: function () {
      if (this.annexesMPIL == "experience") {
        this.$bvModal.show('exp-pro-modal');
      }
     },
    checkActiviteType1: function () {
      if (this.selectActivite == "aep") {
        this.$bvModal.show('exp-pro-modal');
      }
    },
    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },
    save() {
    }
  }
};
</script>

<style scoped>
#div-label {
  margin-top: 10px;
}
h5 {
  margin: 0 0 30px 0;
}
.container {
  margin: 99px 0 0 421px;
}
select {
  display: block;
}
</style>
