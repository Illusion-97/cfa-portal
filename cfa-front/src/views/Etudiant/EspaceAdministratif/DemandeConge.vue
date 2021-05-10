<template>
  <div class="container-fluid">
    <BodyTitle title="Demande de congé" />
    <table class="table text-center mt-5">
      <thead>
        <tr>
          <th scope="col">Acquis</th>
          <th scope="col">Pris</th>
          <th scope="col">Disponibles</th>
        </tr>
      </thead>
      <tbody>
        <td>999</td>
        <td>999</td>
        <td>999</td>
      </tbody>
    </table>
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

      <div class="offset-9 col-2 pl-5 pr-5 pl-0">
        <b-button type="submit">Send</b-button>
      </div>
    </b-form>

    <TableTemplate
      :perPage="perPage"
      :items="congesComputed"
      :fields="fields"
      class="table-template"
    />
  </div>
</template>

<script>
import axios from "axios";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { leaveFields } from "@/assets/js/fields.js";
export default {
  name: "DemandeConge",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      form: {
        dateDebut: "",
        dateFin: "",
        motif: "",
        type: "",
        status: "EN_ATTENTE",
        utilisateurDto: this.$store.getters.getUtilisateur,
      },

      types: [
        { text: "maladie", value: "MALADIE" },
        { text: "payé", value: "PAYE" },
        { text: "sans solde", value: "SANS_SOLDE" },
      ],

      conges: [],
      fields: leaveFields,
      perPage: 10,
    };
  },
  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
    congesComputed() {
      return this.conges;
    },
  },
  created() {
    this.getConges();
  },
  methods: {
    submit(e) {
      e.preventDefault();

      let req = this.$apiUrl +"AppliCFABack/conges";

      axios
        .post(req, this.form)
        .then(() => this.getConges())
        .catch((error) => console.log(error));

    },
    getConges() {
      let req =
        this.$apiUrl +
        "AppliCFABack/utilisateurs/" +
        this.utilisateur.id +
        "/conges";

      axios
        .get(req)
        .then((response) => (this.conges = response.data))
        .catch((error) => console.log(error));
      
    },
  },
};
</script>

<style scoped>
.form {
  margin-top: 5em;
}

.b-form-textarea {
  height: 200px;
}

.btn {
  width: 100%;
}

.table-template{
  margin-right: 4em;
}
</style>
