<template>
  <div class="container-fluid">
    <BodyTitle title="Création d'un nouveau congé" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="offset-1 col-1">Date de début</label>
          <div class="col-4 pr-5">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
              required
            ></b-form-datepicker>
          </div>
          <div class="col-1">Date de fin</div>
          <div class="col-4 pr-5">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <div class="offset-1 col-1">Motif</div>
          <div class="col-4 pr-5">
            <b-form-input type="text" v-model="form.motif"> </b-form-input>
          </div>
          <label class="col-1">Type de congé</label>
          <div class="col-4 pr-5">
            <b-form-select
              :options="types"
              v-model="form.type"
              required
            ></b-form-select>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="offset-1 col-1">Status du congé</label>
          <div class="col-4 pr-5">
            <b-form-select
              :options="status"
              v-model="form.status"
              required
            ></b-form-select>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <table class="table table-bordered table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody v-if="congesComputed">
            <tr v-for="utilisateur in utilisateursComputed" :key="utilisateur.id">
              <td>{{ utilisateur.prenom }}</td>
              <td>{{ utilisateur.nom }}</td>
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
      </b-form-group>

      <div class="offset-9 col-2 pl-5 pr-5 pl-0">
        <b-button type="submit">Send</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
//import { congeApi } from "@/_api/conge.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
  },
  data() {
    return {
      form: {
        dateDebut: "",
        dateFin: "",
        motif: "",
        type: "",
        status: "",
        utilisateurDto: this.$store.getters.getUtilisateur,
      },

      types: [
        { text: "maladie", value: "MALADIE" },
        { text: "payé", value: "PAYE" },
        { text: "sans solde", value: "SANS_SOLDE" },
      ],

      status: [
        { text: "confirmé", value: "CONFIRME" },
        { text: "refusé", value: "REFUSE" },
        { text: "en attente", value: "EN_ATTENTE" },
      ],

      utilisateurs: [],
      perPage: 10,
      pageCount: 0,
    };
  },
  computed: {
    utilisateursComputed(){
      return this.utilisateurs;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
    },
    refreshList() {
      utilisateurApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.utilisateurs = response));
      utilisateurApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style scoped></style>
