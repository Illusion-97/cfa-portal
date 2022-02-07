<template>
    <div class="container">
        <h5>Constituer un dossier professionel en ligne <font-awesome-icon :icon="['fas', 'folder-open']" /></h5>
        <h5 class="redOu">Ou</h5>
        <h5>Charger dans votre espace étudiant un dossier professionnel depuis un document Word <font-awesome-icon :icon="['fas', 'upload']" /></h5>
        <p class="consignes">*Consignes : 
            <br>
            Les images ou captures d'écrans utilisées dans votre dossier professionnel ne doivent pas dépasser 400 ko par image, et doivent être au format png ou jpg uniquement.
            <br>
            Utilisez l'outil gratuit https://www.img2go.com/fr/compresser-image pour réduire leur taille.
        </p>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>

<script>
    export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "dossiers_pro",
          label: "Mes dossiers professionnels",
          sortable: false,
        },
        {
          key: "gerer_dossiers",
          label: "Gérer mes dossiers",
          sortable: true,
        },
      ],
      items: [
        {
          isActive: true,
          dossiers_pro: "dossierpro-laura-cda-2020",
          gerer_dossiers: "html / pdf / modifier / supprimer"
        },
        {
          isActive: true,
          dossiers_pro: "dossierpro-laura-master-2023",
          gerer_dossiers: "html / pdf / modifier / supprimer"
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

    .fa-folder-open {
        color: #4CAF50;
    }

    .fa-upload {
        color: #4CAF50;
    }

    .redOu {
        color: red;
        font-style: italic;
    }

    .table {
        margin-top: 30px;
    }

    .consignes {
        margin: 30px 0 0 0;
    }
</style>