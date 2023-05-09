<template>
    <div>
        <div class="updateListCursus p-2">
            <button name="button2" outlined @click="showAddTuteur" class="btn btn-outline-info">
                Ajouter un Tuteur
            </button>
        </div>

        <b-modal hide-footer :ref="'modal-'">
            <template #modal-title>
                <div class="text-center">Ajout d'un Tuteur</div>
            </template>
            <v-app>
                <v-form @submit="addTuteur">
                    <div></div>
                    <div>Civilité</div>
                    <v-select :items="sexe" v-model="formulaireTuteur.civilite" required solo></v-select>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.nom" label="Nom*" required></v-text-field>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.prenom" label="Prenom*" required></v-text-field>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.login" label="Email*" required></v-text-field>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.password" label="Mot de passe*" type="password"
                            required></v-text-field>
                    </div>
                    <div>Centre de formation*</div>
                    <v-select :items="ListcentreFormation" v-model="formulaireTuteur.centreFormationId" required
                        solo></v-select>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.telephone" label="Téléphone" type="tel"></v-text-field>
                    </div>
                    <!-- <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.adresseDto.ville" label="Ville" required></v-text-field>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.adresseDto.libelle" label="Adresse" required></v-text-field>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <v-text-field v-model="formulaireTuteur.adresseDto.codePostal" label="Code postal"
                            required></v-text-field>
                    </div> -->
                    <small>*indique les champs requis</small>

                    <b-button type="submit" class="mt-3" variant="success" block>
                        Ajouter</b-button>
                </v-form>
            </v-app>
            <b-button class="mt-3" variant="danger" block @click="hideModal">
                Annuler</b-button>
        </b-modal>
    </div>
</template>
<script>
import { centreFormationApi } from "@/_api/centreFormation.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
    name: "AddTuteur",
    data() {
        return {
            formulaireTuteur: {
                login: "",
                password: "",
                prenom: "", 
                nom: "",
                civilite: "",
                dateDeNaissance: null,
                telephone: null,
                adresseDto: null,
                // adresseDto: {
                //     libelle: "",
                //     ville: "",
                //     codePostal: "",
                //     idDg2: 0,
                //     country: null
                // },//
                entrepriseDto: null,
                // entrepriseDto: {
                //     raisonSociale: "",// nom de l'entreprise
                //     siret: "",//14 chiffre propre a l'établisement
                //     naf: "",//identifier la branche d'activité principale
                //     effectifTotal: null,
                //     employeurType: null,//privé ou public
                //     adresseSiege: {
                //         libelle: "",
                //         ville: "",
                //         codePostal: "",
                //         idDg2: 0,
                //         country: null
                //     }
                // },
                rolesDto: {
                    id: 5,
                    version: 0,
                    intitule: "TUTEUR",
                },//
                centreFormationId: null,
                externalAccount: true,
                active: true
            },
            ListcentreFormation: [],
            sexe: ['Mr', 'Mme'],
            // regex: "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$",

        };
    },
    methods: {
        getCentreFormation() {
            centreFormationApi
                .getAllCentreFormations()
                .then((data) => {
                    data.forEach(centreFormation => {
                        let item = { text: centreFormation.nom, value: centreFormation.id }
                        this.ListcentreFormation.push(item);
                    })
                })
        },
        showAddTuteur() {
            this.formulaireTuteur.login = "",
                this.formulaireTuteur.password = "",
                this.formulaireTuteur.prenom = "",
                this.formulaireTuteur.nom = "",
                this.formulaireTuteur.civilite = "",
                this.formulaireTuteur.dateDeNaissance = null,
                this.formulaireTuteur.telephone = null,
                this.formulaireTuteur.telephoneFixe = null,
                this.formulaireTuteur.adresseDto = null,
                this.formulaireTuteur.entrepriseDto = null,
                this.formulaireTuteur.rolesDto = null,
                this.formulaireTuteur.centreFormationId = null,
                this.formulaireTuteur.externalAccount = true,
                this.formulaireTuteur.active = true
            this.getCentreFormation();
            this.$refs["modal-"].show();
        },
        hideModal() {
            this.$refs["modal-"].hide();
        },
        addTuteur() {
            utilisateurApi.addTuteur(this.formulaireTuteur);
            //methode
            this.hideModal();
        },
    }
}          
</script>