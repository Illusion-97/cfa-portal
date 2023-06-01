<template>
  <div>
    <!-- AJOUT D'UN EXAMEN -->
    <div v-if="context === 'intervention'">
      <AddExamen ref="addExamen" :optionsBlocsCompetences="optionsBlocsCompetences" :context="context" @updateExamens="updateExamens" />
    </div>
    <div class="mt-4">
      <b-alert :show="dismissCountDown" dismissible fade variant="success" @dismissed="dismissCountDown = 0">
        {{ message }}
      </b-alert>

      <!-- LIST DES EXAMENS -->
      <b-table :items="items" :fields="fields" striped responsive="sm">

        <!-- details -->
        <template #cell(Details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Masquer" : "Afficher" }}
          </b-button>
        </template>

        <!-- Titre -->
        <template
            #cell(Titre)="row"
        >
          <div v-if="row.item.modifier">
            <b-form-input id="input-default" placeholder="" v-model="row.item.Titre">
              {{ row.item.Titre }}
            </b-form-input>
          </div>
          <div v-else>
            {{ row.item.Titre }}
          </div>
        </template>

        <!-- Durée -->
        <template #cell(Duree)="row">
          <div v-if="row.item.modifier">
            <b-form-spinbutton id="demo-sb" v-model="row.item.Duree" min="1" max="10" step="0.5"></b-form-spinbutton>
          </div>
          <div v-else>
            {{ row.item.Duree }}
          </div>
        </template>

        <!-- Date -->
        <template #cell(Date)="row">
          <div v-if="row.item.modifier">
            <b-form-datepicker id="example-datepicker" v-model="row.item.Date" class="mb-2"></b-form-datepicker>
          </div>
          <div v-else>
            {{ row.item.Date }}
          </div>
        </template>

        <!-- Bolcs Concernée -->
        <template #cell(blocs_concernes)="row">
          <div v-if="row.item.modifier">
            <b-form-checkbox-group @change="addOptionsCompetences(row.item.selectedActiviteType)" size="sm"
                                   v-model="row.item.selectedActiviteType" :options="optionsBc" name="flavour-1a"
                                   class="d-flex flex-wrap justify-content-center" switches></b-form-checkbox-group>
          </div>
          <div v-else>
            {{ row.item.blocs_concernes }}
          </div>
        </template>

        <!-- Compétences -->
        <template #cell(competences)="row">
          <div v-if="row.item.modifier">
            <b-form-checkbox-group size="sm" v-model="row.item.selectedCompetencesPro" :options="optionsCompetences"
                                   name="flavour-1a" class="d-flex flex-wrap justify-content-center" switches></b-form-checkbox-group>
          </div>
          <div v-else>
            {{ row.item.competences }}
          </div>
        </template>

        <!-- Piéce jointe -->
        <template #cell(Piece_jointe)="row">
          <div v-if="row.item.modifier" class="w-75">
            <div v-if="changeFile">
              <b-form-file id="file-default" v-model="file"></b-form-file>
              <p class="mt-3">{{ file ? file.name : "" }}</p>
              <b-button @click="changeFile = false" size="sm">
                <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
              </b-button>
            </div>
            <div v-else>
              <b-button @click="changeFile = true" size="sm">Changer fichier</b-button>
            </div>
          </div>

          <p v-else>
            <b-button @click.prevent="getFile(row.item.id, row.item.Piece_jointe)">
              <font-awesome-icon :icon="['fas', 'download']" class="icon" />
            </b-button>
          </p>
        </template>

        <!-- Action -->
        <template #cell(Action)="row">
          <div v-if="row.item.modifier">
            <b-form @submit="onSubmit(row.item)">
              <b-button block variant="success" type="submit">
                <font-awesome-icon :icon="['fas', 'check-square']" class="icon" />
                Valider</b-button>

              <b-button block variant="warning" @click="new AnnulerModif(row.item)">
                <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                Annuler</b-button>
            </b-form>
          </div>
          <div v-else>
            <b-button
                v-if="context === 'intervention'"
                block
                variant="primary"
                v-bind:class="classObject(row.item, true)"
                @click="modifier(row.item)"
            >
              <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
              Modifier</b-button>
            <b-button block variant="success" v-bind:class="classObject(row.item, false)" @click="ajouterNotes(row.item)">
              <font-awesome-icon :icon="['fas', 'plus-square']" class="icon" />
              Ajouter notes</b-button>
            <b-button v-if="context === 'intervention'" block variant="danger" @click="spprimerExamen(row.item)">
              <font-awesome-icon :icon="['fas', 'trash']" class="icon" />
              Supprimer</b-button>
          </div>
        </template>

        <!--Description -->
        <template #row-details="row">
          <b-card v-if="row.item.modifier">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
              <b-col>
                <b-form-textarea id="textarea-default" placeholder="Default textarea"
                                 v-model="row.item.description"></b-form-textarea></b-col>
            </b-row>
          </b-card>
          <b-card v-else>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
              <b-col>{{ row.item.description }}</b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
import AddExamen from "@/components/Formateur/AddExamen.vue";
import { activiteTypeApi } from "@/_api/activiteType.api.js";

