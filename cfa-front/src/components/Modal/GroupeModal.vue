<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Liste d'étudiants dans mon groupe</h3>
        </div>
        <div class="modal-body">
          <div class="mon-group" v-if="groupes">
            <!-- <label class="form-label">Les étudiants du groupe</label>  -->
            <div
              class="d-inline p-2 border border-dark rounded"
              v-for="(groupe, index) in groupes"
              :key="groupe.id"
            >
              {{ groupe.prenom }} {{ groupe.nom }}
              <span @click="removeFromlist(index)" class="croix-delete">x</span>
            </div>
          </div>

          <div class="mon-group">
            <label class="form-label"
              >Choisissez une promotion pour affiner la recherche :
            </label>
            <select
              class="custom-select"
              v-model="selected"
              @change="onSelected()"
            >
              <option
                v-for="promotion in promotionsComputed"
                :key="promotion.id"
                :value="promotion"
                >{{ promotion.nom }}</option
              >
            </select>
          </div>
          <div class="mon-group">
            <label class="form-label">Liste des groupes dans la bdd : </label>
            <table class="table table-bordered table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>Prenom Nom</th>
                  <th>Email</th>
                  <th>Promotions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="groupe in groupesBDDComputed"
                  :key="groupe.id"
                  @click="clickListe(groupe)"
                  class="mon-tr"
                >
                  <td>{{ groupe.prenom }} {{ groupe.nom }}</td>
                  <td>{{ groupe.login }}</td>
                  <td>
                    <div
                      v-for="promotion in groupe.promotionsDto"
                      :key="promotion.id"
                    >
                      {{ promotion.nom }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer text-right">
          <button class="btn btn-primary" @click="close()">
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";

export default {
  name: "groupeModal",
  components: {},
  data() {
    return {
      groupes: [],
      groupesBDD: null,
      promotions: null,

      selected: null,
    };
  },
  props: {
    groupesProp: {
      default: null,
    },
  },
  watch: {
    groupesProp() {
      if (this.groupesProp != null) this.groupes = this.groupesProp;
    },
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    groupesBDDComputed() {
      return this.groupesBDD;
    },
  },
  methods: {
    close() {
      this.$emit("close", this.groupes);
    },
    onSelected() {
      promotionApi
        .getgroupes(this.selected.id)
        .then((response) => (this.groupesBDD = response));
    },
    removeFromlist(index) {
      this.groupes.splice(index, 1);
    },
    clickListe(groupe) {
      //On test si déjà dans la liste
      let test = false;
      for (let i = 0; i < this.groupes.length; i++) {
        if (this.groupes[i].id == groupe.id) test = true;
      }

      //si non, on ajoute
      if (!test) this.groupes.push(groupe);
    },
  },
  created() {
    promotionApi.getAll().then((response) => (this.promotions = response));
  },
};
</script>

<style scoped>
.croix-delete {
  cursor: pointer;
  margin-left: 1em;
}

.mon-group {
  margin-bottom: 2em;
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
  width: 50%;
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

.form-label > .form-control {
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
</style>
