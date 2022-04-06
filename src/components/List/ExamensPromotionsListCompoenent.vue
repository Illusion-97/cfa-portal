<template>
  <div>
    <div>
      <AddExamen  ref="addExamen" />
    
    </div>
    <div>
      <b-table :items="items" :fields="fields" striped responsive="sm">
        <!-- //details -->
        <template #cell(Details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Masquer" : "Afficher" }}
          </b-button>
        </template>
        <!-- Titre -->
        <template
          #cell(Titre)="row"
          class="row h-100 justify-content-center align-items-center"
        >
          <div v-if="row.item.modifier">
            <b-form-input
              id="input-default"
              placeholder=""
              v-model="row.item.Titre"
            >
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
            <b-form-spinbutton
              id="demo-sb"
              v-model="row.item.Duree"
              min="1"
              max="10"
              step="0.5"
            ></b-form-spinbutton>
          </div>
          <div v-else>
            {{ row.item.Duree }}
          </div>
        </template>
        <!-- Date -->
        <template #cell(Date)="row">
          <div v-if="row.item.modifier">
            <b-form-datepicker
              id="example-datepicker"
              v-model="row.item.Date"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div v-else>
            {{ row.item.Date }}
          </div>
        </template>
        <!-- Bolcs Concernée -->
        <template #cell(blocs_concernes)="row">
          <div v-if="row.item.modifier">
            <b-form-checkbox-group
              @change="addOptionsCompetences()"
              size="sm"
              v-model="selectedBc"
              :options="optionsBc"
              :aria-describedby="ariaDescribedby"
              name="flavour-1a"
              class="d-flex flex-wrap justify-content-center"
              switches
            ></b-form-checkbox-group>
            {{ selectedBc }}
          </div>
          <div v-else>
            {{ row.item.blocs_concernes }}
          </div>
        </template>
        <!-- Compétences -->
        <template #cell(competences)="row">
          <div v-if="row.item.modifier">
            <b-form-checkbox-group
              size="sm"
              v-model="selectedCompetences"
              :options="optionsCompetences"
              :aria-describedby="ariaDescribedby"
              name="flavour-1a"
              class="d-flex flex-wrap justify-content-center"
              switches
            ></b-form-checkbox-group>
          </div>
          <div v-else>
            {{ row.item.competences }}
          </div>
        </template>
        <!-- Piéce jointe -->
        <template #cell(Piece_jointe)="row">
          <div v-if="row.item.modifier" class="w-75">
            <b-form-file id="file-default" v-model="file"></b-form-file>
            <p class="mt-3">{{ file ? file.name : "" }}</p>
          </div>

          <p v-else>
            <font-awesome-icon :icon="['fas', 'download']" class="icon" />
            {{ row.item.Piece_jointe }}
          </p>
        </template>
        <!-- Action -->
        <template #cell(Action)="row">
          <div v-if="row.item.modifier">
            <b-form @submit="onSubmit">
              <b-button block variant="success" type="submit">
                <font-awesome-icon
                  :icon="['fas', 'check-square']"
                  class="icon"
                />
                Valider</b-button
              >

              <b-button block variant="warning" @click="AnnulerModif(row.item)">
                <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                Annuler</b-button
              >
            </b-form>
          </div>

          <div v-else>
            <b-button
              block
              variant="primary"
              v-bind:class="classObject(row.item, true)"
              @click="modifier(row.item)"
            >
              <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
              Modifier</b-button
            >
            <b-button
              block
              variant="success"
              v-bind:class="classObject(row.item, false)"
              @click="ajouterNotes(row.item)"
            >
              <font-awesome-icon :icon="['fas', 'plus-square']" class="icon" />
              Ajouter notes</b-button
            >
          </div>
        </template>
        <!--Description -->
        <template #row-details="row">
          <b-card v-if="row.item.modifier">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
              <b-col>
                <b-form-textarea
                  id="textarea-default"
                  placeholder="Default textarea"
                  v-model="row.item.description"
                ></b-form-textarea
              ></b-col>
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
// import { examenApi } from "@/_api/examen.api.js";
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
      default: [],
      required: true,
    },
  },

  data() {
    return {
      datasFormAt: [],
      datasFormCP: [],
      file: null,
      isModifier: false,
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
          thStyle: { width: this.isModifier ? "15%" : "10%" },
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
          thStyle: { width: "10%" },
          class: "text-center",
        },
        {
          key: "Piece_jointe",
          label: "Pièce jointe",
          thStyle: { width: "12%" },
          class: "text-center",
        },
        {
          key: "Action",
          label: "Action",
          thStyle: { width: "10%" },
          thClass: "text-center",
        },
      ],

      items: [
        //   Titre: 'Travaux pratiques CDA',
        //   Duree: '4h',
        //   Date: '13/03/2022	',
        //   Blocs_concernes:'1,2,3,4',
        //   description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',
        //   Piece_jointe: ' Nom Pièce jointe',
        //   modifier :false,
        //   _showDetails: false
        // }
      ],
      selectedBc: [],
      optionsBc: [
        // { text: "1", value: 1 },
        // { text: "2", value: 2 },
        // { text: "3", value: 3 },
      ],
      selectedCompetences: [],
      optionsCompetences: [
        // { text: "1", value: 1 },
        // { text: "2", value: 2 },
        // { text: "3", value: 3 },
        // { text: "4", value: 4 },
        // { text: "5", value: 5 },
        // { text: "6", value: 6 },
        // { text: "7", value: 7 },
        // { text: "8", value: 8 },
        // { text: "9", value: 9 },
      ],
    };
  },
  created() {
    if (this.examens != undefined) {
      this.assigneTableItems(this.examens);
    }

    activiteTypeApi
      .getAllByIdPromotion(this.$route.params.id)
      .then((response) => {
        this.getDataForForm(response);
        this.$refs.addExamen.options = this.datasFormAt;
        this.$refs.addExamen.dataForBlocsConcernes = this.datasFormCP;
      });
  },

  methods: {
    addOptionsCompetences() {
      let options = [];
  // this.selectedBc[i] 4 ou 7 ou 8
      for (let i = 0; i < this.selectedBc.length; i++) {
        for (let k = 0; k < this.datasFormCP.length; k++) {
          if (this.datasFormCP[k][this.selectedBc[i]] != undefined) {
            let tabOptions = this.datasFormCP[k][this.selectedBc[i]];
            for (let j = 0; j < tabOptions.length; j++) {
              options.push(tabOptions[j]);
            }
          }
        }
      }
    
      this.optionsCompetences = options.sort(function(a,b){
        return a.text - b.text
      });
      
    },
    getDataForForm(data) {
      let datasFormAt = [];
      let dataForFormCp = [];
      // // 1 :[
      //   { (numFiche) text : 1 , (id)value :1 }
      //   {text : 2 , value :2 }
      // ]
      for (let i = 0; i < data.length; i++) {
        let option = {
          value: data[i].id,
          text: data[i].numeroFiche + " - " + data[i].libelle,
        };

        datasFormAt.push(option);
        let tabCompetences = [];
        for (let j = 0; j < data[i].competenceProfessionnellesDto.length; j++) {
          let value = data[i].competenceProfessionnellesDto[j].id;
          let text = data[i].competenceProfessionnellesDto[j].numeroFiche;
          let competence = {
            text: text,
            value: value,
          };
          tabCompetences.push(competence);
        }

        let at = new Object();
        at[data[i].id] = tabCompetences;
        dataForFormCp.push(at);
      }
      this.datasFormAt = datasFormAt;
      this.datasFormCP = dataForFormCp;
      this.optionsBc = datasFormAt;
   
    },
    modifier(item) {
      item.modifier = true;
      item._showDetails = true;
    },
    AnnulerModif(item) {
      item.modifier = false;
      item._showDetails = false;
    },
    ajouterNotes(item) {
      this.$emit("custom-event-notes", { examen: item.Titre });
      this.$root.$emit("examen", item);
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.items));
    },

    refreshList() {
      this.fields.items[0].Titre = this.examens;
      // examenApi
      //   .getAllByPage(0, this.perPage)
      //   .then((response) => (this.examens = response));
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
        let blocksConcernee = "1,2,";
        for (let j = 0; j < examens[i].blocksConcernee.length; j++) {
          blocksConcernee += examens[i].blocksConcernee[j] + " ,";
        }
        blocksConcernee = blocksConcernee.substring(
          0,
          blocksConcernee.length - 1
        );
        let item = {
          id: examens[i].id,
          Titre: examens[i].titre,
          Duree: examens[i].duree,
          Date: examens[i].dateExamen,
          blocs_concernes: blocksConcernee,
          description: examens[i].descriptif,
          competences: "1,3,6,8",
          // Piece_jointe:examens[i].pieceJointe,
          modifier: false,
          _showDetails: false,
        };
        items.push(item);
      }
      this.$nextTick(() => {
        this.items = items;
      });
    },
  },
  computed: {},
};
</script>
<style scoped>
.Bolcs {
  width: 180px;
}
</style>