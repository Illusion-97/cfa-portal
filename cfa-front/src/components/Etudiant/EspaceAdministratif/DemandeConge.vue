<template>
  <div>

    <BodyTitle title="Demande de congé"/>

    <b-form class="form" :submit="submit()">
        <b-form-group>
          <b-form-row class="text-align-left">
            <b-col>
              date de début :
            </b-col> 

            <b-col>
              <b-form-datepicker> </b-form-datepicker>
            </b-col> 

            <b-col>
            </b-col>  

            <b-col>
              date de fin :
            </b-col> 

            <b-col>
              <b-form-datepicker> </b-form-datepicker>
            </b-col> 
            

            
          </b-form-row>
        </b-form-group>

      <b-form-group>
        <b-form-row>
          <b-col>
            <label>Type de congé :</label> 
          </b-col> 
          <b-col cols="10">
            <b-form-select :options="types"></b-form-select>
          </b-col> 
        </b-form-row>
      </b-form-group>

      <b-form-group>
        Entrez votre message :
        <b-form-textarea class="b-form-textarea"> </b-form-textarea> 
      </b-form-group>

      <b-form-group>
        <b-button type="submit">Send</b-button>
      </b-form-group>

    </b-form>

  </div>  
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "DemandeConge",
  components: {
    BodyTitle,
  },
  data(){
    return {
      types: [{text: 'maladie', value: null},
              {text: 'payé', value: null},
              {text: 'sans solde', value: null},],
    }
  },
  methods:{
    submit(){

    }
  },
};

</script>

<style scoped>
  .form{
    border: 1px solid #6c757d;
    margin-top: 5em;
    padding-top: 2em;
    padding-left: 5em;
    padding-right: 5em;
  }

  .b-form-textarea{
    height: 200px;
  }


</style>