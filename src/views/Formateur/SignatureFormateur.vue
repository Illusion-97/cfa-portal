<template>
    <div>
      <SignatureComponent/>
    </div>
  </template>
  
  <script>
  
  import SignatureComponent from "@/components/utils/SignatureComponent.vue";
  export default {
    name: "SignatureFormateur",
    components: {
        SignatureComponent,
    },
  };
  </script>
  <style scoped>
  </style>