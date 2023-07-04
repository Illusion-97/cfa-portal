<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Liste des étudiants</h3>
        </div>
        <div class="modal-body">


          <!-- Select Promotion -->
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

          <!-- Recherche Etudiant -->
          <div class="row mt-3 mb-3">
            <form class="form-inline form" @submit="submit">
              <input id="saisie" name="saisie" placeholder="Rechercher" type="text" class="form-control" v-model="saisie" />
              <button class="btn-submit" type="submit">
                <font-awesome-icon :icon="['fas', 'search']" class="icon" />
              </button>
            </form>
          </div>
          
          <div class="mon-group">
            <table class="table table-bordered table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>Etudiant</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="etudiant in etudiantsBDDComputed"
                  :key="etudiant.id"
                  class="mon-tr"
                >
                  <td>{{ etudiant.utilisateurDto.fullName }}</td>
                  <td>{{ etudiant.utilisateurDto.login }}</td>
                  <td>
                    <button class="btn btn-primary" @click="clickListe(etudiant)">Ajouter</button>
                  </td>
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
import { etudiantApi } from "@/_api/etudiant.api.js";
export default {
  name: "EtudiantModal",
  components: {},
  data() {
    return {
      etudiants: [],
      etudiantsBDD: null,
      promotions: null,
      selected: null,
      saisie: "",
      perPage: 5,
      pageCount: 0,
    };
  },
  props: {
    etudiantsProp: {
      default: null,
    },
    allEtudiant: {
      default: false,
    }
  },
  watch: {
    etudiantsProp() {
      if (this.etudiantsProp != null) this.etudiants = this.etudiantsProp;
    },
  },
  computed: {
    promotionsComputed() {
      return this.promotions;
    },
    etudiantsBDDComputed() {
      return this.etudiantsBDD;
    },
  },
  methods: {
    close() {
      this.$emit("close", this.etudiants);
    },
    toggleStudentSelection(etudiant) {
      if (this.selectedStudent.includes(etudiant)) {
        // L'étudiant est déjà sélectionné, le supprimer du tableau
        const index = this.selectedStudent.indexOf(etudiant);
        this.selectedStudent.splice(index, 1);
      } else {
        // L'étudiant n'est pas sélectionné, l'ajouter au tableau
        this.selectedStudent.push(etudiant);
      }
    },
    onSelected() {
      promotionApi
        .getEtudiants(this.selected.id)
        .then((response) => (this.etudiantsBDD = response));
    },
    removeFromlist(index) {
      this.etudiants.splice(index, 1);
    },
    clickListe(etudiant) {
      //On test si déjà dans la liste
      let test = false;
      for (let i = 0; i < this.etudiants.length; i++) {
        if (this.etudiants[i].id == etudiant.id) test = true;
      }

      //si non, on ajoute
      if (!test) this.etudiants.push(etudiant);
    },
    submit(e) {
      e.preventDefault();
      etudiantApi
        .getAllByPage(0, this.perPage,this.saisie)
        .then((response) => (this.etudiantsBDD = response));

      etudiantApi
        .getCount(this.saisie)
        .then((response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    refreshList(){
      etudiantApi
          .getAllByPage(0, this.perPage,this.saisie)
          .then((response) => (this.etudiantsBDD = response));

      etudiantApi
          .getCount(this.saisie)
          .then((response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      etudiantApi
        .getAllByPage(pageNum - 1, this.perPage, this.saisie)
        .then((response) => (this.etudiantsBDD = response));
    },
  },
  created() {
    this.refreshList();
    promotionApi.getAll().then((response) => (this.promotions = response));

  },
};
</script>

<style>
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
#saisie,.select{
  border-radius: 20px;
  width: 400px;
  /* background: #000; */
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
