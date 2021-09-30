<template>
  <div class="container-fluid">
    <BodyTitle title="Demande de congé" />
    
    <table class="table text-center mt-5" style="table-layout:fixed">
      <thead>
        <tr>
          <th>Acquis</th>
          <th>Pris</th>
          <th>Disponibles</th>
        </tr>
      </thead>
      <tbody>
        <td>{{ tableConge[0] | twoDigits }}</td>
        <td>{{ tableConge[1] | twoDigits }}</td>
        <td>{{ tableConge[2] | twoDigits }}</td>
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
            <b-form-textarea type="text" v-model="form.motif" class="my-textarea">
            </b-form-textarea>
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
          <div class="offset-1 col-1">Justificatif</div>
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            accept="application/pdf"
          />

          <b-button type="submit" class="offset-9 col-2 pl-5 pr-5 pl-0"
            >Send</b-button
          >
        </b-form-row>
      </b-form-group>

      <!-- <div class="offset-9 col-2 pl-5 pr-5 pl-0">
        <b-button type="submit" class="col-2 pl-5 pr-5 pl-0">Send</b-button>
      </div> -->
    </b-form>

    <TableTemplate
      :perPage="perPage"
      :items="congesComputed"
      :fields="fields"
      :isPaginate="false"
      class="table-template"
    />
  </div>
</template>

<script>
import { congeApi } from "@/_api/conge.api.js";
import { fileApi } from "@/_api/file.api.js";
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
      file: "",
      form: {
        dateDebut: "",
        dateFin: "",
        motif: "",
        type: "",
        status: "EN_ATTENTE",
        utilisateurDto: this.$store.getters.getUtilisateur,
        justificatif: "",
      },

      types: [
        { text: "Maladie", value: "MALADIE" },
        { text: "Payé", value: "PAYE" },
        { text: "Sans solde", value: "SANS_SOLDE" },
      ],

      conges: [],
      fields: leaveFields,
      perPage: 10,

      tableConge: [],
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
    congeApi
      .getCongesByUtilisateurId(this.utilisateur.id)
      .then((response) => (this.conges = response));
    congeApi
      .getTableConge(this.utilisateur.id)
      .then((response) => (this.tableConge = response));
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submit(e) {
      e.preventDefault();

      this.form.justificatif = this.file.name;

      //TODO : save du file

      congeApi
        .save(this.form)
        //Quand on a ajouté le congé, on recharge la liste
        .then(() =>
          congeApi
            .getCongesByUtilisateurId(this.utilisateur.id)
            .then((response) => (this.conges = response))
            //Si pas d'erreur, on post le fichier
            .then(() => {
              fileApi
                .submitFileByDirectoryAndId(
                  "utilisateurs",
                  this.$store.getters.getUtilisateur.id,
                  this.file
                );
            })
        );
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

.table-template {
  margin-right: 4em;
}

.my-textarea{
  height: 150px;
}
</style>
