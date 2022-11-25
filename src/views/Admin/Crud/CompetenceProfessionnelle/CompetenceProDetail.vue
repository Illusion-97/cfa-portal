<template>
  <div class="container-fluid">
    <b-table :items="items" :fields="fields" striped responsive="sm">
      

        
      
    </b-table>
  </div>
</template>

<script>
import { competenceProfessionnelleApi } from "@/_api/competenceProfessionnelle.api.js";
import { fieldsCompetencePro } from "@/assets/js/fields.js";
export default {
  name: "CompetenceProDetail",
  
  components: {
  },
  data() {
    return {
        items: [
      ],
      fields: fieldsCompetencePro,
    };
  },
  props: {
    cpsProp: {
      default: null,
    },
  },
  watch: {
      cpsProp() {
      if (this.cpsProp != null) this.cps = this.cpsProp;
    },
  },
  computed: {
    cpsComputed(){
      return this.cpsBDD;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
       competenceProfessionnelleApi.getAllByIdActiviteType(this.$route.params.id).then((response) => (this.items = response));
    },
    
    colspanClick() {
      this.visible = !this.visible
      if (this.visible == false) {
        this.clear()
        this.modifier = false;
      }
    },
    
  },
};
</script>
<style>
.v-application--wrap {
  min-height: fit-content !important;
}
</style>
<style scoped src="@/assets/styles/CrudDetail.css">

</style>
<style scoped>
.widthBtn {
  width: 49%;
}
</style>
