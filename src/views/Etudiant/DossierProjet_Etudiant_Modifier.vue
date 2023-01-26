 <!-- <option disabled="disabled" value>+Ajouter une composante du projet </option>
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
                                </b-card> -->

                                <!-- <div>
                        <b-card  no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-form-select block v-b-toggle.accordion-1 variant="primary" v-model="selectedOption" :options="options" @change="handleSelectionChange"/>
                                    <b-collapse hidden V-for="item in options" :key="options.index" visible accordion="my-accordion" role="tabpanel"> -->
                                        <!-- v-for="item in options" :key="item.index" -->
                                        <!-- <b-card-body>
                                            <vue-editor v-model="options.content" id="exp1" name="tacheRealisee" placeholder="Tâches réalisées" />
                                        </b-card-body>
                                </b-collapse>
                            </b-card-header>
                        </b-card>
            </div> -->
<template>

    <div>
        <div>
            <p>Nouveau dossier projet</p>
            <p>Nom : {{ nom_projet }}</p>
        </div>
            <div id="main-cr-prj">
        <section id="main-cr-blc_nav">

            <div class="container">

                <nav id="main-grp-btn_frm">
                    <a>{{titre_projet}}</a>
                    <section>
                        <router-link :to="{ name: 'etudiant_dossierprojet' }">
                        <button @click="alerta()">Annuler</button></router-link>
                        <button>Enregistrer</button>
                    
                    </section>
                </nav>
                <div id="main-cr-frm">
                    <nav id="main-cr-frm_modif">
                        <ul>
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
                            <li>D</li>
                            <li>E</li>
                            <li>F</li>
                            <li>G</li>
                            <li>H</li>
                            <li>I</li>
                            <li>J</li>
                            <li>K</li>
                        </ul>
                    </nav>
                    <textarea name="" class="resp-textarea" cols="30" rows="10"></textarea>

                </div>
            </div>
        </section>
    </div> 

    </div>

</template>

<script>
// import DossierProjetCreer from ''

// import { METHODS } from 'http';
//import DossierProjet_Etudiant_Creer from 'DossierProjet_Etudiant_Creer.vue';

export default {
    name:"DossierProjetModifier",
    components: {
    },
    data() {
        return{
        titre_projet:"Anas",
        }
    },
    methods:{
        alerta() {
            alert(this.titre_projet);
        }
    }
}

</script>

<style lang="scss"  >
#main-cr-prj {
    background-color: #f2f2f2;
    padding: 20px;
    margin: 0% 18% 0% 18%;
}

#main-cr-blc_nav {
    border: 1px solid #ccc;
    padding: 10px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

#main-grp-btn_frm {
    display: flex;
    justify-content: space-between;
}

#main-grp-btn_frm a {
    text-decoration: none;
    background-color: #F54D4D;
    color: white;

}

#main-grp-btn_frm button, a {
    background-color: #F54D4D;
    color: white;
    padding: 12px 20px;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 200px;
}
#main-grp-btn_frm button:hover{
    background-color:#FC8C8C ;
    box-shadow: 10px;
}

#main-cr-frm {
    margin-top: 20px;
}



#main-cr-frm_modif ul {
    list-style-type: none;
    display: flex;
}

#main-cr-frm_modif ul li {
    padding: 5px 10px;
    margin-right: 10px;
    
}

#main-cr-frm textarea {
    padding: 12px 20px;
    margin-top: 10px;
    border: 1px solid #ccc;
    width: 100%;
    white-space:pre-line;
    overflow: auto;
}

.resp-textarea{
    min-height: 100px;
    width: 100%; 
    resize: none;
    overflow: hidden;
}


</style>