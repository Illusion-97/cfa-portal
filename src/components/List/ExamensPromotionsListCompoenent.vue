<template>
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      
        <template #cell(Details)="row">
    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
    {{ row.detailsShowing ? 'Masquer' : 'Afficher'}} 
    </b-button>

                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        </template>
        <template #cell(Piece_jointe)="row" >
       <p v-if="row.item.modifier">
        <font-awesome-icon  :icon="['fas', 'download']" class="icon"/>   {{ row.item.Piece_jointe }}
       </p>
            
            <p v-else>

               
            </p>

        </template>
   
        <template #cell(Ajouter-Modifier)="row">
            
            <b-button block variant="primary" v-bind:class="classObject(row.item, true)">  <font-awesome-icon :icon="['fas', 'edit']" class="icon"/>   Modifier</b-button>
            <b-button block variant="success"  v-bind:class="classObject(row.item,false)"> <font-awesome-icon :icon="['fas', 'plus-square']" class="icon"/>   Ajouter notes</b-button>
        </template>
        <template #row-details="row">
            <b-card>
            <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                <b-col>{{ row.item.description }}</b-col>
            </b-row>
    
            </b-card>
        </template>
       

        
     
    </b-table>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
  export default {
      name: 'ExamensPromotionsListCompoenent',
    data() {

      return {
      examens: [],
      perPage: 10,
      pageCount: 0,
        fields: ['Details', 'Titre', 'Durée', 'Date','Blocs_concernés','Piece_jointe','Ajouter-Modifier'],
        items: [
          { Titre: 'Java approfondissement', Durée: '4h', Date: '05/02/2022',Blocs_concernés:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Piece joite', modifier :true },
          { Titre: 'Java intermédiaire', Durée: '3.5h', Date: '10/02/2022',Blocs_concernés:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Piece joite' },
          {
            Titre: 'Travaux pratiques CDA',
            Durée: '4h',
            Date: '13/03/2022	',
            Blocs_concernés:'1,2,3,4',
            description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',
            Piece_jointe: ' Nom Piece joite'
          },
          { Titre: 'Angular', Durée: '2h', Date: '22/12/2021',Blocs_concernés:'1,2,3,4',description:'Evalution des connaissances des élèves sur des concepts Java avancés.n',Piece_jointe: ' Nom Piece joite' }
        ]
      }
    },
      created() {
    this.refreshList();
  },
    methods:{

         refreshList() {
      examenApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.examens = response));
    },
    classObject(item,modifier){
        let dateExam = new Date(item.Date);
        let now =  Date.now()
        if (dateExam > now ) {

            return !modifier ? 'd-none': ''
        }
        return !modifier ?'':'d-none';
    },
    tableItems(){
        //Assigner items 
    }
  }
  }
</script>