<template>
  <div>
    <object :data="pdfUrl" type="application/pdf" width="100%" height="600">
      <p>Votre navigateur ne prend pas en charge l'affichage des fichiers PDF. Vous pouvez le télécharger en cliquant sur le lien suivant : <a :href="pdfUrl">Télécharger le PDF</a>.</p>
    </object>
  </div>
</template>

<script>
export default {
  data() {
    return {
      etudiantId: 0,

      pdfUrl: ''
    };
  },
  mounted() {
    this.etudiantId = parseInt(this.$store.getters.getUtilisateur.etudiantDto.id);
    this.constructPdfUrl();
  },
  methods: {
    constructPdfUrl() {
      const fileName = `dossierEtudiant${this.etudiantId}-promo-1.pdf`;
      this.pdfUrl = `http://localhost:8080/${fileName}`;
    }
  }
};
</script>

