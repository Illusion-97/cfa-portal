<template>
    <div class="container-fluid" id="container">
      <SignatureComponent/>
    </div>
  </template>
  
  <script>

  import SignatureComponent from "@/components/utils/SignatureComponent.vue";

  export default {
    name: "SignatureEtudiant",
    components: {
        SignatureComponent,
    },
  };
  </script>
  <style scoped src="@/assets/styles/StyleEtudiant.css">
  </style>