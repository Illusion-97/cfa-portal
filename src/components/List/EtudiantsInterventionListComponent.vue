<template>
  <section>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <!-- //details -->
      <template #cell(details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Masquer" : "Afficher" }}
        </b-button>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  name: "EtudiantsInterventionListComponent",
  components: {},
  data() {
    return {
      items: [],
      fields: [
        {
          key: "details",
          label: "Détails",
          thStyle: { width: "5%" },
          thClass: "text-center",
        },
        {
          key: "nom",
          label: "Nom",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },
        {
          key: "prenom",
          label: "Prenom",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },
        {
          key: "ville",
          label: "Ville",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },

        {
          key: "ville",
          label: "Ville",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },
        {
          key: "depart",
          label: "Départ",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },
        {
          key: "fin",
          label: "Fin",
          thStyle: { width: "15%" },
          thClass: "text-center",
        },
        {
          key: "action",
          label: "Action",
          thStyle: { width: "10%" },
          thClass: "text-center",
        },
      ],
    //   items: [
    //       nom:'nom'
    //       prenom:'prenom'

    //   ]
    };
  },
  methods: {},
};
</script>