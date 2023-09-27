<template>
  <div>
    <object :data="fileImport" type="application/pdf" width="100%" height="600">
      <p>Votre navigateur ne prend pas en charge l'affichage des fichiers PDF. Vous pouvez le télécharger en cliquant sur le lien suivant : <a :href="fileImport">Télécharger le PDF</a>.</p>
    </object>
  </div>
</template>

<script>
export default {
  data() {
    return {

      fileImport: ''
    };
  },
  created() {
    this.fileImport = this.$route.params.fileImport;
  }
 
};
</script>

