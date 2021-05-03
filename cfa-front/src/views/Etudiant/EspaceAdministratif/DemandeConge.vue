<template>
  <div>
    <BodyTitle title="Demande de congé" />

    <b-form class="form mb-5" @submit="submit()">
      <b-form-group>
        <b-form-row class="text-align-left">
          <b-col>
            date de début :
          </b-col>

          <b-col>
            <b-form-datepicker locale="fr"> </b-form-datepicker>
          </b-col>

          <b-col> </b-col>

          <b-col>
            date de fin :
          </b-col>

          <b-col>
            <b-form-datepicker> </b-form-datepicker>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row>
          <b-col>
            <label>Type de congé :</label>
          </b-col>
          <b-col cols="10">
            <b-form-select :options="types"></b-form-select>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        Entrez votre message :
        <b-form-textarea class="b-form-textarea"> </b-form-textarea>
      </b-form-group>

      <b-form-group>
        <b-button type="submit">Send</b-button>
      </b-form-group>
    </b-form>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnTxt="Ajouter un fichier"
      btnLink="/"
    />
  </div>
</template>

<script>
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
      types: [
        { text: "maladie", value: null },
        { text: "payé", value: null },
        { text: "sans solde", value: null },
      ],
      items: [
        {
          dateDebut: "2020-02-12",
          dateFin: "2020-02-15",
          motif: "covid-19",
          type: "Congé maladie",
          status: "Confirmé",
        },
        {
          dateDebut: "2020-02-12",
          dateFin: "2020-02-15",
          motif: "covid-19",
          type: "Congé maladie",
          status: "Refusé",
        },
        {
          dateDebut: "2020-02-12",
          dateFin: "2020-02-15",
          motif: "covid-19",
          type: "Congé maladie",
          status: "En attente",
        },{
          dateDebut: "2020-02-12",
          dateFin: "2020-02-15",
          motif: "covid-19",
          type: "Congé maladie",
          status: "En attente",
        },
      ],
      fields: leaveFields,
      perPage: 10,
    };
  },
  methods: {
    statusColor() {
      switch (this.items.status) {
        case "Confirmé":
          console.log("Confirmé");
          break;
        default:
        case "En attente":
          console.log("Attente");
          break;
        case "Refusé":
          console.log("Refusé");
          break;
      }
    },
  },
};
</script>

<style scoped>
.form {
  border: 1px solid #6c757d;
  margin-top: 5em;
  padding-top: 2em;
  padding-left: 5em;
  padding-right: 5em;
}

.b-form-textarea {
  height: 200px;
}
</style>
