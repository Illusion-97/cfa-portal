<template>
  <div class="container">
    <h5>Constituer un dossier professionnel</h5>

    <!-- select Principal-->
    <select v-model="select1" class="form-select">
            <option v-for="choice in entriesSelect1" :key="choice">{{ choice }}</option>
    </select>
    <div id="div-label"><label for="">Activités types</label></div>
    
    <!-- SELECT CDA-->
    <div v-if="select1 == 'Concepteur développeur d\'applications'">
      <select class="form-select">
        <option value="cda">Activité type 1 CDA</option>
        <option value="cda">Option 1</option>
        <option value="cda">Option 2</option>
        <option value="cda">Option 3</option>
      </select>
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
    <div v-if="select1 == 'Manager de projet en ingénierie logicielle'">
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
    >
      <template >
        <div v-if="select1 == 'Concepteur développeur d\'applications'">
          <label for="">Compétence professionnelle</label>
          <select class="form-select">

          </select>
        </div>
        <div v-if="select1 == 'Manager de projet en ingénierie logicielle'">

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
      entriesSelect1: [
        "--Cursus--",
        "Concepteur développeur d'applications",
        "Manager de projet en ingénierie logicielle",
      ],
      entriesSelect2: [],
      select1: "--Cursus--",
      annexesCDA: null,
      annexesMPIL: null
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
