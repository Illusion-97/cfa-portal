<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Liste des interventions</h3>
        </div>
        <div class="modal-body">
          <div class="mon-group" v-if="interventions">
            <!-- <label class="form-label">Les étudiants du groupe</label>  -->
            <div
              class="d-inline p-2 border border-dark rounded"
              v-for="(intervention, index) in interventions"
              :key="intervention.id"
            >
              {{ intervention.formationDto.titre }} 
              <span @click="removeFromlist(index)" class="croix-delete">x</span>
            </div>
          </div>

          <!-- Recherche intervention -->
          <div class="row mt-3 mb-3">
            <form
              class="col-md-6 d-flex justify-content-between float-right"
              @submit="submit"
            >
              <input
                name="saisie"
                type="text"
                class="form-control"
                v-model="saisie"
              />
              <button class="btn btn-primary" type="submit">Recherche</button>
            </form>
          </div>
          
          <div class="mon-group">
            <table class="table table-bordered table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>Titre</th>
                  <th>Date de début</th>
                  <th>Date de fin</th>
                  <th>Formateur</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="intervention in interventionsBDDComputed"
                  :key="intervention.id"
                  @click="clickListe(intervention)"
                  class="mon-tr"
                >
                  <td>{{ intervention.formationDto.titre }}</td>
                  <td>{{ intervention.dateDebut }}</td>
                  <td>{{ intervention.dateFin }}</td>
                  <td> <div v-for="formateur in intervention.formateursDto" :key="formateur.id">{{ formateur.prenom }} {{formateur.nom}}</div></td>
                </tr>
              </tbody>
            </table>

            <paginate
              :page-count="pageCount"
              :page-range="1"
              :margin-pages="2"
              :click-handler="pageChange"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'page-item'"
              :page-link-class="'page-link'"
              :prev-class="'page-item'"
              :next-class="'page-item'"
              :prev-link-class="'page-link'"
              :next-link-class="'page-link'"
              :active-class="'active'"
            >
              >
            </paginate>
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
import { interventionApi } from "@/_api/intervention.api.js";

export default {
  name: "interventionModal",
  components: {},
  data() {
    return {
      interventions: [],
      interventionsBDD: [{formateursDto: [],formationDto: {}}],
      promotions: null,

      selected: null,
      saisie: "",
      perPage: 10,
      pageCount: 0,
    };
  },
  props: {
    interventionsProp: {
      default: null,
    },
  },
  watch: {
    interventionsProp() {
      if (this.interventionsProp != null) this.interventions = this.interventionsProp;
    },
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    interventionsBDDComputed() {
      return this.interventionsBDD;
    },
  },
  methods: {
    close() {
      this.$emit("close", this.interventions);
    },
    removeFromlist(index) {
      this.interventions.splice(index, 1);
    },
    clickListe(intervention) {
      //On test si déjà dans la liste
      let test = false;
      for (let i = 0; i < this.interventions.length; i++) {
        if (this.interventions[i].id == intervention.id) test = true;
      }

      //si non, on ajoute
      if (!test) this.interventions.push(intervention);
    },
    submit(e) {
      e.preventDefault();
      interventionApi
        .getAllByPage(0, this.perPage,this.saisie)
        .then((response) => (this.interventionsBDD = response));

      interventionApi
        .getCount(this.saisie)
        .then((response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      interventionApi
        .getAllByPage(pageNum - 1, this.perPage, this.saisie)
        .then((response) => (this.interventionsBDD = response));
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
