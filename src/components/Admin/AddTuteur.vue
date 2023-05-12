<template>
    <div id="container-fluid">
        <!-- BUTTON AJOUTER FERMER -->
        <button @click="openClick()" class="btn btn-outline-info mt-4 mb-4">
            <span v-if="!visible">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter un tuteur
            </span>
            <span v-else>
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>
        </button>
        <!-- FORMULAIRE -->
        <b-collapse id="collapse-1" class="mt-2 mb-4" :visible=visible>
            <b-card>
                <b-card-body class="d-flex justify-content-center">
                    <v-app class="w-50">
                        <form @submit="addTuteur">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="2">
                                        <v-select :items="sexe" v-model="formulaireTuteur.civilite" label="Civilité"
                                            outlined>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" md="5">
                                        <div class="w-100 d-flex justify-content-center">
                                            <v-text-field v-model="formulaireTuteur.nom" label="Nom*" outlined
                                                :rules="required" clearable required></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="5">
                                        <div class="w-100 d-flex justify-content-center">
                                            <v-text-field v-model="formulaireTuteur.prenom" label="Prenom*" outlined
                                                :rules="required" clearable required></v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <div class="w-100 d-flex justify-content-center">
                                            <v-text-field v-model="formulaireTuteur.login" label="Email*" outlined
                                                :rules="required" clearable required></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <div class="w-100 d-flex justify-content-center">
                                            <v-text-field v-model="formulaireTuteur.password" label="Mot de passe*" outlined
                                                type="password" :rules="required" clearable required></v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="3">
                                        <div class="w-100 d-flex justify-content-center">
                                            <v-text-field v-model="formulaireTuteur.telephone" label="Téléphone" outlined
                                                clearable :rules="regex"></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="5">
                                        <v-select :items="listAdresse" v-model="adresseId" label="Adresse" outlined
                                            clearable>
                                            <template v-slot:prepend-item>
                                                <v-list-item @click="showModal('Adresse')">
                                                    <v-list-item-action>
                                                        <v-icon>mdi-plus</v-icon>
                                                    </v-list-item-action>
                                                    <v-list-item-content>Ajouter une Adresse</v-list-item-content>
                                                </v-list-item>
                                            </template>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                            :return-value.sync="date" transition="scale-transition" offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="date" label="Date de naissance"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined
                                                    clearable></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">
                                                    Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select :items="listCentreFormation" v-model="formulaireTuteur.centreFormationId"
                                            label="Centre de formation*" :rules="required" outlined clearable
                                            required></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select :items="listEntreprise" v-model="entrepriseId" label="Entreprise" outlined
                                            clearable>
                                            <template v-slot:prepend-item>
                                                <v-list-item @click="showModal('Entreprise')">
                                                    <v-list-item-action>
                                                        <v-icon>mdi-plus</v-icon>
                                                    </v-list-item-action>
                                                    <v-list-item-content>Ajouter une entreprise</v-list-item-content>
                                                </v-list-item>
                                            </template>
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <div>
                                    <small>*indique les champs requis</small>
                                </div>
                                <v-btn class="mr-4" type="submit" color='success'>
                                    <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" />
                                    Ajouter
                                </v-btn>
                                <v-btn color="error" @click="openClick">
                                    <font-awesome-icon class="mr-1  mt-1" :icon="['fas', 'trash']" />
                                    Annuler
                                </v-btn>
                            </v-container>
                        </form>
                    </v-app>
                </b-card-body>
            </b-card>
        </b-collapse>
        <!-- FORMULAIRE ADRESSE -->
        <b-modal size="lg" hide-footer :ref="'modal-Adresse'">
            <template #modal-title>
                <div class="text-center">Ajout d'une adresse</div>
            </template>
            <addAdresse />
            <b-button class="mt-3" variant="danger" block @click="hideModal">
                Annuler</b-button>
        </b-modal>
        <!-- FORMULAIRE ENTREPRISE -->
        <b-modal size="lg" hide-footer :ref="'modal-Entreprise'">
            <template #modal-title>
                <div class="text-center">Ajout d'une entreprise</div>
            </template>
            <addEntreprise />
            <b-button class="mt-3" variant="danger" block @click="hideModal">
                Annuler</b-button>
        </b-modal>
    </div>
