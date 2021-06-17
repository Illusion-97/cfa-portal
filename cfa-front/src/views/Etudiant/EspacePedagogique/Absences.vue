
<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mes absences et retards" />

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
import { etudiantApi} from "@/_api/etudiant.api.js";
import {
    absencesFields
  } from "@/assets/js/fieldsEtudiant.js";

export default {
  name: "Abscences",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      fields: absencesFields,
      items: [],
    };
  },
  created() {
      etudiantApi
        .getAbsencesById(this.$store.getters.getUtilisateur.id)
        .then((response) => (this.items = response));
  
  
}
}
</script>
