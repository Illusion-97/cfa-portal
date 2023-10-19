<template>
    <div id="container-fluid">

        <!-- FORMULAIRE -->
        <b-card-body class="d-flex justify-content-center">
            <v-app class="w-50">
                <form @submit="addTuteur">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="2">
                                <v-select :items="sexe" v-model="formulaireTuteur.civilite" label="Civilité" outlined>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="5">
                                <div class="w-100 d-flex justify-content-center">
                                    <v-text-field v-model="formulaireTuteur.nom" label="Nom*" outlined :rules="required"
                                        clearable required></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" md="5">
                                <div class="w-100 d-flex justify-content-center">
                                    <v-text-field v-model="formulaireTuteur.prenom" label="Prénom*" outlined
                                        :rules="required" clearable required></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <div class="w-100 d-flex justify-content-center">
                                    <v-text-field v-model="formulaireTuteur.login" label="Email*" outlined :rules="required"
                                        clearable required></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <div class="w-100 d-flex justify-content-center">
                                    <v-text-field v-model="formulaireTuteur.password"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1" label="Mot de passe*" outlined :rules="required"
                                        clearable required></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="3">
                                <div class="w-100 d-flex justify-content-center">
                                    <v-text-field v-model="formulaireTuteur.telephone" label="Téléphone" outlined clearable
                                        :rules="[v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) || 'Numéro invalide']"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" md="5">
                                <v-select :items="listAdresse" v-model="adresseId" label="Adresse*" outlined
                                    :rules="required" clearable required>
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
                                    :return-value.sync="formulaireTuteur.dateDeNaissance" transition="scale-transition"
                                    offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="formulaireTuteur.dateDeNaissance" label="Date de naissance"
                                            prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined
                                            clearable></v-text-field>
                                    </template>
                                    <v-date-picker v-model="formulaireTuteur.dateDeNaissance"
                                        :active-picker.sync="activePicker" locale="fr"
                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                        min="1950-01-01" @change="$refs.menu.save(formulaireTuteur.dateDeNaissance)">
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select :items="listCentreFormation" v-model="formulaireTuteur.centreFormationId"
                                    label="Centre de formation*" outlined :rules="required" clearable required></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select :items="listEntreprise" v-model="entrepriseId" label="Entreprise*" outlined
                                    :rules="required" clearable required>
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
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select :items="listEtudiant" v-model="etudiantId"
                                    label="Etudiant*" outlined :rules="required" clearable required></v-select>
                            </v-col>
                        </v-row>
                        <div>
                            <small>*indique les champs requis</small>
                        </div>
                        <v-btn class="mr-4" type="submit" color='success'>
                            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" />
                            Ajouter
                        </v-btn>
                        <v-btn class="mr-4" color="secondary" @click="clear">
                            <font-awesome-icon class="mr-1  mt-1" :icon="['fas', 'broom']" />
                            Vider
                        </v-btn>
                        <v-btn class="mr-4" color="error" @click="hideComponent">
                            <font-awesome-icon class="mr-1  mt-1" :icon="['fas', 'times-circle']" />
                            Annuler
                        </v-btn>
                    </v-container>
                </form>
            </v-app>
        </b-card-body>

        <!-- FORMULAIRE ADRESSE -->
        <b-modal size="lg" hide-footer :ref="'modal-Adresse'">
            <template #modal-title>
                <div class="text-center">Ajout d'une adresse</div>
            </template>
            <addAdresse @adresse="hideModal" />
            <b-button class="mt-3" variant="danger" block @click="hideModal">
                Annuler</b-button>
        </b-modal>

        <!-- FORMULAIRE ENTREPRISE -->
        <b-modal size="lg" hide-footer :ref="'modal-Entreprise'">
            <template #modal-title>
                <div class="text-center">Ajout d'une entreprise</div>
            </template>
            <addEntreprise @entreprise="hideModal" />
            <b-button class="mt-3" variant="danger" block @click="hideModal">
                Annuler</b-button>
        </b-modal>
    </div>
