<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mes absences et retards" />

        <br>
        
        <div class="Menu">
          <TableTemplate 
          :perPage="perPage"
          :items="items"
          :fields="fields"
          :showBtn="false"/>
          <TableTemplate 
          :perPage="perPage"
          :items="items"
          :fields="fields"
          :showBtn="false"/>
        </div>
    </div>
    </div>
    

  
</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
export default {
  name: "Abscences",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      perPage: 10,
      items: [
        {
          Date: " Du 13/05/2020 au 13/05/2020",
          Motif: "COVID",
          Justificatif: "",
        }, 
        {
          Date: " Du 13/04/2021 au 18/04/2021",
          Motif: "Operation",
          Justificatif: "",
        }, 
        {
          Date: " Du 13/05/2020 au 13/05/2020",
          Motif: "COVID",
          Justificatif: "",
        },
       
      ],
    };
  },
  
}
</script>
