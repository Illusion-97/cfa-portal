<template >
  <section>
    <h3 class="text-center mt-5 mb-5">
      {{ titleNote }}
    </h3>
    <section v-bind:class="[afficherNotes]">
      <div v-if="context === 'intervention'" class="d-flex alig-item-center justify-content-between m-4">

        <!-- BARRE DE RECHERCHE -->
        <form class="form-inline" @submit="submit">
          <input id="saisie" placeholder="Rechercher" type="text" class="form-control" v-model="saisie" />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>

        <!-- SELECT DES PROMOTION -->
        <b-form-select class="select w-50" v-model="selected" :options="options" value-field="item" text-field="name"
          disabled-field="notEnabled" @input="changePromotion"></b-form-select>
      </div>

      <!-- LISTE DES NOTES -->
      <b-table hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">

        <!-- NOTE -->
        <template #cell(note)="row">
          <div v-if="row.item.modifier || !row.item.ajouter">
            <b-form-spinbutton id="demo-sb" v-model="row.item.note" min="1" max="20" step="0.5"></b-form-spinbutton>
          </div>
          <div v-else>
            {{ row.item.note }}
          </div>
        </template>

        <!-- SATISFACTION -->
        <template #cell(satisfaction)="row">
          <div v-if="!row.item.ajouter || row.item.modifier">
            <b-form-group v-slot="{ ariaDescribedby }" class="d-flex w-100">
              <b-form-radio-group class="pt-2" :id="'radio-group-' + row.index">
                <b-form-radio v-model="row.item.satisfaction" :aria-describedby="ariaDescribedby" :name="'some-radios-' + row.index"
                              value="Oui">Oui</b-form-radio>
                <b-form-radio v-model="row.item.satisfaction" :aria-describedby="ariaDescribedby" :name="'some-radios-' + row.index"
                              value="Non">Non</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
          <div v-else>
            {{ row.item.satisfaction }}
          </div>
        </template>
        <template #cell(Action)="row">

          <!-- AJOUTER -->
          <div v-if="!row.item.ajouter">
            <b-form>
              <b-button block variant="success" @click="showMsgBox(row.item, true)">
                <font-awesome-icon :icon="['fas', 'plus-square']" />
                Ajouter
              </b-button>
            </b-form>
          </div>

          <!-- MODIFIER -->
          <div v-else>
            <div v-if="row.item.modifier">
              <b-button block variant="success" @click="showMsgBox(row.item, false)" type="submit">
                <font-awesome-icon :icon="['fas', 'check-square']" />
                Valider
              </b-button>

              <!-- ANNULER -->
              <b-button block variant="warning" @click="AnnulerModif(row.item)">
                <font-awesome-icon :icon="['fas', 'undo-alt']" />
                Annuler
              </b-button>
            </div>

            <!-- MODIFIER -->
            <div v-else>
              <b-button block variant="primary" @click="modifierNotes(row.item)">
                <font-awesome-icon :icon="['fas', 'edit']" />
                Modifier
              </b-button>
            </div>
          </div>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" pills size="lg"
        class="customPagination"></b-pagination>
    </section>
  </section>
</template>

<script>
import {noteApi} from "@/_api/note.api.js";
import {promotionApi} from "@/_api/promotion.api.js";