</template>
<script>

import { centreFormationApi } from "@/_api/centreFormation.api.js";
import { etudiantApi } from "@/_api/etudiant.api.js";
import { adresseApi } from "@/_api/adresse.api.js";
import { entrepriseApi } from "@/_api/entreprise.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import addAdresse from "@/components/Modal/AddAdresse.vue";
import addEntreprise from "@/components/Modal/AddEntreprise.vue";
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
                civilite: null,
                dateDeNaissance: null,
                telephone: null,
                adresseDto: {
                    id: null
                },
                entrepriseDto: {
                    id: null
                },
                rolesDto: [
                    {
                        intitule: "TUTEUR"
                    }
                ],
                centreFormationId: null,
                externalAccount: false,
                active: true
            },
            activePicker: null,
            menu: false,
            listCentreFormation: [],
            listEntreprise: [],
            listAdresse: [],
            listEtudiant: [],
            sexe: ['Mr', 'Mme'],
            adresseId: null,
            entrepriseId: null,
            etudiantId: null,
            show1: false,
            required: [v => !!v || 'Le champ est requis'],
        };
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    created() {
        this.clear();
        this.getCentreFormation();
        this.getEntreprise();
        this.getAdresse();
        this.getEtudiant();
    },
    methods: {
        getCentreFormation() {
            centreFormationApi
                .getAllCentreFormations()
                .then((data) => {
                    data.forEach(centreFormation => {
                        let item = { text: centreFormation.nom, value: centreFormation.id };
                        this.listCentreFormation.push(item);
                    })
                });
        },
        getEtudiant() {
            etudiantApi
                .getAllEtudiant()
                .then((data) => {
                    data.forEach(etudiant => {
                        let item = { text: etudiant.utilisateurDto.prenom + " " + etudiant.utilisateurDto.nom, value: etudiant.id }
                        this.listEtudiant.push(item);
                    })
                });
        },
        getEntreprise() {
            entrepriseApi
                .getAllEntreprises()
                .then((data) => {
                    data.forEach(entreprise => {
                        let item = { text: entreprise.raisonSociale, value: entreprise.id }
                        this.listEntreprise.push(item);
                    })
                });
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
            else {
                this.$refs["modal-Adresse"].hide();
                this.$refs["modal-Entreprise"].hide();
                this.getEntreprise();
                this.getAdresse();
            }
        },
        hideModal() {
            this.showModal();
        },
        hideComponent() {
            this.clear();
            this.$emit('cancel');
        },
        clear() {
            this.formulaireTuteur.login = "";
            this.formulaireTuteur.password = "";
            this.formulaireTuteur.prenom = "";
            this.formulaireTuteur.nom = "";
            this.formulaireTuteur.civilite = null;
            this.formulaireTuteur.dateDeNaissance = null;
            this.formulaireTuteur.telephone = null;
            this.formulaireTuteur.centreFormationId = null;
            this.formulaireTuteur.adresseDto.id = null;
            this.formulaireTuteur.entrepriseDto.id = null;
            this.adresseId = null;
            this.entrepriseId = null;
            this.etudiantId = null;
        },
        addTuteur() {
            if (!this.etudiantId) {
                console.error("Veuillez sélectionner un étudiant.");
                return;
            }
            this.formulaireTuteur.etudiantDto = {
                id: this.etudiantId,
            };
            this.formulaireTuteur.adresseDto.id = this.adresseId;
            this.formulaireTuteur.entrepriseDto.id = this.entrepriseId;
            utilisateurApi.addTuteur(this.formulaireTuteur)
                .then(() => (this.clear(), this.$emit('hidden', 'Tuteur ajouter.')))
                .catch((error) => (this.$emit('hidden', error)))
        },
    }
}          
</script>
<style scoped></style>
