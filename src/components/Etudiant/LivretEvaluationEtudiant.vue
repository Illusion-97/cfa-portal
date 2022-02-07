<template>
<div class="container">
    <h5>Votre livret d'évaluation <font-awesome-icon :icon="['fas', 'download']" /></h5>
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
          key: "resultat",
          label: "Résultat",
          sortable: true,
        },
        {
          key: "observation",
          label: "Observations",
          sortable: true,
        },
      ],
      items: [
        {
          isActive: true,
          intitule: "Développer une base de données",
          resultat: "acquis",
          observation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat "
        },
        {
          isActive: true,
          intitule: "Développer la partie Front-End d'une application",
          resultat: "non-acquis",
          observation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat "
        },
        {
          isActive: true,
          intitule: "Développer la partie Back-End d'une application",
          resultat: "acquis",
          observation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat "
        },
        {
          isActive: true,
          intitule: "Développer une application mobile",
          resultat: "acquis",
          observation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat "
        },
        
        
      ],
    };
  },
};
</script>

<style scoped>
    .container {
        margin: 99px 0 0 450px;
    }

    .fa-download {
        color:#4CAF50;
        width: 18px;
    }

    h5 {
        margin: 0 0 30px 0;
    }

    #key:intitule {
      width:300px;
    }
</style>