export default {
  name: "ExamensPromotionsListCompoenent",
  components: {
    AddExamen,
  },
  props: {
    examens: {
      type: Array,
    },
    context: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      activiteTypes: [],
      datasFormAt: [],
      datasFormCP: [],
      tempItem: null,
      changeFile: false,
      file: null,
      isModifier: false,
      message: "",
      dismissSecs: 5,
      dismissCountDown: null,
      perPage: 10,
      pageCount: 0,
      form: {
        Titre: "",
        Duree: "",
        Date: null,
        checked: [],
      },
      fields: [
        {
          key: "Details",
          label: "Détails",
          thStyle: { width: "5%" },
          thClass: "text-center",
        },
        {
          key: "Titre",
          label: "Titre",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },
        {
          key: "Duree",
          label: "Durée",
          thStyle: { width: "5%" },
          class: "text-center",
        },
        {
          key: "Date",
          label: "Date",
          // thStyle: { width: this.isModifier ? "20%" : "10%" },
          thStyle: { width: "15%" },
          class: "text-center",
        },
        {
          key: "blocs_concernes",
          label: "Blocs concernés",
          thStyle: { width: "10%" },
          class: "text-center",
        },
        {
          key: "competences",
          label: "Competences",
          thStyle: { width: "12%" },
          class: "text-center",
        },
        {
          key: "Piece_jointe",
          label: "Pièce jointe",
          thStyle: { width: "10%" },
          class: "text-center",
        },
        {
          key: "Action",
          label: "Action",
          thStyle: { width: "10%" },
          thClass: "text-center",
        },
      ],
      items: [],
      selectedBc: [],
      optionsBc: [],
      selectedCompetences: [],
      optionsCompetences: [],
    };
  },
  created() {
  console.clear();
    },
  mounted(){
    if(this.context === "intervention"){
      this.$root.$on("promoId", (data) => {
        this.getActiviteType(data)
      })
    }
    else{
      this.getActiviteType(this.$route.params.id)
    }
    if (this.examens !== undefined) {
      this.assigneTableItems(this.examens);
    }
  },
  methods: {
    // AJOUT D'UN EXAMEN
    getActiviteType(promoId) {
      activiteTypeApi
          .getAllByIdPromotion(promoId)
          .then((response) => { this.activiteTypes = response;
            this.getDataForForm(response);
            if (this.context === "intervention") {
              this.activiteTypes =this.datasFormAt;
              this.activiteTypes.competencesProfessionnellesDto = this.datasFormCP;
              if (this.$refs.addExamen && this.$refs.addExamen.optionsBlocsCompetences) {
              this.$refs.addExamen.optionsBlocsCompetences = this.datasFormAt;
              this.$refs.addExamen.dataForBlocsConcernes = this.datasFormCP;
              }
            }
          });
    },
    async getFile(id, pieceJointe) {
      const response = await examenApi.getFileExamen(id);
      const blob = new Blob([response], { type: "application/pdf" });

      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob)
      link.download = pieceJointe + ".pdf";
      link.click();
      URL.revokeObjectURL(link.href);
    },
    updateExamens() {
      examenApi
          .getExamensByInterventionId(this.$route.params.id)
          .then((response) => {
            this.assigneTableItems(response);
          });
    },
    addOptionsCompetences(selectedActiviteType) {
      let options = [];
      // selectedActiviteType[i] 4 ou 7 ou 8
      for (let i = 0; i < selectedActiviteType.length; i++) {
        for (let k = 0; k < this.datasFormCP.length; k++) {
          if (this.datasFormCP[k][selectedActiviteType[i]] !== undefined) {
            let tabOptions = this.datasFormCP[k][selectedActiviteType[i]];
            for (let j = 0; j < tabOptions.length; j++) {
              options.push(tabOptions[j]);
            }
          }
        }
      }
      this.optionsCompetences = options.sort(function (a, b) {
        return a.text - b.text;
      });
    },
    getDataForForm(data) {
      let datasFormAt = [];
      let dataForFormCp = [];
      let optionAt = [];
      for (let i = 0; i < data.length; i++) {
        let option = {
          value: data[i].id,
          text: data[i].numeroFiche + " - " + data[i].libelle,
        };
        let optionForAt = {
          value: data[i].id,
          text: data[i].numeroFiche,
        };
        datasFormAt.push(option);
        optionAt.push(optionForAt);
        let tabCompetences = [];
        for (let j = 0; j < data[i].competencesProfessionnellesDto.length; j++) {
          let value = data[i].competencesProfessionnellesDto[j].id;
          let text = data[i].competencesProfessionnellesDto[j].numeroFiche;
          let competence = {
            text: text,
            value: value,
          };
          tabCompetences.push(competence);
        }
        let at = {};
        at[data[i].id] = tabCompetences;
        dataForFormCp.push(at);
      }
      this.datasFormAt = datasFormAt;
      this.datasFormCP = dataForFormCp;
      this.optionsBc = optionAt;
    },

    // MODIFIER UN EXAMEN
    modifier(item) {
      this.tempItem = item;
      item.modifier = true;
      item._showDetails = true;
      this.addOptionsCompetences(item.selectedActiviteType);
    },
    AnnulerModif(item) {
      item = this.tempItem;
      item.modifier = false;
      item._showDetails = false;
      this.tempItem = null;
    },
    ajouterNotes(item) {
      this.$root.$emit("examen", item);
      this.$root.$emit("afficherNotes", true);
    },
    spprimerExamen(item) {
      const h = this.$createElement;
      // let index = this.items.indexOf(item);
      // Using HTML string
      const titleVNode = h("div", {
        domProps: {
          innerHTML: "<h4 style='color: red'>Suppresion Examen</h4>",
        },
      });
      // More complex structure
      const messageVNode = h("div", { class: ["foobar"] }, [
        h("h5", { class: [] }, [
          "Voulez-vous supprimer l'examen : " + item.Titre + " ?",
        ]),
      ]);
      // We must pass the generated VNodes as arrays
      this.$bvModal
          .msgBoxConfirm([messageVNode], {
            title: [titleVNode],
            centered: true,
            size: "md",
          })
          .then((value) => {
            if (value) {
              examenApi.deleteExamen(item.id).then((respnose) => {
                if (respnose === "suppression effectuée") {
                  this.updateExamens();
                  this.showAlert(item.Titre, false, false);
                }
              });
            }
          })
    },

    // OTHER
    onSubmit(item) {
      let examenDtoSave = {
        id: item.id,
        version: item.version,
        titre: item.Titre,
        descriptif: item.description,
        duree: item.Duree,
        pieceJointe: item.Piece_jointe,
        dateExamen: item.Date,
        activiteTypesId: item.selectedActiviteType,
        interventionId: this.$route.params.id,
        competencesProfessionnellesId: item.selectedCompetencesPro,
        promotionsId: [],
      };
      if (this.changeFile) {
        let bodyFormData = new FormData();
        bodyFormData.append("examen", JSON.stringify(examenDtoSave));
        bodyFormData.append("file", this.file);
        examenApi.save(bodyFormData).then((response) => {
          this.showAlert(response.titre, false);
          this.updateExamens();
        });
      } else {
        examenApi.update(examenDtoSave).then((response) => {
          this.showAlert(response.titre, false);
          this.updateExamens();
        });
        ("");
      }
      item.modifier = false;
      item._showDetails = false;
    },
    showAlert(titre, isErr, modifier = true) {
      if (isErr) {
        //    this.message = "Erreur d'ajout de 'examen " + titre ;
        // this.dismissCountDownErr = this.dismissSecs
      } else {
        modifier
            ? (this.message =
                "L'examen " + titre + " a bien été modifier avec succès")
            : (this.message =
                "L'examen " + titre + " a bien été supprimer avec succès");
        this.dismissCountDown = this.dismissSecs;
      }
    },
    refreshList() {
      this.fields.items[0].Titre = this.examens;
    },
    classObject(item, modifier) {
      let dateExam = new Date(item.Date).getTime();
      let now = Date.now();
      if (dateExam < now) {
        return modifier ? "d-none" : "";
      }
      return modifier ? "" : "d-none";
    },
    assigneTableItems(examens) {
      let items = [];
      //  { Titre: 'Java approfondissement', Duree: '4h', Date: '05/02/2022',Blocs_concernes:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Pièce jointe', modifier :false, _showDetails: false },
      for (let i = 0; i < examens.length; i++) {
        let blocksConcernee = "";
        let competences = " ";
        let selectedActiviteType = [];
        let selectedCompetencesPro = [];
        let activitesTypes = examens[i].activiteTypesDto.sort((a, b) => {
          return a.numeroFiche - b.numeroFiche;
        });
        let competencesPro = examens[i].competencesProfessionnellesDto.sort(
            (a, b) => {
              return a.numeroFiche - b.numeroFiche;
            }
        );
        for (let j = 0; j < activitesTypes.length; j++) {
          blocksConcernee += activitesTypes[j].numeroFiche + " ,";
          selectedActiviteType.push(activitesTypes[j].id);
        }
        for (let j = 0; j < competencesPro.length; j++) {
          competences += competencesPro[j].numeroFiche + " ,";
          selectedCompetencesPro.push(competencesPro[j].id);
        }
        blocksConcernee = blocksConcernee.substring(
            0,
            blocksConcernee.length - 1
        );
        competences = competences.substring(0, competences.length - 1);
        let item = {
          id: examens[i].id,
          version: examens[i].version,
          Titre: examens[i].titre,
          Duree: examens[i].duree,
          Date: examens[i].dateExamen,
          blocs_concernes: blocksConcernee,
          description: examens[i].descriptif,
          competences: competences,
          Piece_jointe: examens[i].pieceJointe,
          modifier: false,
          _showDetails: false,
          selectedActiviteType: selectedActiviteType,
          selectedCompetencesPro: selectedCompetencesPro,
        };
        items.push(item);
      }
      this.$nextTick(() => {
        this.items = items;
      });
    }
  },
};
</script>
<style scoped>

</style>
