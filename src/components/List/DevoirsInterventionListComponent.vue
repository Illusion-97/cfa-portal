<template>
    <div>
        <div>
            <DevoirCreate />
        </div>
        <b-table striped hover :fields="fields" :items="items">
            <template #cell(action)>
                <b-button class="btnModifierSupprimer"
                    block
                    variant="primary"
                    @click="modifier(row.item)">
                <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
                    Modifier
              </b-button>
              <b-button class="btnModifierSupprimer" block variant="danger" @click="supprimerExamen(row.item)">
                <font-awesome-icon :icon="['fas', 'trash']" class="icon" />
                    Supprimer
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { devoirApi } from "@/_api/devoir.api.js";
import DevoirCreate from "@/views/Admin/Crud/Devoir/DevoirCreate.vue"

export default {
    components:{
        DevoirCreate,
    },
    data(){
        return{

            devoirs: [],
            items: [],
            fields: [
                {
                key: "consigne",
                label: "Consigne",
                thStyle: { width: "15%" }
               
                },
                {
                key: "dateDebut",
                label: "Date début",
                thStyle: { width: "5%" }
                
                },
                {
                key: "dateFin",
                label: "Date fin",
                thStyle: { width: "5%" }
                
                },
                {
                key: "action",
                label: "Action",
                thStyle: { width: "6%" }
                
                },
            ]    
        }
    },
    created() {
        this.getAllDevoirsByInterventionId()
    },
    methods: {
        // Intervention
        getAllDevoirsByInterventionId() {
            devoirApi.getAllByInterventionId(this.$route.params.id)
            .then((response) => {
                this.devoirs = response;

                if (this.devoirs != undefined) {
                    this.assigneTableItems(this.devoirs)
                }
               
            }); 
        },
        assigneTableItems(devoirs){  
            let items = [];
            for (let i = 0; i < devoirs.length; i++){
                let item = {
                    consigne : devoirs[i].consigne,
                    dateDebut : devoirs[i].dateDebut,
                    dateFin : devoirs[i].dateFin,
                }
                items.push(item);   
            }
            this.items = items;
        },
    },
}
</script>
<style scoped>
    .btnModifierSupprimer{
        width: 60%;
        margin: auto;
    }

</style>
