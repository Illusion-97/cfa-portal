<template>
  <div>
    <b-table hover :items="items" :fields="fields">

         <template #cell(note)="row">
        <div v-if="row.item.note != 0" >
           {{row.item.note}}
         
         
        </div>
        <div v-else>
            <b-form-spinbutton id="demo-sb" v-model="row.item.Note" min="1" max="20" step="0.5"></b-form-spinbutton>
             
        </div>
      </template>
       <template #cell(satisfaction)="row">
        <div v-if="row.item.satisfaction != ''" >
           {{row.item.satisfaction}}
         
         
        </div>
        <div v-else>
            <b-form-group  v-slot="{ ariaDescribedby }" class="d-flex w-100">
                <b-form-radio-group class="pt-2" id="radio-group-2"  >
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby"  name="some-radios" value="oui">Oui</b-form-radio>
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby"  name="some-radios" value="Non">Non</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
          
             
        </div>
      </template>
        <template #cell(Action)="row">
          <div v-if="row.item.note == 0">
         <b-form  >
      
          <b-button block variant="success"  @click="ajouterSatisfaction(row.item)"> <font-awesome-icon :icon="['fas', 'plus-square']" class="icon"/> Ajouter </b-button>
            </b-form>

        </div>
            
        <div v-else >
              <b-button block variant="primary"  @click="modifier(row.item)">  <font-awesome-icon :icon="['fas', 'edit']" class="icon"/>   Modifier</b-button>
              
        </div>
        </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
         fields: [
    {
      key: "nom",
      label: "Nom",
      thStyle: { width: "20%" },
    },
      {
      key: "prenom",
      label: "Prenom",
      thStyle: { width: "21%" },
    },
    { key: "note", label: "Note", thStyle: { width: "8%" } },
    {
      key: "satisfaction",
      label: "Satisfaction",
      thStyle: { width: "20%" },
    },
    {
      key: "Action",
      label: "Action",
      thStyle: { width: "10%" },
    }
  ],
        items: [
          { nom: 'Dickerson', prenom: 'Macdonald',note :0,satisfaction :'oui',
           _cellVariants: {  satisfaction: '' }},
          {  nom: 'Larsen', prenom: 'Shaw',note:0,satisfaction:'',
           _cellVariants: {  satisfaction: '' },
            },
          {
           
            nom: 'Geneva',
            prenom: 'Wilson',
            note:14,satisfaction:'' ,
             _cellVariants: {  satisfaction: '' },
    
          },
          {
            nom: 'Thor',
            prenom: 'MacDonald',
            note:0,satisfaction:'' ,
            _cellVariants: {  satisfaction: '' }
           
          },
          {  first_name: 'Dick', prenom: 'Dunlap',note:0,satisfaction:'' ,
           _cellVariants: {  satisfaction: '' } }
        ]
      }
    },
     created() {
    this.ajouterSatisfaction();
  },
    methods:{
        ajouterSatisfaction(){
            this.items.forEach(e =>{
                if (e.satisfaction != '') {
                   
                    if (e.satisfaction == 'oui') {
                        
                        e._cellVariants.satisfaction == 'success'
                         alert(JSON.stringify( e._cellVariants.satisfaction))
                    }
                    else{
                         e._cellVariants.satisfaction == 'warning'
                    }
                    
                }
                
            })
            
        }
    }
  }
</script>