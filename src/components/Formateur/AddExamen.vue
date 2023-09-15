<template>
  <div>
    <b-alert :show="dissmissCountFailed" dismissible fade variant="danger">
      {{ messageError }}
    </b-alert>
    <div class="d-flex justify-content-end">
      <b-button variant="info" v-show="showFormExamen" @click="openToggle" class="btnAddExamen">
        <font-awesome-icon :icon="['fas', 'plus-circle']" class="icon" />
        Ajouter un examen
      </b-button>
    </div>
    <b-alert :show="dismissCountDown" dismissible fade variant="success" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>
    <b-collapse id="collapseExamen">
      <section class="section-form d-flex flex-column justify-content-around">
        <div class="d-flex flex-row">
          <label class="libelle-width">Titre de l'examen :</label>
          <b-form-input id="titreFormExamen" type:text v-model="examenDto.titre" placeholder="Titre"
            required></b-form-input>
        </div>
        <div class="d-flex flex-row mt-3 mb-3">
          <label class="libelle-width">Descriptif :</label>
          <b-form-textarea id="textarea-auto-height" rows="2" max-rows="8" v-model="examenDto.descriptif"
            placeholder="Descriptif"></b-form-textarea>
        </div>
        <div class="d-flex flex-row">
          <label class="libelle-width">Pièce jointe :</label>
          <b-form-file class="mb-2" v-model="file" ref="file-input" placeholder="Sélectionner votre pièce jointe"
            required></b-form-file>
        </div>
        <div class="d-flex flex-row">
          <label class="date-width">Date :</label>
          <b-form-datepicker v-model="examenDto.dateExamen" placeholder="Sélectionner une date"
            class="mb-2 datepicker-width" required></b-form-datepicker>

          <div class="d-flex flex-row w-50 justify-content-end">
            <label class="libelle-width">Durée :</label>
            <b-form-spinbutton class="w-50" v-model="examenDto.duree" wrap min="1" max="10" step="0.5" placeholder="---"
              required></b-form-spinbutton>
          </div>
        </div>
        <div class="d-flex flex-row">
          <b-form-group label="Sélectionner des activités types :" v-slot="{ ariaDescribedby }"
            v-if="optionsBlocsCompetences">
            <b-form-checkbox-group @change="showBlocsLinked" class="form-select-warp-text" id="checkbox-group-1"
              v-model="selectedActivitesTypes" :options="optionsBlocsCompetences" :aria-describedby="ariaDescribedby"
              name="flavour-1" required></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column w-50">
            <label class="libelle-width d-flex flex-row w-75">Compétences professionnelles :</label>
            <b-form-checkbox-group size="lg" v-model="selectedCompConcernees" :options="optionsCheckbox" name="flavour-1b"
              class="
                  col
                  checkbox-width
                " switches required></b-form-checkbox-group>
          </div>
          <!-- <div class="d-flex flex-row w-50 justify-content-end">
            <label class="libelle-width">Durée :</label>
            <b-form-spinbutton class="w-50" v-model="examenDto.duree" wrap min="1" max="10" step="0.5" placeholder="---"
              required></b-form-spinbutton>
          </div> -->
        </div>
        <div>
          <b-form @submit="inputValidation" class="d-flex flex-row justify-content-end bFormBtnValider">
            <v-btn color="success" dark type="submit" class="btnFormExamen btnFormExamenValider">
              <font-awesome-icon :icon="['fas', 'plus-square']" class="icon" />
              Valider
            </v-btn>
            <v-btn color="warning" class="btnFormExamen" @click="cancelForm"><font-awesome-icon
                :icon="['fas', 'undo-alt']" class="icon" />
              Annuler
            </v-btn>

          </b-form>
        </div>
      </section>
    </b-collapse>
  </div>
</template>


<script>
import { examenApi } from "@/_api/examen.api.js";
import { promotionApi } from "@/_api/promotion.api.js";

