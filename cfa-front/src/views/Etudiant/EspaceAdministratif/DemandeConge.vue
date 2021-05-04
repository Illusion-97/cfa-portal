<template>
  <div>
    <BodyTitle title="Demande de congé" />

    <b-form class="form mb-5" @submit="submit()">
      <b-form-group >
        <b-form-row class="text-align-left">
          <label class="offset-1 col-1">date de début :</label>
          <div class="col-4 pr-5">
            <b-form-datepicker locale="fr" > </b-form-datepicker>
          </div>          
          <div class="col-1">date de fin :</div>
          <div class="col-4 pr-5">
            <b-form-datepicker locale="fr" > </b-form-datepicker>
          </div>   
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
            <div class="offset-1 col-1">Motif :</div>
            <div class="col-4 pr-5">
              <b-form-input type="text"> </b-form-input>
            </div>
            <label class="col-1">Type de congé :</label>
            <div class="col-4 pr-5">
              <b-form-select :options="types"></b-form-select>
            </div>
        </b-form-row>
      </b-form-group>

      <div class="offset-9 col-2 pl-5 pr-5 pl-0">
        <b-button type="submit">Send</b-button>
      </div>
    </b-form>

    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="false"
      btnTxt="Ajouter un fichier"
      btnLink="/"
      class="pr-5"
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
  margin-top: 5em
}

.b-form-textarea {
  height: 200px;
}

.btn{
  width: 100%;
}

</style>
