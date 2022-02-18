<template>
  <div >
    <div>
      <AddExamen />
    </div>
    <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
     
      <!-- //details -->
        <template #cell(Details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
        {{ row.detailsShowing ? 'Masquer' : 'Afficher'}} 
        </b-button>
      </template>
      <!-- Titre -->
      <template #cell(Titre)="row">
        <div v-if="row.item.modifier" >
           
           <b-form-input id="input-default" placeholder="" v-model="row.item.Titre">
             {{row.item.Titre}}
           </b-form-input>
         
        </div>
        <div v-else>
          {{row.item.Titre}}
        </div>
      </template>
      <!-- Durée -->
      <template #cell(Duree)="row">
        <div v-if="row.item.modifier">
        
          <b-form-spinbutton id="demo-sb" v-model="row.item.Duree" min="1" max="10" step="0.5"></b-form-spinbutton>
      
        </div>
        <div v-else>
         {{row.item.Duree}}
      </div>
      </template>
        <!-- Date -->
        <template #cell(Date)="row"> 
          <div v-if="row.item.modifier">
            <b-form-datepicker id="example-datepicker" v-model="row.item.Date" class="mb-2"></b-form-datepicker>
          </div>
          <div v-else>
            {{row.item.Date}}
          </div>
        </template>
        <!-- Bolcs Concernée -->
        <template #cell(Blocs_concernes)="row" >
          <div v-if="row.item.modifier">
       
            <b-form-checkbox-group
              size="sm"
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="flavour-1a"
              class="d-flex flex-wrap justify-content-center"
              switches
              
            ></b-form-checkbox-group>
        
          </div>
          <div v-else>
            
             {{row.item.Blocs_concernes}}
          </div>

        </template>
         <!-- Piéce jointe -->
        <template #cell(Piece_jointe)="row" >
        <p v-if="row.item.modifier" class="w-75">

           <b-form-file id="file-default"  ></b-form-file>
       </p>

       <p v-else >
        <font-awesome-icon  :icon="['fas', 'download']" class="icon"/>   {{ row.item.Piece_jointe }}
       </p>
            
       
        </template>
       <!-- Action -->
        <template #cell(Action)="row">
          <div v-if="row.item.modifier">
         <b-form @submit="onSubmit" >
          <b-button block variant="success" type="submit">  <font-awesome-icon :icon="['fas', 'check-square']" class="icon"/>   Valider</b-button>
       
          <b-button block variant="warning" @click="AnnulerModif(row.item)">  <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon"/>   Annuler</b-button>
            </b-form>

        </div>
            
        <div v-else >
              <b-button block variant="primary" v-bind:class="classObject(row.item, true)" @click="modifier(row.item)">  <font-awesome-icon :icon="['fas', 'edit']" class="icon"/>   Modifier</b-button>
              <b-button block variant="success"  v-bind:class="classObject(row.item,false)" @click="ajouterNotes(row.item)"> <font-awesome-icon :icon="['fas', 'plus-square']" class="icon"/>   Ajouter notes</b-button>
        </div>
        
        </template>
         <!--Description -->
        <template #row-details="row">
            <b-card v-if="row.item.modifier">
            <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                <b-col> <b-form-textarea
                  id="textarea-default"
                  placeholder="Default textarea"
                  v-model="row.item.description"
                ></b-form-textarea></b-col>
            </b-row>
            </b-card>
            <b-card v-else>
            <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                <b-col>{{ row.item.description }}</b-col>
            </b-row>
    
            </b-card>
        </template>
   
    </b-table>
  </div>
  </div>
       
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
import AddExamen from '@/components/Formateur/AddExamen.vue'
  export default {
      name: 'ExamensPromotionsListCompoenent',
      components:{
        AddExamen,      
      },
    data() {

      return {
      examens: [],
      perPage: 10,
      pageCount: 0,
         form: {
          Titre: '',
          Duree: '',
          Date: null,
          checked: []
        },
        fields: [
    {
      key: "Details",
      label: "Détails",
      thStyle: { width: "5%" },
    },
      {
      key: "Titre",
      label: "Titre",
      thStyle: { width: "21%" },
    },
    { key: "Duree", label: "Durée", thStyle: { width: "5%" } },
    {
      key: "Date",
      label: "Date",
      thStyle: { width: "17%" },
    },
    {
      key: "Blocs_concernes",
      label: "Blocs concernés",
      thStyle: { width: "15%" },
    },
    {
      key: "Piece_jointe",
      label: "Pièce jointe",
      thStyle: { width: "22%" },
    },
    {
      key: "Action",
      label: "Action",
      thStyle: { width: "15%" },
    }
  ],
       
        items: [
          { Titre: 'Java approfondissement', Duree: '4h', Date: '05/02/2022',Blocs_concernes:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Pièce jointe', modifier :false, _showDetails: false },
          { Titre: 'Java intermédiaire', Duree: '3.5h', Date: '10/02/2022',Blocs_concernes:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Pièce jointe', modifier :false ,_showDetails: false },
          {
            Titre: 'Travaux pratiques CDA',
            Duree: '4h',
            Date: '13/03/2022	',
            Blocs_concernes:'1,2,3,4',
            description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',
            Piece_jointe: ' Nom Pièce jointe',
            modifier :false,
            _showDetails: false
          },
          { Titre: 'Angular', Duree: '2h', Date: '22/12/2022',Blocs_concernes:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Pièce jointe',modifier :false,_showDetails: false }
        ], 
        selected: [], 
        options: [
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 },
          { text: '5', value: 5 },
          { text: '6', value: 6 },
          { text: '7', value: 7 },
          { text: '8', value: 8 },
          { text: '9', value: 9 }
        ]
      }
    },
      created() {
    this.refreshList();
  },
    methods:{
      modifier(item){
        item.modifier= true;
        item._showDetails = true
      },
         AnnulerModif(item){
        item.modifier= false;
         item._showDetails = false
      },
      ajouterNotes(item){
        this.$emit('custom-event-notes', { examen: item.Titre })
      },
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.items))
      },

         refreshList() {
      examenApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.examens = response));
    },
    classObject(item,modifier){
        let dateExam = new Date(item.Date).getTime();
        let now =  Date.now()
        if (dateExam > now ) {

            return modifier ? 'd-none': ''
        }
        return modifier ?'':'d-none';
    },
    tableItems(){
        //Assigner items 
    }
  }
  }
</script>
<style>
.Bolcs{
  width: 180px;
}
</style>