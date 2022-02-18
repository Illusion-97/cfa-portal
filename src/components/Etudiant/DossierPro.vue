<template>
  <div class="container">
    <h5>Constituer un dossier professionnel</h5>

    <!-- select -->
    <select v-model="filter1" class="form-select">
      <option v-for="choice in entriesSelect1" :key="choice">
        {{ choice }}
      </option>
    </select>
    <div id="div-label"><label for="">Activités types</label></div>
    <SelectCDA v-if="filter1 == 'Concepteur développeur d\'applications'" @modal="$bvModal.show('exp-pro-modal')"/>
    <SelectMPIL v-if="filter1 == 'Manager de projet en ingénierie logicielle'" @modal="$bvModal.show('exp-pro-modal')"/>

    <b-modal id="exp-pro-modal"
              title="Exemple de compétence : Activité-type 3 -CDA"
              centered
              scrollable
              no-close-on-esc
    >
      <template >
        <div v-if="filter1 == 'Concepteur développeur d\'applications'">
          <label for="">Compétence professionnelle</label>
          <select class="form-select">

          </select>
        </div>
        <div v-if="filter1 == 'Manager de projet en ingénierie logicielle'">

        </div>
      </template>
      <template #modal-footer="{ save }">
          <b-button size="sm" variant="danger" @click="save()">Enregistrer</b-button>
      </template>
    </b-modal>

</div>
</template>

<script>
import SelectCDA from "@/components/Etudiant/SelectCDA.vue";
import SelectMPIL from "@/components/Etudiant/SelectMPIL.vue";
export default {
  name: "Selects",
  components: {
    SelectCDA,
    SelectMPIL,
  },
  data: function () {
    return {
      entriesSelect1: [
        "--Cursus--",
        "Concepteur développeur d'applications",
        "Manager de projet en ingénierie logicielle",
      ],
      entriesSelect2: [],
      filter1: "--Cursus--"
    };
  },
  methods: {
    showModal: function () {
      this.$bvModal.show("experience-pro-modal");
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
