<template>
    <div>

      <BodyTitle title="Déposez vos documents administratif"/>
      
      <b-form class="form" :submit="submit()">       
        <b-form-group>
          <b-form-row>
            <b-col>
              <label>To :</label> 
            </b-col> 
            <b-col cols="10">
              <b-form-select :options="services"></b-form-select>
            </b-col> 
          </b-form-row>
        </b-form-group>

        <b-form-group>
          <b-form-row>
            <b-col>
              <label>Subject :</label>
            </b-col> 
            <b-col cols="10">
              <b-form-input></b-form-input>
            </b-col> 
          </b-form-row>
        </b-form-group>

        <b-form-group>
          Choisissez les documents à joindres :
        </b-form-group>

        <b-form-group>
          <b-form-row>
            <b-col>
              <b-form-file></b-form-file>
            </b-col> 
            <b-col>
              <b-form-file></b-form-file>
            </b-col> 
            <b-col>
              <b-form-file></b-form-file>
            </b-col> 
          </b-form-row>
        </b-form-group>

        <b-form-group>
          <b-form-row>
            <b-col>
              <b-form-file></b-form-file>
            </b-col> 
            <b-col>
              <b-form-file></b-form-file>
            </b-col> 
            <b-col>
              <b-form-file></b-form-file>
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
  name: "DepotFichier",
  components: {
    BodyTitle,
  },
  data(){
    return {
      services: [{text: 'Ressources Humaine', value: null},
                {text: 'Service Compta', value: null},
                {text: 'Mon CEF', value: null},
                {text: 'Mon Référent', value: null},
                {text: 'Mon Formateur', value: null},],
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