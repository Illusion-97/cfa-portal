<template>
  <div class="container">
    <div>
      <h5>Votre livret d'évaluation</h5>
      <b-button variant="success" size="sm">
        <font-awesome-icon :icon="['fas', 'download']" class="btn-download" />
        Télécharger</b-button
      >
    </div>
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
          observation:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat ",
        },
        {
          isActive: true,
          intitule: "Développer la partie Front-End d'une application",
          resultat: "non-acquis",
          observation:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat ",
        },
        {
          isActive: true,
          intitule: "Développer la partie Back-End d'une application",
          resultat: "acquis",
          observation:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat ",
        },
        {
          isActive: true,
          intitule: "Développer une application mobile",
          resultat: "acquis",
          observation:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cumque molestias vero quaerat ",
        },
      ],
    };
  },
};
</script>

<style scoped>
.btn-donwload {
  color: #fff;
  width: 18px;
}

.container {
  margin: 89px 0 0 421px;
}

h5 {
  margin: 0 0 30px 0;
  display: inline-block;
}

#key:intitule {
  width: 300px;
}

button {
  display: inline-block;
  margin-left: 10px;
}
</style>
