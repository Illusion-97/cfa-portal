<template>

    <div >
      
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mon cursus" />

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
    cursusFields
  } from "@/assets/js/fieldsEtudiant.js";

export default {
  name: "Cursus",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      fields: cursusFields,
      items: [],
    };
  },
  created() {
      axios
      .get(this.$apiUrl + "AppliCFABack/etudiants/1/cursus") //faire la méthode pour recupérer le cursus
      .then((response) => (this.items = response.data))
      .catch((error) => console.log(error));
      },
  
  
}
</script>


