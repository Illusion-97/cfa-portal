<template>

    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Liste des compétences professionnelles</h3>
          <b-button class="mt-2" variant="danger" dark @click="close()">
            Fermer
          </b-button>
        </div>

        <b-alert class="m-4 " :show="dismissCountDown" dismissible fade :variant="color"
          @dismissed="dismissCountDown = 0">
          {{ message }}
        </b-alert>

        <div class="modal-body">
          <b-button @click="openModalAdd" color="blue-grey"
            style="margin-bottom: 10px; background-color: #17a2b8; color: white">
            <span v-if="!hiddenInput">
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter une compétence
              professionnelle
            </span>
            <span v-else>
              <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
          </b-button>


          <div v-show="hiddenInput">
            <span class="grid-addComp">
              <v-text-field type="number" v-model="competence.numeroFiche" placeholder="numéro fiche" id="" />
              <v-text-field type="text" v-model="competence.libelle" placeholder="libelle" name="" id="" />
              <b-btn class="btn-valider" :disabled="!competence.libelle" type="submit" variant="success"
                @click="addCompetence">Valider</b-btn>
            </span>
          </div>
          <div class="mon-group">
            <table style="width: 100%;">
              <thead class="thead-dark">
                <tr>
                  <th>Numero de fiche</th>
                  <th>Libelle</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in cps" :key="row.id" class="mon-tr">
                  <td v-if="editRowIndex !== row.id">{{ row.numeroFiche }}</td>
                  <td v-else><b-form-input type="number" v-model="row.numeroFiche"/></td>

                  <td v-if="editRowIndex !== row.id" style="font-size: 15px; line-break: auto">
                    <p style="line-break: auto">{{ row.libelle }}</p>
                  </td>
                  <td v-else>
                    <b-form-textarea rows="2" max-rows="5" v-model="row.libelle" @keyup.enter="modifier(cp)"/>
                  </td>
                  <td style=" display: flex; flex-direction: row; justify-content: space-around">
                    <b-button v-if="editRowIndex == -1" @click="modifierForm(row.id)" variant="warning">
                      <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'edit']" />Modifier</b-button>
                    <b-button v-if="editRowIndex === row.id" type="submit" variant="success"
                      @click="validerForm(index)">Valider</b-button>
                    <b-button v-if="editRowIndex === row.id" variant="danger" @click="annulerForm()">Annuler</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import {competenceProfessionnelleApi} from "@/_api/competenceProfessionnelle.api";

export default {
  name: "CompetenceProModal",
  components: {},
  data() {
    return {
      hiddenInput: false,
      disabledValidation: false,
      editRowIndex: -1,
      dismissCountDown: 0,
      color: "success",
      message: "",
      competence: {
        libelle: "",
        numeroFiche: 1,
        activiteTypeId: 0
      },
      refreshedCpd: [{}]
    };
  },
  props: {
    cps: {
      default: null,
    },
    idAct: {
      default: null
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit("close", this.cps);
    },
    openModalAdd() {
      this.hiddenInput = !this.hiddenInput;
    },
    addCompetence() {
      this.competence.activiteTypeId = this.idAct
      competenceProfessionnelleApi.save(this.competence).then(
        location.reload()
      )
    },
    modifierForm(index) {
      this.editRowIndex = index;
    },
    annulerForm() {
      this.editRowIndex = -1;
      this.$emit('refresh', this.idAct)
    },
    validerForm(index) {
      competenceProfessionnelleApi
        .update(this.cps[index])
        .then(() => {
          this.color = "success",
          this.dismissCountDown = 6,
          this.message = "Compétence modifiée avec succès.",
          this.loading = false
        })
      this.editRowIndex = -1;
    },
  },
};
</script>

<style scoped>
.croix-delete {
  cursor: pointer;
  margin-left: 1em;
}

.mon-group {
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

/* Modal */
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 75%;
  margin: 40px auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
}

.form-label>.form-control {
  margin-top: 0.5em;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.grid-addComp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px
}

.btn-valider {
  height: fit-content;
  margin: 20px 20px 0 20px
}</style>
