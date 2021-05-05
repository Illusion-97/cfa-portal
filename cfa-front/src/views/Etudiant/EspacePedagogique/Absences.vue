
<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mes absences et retards" />

        <br>
        {{absence}}
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
import axios from "axios"

export default {
  name: "Abscences",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      absence : null,
      created() {
      axios
      .get("http://localhost:8080/AppliCFABack/absences/1")
      .then((response) => (this.absence = response.data))
      .catch((error) => console.log(error));
      },
      items: [
        {
          Date: " eaea",
          Motif: "gg",
          Justificatif: "",
        },
       
      ],
       
    };
  },
  
  
}
</script>