export default {
  props: {
    context: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      titleNote: "Sélectionner un examen",
      afficherNotes: "d-none",
      boxOne: "",
      tempItemNote: null,
      tempItemSati: null,
      perPage: 6,
      currentPage: 1,
      saisie: "",
      options: [{ item: "All", name: "Tout les promotions" }],
      selected: "All",
      idExamen: null,
      fields: [
        {
          key: "nom",
          label: "Nom",
          thStyle: { width: "15%" },
        },
        {
          key: "prenom",
          label: "Prenom",
          thStyle: { width: "15%" },
        },
        {
          key: "ville",
          label: "Nom du centre",
          thStyle: { width: "8%" },
        },
        { key: "note", label: "Note", thStyle: { width: "10%" } },
        {
          key: "satisfaction",
          label: "Satisfaction",
          thStyle: { width: "20%" },
        },
        {
          key: "Action",
          label: "Action",
          thStyle: { width: "10%" },
        },
      ],
      dataExamen: [{
        id: 0,
        version: 0,
        nom: "",
        prenom: "",
        note: "",
        _cellVariants: {satisfaction: ""},
        modifier: false,
        etudiantNoteId: 0,
        examenId: 0,
        ville: "",
      }],
      items: []
    };
  },
  created() {
    // NOTES
    this.$root.$on("examen", (data) => {
      this.titleNote = data.Titre;
      this.afficherNotes = "";
      this.idExamen = data.id;
      if (this.context === "intervention") {
        promotionApi
          .getAllByInterventionIdForSelect(this.$route.params.id)
          .then((response) => {
            response.forEach((e) => {
              let option = {
                item: e.id,
                name: e.nom,
              };
              this.options.push(option);
            });
          });
        this.getByIntervention();
      } else if (this.context === "promotion") {
        this.getByPromotion(this.$route.params.id);
      }
    });
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  mounted() {
    this.bgSatisfaction();
  },
  methods: {
    // NOTES
    getByIntervention() {
      noteApi
        .getAllByInterventionIdAndExamenId(this.$route.params.id, this.idExamen)
        .then((response) => {
          this.assignValueItems(response);
          this.dataExamen = response;
        });
    },
    getByPromotion(idPromotion) {
      noteApi
        .getAllByPrmotionIdAndExamenId(idPromotion, this.idExamen)
        .then((response) => {
          this.assignValueItems(response);
        });
    },
    submit() {
      noteApi
        .getAllByInterventionIdAndExamenId(
          this.$route.params.id,
          this.idExamen,
          this.saisie
        )
        .then((response) => {
          this.assignValueItems(response);
        });
    },
    // PROMOTION
    changePromotion() {
      this.items = [];
      if (this.selected !== "All") {
        this.getByPromotion(this.selected);
      } else {
        this.getByIntervention();
      }
    },
    // SATISFACTION
    getsatisfactionItem(satisfaction, note) {
      let result = "";
      if (note === 0 && satisfaction == null) {
        return result;
      }
      if (satisfaction === "OUI") {
        result = "Oui";
      } else {
        result = "Non";
      }
      return result;
    },
    // SAVE
    showMsgBox(item, isAjouter) {
      let myItem = this.items[this.geIndexForItem(item.id)];
      this.boxOne = "";
      const h = this.$createElement;
      // Using HTML string
      const titleVNode = h("div", {
        domProps: {
          innerHTML: "<h3>Veuillez vérifier les informations saisies:</h3>",
        },
      });
      // More complex structure
      const messageVNode = h("div", { class: ["foobar"] }, [
        h("p", { class: [] }, [" Nom : " + myItem.nom]),
        h("p", { class: [] }, [" Prenom : " + myItem.prenom]),
        h("p", { class: [] }, [" Note : " + myItem.note]),
        h("p", { class: [] }, [" Satisfaction : " + myItem.satisfaction]),
      ]);
      // We must pass the generated VNodes as arrays
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: [titleVNode],
          centered: true,
          size: "lg",
        })
        .then((value) => {
          let index = this.geIndexForItem(item.id);
          if (value) {
            let noteDto = {
              id: item.id,
              version: item.version,
              noteObtenue: item.note,
              satisfaction: item.satisfaction.toUpperCase(),
              etudiantNoteId: item.etudiantNoteId,
              examenId: item.examenId,
            };

            noteApi.save(noteDto).then(() => {
              this.items[index].ajouter = true;
              this.items[index].modifier = false;
              this.items[index].version++;
              this.bgSatisfaction();
            });
          } else {
            this.items[index].modifier = false;
            if (isAjouter) {
              this.items[index].note = 0;
              this.items[index].satisfaction = "";
              this.items[index]._cellVariants = { satisfaction: "" };
              this.items[index].ajouter = false;
            } else {
              this.items[index].note = this.tempItemNote;
              this.items[index].satisfaction = this.tempItemSati;
              this.items[index].ajouter = true;
              this.bgSatisfaction();
              this.tempItemSati = null;
              this.tempItemNote = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.$nextTick(() => {
        this.bgSatisfaction();
      });
    },
    // OTHER
    assignValueItems(data) {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        items.push(this.setNoteDatToItem(data[i]));
      }
      this.items = items;
      this.bgSatisfaction();
    },
    setNoteDatToItem(noteData) {
      return {
        id: noteData.id,
        version: noteData.version,
        nom: noteData.etudiantNoteUtilisateurNom,
        prenom: noteData.etudiantNoteUtilisateurPrenom,
        note: noteData.noteObtenue,
        satisfaction: this.getsatisfactionItem(
            noteData.satisfaction,
            noteData.noteObtenue
        ),
        _cellVariants: {satisfaction: ""},
        modifier: false,
        ajouter: noteData.noteObtenue !== 0,
        etudiantNoteId: noteData.etudiantNoteId,
        examenId: noteData.examenId,
        ville: noteData.ville,
      };
    },
    isModify(item){
      if (item.note != 0 || item.satisfaction != null){
        return true
      }else {return false}
    },
    geIndexForItem(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (id === this.items[i].id) {
          return i;
        }
      }
      return null;
    },
    bgSatisfaction() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].satisfaction !== "") {
          if (this.items[i].satisfaction === "Oui") {
            this.items[i]._cellVariants.satisfaction = "success";
          } else {
            this.items[i]._cellVariants.satisfaction = "danger";
          }
        }
      }
    },
    modifierNotes(item) {
      this.tempItemNote = item.note;
      this.tempItemSati = item.satisfaction;
      item.modifier = true;
      item._cellVariants.satisfaction = "";
    },
    AnnulerModif(item) {
      item.satisfaction = this.tempItemSati;
      item.note = this.tempItemNote;
      item.modifier = false;
      this.$nextTick(() => {
        this.bgSatisfaction();
        this.tempItemSati = null;
        this.tempItemNote = null;
      });
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>