export default {
  props: {
    context: {
      type: String,
      default: "",
    },
    activiteTypesCompetences: {
      type: Array,
      required: true,
      default: null
    },
    optionsBlocsCompetences: {
      type: Array,
      required: true,
      default: null
    },
    dataForBlocsConcernes: {
      type: Array,
      required: true,
      default: null
    }
  },
  data() {

    return {
      showFormExamen: true,
      selectedActivitesTypes: [],
      selectedCompConcernees: [],
      dismissSecs: 5,
      examenDto: {
        id: 0,
        version: 0,
        titre: null,
        descriptif: null,
        duree: null,
        dateExamen: null,
        interventionId: null,
        activiteTypesId: [],
        competencesProfessionnellesId: [],
        promotionsId: [],
      },
      message: "",
      messageError: "",
      file: null,
      hidden: false,
      optionsCheckbox: [],
      dismissCountDown: null,
      dissmissCountFailed: null,
    };
  },
  created() {
    promotionApi
      .getAllByInterventionIdForSelect(this.$route.params.id)
      .then((response) => (response.forEach(element => {
        this.examenDto.promotionsId.push(element.id)
      }
      )));
    console.log(this.$route.params.id);
  },
  methods: {
    inputValidation(event) {
      if (this.examenDto.titre === null || this.examenDto.descriptif === null ||
        this.file === null || this.examenDto.dateExamen === null ||
        this.selectedActivitesTypes === null || this.optionsBlocsCompetences === null ||
        this.examenDto.duree === null) {
        this.showFailed();
        event.preventDefault();
        return;
      }
      this.onSubmit(event);
    },

    onSubmit(event) {
      event.preventDefault();
      let bodyFormData = new FormData();
      if (this.context === "promotion") {
        this.examenDto.interventionId = "via select";
      } else if (this.context === "intervention") {
        this.examenDto.interventionId = this.$route.params.id;
      }

      this.examenDto.activiteTypesId = this.selectedActivitesTypes;
      this.examenDto.competencesProfessionnellesId = this.selectedCompConcernees;

      bodyFormData.append("examen", JSON.stringify(this.examenDto));
      bodyFormData.append("file", this.file)

      console.log(bodyFormData)

      examenApi
        .save(bodyFormData)
        .then((response) => {
          this.showAlert(response, false);
          let element = document.querySelector('#collapseExamen')
          element.style.display = "none"
          this.clearInput();
          this.showFormExamen = true;
          setTimeout(() => {
            this.$emit("updateExamens");
          }, 500);
        });
    },
    openToggle() {
      let element = document.querySelector('#collapseExamen')
      element.style.display = "block"
      this.showFormExamen = false
    },
    cancelForm() {
      let element = document.querySelector('#collapseExamen')
      element.style.display = "none";
      this.showFormExamen = true
    },
    showFailed() {
      this.messageError = "Vous devez renseigner tous les champs.";
      this.dissmissCountFailed = this.dismissSecs;
    },
    showAlert(titre, isErr) {
      if (isErr) {
        this.message = "Erreur d'ajout de l'examen " + titre;
        this.dismissCountDownErr = this.dismissSecs
      } else {
        this.message = "L'examen " + titre + " a bien été rajouté avec succès";
        this.dismissCountDown = this.dismissSecs;
      }
    },
    clearInput() {
      this.examenDto.titre = null
      this.examenDto.descriptif = null
      this.file = null
      this.examenDto.dateExamen = null
      this.examenDto.duree = null
    },
    showBlocsLinked(selectedOptionValue) {
      let options = [];
      for (let i = 0; i < this.selectedActivitesTypes.length; i++) {
        for (let j = 0; j < this.dataForBlocsConcernes.length; j++) {
          if (
            this.dataForBlocsConcernes[j][this.selectedActivitesTypes[i]] !==
            undefined
          ) {
            let compsOptions =
              this.dataForBlocsConcernes[j][this.selectedActivitesTypes[i]];
            for (let x = 0; x < compsOptions.length; x++) {
              options.push(compsOptions[x]);
            }
          }
        }
      }

      this.optionsCheckbox = [];
      if (this.activiteTypesCompetences) {

        this.activiteTypesCompetences.forEach(Object => {
          console.log(selectedOptionValue);
          selectedOptionValue.forEach(entiteActivite => {
            if (Object.id === entiteActivite)
              Object.competencesProfessionnellesDto.forEach(element => {
                this.optionsCheckbox.push({ value: element.id, text: element.libelle });
              });
          });
        });

      }
      console.log(this.optionsCheckbox)
    },
  },
};
</script>
<style scoped>
.libelle-width {
  width: 28%;
}

.date-width {
  width: 25%;
}

.section-form {
  height: 70%;
  width: 50vw;
  margin: 5% auto;
}

.datepicker-width {
  width: 15vw;
}

.b-form {
  column-count: 2;
  margin: 3%;
}

.btnAddExamen {
  position: relative;
  right: 10px;
  width: 12vw;
  height: 4vh;

}

.form-select-warp-text {
  overflow-wrap: break-word;
}

.btnAddExamen {
  position: relative;
  right: 0px;
  width: 12vw;
  height: 100%;
}

.btnFormExamen {
  width: 8vw;
}

.btnFormExamenValider {
  margin-right: 2vw;
}
</style>