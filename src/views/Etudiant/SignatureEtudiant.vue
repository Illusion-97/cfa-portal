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
  <style scoped>
  #container 
    {
      width: 75%;
      margin: 5% 0 0 3%;
        /* margin: 5% 0% 0% 21%; */
        /* padding-bottom: 15%; */
    }
  </style>