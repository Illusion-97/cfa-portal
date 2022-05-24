<template>
    <div>
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="success"
            @dismissed="dismissCountDown = 0"
        >
            {{ message }}
      </b-alert>
        <div>
            <DevoirCreate />
        </div>
        <!-- <b-table striped hover :fields="fields" :items="items"> -->
            <b-table striped hover :fields="fields" :items="items">
                
                <template #cell(consigne)="row">
                    <div v-if="row.item.modifier">
                        <b-form-input
                            id="input-default"
                            v-model="transItem.consigne">
                        </b-form-input>
                    </div>
                    <div v-else>
                        {{row.item.consigne}}
                    </div>
                </template>  


                <template #cell(dateDebut)="row">
                    <div v-if="row.item.modifier">
                        <b-form-datepicker
                            id="example-datepicker"
                            v-model="transItem.dateDebut"
                            class="mb-2">
                        </b-form-datepicker>
                    </div>
                    <div v-else>
                        {{row.item.dateDebut}}
                    </div>
                </template>


                <template #cell(dateFin)="row">
                    <div v-if="row.item.modifier">
                        <b-form-datepicker
                            id="example-datepicker"
                            v-model="transItem.dateFin"
                            class="mb-2">
                        </b-form-datepicker>
                    </div>
                    <div v-else>
                        {{row.item.dateFin}}
                    </div>
                </template>   


                <template #cell(action)="row">
                <div v-if="row.item.modifier">
                    <b-form @submit="onSubmit(row.item)">
                        <b-button class="btnAction" block variant="success" type="submit">
                            <font-awesome-icon
                            :icon="['fas', 'check-square']"
                            class="icon"
                            />Valider
                        </b-button>
                        <b-button class="btnAction" block variant="warning" @click="AnnulerModif(transItem, row.item)">
                            <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon"
                            />Annuler
                         </b-button>
                         --row.item : {{row.item}}</br>
                         --transItem : {{transItem }}
                    </b-form>
                </div>

                <div v-else>
                    <b-button class="btnAction"
                        block
                        variant="primary"
                        v-bind:class="classObject(row.item, true)"
                        @click="modifier(row.item)">
                        <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
                        Modifier
                    </b-button>
                    <b-button class="btnAction"
                         block variant="danger"
                         @click="supprimerExamen(items)">
                        <font-awesome-icon :icon="['fas', 'trash']" class="icon" />
                        Supprimer
                    </b-button>
                </div>    
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
            transItem:{},
            devoirs: [],
            items: [],
            dismissSecs: 5,
            message: "",
            dismissCountDown: null,
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
                    id: devoirs[i].id,
                    consigne : devoirs[i].consigne,
                    dateDebut : devoirs[i].dateDebut,
                    dateFin : devoirs[i].dateFin,
                    interventionId: devoirs[i].interventionId,
                    version: devoirs[i].version,
                    modifier : false,
                }
                items.push(item);   
            }
            this.items = items;
        },
        addOptionsCompetences(selectedActiviteType) {
        let options = [];
        // selectedActiviteType[i] 4 ou 7 ou 8
        for (let i = 0; i < selectedActiviteType.length; i++) {
            for (let k = 0; k < this.datasFormCP.length; k++) {
            if (this.datasFormCP[k][selectedActiviteType[i]] != undefined) {
                let tabOptions = this.datasFormCP[k][selectedActiviteType[i]];
                for (let j = 0; j < tabOptions.length; j++) {
                options.push(tabOptions[j]);
                }
            }
            }
        }
        this.optionsCompetences = options.sort(function (a, b) {
            return a.text - b.text;
        });
        },
        modifier(item) {  
            console.log("modif*****");
            console.log(item)   ;
            // let transItem:{
                
            // } 
            this.transItem.modifier = true;
            console.log(this.transItem);
            
            // this.addOptionsCompetences(item.selectedActiviteType);
        },
         AnnulerModif(transItem, item) {
            console.log("Annuler modif*****");
            console.log("item");
            console.log(item);
            console.log("transItem");
            console.log(transItem);
            item = this.transItem;
            item.modifier = false;
            this.transItem = null;
        },

        classObject(item, modifier) {
            let dateFinDevoir = new Date(item.Date).getTime();
            let now = Date.now();
            if (dateFinDevoir < now) {
                return modifier ? "d-none" : "";
            }
            return modifier ? "" : "d-none"; 
        },
        onSubmit(item){
            let devoirDtoSave = {
                id: item.id,
                consigne: item.consigne,
                dateDebut: item.dateDebut,
                dateFin: item.dateFin,
                interventionId: item.interventionId,
                version: item.version,
            }
            devoirApi.update(devoirDtoSave).then((response) => {
                this.showAlert(response.consigne, false);

            })
        },
        showAlert(consigne, isErr) {
            if (isErr) {
                //    this.message = "Erreur d'ajout de 'examen " + titre ;
                // this.dismissCountDownErr = this.dismissSecs
            } else {
                this.message = "Le devoir \"" + consigne + "\" a bien été modifié";
                this.dismissCountDown = this.dismissSecs;
            }
        },
    },
}
</script>
<style scoped>
    .btnAction{
        width: 60%;
        margin: auto;
    }

</style>
