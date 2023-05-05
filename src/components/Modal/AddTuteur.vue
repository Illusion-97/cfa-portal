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
                    <v-text-field v-model="formulaireTuteur.password" label="Mot de passe*" type="password" required></v-text-field>
                </div>
                <div>Centre de formation*</div>
                <v-select :items="ListcentreFormation" v-model="formulaireTuteur.centreFormationId" required solo></v-select>
                <div class="w-100 d-flex justify-content-center">
                    <v-text-field v-model="formulaireTuteur.centreFormationId" label="Téléphone" type="tel" pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"></v-text-field>
                </div>

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
export default {
    name: "AddTuteur",
    data() {
        return {
            formulaireTuteur: {
                login: "",//
                password: "",//
                prenom: "", //
                nom: "",//
                civilite: "",
                dateDeNaissance: null,
                telephone: null,
                telephoneFixe: null,
                adresseDto: null,
                entrepriseDto: null,
                rolesDto: null,
                etudiantDto: null,
                formateurDto: null,
                tuteurDto: null,
                cefDto: null,
                idDg2: null,
                centreFormationId: 6,
                externalAccount: true,
                active: true
            },
            ListcentreFormation: [],
            sexe:['Mr','Mme'],

        };
    },
    methods: {
        getCentreFormation() {
            centreFormationApi
                .getAllCentreFormations()
                .then((data) => {
                    data.forEach(centreFormation => {
                        let item = { text : centreFormation.nom, value : centreFormation.id}
                        this.ListcentreFormation.push(item);
                    })
                    // , console.log(data.nom)
                })
                , console.log(this.ListcentreFormation)
        },
        showAddTuteur() {
            this.formulaireTuteur.login = "",//
            this.formulaireTuteur.password = "",//
            this.formulaireTuteur.prenom = "",//
            this.formulaireTuteur.nom = "",//
            this.formulaireTuteur.civilite = "",//
            this.formulaireTuteur.dateDeNaissance = null,
            this.formulaireTuteur.telephone = null,
            this.formulaireTuteur.telephoneFixe = null,
            this.formulaireTuteur.adresseDto = null,
            this.formulaireTuteur.entrepriseDto = null,
            this.formulaireTuteur.rolesDto = null,
            this.formulaireTuteur.etudiantDto = null,
            this.formulaireTuteur.formateurDto = null,
            this.formulaireTuteur.tuteurDto = null,
            this.formulaireTuteur.cefDto = null,
            this.formulaireTuteur.idDg2 = null,
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
            //methode
            this.hideModal();
        },
    }
}          
</script>