<style>
#main-cr-prj {
    background-color: none;
    margin: 0% 10% 0% 10%;
    min-width: 1170px;
    min-height: 100%;
}

.v-btn-toggle {
    width: 16%;
}

</style>

<template>
    <div id="main-cr-prj"> 
                    <div >
                       
                            <v-nav id="navbar-btn">
                              
                                    <v-btn-toggle w-100 role="group">
                                        <v-btn w-100  id="bt1"  block v-b-toggle="'bt1'" @click="active = 1"
                                            variant="plain" style="color: white; background-color: #08092D;">Infos etudiant</v-btn>
                                        <v-btn w-100 id="bt2" class="" block v-b-toggle="'bt2'" @click="active = 2"
                                            variant="plain" style="color: white; background-color: #08092D;">Contrôle continue</v-btn>
                                        <v-btn w-100 id="bt3" class="" block v-b-toggle="'bt3'" @click="active = 3"
                                            variant="plain" style="color: white; background-color: #08092D;">Planning</v-btn>
                                        <v-btn w-100 id="bt4" class="" block v-b-toggle="'bt4'" @click="active = 4"
                                            variant="plain" style="color: white; background-color: #08092D;">Dossiers projets</v-btn>
                                        <v-btn w-100 id="bt5" class="" block v-b-toggle="'bt5'" @click="active = 5"
                                            variant="plain" style="color: white; background-color: #08092D;">Dossiers professionnels</v-btn>
                                        <v-btn w-100 id="bt6" class="" block v-b-toggle="'bt6'" @click="active = 6"
                                            variant="plain" style="color: white; background-color: #08092D;">Congé / Absences</v-btn>
                                    </v-btn-toggle>
                            


                            </v-nav>

                            
                                <v-card w-100>
                                    <!--Tableau Infos Etudiant-->
                                    <v-card-body v-show="active === 1" name="page Info">
                                        <v-card-text >
                                            <v-card-title disabled>Nom : {{ student.nom }}</v-card-title>
                                            <v-card-title disabled>Prenom : {{ student.prenom }}</v-card-title>
                                            <v-card-title disabled>Date de naissance : {{ student.dob }}</v-card-title>
                                            <v-card-title disabled>Adresse : {{ student.adresse }}</v-card-title>
                                            <v-card-title disabled>Télephone : {{ student.tel }}</v-card-title>
                                            <v-card-title disabled>Télephone fixe : {{ student.tel_fix }}</v-card-title>
                                        </v-card-text>
                                    </v-card-body>
                                    <!-- Tableau Controle Continu -->
                                    <v-card-body v-show="active === 2" >
                                        <v-simple-table background-color="#00072d" :items="paginatedData" :page.sync="page" :items-per-page="itemsPerPage">
                                            <thead>
                                                <tr class="abv">
                                                    <th class="text-left"><v-card-subtitle><strong>Examen</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Date</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Note</strong></v-card-subtitle></th>
                                                </tr>
                                            </thead>
                                                <tbody>
                                                    <tr v-for="item in controlC" :key="item.id">
                                                        <td>{{ item.examen }}</td>
                                                        <td>{{ item.date }}</td>
                                                        <td>{{ item.score }} / 20</td>
                                                    </tr>
                                                </tbody>
                                            
                                        </v-simple-table>
                                        <v-pagination v-model="page" :length="2"></v-pagination>
                                    </v-card-body>
                                    <!-- Tableau Planning -->
                                    <v-card-body v-show="active === 3" name="formulaire resume">
                                        <v-simple-table :items="paginatedData" :page.sync="page" :items-per-page="itemsPerPage">
                                            <thead>
                                                <tr>
                                                    <th class="text-left"><v-card-subtitle><strong>Formation</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Date</strong></v-card-subtitle></th>
                                                </tr>
                                            </thead>
                                                <tbody>
                                                    <tr v-for="item in planning" :key="item.id">
                                                        <td>{{ item.name }}</td>
                                                        <td>{{ item.date }}</td>
                                                    </tr>
                                                </tbody>
                                            
                                        </v-simple-table>
                                        <v-pagination v-model="page" :length="1"></v-pagination>
                                    </v-card-body>
                                    <!-- Tableau Dossier Projet -->
                                    <v-card-body v-show="active === 4" name="formulaire contenu">
                                        <v-simple-table :items="paginatedData" :page.sync="page" :items-per-page="itemsPerPage">
                                            <thead>
                                                <tr>
                                                    <th class="text-left"><v-card-subtitle><strong><a>Informations</a></strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Annexes</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Contenue</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Résumé</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Tableau de Compétences</strong></v-card-subtitle></th>
                                                </tr>
                                            </thead>
                                                <tbody>
                                                    <tr v-for="item in dossProj" :key="item.id">
                                                        <td>{{ item.info }}</td>
                                                        <td>{{ item.annexe }}</td>
                                                        <td>{{ item.content }}</td>
                                                        <td>{{ item.resume }}</td>
                                                        <td><v-card-actions><v-btn v-model="item.comp_c">Voir</v-btn></v-card-actions></td>
                                                    </tr>
                                                </tbody>
                                            
                                        </v-simple-table>
                                        <v-pagination v-model="page" :length="2"></v-pagination>
                                    </v-card-body>
                                    <!-- Tableau Dossier Professionnel -->
                                    <v-card-body v-show="active === 5" name="page Annexe">
                                        <v-simple-table :items="paginatedData" :page.sync="page" :items-per-page="itemsPerPage">
                                            <thead>
                                                <tr>
                                                    <th class="text-left"><v-card-subtitle><strong>Dossiers</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Actions</strong></v-card-subtitle></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in dossProf" :key="item.id">
                                                    <td>{{ item.name }}</td>
                                                    <td>
                                                        <v-card-actions>
                                                            <v-btn v-model="item.upl">Télecharger</v-btn>
                                                            <v-btn v-model="item.voir">Voir</v-btn>
                                                        </v-card-actions>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-simple-table>
                                        <v-pagination v-model="page" :length="2"></v-pagination>
                                    </v-card-body>
                                    <!-- Tableau Congé / Absences -->
                                    <v-card-body v-show="active === 6" name="page Annexe">
                                        <v-simple-table :items="paginatedData" :page.sync="page" :items-per-page="itemsPerPage">
                                            <thead>
                                                <tr>
                                                    <th class="text-left"><v-card-subtitle><strong>Congé</strong></v-card-subtitle></th>
                                                    <th class="text-left"><v-card-subtitle><strong>Absences</strong></v-card-subtitle></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in conge_abs" :key="item.id">
                                                    <td>Congé {{ item.id }} : {{ item.dateConge }}</td>
                                                    <td>Absence {{ item.id }} : {{ item.dateAbs }}</td>
                                                </tr>
                                            </tbody>
                                        </v-simple-table>
                                        <v-pagination v-model="page" :length="2"></v-pagination>
                                    </v-card-body>
                                    

                                </v-card>
                        
                    </div>
                </div>
