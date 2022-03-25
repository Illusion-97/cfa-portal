<template>
  <div class="container">
    <h5>Contrôles continus</h5>
    <div>
      <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "intitule",
          label: "Intitulé",
          sortable: false,
        },
        {
          key: "date_start",
          label: "Date de début",
          sortable: true,
        },
        {
          key: "date_end",
          label: "Date de fin",
          sortable: true,
        },
      ],
      items: [
        {
          isActive: true,
          intitule: "Maquetter une application",
          date_start: "10/02/2022",
          date_end: "11/02/2022",
        },
        {
          isActive: true,
          intitule: "Développer la partie Front-End",
          date_start: "10/03/2022",
          date_end: "11/03/2022",
        },
        {
          isActive: true,
          intitule: "Développer la partie Back-End",
          date_start: "10/04/2022",
          date_end: "11/04/2022",
        },
        {
          isActive: true,
          intitule: "Mettre en place une base de données",
          date_start: "10/05/2022",
          date_end: "11/05/2022",
        },
        {
          isActive: true,
          intitule: "Développer une application mobile",
          date_start: "10/06/2022",
          date_end: "11/06/2022",
        },
      ],
    };
  },
};
</script>

<style scoped>
h5 {
  margin: 0 0 30px 0;
}
.container {
  margin: 89px 0 0 421px;
}
</style>
