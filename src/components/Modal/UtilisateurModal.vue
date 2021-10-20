<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Choisissez un {{titre_modal}}</h3>
        </div>
        <div class="modal-body">
          <div class="row mt-3 mb-3">
            <div
              class="text-align-left col-md-6 d-flex justify-content-between"
            >
              <label class="mr-3">Utilisateur</label>
              <input
                class="form-control"
                type="text"
                :value="utilisateurChoisi_input"
                disabled="disabled"
              />
            </div>

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

          <!-- Liste -->
          <div class="mon-group">
            <table class="table table-bordered table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>Prenom Nom</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="utilisateur in utilisateurs"
                  :key="utilisateur.id"
                  @click="clickListe(utilisateur)"
                  class="mon-tr"
                >
                  <td>{{ utilisateur.prenom }} {{ utilisateur.nom }}</td>
                  <td>{{ utilisateur.login }}</td>
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
import { utilisateurApi } from "@/_api/utilisateur.api.js";

export default {
  name: "EtudiantModal",
  components: {},
  data() {
    return {
      utilisateurChoisi: {},
      utilisateurs: [],

      selected: null,

      perPage: 10,
      pageCount: 0,
      saisie: "",

      titre_modal: "utilisateur"
    };
  },
  props: {
    utilisateursProp: {
      default: null,
    },
    roleProp: {
      default: null,
    },
  },
  watch: {
    utilisateursProp() {
      if (this.utilisateursProp != null)
        this.utilisateurChoisi = this.utilisateursProp;
    },
    roleProp() {
      if (this.roleProp != null) {
        
        //Pour changer le titre et autres besoin spécifique au role
        switch(this.roleProp){
          case "ETUDIANT":
          default:
            this.titre_modal = "etudiant";
            break;

          case "FORMATEUR":
            this.titre_modal = "formateur";
            break;

          case "REFERENT":
            this.titre_modal = "referent";
            break;

          case "CEF":
            this.titre_modal = "cef";
            break;

          case "ADMIN":
            this.titre_modal = "admin";
            break;
        }

        this.selected = this.roleProp;
        this.refreshList();
      }
    },
  },
  computed: {
    utilisateurChoisi_input() {
      if (this.utilisateurChoisi != {} && this.utilisateurChoisi != null){
        // console.log("utilisateurChoisi : ", this.utilisateurChoisi);
        return `${this.utilisateurChoisi.prenom} ${this.utilisateurChoisi.nom}`;
      }
      else return "";
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.refreshList();
    },
    close() {
      this.$emit("close", this.utilisateurChoisi);
    },
    clickListe(utilisateur) {
      this.utilisateurChoisi = utilisateur;
    },
    pageChange(pageNum) {
      utilisateurApi
        .getByRoleByPage(this.selected, pageNum - 1, this.perPage, this.saisie)
        .then((response) => (this.utilisateurs = response));
    },
    refreshList() {
      utilisateurApi
        .getByRoleByPage(this.selected, 0, this.perPage, this.saisie)
        .then((response) => (this.utilisateurs = response));

      utilisateurApi
        .getCountByRole(this.selected, this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
  created() {},
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
