<template>
  <div>
    <div class="d-flex justify-content-end">
      <b-button
        variant="secondary"
        v-b-toggle.collapseExamen
        v-show="showFormExamen"
        @click="showFormExamen = !showFormExamen"
        class="btnAddExamen">
        <font-awesome-icon :icon="['fas', 'plus-circle']" class="icon" />
        Ajouter un examen 
      </b-button>
    </div>
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismissed="dismissCountDown = 0"
      >
        {{ message }}
      </b-alert>
      <b-collapse id="collapseExamen">
        <section class="section-form d-flex flex-column justify-content-around">
          <div class="d-flex flex-row">
            <label class="libelle-width">Titre de l'examen :</label>
            <b-form-input
              id="titreFormExamen"
              type:text
              v-model="examenDto.titre"
              placeholder="Titre"
              required
            ></b-form-input>
          </div>
          <div class="d-flex flex-row">
            <label class="libelle-width">Descriptif :</label>
            <b-form-textarea
              id="textarea-auto-height"
              rows="2"
              max-rows="8"
              v-model="examenDto.descriptif"
              placeholder="Descriptif"
            ></b-form-textarea>
          </div>
          <div class="d-flex flex-row">
            <label class="libelle-width">Pièce jointe :</label>
            <b-form-file
              class="mb-2"
              v-model="file"
              ref="file-input"
              placeholder="Sélectionner votre pièce jointe"
              required
            ></b-form-file>
          </div>
          <div class="d-flex flex-row">
            <label class="date-width">Date :</label>
            <b-form-datepicker
              v-model="examenDto.dateExamen"
              placeholder="Sélectionner une date"
              class="mb-2 datepicker-width"
              required
            ></b-form-datepicker>
          </div>
          <div class="d-flex flex-row">
            <b-form-group
              label="Sélectionner des activités types :"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                @change="showBlocsLinked()"
                class="form-select-warp-text"
                id="checkbox-group-1"
                v-model="selectedActivitesTypes"
                :options="optionsBlocsCompetences"
                :aria-describedby="ariaDescribedby"
                name="flavour-1"
                required
              ></b-form-checkbox-group>
            </b-form-group>
          </div>

          <div class="d-flex flex-row">
            <div class="d-flex flex-column w-50">
              <label class="libelle-width d-flex flex-row w-75"
                >Compétences professionnelles :</label
              >
              <b-form-checkbox-group
                size="lg"
                v-model="selectedCompConcernees"
                :options="optionsCheckbox"
                name="flavour-1b"
                class="
                  d-flex
                  flex-wrap
                  d-flex
                  flex-row
                  justify-content-between
                  checkbox-width
                "
                switches
                required
              ></b-form-checkbox-group>
            </div>
            <div class="d-flex flex-row w-50 justify-content-end">
              <label class="libelle-width">Durée :</label>
              <b-form-spinbutton
                class="w-50"
                v-model="examenDto.duree"
                wrap
                min="1"
                max="10"
                step="0.5"
                placeholder="---"
                required
              ></b-form-spinbutton>
            </div>
          </div>
          <div>
            <b-form @submit="onSubmit" class="d-flex flex-row justify-content-end bFormBtnValider">
              <v-btn
                v-b-toggle.collapseExamen
                @click="showFormExamen = !showFormExamen"
                color="success"
                dark
                type="submit"
                class="btnFormExamen btnFormExamenValider">
                <font-awesome-icon
                  :icon="['fas', 'plus-square']"
                  class="icon"/>
                  Valider
              </v-btn>
              <v-btn
                  color="warning"
                  class="btnFormExamen"
                  v-b-toggle.collapseExamen
                  @click="showFormExamen = !showFormExamen"
                  ><font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
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

export default {
  props: {
    context: {
      type: String,
      default: "",
    },
  },
  data() {
    
    return {
      showFormExamen: true, 
      selectedActivitesTypes: [],
      selectedCompConcernees: [],
      dismissSecs: 5,
      dataForBlocsConcernes: [],
      examenDto: {
        id: 0,
        version: 0,
        titre: null,
        descriptif: null,
        duree: null,
        dateExamen: null,
        interventionId: null,
        pieceJointe: null,
        activiteTypesId: [],
        competencesProfessionnellesId: [],
        promotionsId: [],
      },
      message: "",
      file: null,
      hidden: false,
      optionsBlocsCompetences: [],
      optionsCheckbox: [],
      dismissCountDown: null,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      var bodyFormData = new FormData();
      if (this.context == "promotion") {
        this.examenDto.interventionId = "via select";
      } else if (this.context == "intervention") {
        this.examenDto.interventionId = this.$route.params.id;
      }

      this.examenDto.activiteTypesId = this.selectedActivitesTypes;
      this.examenDto.competencesProfessionnellesId =
        this.selectedCompConcernees;

      bodyFormData.append("examen", JSON.stringify(this.examenDto));
      bodyFormData.append("file", this.file)

      examenApi
        .save(bodyFormData)
        .then((response) => {
          this.showAlert(response.titre, false);
          setTimeout(() => {
            this.$emit("updateExamens");
          }, 500);
        });
    },
    showAlert(titre, isErr) {
      if (isErr) {
        this.message = "Erreur d'ajout de l'examen " + titre ;
        this.dismissCountDownErr = this.dismissSecs
      } else {
        this.message = "L'examen " + titre + " a bien été rajouté avec succès";
        this.dismissCountDown = this.dismissSecs;
      }
    },
    showBlocsLinked() {
      let options = [];
      for (let i = 0; i < this.selectedActivitesTypes.length; i++) {
        for (let j = 0; j < this.dataForBlocsConcernes.length; j++) {
          if (
            this.dataForBlocsConcernes[j][this.selectedActivitesTypes[i]] !=
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
      this.optionsCheckbox = options.sort(function (a, b) {
        return a.text - b.text;
      });
    },
  },
};
</script>
<style scoped>
.libelle-width {
  width: 28%;
}
.date-width {
  width: 22%;
}
.section-form {
  height: 70vh;
  width: 38vw;
  margin: auto;
}
.datepicker-width {
  width: 15vw;
}
.checkbox-width {
  width: 70%;
}

.btnAddExamen {
  position: relative;
  right: 10px;
  width: 12vw;
  height: 4vh;

}
.form-selec-competences {
  margin-top: 2vh;
  margin-bottom: 5vh !important;
  height: 12vh !important;
  width: 100%;
}

.cardCompetences {
  max-width: 100%;
  overflow: hidden;
  white-space: normal;
  height: auto;
}

#fluid-container {
  padding-right: 14vw;
  padding-left: 8vw;
}

#sm {
  padding-left: 0px;
}

#center {
  text-align: left;
  padding: 17px;
}

#form {
  padding: 0px;
}

#select-file {
  text-align: left;
}

.row-width {
  width: 200px;
  margin-bottom: 15px;
  font-size: large;
}

.lbl-duree {
  width: 100%;
  text-align: end;
}

/* .dropdown{
  width: 55%;
} */

.btnExamen {
  height: 7vh;
  width: 9vw;
  margin-bottom: 40px;
  position: relative;
}
.btnValiderAnnuler {
  width: 10vw;
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
.btnFormExamen{
  width: 8vw;
}
.btnFormExamenValider{
  margin-right: 2vw;
}
</style>