</template>
<script>
import { centreFormationApi } from "@/_api/centreFormation.api.js";
import { adresseApi } from "@/_api/adresse.api.js";
import { entrepriseApi } from "@/_api/entreprise.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import addAdresse from "@/components/Modal/AddAdresse.vue"
import addEntreprise from "@/components/Modal/AddEntreprise.vue"
export default {
    name: "AddTuteur",
    components: {
        addAdresse,
        addEntreprise,
    },
    data() {
        return {
            formulaireTuteur: {
                login: "",
                password: "",
                prenom: "",
                nom: "",
                civilite: "",
                dateDeNaissance: "",
                telephone: "",
                adresseDto: {
                    id: null
                },
                entrepriseDto: {
                    id: null
                },
                rolesDto: {
                    id: 5,
                    version: 0,
                    intitule: "TUTEUR",
                },
                centreFormationId: null,
                externalAccount: true,
                active: true
            },
            listCentreFormation: [],
            listEntreprise: [],
            listAdresse: [],
            sexe: ['Mr', 'Mme'],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            adresseId: 0,
            entrepriseId: 0,
            menu: false,
            modal: "",
            visible: false,
            required: [
                v => !!v || 'Le champ est requis',
            ],
            regex: [
                v => !!v.match("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$") || 'Numéro invalide',
            ],
        };
    },
    methods: {
        getCentreFormation() {
            centreFormationApi
                .getAllCentreFormations()
                .then((data) => {
                    data.forEach(centreFormation => {
                        let item = { text: centreFormation.nom, value: centreFormation.id }
                        this.listCentreFormation.push(item);
                    })
                });
            this.listCentreFormation.sort();
        },
        getEntreprise() {
            entrepriseApi
                .getAllEntreprises()
                .then((data) => {
                    data.forEach(entreprise => {
                        let item = { text: entreprise.raisonSociale }
                        this.listEntreprise.push(item);
                    })
                })
        },
        getAdresse() {
            adresseApi
                .getAllAdresses()
                .then((data) => {
                    data.forEach(adresse => {
                        let item = { text: adresse.ville + " " + adresse.libelle, value: adresse.id }
                        this.listAdresse.push(item);
                    })
                });
        },
        showModal(value) {
            if (value == "Adresse")
                this.$refs["modal-Adresse"].show();
            else if (value == "Entreprise")
                this.$refs["modal-Entreprise"].show();
            else
                this.$refs["modal-Adresse"].hide();
            this.$refs["modal-Entreprise"].hide();
        },
        hideModal() {
            this.$refs["modal-Adresse"].hide();
            this.$refs["modal-Entreprise"].hide();
            this.getEntreprise();
            this.getAdresse();
        },
        openClick() {
            this.visible = !this.visible;
            if (this.visible == false)
                this.clear();
            else {
                this.getCentreFormation();
                this.getEntreprise();
                this.getAdresse();
            }
        },
        clear() {
            this.formulaireTuteur.login = "";
            this.formulaireTuteur.password = "";
            this.formulaireTuteur.prenom = "";
            this.formulaireTuteur.nom = "";
            this.formulaireTuteur.civilite = "";
            this.formulaireTuteur.dateDeNaissance = null;
            this.formulaireTuteur.telephone = null;
            this.formulaireTuteur.telephoneFixe = null;
            this.formulaireTuteur.adresseDto = null;
            this.formulaireTuteur.entrepriseDto = null;
            this.formulaireTuteur.rolesDto = null;
            this.formulaireTuteur.centreFormationId = null;
            this.formulaireTuteur.externalAccount = true;
            this.formulaireTuteur.active = true
        },
        addTuteur() {
            this.formulaireTuteur.dateDeNaissance = this.date;
            this.formulaireTuteur.adresseDto.id = this.adresseId;
            this.formulaireTuteur.entrepriseDto.id = this.entrepriseId;
            console.log(this.formulaireTuteur)
            utilisateurApi/*.addTuteur(this.formulaireTuteur);*/;
            this.visible = !this.visible;

        },
    }
}          
</script>
<style scoped></style>