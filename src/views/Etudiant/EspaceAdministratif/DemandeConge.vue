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

    <form class="mb-5" @submit="submit">
      <div class="d-flex justify-content-center form-group">
        <div class="col-4">
          <label for="">Date de debut</label>
          <b-form-datepicker locale="fr" v-model="form.dateDebut" placeholder="Aucune date selectionné" required>
          </b-form-datepicker>
        </div>
        <div class="col-4">
          <label for="">Date de fin</label>
          <b-form-datepicker locale="fr" v-model="form.dateFin" placeholder="Aucune date selectionné" required>
          </b-form-datepicker>
        </div>
      </div>
      <div class="d-flex justify-content-center form-group">
        <div class="col-4">
          <select name="" id="" class="custom-select" v-model="form.type">
            <option value="" disabled>Type de congé</option>
            <option :value="type.value" v-for="type in types" :key="type.id">
              {{ type.text }}
            </option>
          </select>
        </div>
        <div class="col-4">
          <label for="file" class="mr-2">Justificatif :</label>
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            accept="application/pdf"
          />
   
          </div>
      </div>
      
      <div class="d-flex justify-content-center form-group">
        <div class="col-8">
        <textarea name="motif" cols="20" rows="3" class="form-control" v-model="form.motif" placeholder="Motif du congé"/>
        </div>
      </div>
      <input type="submit" value="Envoyer" class="btn btn-outline-primary px-5 float-right">
    </form>
    <!-- {{conges}} -->
    <!-- <pre class="m-0">
      {{form}}
    </pre> -->
    <TableTemplate :perPage="perPage" :items="congesComputed" :fields="fields" :isPaginate="false" :current-page="0"/>
  </div>
</template>

<script>
  import {  congeApi } from "@/_api/conge.api.js";
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

        types: [{
            text: "Maladie",
            value: "MALADIE"
          },
          {
            text: "Payé",
            value: "PAYE"
          },
          {
            text: "Sans solde",
            value: "SANS_SOLDE"
          },
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
              if (this.file != "")
                fileApi.submitFileByDirectoryAndId(
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
