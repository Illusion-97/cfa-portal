<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mes devoirs" />

        <br>
         <TableTemplate 
          :perPage="perPage"
          :items="items"
          :fields="fields"
          :showBtn="false"/>
          
    </div>
    </div>
    

  
</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import axios from "axios";
import {
    devoirsFields
  } from "@/assets/js/fieldsEtudiant.js";

export default {
  name: "Devoirs",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      fields: devoirsFields,
      items: [],
    };
  },
  created() {
      axios
      .get(this.$apiUrl + "AppliCFABack/etudiants/1/devoirs") //faire la methode dans le back
      .then((response) => (this.items = response.data))
      .catch((error) => console.log(error));
      },
  
  
}
</script>