</template>

<script>
import {dossierProjetApi} from "@/_api/dossierProjet.api.js"

export default {
    data: () => {
        return {

        name: "DetailEtudiant",
        active: undefined,
        page: 1,
        pageCount: 0,
        itemsPerPage: 4,
        student:{
            id:1,nom:"Anas",prenom:"JIYAR",dob:"13/02/2002",adresse:"dehors",tel:"666666666",tel_fix:"666666666" 
        },
        dossProjets: [
            {id:1,info:"",annexe:"",content:"",resume:"",tab_comp:0},
            {id:2,info:"",annexe:"",content:"",resume:"",tab_comp:0},
        ],
        dossProf: [
            {id:1,nom:"dossierpro_cda",upl:0,voir:0},
            {id:2,nom:"dossierpro_jsp",upl:0,voir:0}
        ],     
        controlC: [
            {id:1,examen:"Php",date:"13/02/2002",score:18},
            {id:2,examen:"SQL",date:"13/02/2002",score:18},
            {id:3,examen:"C++",date:"13/02/2002",score:18},
            {id:4,examen:"PlusD'inspiration",date:"13/02/2002",score:18},
        ],
        planning:[
            {id:1,name:'dossProf[0].nom',date:"13/02/2002"},
            {id:2,name:'dossProf[1].nom',date:"13/02/2002"},
        ],
        conge_abs:[
            {id:1,dateConge:"13/02/2002",dateAbs:"13/02/2002"},
            {id:2,dateConge:"13/02/2002",dateAbs:"13/02/2002"},
            {id:3,dateConge:"13/02/2002",dateAbs:"13/02/2002"},
            {id:4,dateConge:"13/02/2002",dateAbs:"13/02/2002"},
        ],
        }
    },
    methods:{
        dossProj(){
            dossierProjetApi
            .getByIdEtudiant();
        }
    }

    
}
</script>