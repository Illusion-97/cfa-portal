<template>
  <div>
    <div class="d-flex justify-content-end">
        <b-button variant="secondary" v-b-toggle.collapseFormulaire v-show="show" @click="show = !show" class="btnAddExamen"><font-awesome-icon :icon="['fas', 'plus-circle']" class="icon"/> Ajouter un examen</b-button>
      </div>
      <b-container>
         <b-alert
      :show="dismissCountDown"
      dismissible
      fade
       variant="success"
       @dismissed="dismissCountDown=0">
                {{message}}
      </b-alert>
        <b-collapse id="collapseFormulaire">
          <section class="section-form d-flex flex-column justify-content-around"> 
            <div class="d-flex flex-row">
              <b-label class="libelle-width">Titre de l'examen :</b-label>
              <b-form-input type:text v-model="examenDto.titre"></b-form-input>
            </div>
            <div class="d-flex flex-row">
              <b-label class="libelle-width">Descriptif :</b-label>
              <b-form-textarea
                    id="textarea-auto-height"
                    rows="2"
                    max-rows="8"
                    v-model="examenDto.descriptif"
                  ></b-form-textarea>
            </div>
            <div class="d-flex flex-row">
              <b-label class="libelle-width">Pièce jointe :</b-label>
              <b-form-file class="mb-2" v-model="file" ref="file-input" placeholder="Sélectionner votre pièce jointe"></b-form-file>
            </div>
            <div class="d-flex flex-row">
              <b-label class="date-width">Date :</b-label>
               <b-form-datepicker v-model="examenDto.dateExamen" placeholder="Sélectionner une date" class="mb-2 datepicker-width"></b-form-datepicker>
            </div>

            <div class="d-flex flex-row">
                <b-form-group label="Sélectionner des activités types :" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox-group
                    @click="showBlocsLinked(option.blocsConcernes)"
                     class="form-select-warp-text"
                    id="checkbox-group-1"
                    v-model="selectedActiviteType"
                    :options="options"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-1"
                  ></b-form-checkbox-group>
                </b-form-group>
             </div>

            <div class="d-flex flex-row">
               <div class="d-flex flex-column w-50">
                 <b-label class="libelle-width d-flex flex-row w-75">Blocs concernés :</b-label>
                 <b-form-checkbox-group
                            size="lg"
                            v-model="selectedBlocsConcernes"
                            :options="optionsCheckbox"
                            name="flavour-1b"
                            class="d-flex flex-wrap d-flex flex-row justify-content-between checkbox-width"
                            switches
                      ></b-form-checkbox-group>
               </div>
               <div class="d-flex flex-row w-50 justify-content-end">
                 <b-label class="libelle-width">Durée :</b-label>
                 <b-form-spinbutton class="w-50"
                    v-model="examenDto.duree"
                    wrap min="1"
                    max="10"
                    step="0.5"
                    placeholder="---"></b-form-spinbutton>
               </div>
            </div>
              <div class="d-flex flex-row justify-content-end">
                <b-form @submit="onSubmit" >
                  <b-button type="submit" class="btnAddExamen btnValiderAnnuler btn-success mr-4"><font-awesome-icon :icon="['fas', 'plus-square']" class="icon"/>   Valider</b-button>
                </b-form>
                <b-button class="btnAddExamen btnValiderAnnuler btn-warning" v-b-toggle.collapseFormulaire v-show="!show" @click="show = !show"><font-awesome-icon :icon="['fas', 'undo-alt']" class="icon"/>   Annuler</b-button>
              </div>
          </section>
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
        selectedActiviteType: [],
        selectedBlocsConcernes: [],
         dismissSecs: 5,
         examenDto:{
          titre: null,
          descriptif:null,
          duree: null,
          dateExamen: null,
          promotionId: null,
          activitesType: [],
          blocsConcernes: [],
        },
        message: "",
        file :null,
        show: true,
        hidden: false,
        options: [
          // { value: '1', text: '1 - Concevoir et développer des composants d\'interface utilisateur en intégrant les recommandations de sécurité' },
        ],
         optionsCheckbox: [
          // { text: '1', value: 1 },
          // { text: '2', value: 2 },
          // { text: '3', value: 3 },
          // { text: '4', value: 4 },
          // { text: '5', value: 5 },
          // { text: '6', value: 6 },
          // { text: '7', value: 7 },
          // { text: '8', value: 8 },
          // { text: '9', value: 9 }

        ],
      }
    },
    methods:{
      onSubmit(event) {
        event.preventDefault()
       var bodyFormData = new FormData();
       this.examenDto.promotionId = this.$route.params.id;
      
       this.examenDto.activitesType = this.selectedActiviteType;
       this.examenDto.blocsConcernes = this.selectedBlocsConcernes;
       console.log(this.examenDto);    
       bodyFormData.append('examen', JSON.stringify(this.examenDto));
       bodyFormData.append('file',this.file);
       console.log(JSON.stringify(this.examenDto));
        examenApi.save(bodyFormData).then((response) =>{
            console.log(response)
              this.showAlert(response.titre , false)
        } ).catch((error) => this.showAlert(response.titre , true));
      },
      showAlert(titre ,isErr) {
        if (isErr) {
        //    this.message = "Erreur d'ajout de 'examen " + titre ;
        // this.dismissCountDownErr = this.dismissSecs
        }
        else{
        this.message = "L'examen " + titre + " a bien été rajouté avec succès"
        this.dismissCountDown = this.dismissSecs
        }
      },
      showBlocsLinked(blocsConcernes) { //value = 1 par exemple
        // let blocsLinkedToActiviteType;
        for (let i = 0; i < this.blocsConcernes.length; i++){
          selectedBlocsConcernes = this.blocsConcernes[i];
          this.optionsCheckbox.push(this.selectedBlocsConcernes)
        }
        

      }
    },
    created(){
      activiteTypeApi.getAllByIdPromotion(this.$route.params.id).then((response) =>{
     console.log(response)
        for (let i = 0; i < response.length; i++) {
          let option = {
          value :response[i].id,
          text : response[i].numeroFiche + " - " + response[i].libelle,
          blocsConcernes : response[i].competenceProfessionnellesDto
        }        
          this.options.push(option);
          
        }
         console.log(this.options) //Observer
      })
    }

  }
</script>
<style scoped>
.libelle-width{
  width: 28%;
}
.date-width{
  width: 22%;
}
.section-form{
  height: 70vh;
  width: 38vw;
  margin: auto;
}
.datepicker-width{
  width: 15vw;
}
.checkbox-width{
  width: 70%;
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

/* .dropdown{
  width: 55%;
} */

.btnExamen{
  Height: 7vh;
  Width: 9vw;
  margin-bottom: 40px;
  position: relative;
}
.btnValiderAnnuler{
  width: 10vw;
}
.form-select-warp-text{
    overflow-wrap: break-word;
}
</style>