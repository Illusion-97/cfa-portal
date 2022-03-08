<template>
  <div>
 
    <b-table hover :items="items" :fields="fields">

         <template #cell(note)="row">
           <div v-if=" row.item.modifier  || (!row.item.ajouter)">
            <b-form-spinbutton id="demo-sb" v-model="row.item.note" min="1" max="20" step="0.5"></b-form-spinbutton>
         </div>
          <div v-else >
           {{row.item.note}}
          </div>
      </template>
       <template #cell(satisfaction)="row">
             <div v-if="!row.item.ajouter || row.item.modifier">
            <b-form-group  v-slot="{ ariaDescribedby }" class="d-flex w-100">
                <b-form-radio-group class="pt-2" id="radio-group-2"  >
                    <b-form-radio v-model="row.item.satisfaction" :aria-describedby="ariaDescribedby"  name="some-radios" value="Oui">Oui</b-form-radio>
                    <b-form-radio v-model="row.item.satisfaction" :aria-describedby="ariaDescribedby"  name="some-radios" value="Non">Non</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </div>
        <div v-else >
           {{row.item.satisfaction}}
        </div>
      </template>
        <template #cell(Action)="row">
          <div v-if="!row.item.ajouter ">
         <b-form  >
      
          <b-button block variant="success"  @click="showMsgBox(row.item)"> <font-awesome-icon :icon="['fas', 'plus-square']" class="icon"/> Ajouter </b-button>
            </b-form>
        </div>
        <div v-else >
          <div v-if="row.item.modifier ">
             <b-button block variant="success" type="submit">  <font-awesome-icon :icon="['fas', 'check-square']" class="icon"/>   Valider</b-button>

            <b-button block variant="warning" @click="AnnulerModif(row.item)">  <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon"/>   Annuler</b-button>
          </div>
          <div v-else>
                <b-button block variant="primary" @click="modifierNotes(row.item)"  >  <font-awesome-icon :icon="['fas', 'edit']" class="icon"/>   Modifier</b-button>
          </div>
        </div>
        </template>
    </b-table>
  </div>
</template>

<script>
  export default {
 
    data() {
      return {
          boxOne: '',
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
          {id:1, nom: 'Dickerson', prenom: 'Macdonald',note :17,satisfaction :'Oui',
           _cellVariants: {  satisfaction: '' },
            modifier :false,
            ajouter :true,},
         
          {
            id:2,
            nom: 'Geneva',
            prenom: 'Wilson',
            note:14,satisfaction:'Oui' ,
             _cellVariants: {  satisfaction: '' },
               modifier :false,
               ajouter :true
    
          },
          {
            id:3,
            nom: 'Thor',
            prenom: 'MacDonald',
            note:9,satisfaction:'Non' ,
            _cellVariants: {  satisfaction: '' },
              modifier :false,
              ajouter :true
           
          },
          {id:4, nom: 'Dick', prenom: 'Dunlap',note:0,satisfaction:'' ,
           _cellVariants: {  satisfaction: '' } ,
            modifier :false,
            ajouter :false
           },
            {id:5,  nom: 'Larsen', prenom: 'Shaw',note:0,satisfaction:'',
           _cellVariants: {  satisfaction: '' },
             modifier :false,
             ajouter :false
            },
              
        ]
      }
    },
     created() {
    this.ajouterSatisfaction();
  },
    methods:{
       showMsgBox(item) {
         let myItem;
       
         for (let i = 0; i < this.items.length; i++) {
          if (item.id == this.items[i].id) {
            myItem = this.items[i];
          }
         }
  console.log(myItem);
        this.boxOne = ''
          const h = this.$createElement
        // Using HTML string
        const titleVNode = h('div', { domProps: { innerHTML: '<h3>Veuillez vérifier les informations saisies:</h3>' } })
        // More complex structure
        const messageVNode = h('div', { class: ['foobar'] }, [
          h('p', { class: [] }, [
            ' Nom : ' + myItem.nom ,
          ]),
            h('p', { class: [] }, [
            ' Prenom : ' + myItem.prenom ,
          ]),
           h('p', { class: [] }, [
            ' Note : ' + myItem.note ,
          ]),
             h('p', { class: [] }, [
            ' Satisfaction : ' + myItem.satisfaction ,
          ]),
          
        ])
        // We must pass the generated VNodes as arrays
        this.$bvModal.msgBoxConfirm([messageVNode], {
          title: [titleVNode],
          centered: true, size: 'lg'
        }).then(value => {
            this.boxOne = value
          })
          .catch(err => {
            // An error occurred
            console.log(err.response.data);
          })
          item.ajouter = true;
          this.$nextTick( ()=>{
           this.ajouterSatisfaction();
           
        });
      },
        ajouterSatisfaction(){
           
          for (let i = 0; i <  this.items.length ; i++) {
          
            if (this.items[i].satisfaction != '' ) {
             
                 if (this.items[i].satisfaction == 'Oui') {
                 this.items[i]._cellVariants.satisfaction = 'success';
                    
                }else{
                  this.items[i]._cellVariants.satisfaction = 'danger';
                }
            }
          }          
        },
        modifierNotes(item){
          item.modifier= true;
          item._cellVariants.satisfaction = '';
        },
        AnnulerModif(item){
        item.modifier= false;
        this.$nextTick( ()=>{
           this.ajouterSatisfaction();
        }
         
        )
        
      },
    }
  }
</script>