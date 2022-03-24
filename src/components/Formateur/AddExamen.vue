<template>
  <div>
    <div class="d-flex justify-content-end">
        <b-button variant="secondary" v-b-toggle.collapseFormulaire v-show="show" @click="show = !show" class="btnAddExamen"><font-awesome-icon :icon="['fas', 'plus-circle']" class="icon"/> Ajouter un examen</b-button>
      </div>
    <b-container fluid id="fluid-container" >
        <b-alert
      :show="dismissCountDown"
      dismissible
      fade
       variant="success"
       @dismissed="dismissCountDown=0"
    >
                {{message}}
    </b-alert>
   <!-- <b-alert
      :show="dismissCountDown"
      dismissible
      fade
       variant="danger"
       @dismissed="dismissCountDownErr=0"
    >
                {{message}}
    </b-alert> -->
      <b-collapse id="collapseFormulaire">
        <b-row id="center" class="my-1" v-for="type in types" :key="type">
        <b-col sm="3" id="sm">
          <label :for="`type-${type}`">{{ type }} :</label>
        </b-col>
        <b-col id="form" sm="9">
          <div v-if="type == 'Titre de l\'examen'">
            <b-form-input :id="`type-${type}`" :type="type"
            v-model="examenDto.titre"
            ></b-form-input>
          </div>
          <div v-if="type == 'Descriptif'">
                  <b-form-textarea
                    id="textarea-auto-height"
                    rows="2"
                    max-rows="8"
                    v-model="examenDto.descriptif"
                  ></b-form-textarea>
          </div>
          <div v-else-if="type == 'Date'">
            <b-form-datepicker id="example-datepicker"   v-model="examenDto.dateExamen" placeholder="Sélectionner une date" class="mb-2"></b-form-datepicker>
          </div>
          <div id="select-file" v-else-if="type == 'Piece jointe'">
            <b-form-file v-model="file" ref="file-input" class="mb-2" placeholder="Sélectionner votre pièce jointe"></b-form-file>
          </div>
          <div v-else-if="type == 'Blocs concernés'">
            <b-row class="mb-3">
                  <b-col>
                      <b-form-checkbox-group
                          size="lg"
                          v-model="selectedChekbox"
                          :options="optionsChebox"
                          :aria-describedby="ariaDescribedby"
                          name="flavour-1b"
                          class="d-flex flex-wrap justify-content-center"
                          switches
                    ></b-form-checkbox-group>
                  </b-col>
                <b-col class="w-Spin" order="5"><b-form-spinbutton
                    v-model="examenDto.duree"
                    wrap min="1"
                    max="10"
                    step="0.5"
                    placeholder="---"></b-form-spinbutton></b-col>
                <b-col order="1"><label class="lbl-duree" for="duree">Durée :</label></b-col>
            </b-row>
          </div>
          
        </b-col>
        </b-row>
      
          <div>
            <b-button v-b-toggle.collapse-1 variant="primary">Sélectionner une compétence</b-button>
              <b-collapse id="collapse-1" class="mt-2">
              <select  v-model="selected" class="form-selec-competences border-0" multiple aria-label="multiple select example" >
                <option  class="card cardCompetences"  v-for="item in options" :key="item.text" :value=item.value> {{item.text}} </option>
              </select>
            </b-collapse> 
          </div>

          <div class="d-flex justify-content-end">
             <b-form @submit="onSubmit" >
            <b-button  type="submit" class="btnAddExamen btnValiderAnnuler btn-success mr-4">Valider</b-button>
            </b-form>
            <b-button  class="btnAddExamen btnValiderAnnuler btn-warning " v-b-toggle.collapseFormulaire v-show="!show" @click="show = !show">Annuler</b-button>
          </div>
      </b-collapse> 
    </b-container>
  </div>
</template>

<script>
import { examenApi } from "@/_api/examen.api.js";
import { activiteTypeApi } from "@/_api/activiteType.api.js";

  export default {
    data() {
      return {
         dismissSecs: 5,
        examenDto:{
          titre: null,
          descriptif:null,
          duree:null,
          dateExamen: null,
          promotionId: null,
          activiteTypeId: null
        },
        message: "",
        file :null,
        show: true,
        hidden: false,
        selected: null,
        options: [
          // { value: '1', text: '1 - Concevoir et développer des composants d\'interface utilisateur en intégrant les recommandations de sécurité' },
        ],
        types: [
          'Titre de l\'examen',
          'Descriptif',
          'Piece jointe',
          'Date',
          'Blocs concernés',
        ],
         optionsChebox: [
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 },
          { text: '5', value: 5 },
          { text: '6', value: 6 },
          { text: '7', value: 7 },
          { text: '8', value: 8 },
          { text: '9', value: 9 }
        ],
        selectedChekbox :[]
      }
    },
    methods:{
      onSubmit(event) {
        event.preventDefault()
       var bodyFormData = new FormData();
       this.examenDto.promotionId = this.$route.params.id;
       this.examenDto.activiteTypeId = this.selected[0];
       console.log(this.examenDto);    
       bodyFormData.append('examen', JSON.stringify(this.examenDto));
       bodyFormData.append('file',this.file);
       console.log(JSON.stringify(this.examenDto));
        examenApi.save(bodyFormData).then((response) =>{
              this.showAlert(response.titre , false)
        } ).catch((error) => this.showAlert(response.titre , true));
      },
      showAlert(titre ,isErr) {
        if (isErr) {
        //    this.message = "Erreur d'ajout de 'examen " + titre ;
        // this.dismissCountDownErr = this.dismissSecs
        }
        else{
        this.message = "L'examen " + titre + " à bien étè rajoué avec succes"
        this.dismissCountDown = this.dismissSecs
        }
      }
    },
    created(){
      activiteTypeApi.getAllByIdPromotion(this.$route.params.id).then((response) =>{
     console.log(response)
        for (let i = 0; i < response.length; i++) {
             let option = {
          value :response[i].id,
          text : response[i].numeroFiche + " - " + response[i].libelle
        }
          this.options.push(option);
        }
      })
    }

  }
</script>
<style >
.w-Spin{
  width: 100px;
}
.btnAddExamen{
  position: relative;
  right: 10px;
  width: 12vw;
  height: 4vh;
  margin-bottom: 20px;
}
.form-selec-competences{
  margin-top: 2vh;
  margin-bottom: 5vh !important;
  height: 12vh !important;
  width: 100%;
}

.cardCompetences{
  max-width: 100%;
  overflow: hidden;
  white-space: normal;
  height: auto;
}

#fluid-container{
  padding-right: 14vw;
  padding-left: 8vw;
  
}

#sm{
  padding-left: 0px;
}

#center{
  text-align: left;
  padding: 17px;
}

#form{
  padding: 0px;
}

#select-file{
  text-align: left;
}

.row-width{
  width: 200px;
  margin-bottom: 15px;
  font-size: large;
}

.lbl-duree{
  width : 100%;
  text-align: end;
}

.dropdown{
  width: 55%;
}

.btnExamen{
  Height: 7vh;
  Width: 9vw;
  margin-bottom: 40px;
  position: relative;
}
.btnValiderAnnuler{
  width: 10vw;
}
</style>