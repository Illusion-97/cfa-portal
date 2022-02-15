<template>
  <b-container fluid id="fluid-container">
    <b-row id="center" class="my-1" v-for="type in types" :key="type">
      <b-col sm="3" id="sm">
        <label :for="`type-${type}`">{{ type }} :</label>
      </b-col>
      <b-col id="form" sm="9">
        <div v-if="type == 'Descriptif'">
          <b-container>
            <b-row>
              <b-col sm="10" id="sm">
                <b-form-textarea
                  id="textarea-auto-height"
                  rows="2"
                  max-rows="8"
                ></b-form-textarea>
              </b-col>
            </b-row>
            </b-container>
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
              <b-col class="w-25" order="5"><b-form-spinbutton id="sb-wrap"
                  size="sm"
                  wrap min="1"
                  max="10"
                  step="0.5"
                  placeholder="---"></b-form-spinbutton></b-col>
              <b-col order="1"><label class="lbl-duree" for="duree">Durée :</label></b-col>
        </b-row>
        </div>
        <div v-else-if="type == 'Compétences'">
          <!-- <div id="dropdown">
            <b-dropdown text="Outline Danger" variant="outline-primary" class="m-2">
              <b-dropdown-item href="#">1 - Concevoir et développer des composants d'interface <br> utilisateur en intégrant les recommandations de sécurité</b-dropdown-item>
              <b-dropdown-item href="#">2 - Concevoir et développer la persistance des données <br> en intégrant les recommandations de sécurité
                </b-dropdown-item>
              <b-dropdown-item href="#">3 - Concevoir et développer une application multicouche <br> répartie en intégrant les recommandations de sécurité
                </b-dropdown-item>
            </b-dropdown>
          </div> -->

  
 <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-form-select v-model="selected" :options="options" multiple :select-size="3"></b-form-select>

    <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
    <!-- <b-card>
      
      <p class="card-text">Collapse contents Here</p>
    </b-card> -->
  </b-collapse>
      
        </div>
        <div v-else>
          <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
        </div>
      </b-col>
    </b-row>
    <button type="button" class="valider btn btn-success rounded-0">Valider</button>
    <button type="button" class="annuler btn btn-danger rounded-0">Annuler</button>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        selected: [],
        options: [
          { value: '1', text: '1 - Concevoir et développer des composants d\'interface utilisateur en intégrant les recommandations de sécurité' },
          { value: '2', text: '2 - Concevoir et développer la persistance des données <br> en intégrant les recommandations de sécurité' },
          { value: '3', text: '3 - Concevoir et développer une application multicouche <br> répartie en intégrant les recommandations de sécurité' },
        ],
        types: [
          'Titre de l\'examen',
          'Descriptif',
          'Piece jointe',
          'Date',
          'Blocs concernés',
          'Compétences',
        ]
      }
    }
  }
</script>
<style>
#fluid-container{
  padding-right: 15vw;
  padding-left: 6vw;
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

.valider{
  position: relative;
  left: 500px;
  margin-top: 20px;
  margin-bottom: 40px;
}

.annuler{
  position: relative;
  left: 550px;
  margin-top: 20px;
  margin-bottom: 40px;
}

</style>