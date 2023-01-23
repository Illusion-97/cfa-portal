<template>
    <!-- tr : tableau
        tbody : rgrp tr en tb
         -->
    <div id="main-cr-prj">
        <div>
            <p>Nouveau dossier projet</p>
            <p>Nom : {{ nom_projet }}</p>
        </div>
        <div>
            <section  id="comp-doss-prjt" v-show="showSec1">
                <div class="comp-doss">
                    <p>Importer un dossier :</p>
                    <b-button id="btn1" @click="showSection2" :style="sectionStyle">{{ button }}</b-button>
                </div>
                <!-- Composants Importer Un Dossier -->
                <div v-show="showSec2 === false" id="test">
                    <section class="comp-imp">
                        <div id="container2">
                            <p>pdf,png ... taille max : 500 mo</p>
                            <input type="file" id="imp-file">
                        </div>
                        <div class="imp-doss-btn">
                            <button id="btn-annuler">Annuler</button>
                            <button id="btn-save">Sauvegarder</button>
                        </div>
                    </section>
                </div>
            </section>
            
            <p v-show="showSec1 == showSec2">Ou</p>

            <section  v-show="showSec2">
                <div class="comp-doss">
                    <p>Créer un dossier :</p>
                    <b-button id="btn2" @click="showSection1" :style="sectionStyle2">{{ button }}</b-button>
                </div>
                <!-- Composants Créer Un Dossier Projet -->
                <b-div v-show="showSec1 === false"> <!-- > -->
                    <div>
                        <div id="container">
                            <nav  class="comp-nav-bar">
                                <option disabled="disabled" value>+Ajouter une composante du projet </option>
                                <b-form-select v-model="start" :options="options" @change="getValue"/>
                                    <b-collapse v-model="start" :options="options" accordion="my-accordion">
                                        <b-card-body>
                                            <vue-editor v-model="options.content"/>
                                        </b-card-body>
                                    </b-collapse>
                              
                                <b-card>
                                    <b-form-select v-model="selectedOption" :options="options"  />
                                    <b-card no-body class="card-body" v-if="selectedOption">
                                        <b-card-header header-tag="header" role="tab">
                                        </b-card-header>
                                    </b-card>
                                </b-card>
                            </nav>
                        </div>
                    </div>
                </b-div>   

                <div>
                    <b-modal id="exp-pro-modal" size="xl" centere scrollable no-close-on-esc @hidden="resetModal" hide-footer>
                        <b-card  no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-form-select block v-b-toggle.accordion-1 variant="primary" v-model="selectedOption" :options="options" @change="handleSelectionChange"/>
                            
                        </b-card-header>
                        <b-collapse v-if="selectedOption" id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                            <vue-editor v-model="options.content" id="exp1" name="tacheRealisee"
                                placeholder="Tâches réalisées" />
                            </b-card-body>
                        </b-collapse>
                        </b-card>
                </b-modal>
            </div>

            <div>
                <b-form-select v-model="selectedOption" :options="options" @change="handleSelectionChange" class="mb-3" />
                <b-card v-if="selectedOption" no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block variant="primary" class="titre-details-modal volets">{{ selectedOption.text }}
                    </b-button>
                </b-card-header>
                <b-card-body v-if="selectedOption.value === 1">
                    <vue-editor v-model="expPro.tacheRealisee" id="exp1" name="tacheRealisee"
                    placeholder="Tâches réalisées" />
                </b-card-body>
                <b-card-body v-if="selectedOption.index === 2">
                    <vue-editor v-model="expPro.moyenUtilise" id="exp2" name="moyenUtilise" placeholder="Moyens utilisés" />
                </b-card-body>
                </b-card>
            </div>
            </section>
        </div>
    </div>
</template>

<script>

//import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { VueEditor} from "vue2-editor";

    export default {
        name: "DossierProjetCreer",
        components: { VueEditor },
        data() {
            return {
                options: [
                { text: 'Infos', index: 1, content: "" },
                { text: 'Compétences Couvertes', index: 2, content: "" },
                { text: 'Résumé',index: 3, content: "" },
                { text: 'Contenu', index: 4, content: ""  },
                { text: 'Annexe', index: 5, content: ""  }
                ],
                selectedOption: null,
                nom_projet: "projet_cfa",
                showSec1: true,
                showSec2: true,
                marginSpaceImp: true,
                marginSpaceCre: true,
                button: 'Ouvrir',
                expPro: {
                    tacheRealisee: "",
                    moyenUtilise: ""
                    }
            }
        },  
        methods: {
            showSection1() {
                this.showSec1 = !this.showSec1;
                
            },
            showSection2() {
                this.showSec2 = !this.showSec2;
            },
            submitData(){},
            getById(){},
            save(){},
            handleSelectionChange(selectedOption){
                this.selectedOption = selectedOption;
            }
            // created() {
            //     dossierProjetlApi
            //     .getAllDossierProfessionnelByEtudiantAndByCursus(this.$store.getters.getUtilisateur.etudiantDto.id)
            //     .then((data) => (this.dp = data));
            // }
        },
        computed: {
            //  Boutons au meme axe Y
            sectionStyle() {
                return {
                    'margin-left': this.marginSpaceImp ? '77%' : '78%'
                }
            },
            sectionStyle2() {
                return {
                    'margin-left': this.marginSpaceImp ? '79%' : '80%',
                }
            },
            flechBtn(){
                return{
                    
                }
            }
        }    
    }
</script>

<style scoped>
    /* margin : haut droit bas gauche */
    #main-cr-prj {
        background-color: none;
        padding: 20px;
        margin: 0% 20% 0% 22%;
        min-width: 1170px;
        min-height: 80%;
    }

    .comp-doss {
        background-color: #F55050;
        display: flex;
        align-items: center;
        position: relative;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border-color: black;
    }

    #comp-doss-prjt {
        margin-bottom: 10px;
    }

    .comp-doss p {
        color: white;
        padding: 15px 0px 0px 15px;
    }

    .comp-doss button {
        background-color: white;
        
    }

    button {
        border-radius: 15px;
        padding: 5px 5px 5px 5px;
    }

    #container{
        background-color: none;
        height: 500px;
        display: flex;
    }

    #container2{
        display: flex;
        min-width: 500px;
        padding-top: 10px;
    }

    #container2 p{
        padding-left: 10px;
    }

    .comp-nav-bar nav{
        width: 100%;
    }
    .nav-bar-list{
        list-style-type: none;
        text-align: left;
 
    }
    .nav-bar-list li{
        display: inline-block;
        margin-left: 100px;
        min-width: 5em;
    }   

    .comp-imp{
        display: inline-block;
        margin: 10px 10px 20px 50px;
        background-color: none  ;
        width: 90%;
    }

    #imp-file{
        margin-left: 20%;
    }
    
    input[type="file"]::-webkit-file-upload-button {
        background-color: #F55050;
        border-radius: 10px;
        border:none;
        color: #fffcfc;
    }
    
    .imp-doss-btn {
        padding: 15px 0px 0px 15px;
        background-color: none  ;

        display: inline-block;
    }
    #btn-save{
        background-color:#F55050;
        right: 34%;
        position: absolute;
        color: #fffcfc;
    }
    #btn-annuler{
        background-color:#F55050;
        text-align: left;
        color: #fffcfc;
        left: 34%;
        position: absolute;
    }
    .card-body{
        min-width:550px;
        min-height: 100px;
        
    }
</style>