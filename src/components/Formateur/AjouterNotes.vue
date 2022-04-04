<template>
  <div>
    <b-table hover :items="items" :fields="fields">
      <template #cell(note)="row">
        <div v-if="row.item.modifier || !row.item.ajouter">
          <b-form-spinbutton
            id="demo-sb"
            v-model="row.item.note"
            min="1"
            max="20"
            step="0.5"
          ></b-form-spinbutton>
        </div>
        <div v-else>
          {{ row.item.note }}
        </div>
      </template>
      <template #cell(satisfaction)="row">
        <div v-if="!row.item.ajouter || row.item.modifier">
          <b-form-group v-slot="{ ariaDescribedby }" class="d-flex w-100">
            <b-form-radio-group class="pt-2" id="radio-group-2">
              <b-form-radio
                v-model="row.item.satisfaction"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="Oui"
                >Oui</b-form-radio
              >
              <b-form-radio
                v-model="row.item.satisfaction"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="Non"
                >Non</b-form-radio
              >
            </b-form-radio-group>
          </b-form-group>
        </div>
        <div v-else>
          {{ row.item.satisfaction }}
        </div>
      </template>
      <template #cell(Action)="row">
        <div v-if="!row.item.ajouter">
          <b-form>
            <b-button
              block
              variant="success"
              @click="showMsgBox(row.item, true)"
            >
              <font-awesome-icon :icon="['fas', 'plus-square']" class="icon" />
              Ajouter
            </b-button>
          </b-form>
        </div>
        <div v-else>
          <div v-if="row.item.modifier">
            <b-button
              block
              variant="success"
              @click="showMsgBox(row.item, false)"
              type="submit"
            >
              <font-awesome-icon :icon="['fas', 'check-square']" class="icon" />
              Valider</b-button
            >

            <b-button block variant="warning" @click="AnnulerModif(row.item)">
              <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
              Annuler</b-button
            >
          </div>
          <div v-else>
            <b-button block variant="primary" @click="modifierNotes(row.item)">
              <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
              Modifier</b-button
            >
          </div>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { noteApi } from "@/_api/note.api.js";
export default {
  data() {
    return {
      titleNote: "sxdaa",
      boxOne: "",
      tempItemNote: null,
      tempItemSati: null,
      fields: [
        {
          key: "nom",
          label: "Nom",
          thStyle: { width: "20%" },
        },
        {
          key: "prenom",
          label: "Prenom",
          thStyle: { width: "20%" },
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
      items: [
        //   id:2,
        //   nom: 'Geneva',
        //   prenom: 'Wilson',
        //   note:14,satisfaction:'Oui' ,
        //    _cellVariants: {  satisfaction: '' },
        //      modifier :false,
        //      ajouter :true
        // },
      ],
    };
  },
  created() {
    this.$root.$on("examen", (data) => {
      this.titleNote = data.Titre;
      noteApi.getAllByIdExamen(data.id).then((response) => {
        this.assignValueItems(response);
      });
    });
  },
  mounted() {
    this.ajouterSatisfaction();
  },
  methods: {
    assignValueItems(data) {
      // {id:1, nom: 'Dickerson', prenom: 'Macdonald',note :17,satisfaction :'Oui',
      //  _cellVariants: {  satisfaction: '' },
      //   modifier :false,
      //   ajouter :true,}
      let items = [];
      for (let i = 0; i < data.length; i++) {
        items.push(this.setNoteDatToItem(data[i]));
      }
      this.items = items;
      this.ajouterSatisfaction();
    },
    setNoteDatToItem(noteData) {
      let item = {
        id: noteData.id,
        nom: noteData.etudiantNoteUtilisateurNom,
        prenom: noteData.etudiantNoteUtilisateurPrenom,
        note: noteData.noteObtenue,
        satisfaction: this.getsatisfactionItem(
          noteData.satisfaction,
          noteData.noteObtenue
        ),
        _cellVariants: { satisfaction: "" },
        modifier: false,
        ajouter: noteData.noteObtenue == 0 ? false : true,
        etudiantNoteId: noteData.etudiantNoteId,
        examenId: noteData.examenId,
      };
      return item;
    },
    getsatisfactionItem(satisfaction, note) {
      let result = "";
      if (note == 0 && satisfaction == null) {
        return result;
      }
      if (satisfaction == "OUI") {
        result = "Oui";
      } else {
        result = "Non";
      }
      return result;
    },
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
            let notteDto = {
              id: item.id,
              noteObtenue: item.note,
              satisfaction: item.satisfaction.toUpperCase(),
              etudiantNoteId: item.etudiantNoteId,
              examenId: item.examenId,
            };
            noteApi.save(notteDto).then(() => {
              this.$nextTick(() => {
                this.items[index].ajouter = true;
                this.items[index].modifier = false;
                this.ajouterSatisfaction();
              });
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
              this.ajouterSatisfaction();
              this.tempItemSati = null;
              this.tempItemNote = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.$nextTick(() => {
        this.ajouterSatisfaction();
      });
    },
    geIndexForItem(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (id == this.items[i].id) {
          return i;
        }
      }
      return null;
    },
    ajouterSatisfaction() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].satisfaction != "") {
          if (this.items[i].satisfaction == "Oui") {
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
        this.ajouterSatisfaction();
        this.tempItemSati = null;
        this.tempItemNote = null;
      });
    },
  },
};
</script>