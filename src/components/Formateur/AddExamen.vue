<template>
  <div>
    <b-container fluid id="fluid-container">
      <div class="d-flex justify-content-end pr-5">
    <b-button variant="secondary" v-b-toggle.collapseFormulaire v-show="show" @click="show = !show" class="m-1"><font-awesome-icon :icon="['fas', 'plus-circle']" class="icon"/> Ajouter un examen</b-button>
  </div>
      <b-collapse id="collapseFormulaire">
        <b-row id="center" class="my-1" v-for="type in types" :key="type">
        <b-col sm="3" id="sm">
          <label :for="`type-${type}`">{{ type }} :</label>
        </b-col>
        <b-col id="form" sm="9">
          <div v-if="type == 'Titre de l\'examen'">
            <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
          </div>
          <div v-if="type == 'Descriptif'">
                  <b-form-textarea
                    id="textarea-auto-height"
                    rows="2"
                    max-rows="8"
                  ></b-form-textarea>
          </div>
          <!-- <div id="duree" class="w-25" v-else-if="type == 'Durée'">
            <b-form-spinbutton id="sb-wrap"
            wrap min="1"
            max="10"
            step="0.5"
            placeholder="---"></b-form-spinbutton>
          </div> -->
          <div v-else-if="type == 'Date'">
            <b-form-datepicker id="example-datepicker" v-model="dateValue" placeholder="Sélectionner une date" class="mb-2"></b-form-datepicker>
          </div>
          <div id="select-file" v-else-if="type == 'Piece jointe'">
            <b-form-file v-model="file" ref="file-input" class="mb-2" placeholder="Sélectionner votre pièce jointe"></b-form-file>
          </div>
          <div v-else-if="type == 'Blocs concernés'">
            <b-row class="mb-3">
                  <b-col>
                    <div>
                      <div class="row row-width align-items-start" >
                        <div class="col">
                          <b-form-checkbox value=1>1</b-form-checkbox>
                        </div>
                        <div class="col">
                          <b-form-checkbox value=2>2</b-form-checkbox>
                        </div>
                        <div class="col">
                          <b-form-checkbox value=3>3</b-form-checkbox>
                        </div>
                      </div>
                      <div class="row row-width align-items-center">
                        <div class="col">
                          <b-form-checkbox value=4>4</b-form-checkbox>
                        </div>
                        <div class="col">
                          <b-form-checkbox value=5>5</b-form-checkbox>
                        </div>
                        <div class="col">
                          <b-form-checkbox value=6>6</b-form-checkbox>
                        </div>
                      </div>
                      <div class="row row-width align-items-end">
                        <div class="col">
                          <b-form-checkbox value=7>7</b-form-checkbox>
                        </div>
                        <div class="col">
                          <b-form-checkbox value=8>8</b-form-checkbox>
                        </div>
                        <div class="col">
                          <b-form-checkbox value=9>9</b-form-checkbox>
                        </div>
                      </div>
                    </div>
                  </b-col>
                <b-col class="w-25" order="5"><b-form-spinbutton
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


                <!-- <b-form-select class="card cardCompetences" v-model="selected" :options="options" multiple :select-size="3"></b-form-select> -->
                
                <!-- <div class="list-group" v-for="item in options" :key="item.text">
                  <b-button class="list-group-item list-group-item-action" v-onClick="choixCompetence"> {{ item.text }} </b-button>
                </div> -->
  <!-- 
  AVEC DES BOUTONS
                <div>
                  <b-button
                    v-for="(item, idx) in options"
                    :key="idx"
                    :pressed.sync="item.state"
                    variant="primary"
                  >
                    {{ item.text }}
                  </b-button>
                </div>
  AVEC DES BOUTONS -->

                
                  <!-- <div class="row">
                    <div class="col">Column</div> 
                    <div class="w-100"></div>
                  </div>
                -->

                  <!-- <b-form-select class="cardCompetences">
                    <option class="card" v-for="item in options" :key="item.text" value=item.value > {{item.text}}</option>
                  </b-form-select> -->


              <select class="form-selec-competences border-0" multiple aria-label="multiple select example" >
                <option class="card cardCompetences" v-for="item in options" :key="item.text" :value=item.value> {{item.text}} </option>
              </select>
            </b-collapse> 
          </div>

          <div class="d-flex justify-content-end">
            <b-button class="btnValider btnExamen btn-success">Valider</b-button>
            <b-button class="btnAnnuler btnExamen btn-warning" v-b-toggle.collapseFormulaire>Annuler</b-button>
          </div>
      </b-collapse> 
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
        selected: [],
        options: [
          { value: '1', text: '1 - Concevoir et développer des composants d\'interface utilisateur en intégrant les recommandations de sécurité' },
          { value: '2', text: '2 - Concevoir et développer la persistance des données en intégrant les recommandations de sécurité' },
          { value: '3', text: '3 - Concevoir et développer une application multicouche répartie en intégrant les recommandations de sécurité' },
        ],
        types: [
          'Titre de l\'examen',
          'Descriptif',
          'Piece jointe',
          'Date',
          'Blocs concernés',
        ]
      }
    },
    methods:{
      // hideAddExamenBtn: function (event) {
      //   this.isVisible = isNotVisible
      // },

      // annulerAjoutExamen : function() {
      //   item.ajouter = false;
      //   item._showDetails = false;
      // },
    }
  }
</script>
<style>
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
  padding-right: 10vw;
  padding-left: 5vw;
  
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

.btnValider{
  margin-right: 3vw; 
 }
</style>