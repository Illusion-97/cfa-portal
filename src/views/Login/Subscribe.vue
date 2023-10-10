<template>
    <v-app>
        <div class="my-content">
            <div class="" style="width: 80%; height: 90%;">
                <v-row text-align="center" justify="center">
                    <v-col cols="12" md="8">
                        <v-form ref="myForm" @submit="addTuteur">
                            <v-card>
                                <v-card-title class="text-h4 text-center" style="text-align: center;">
                                    Page d'inscription
                                </v-card-title>

                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="formTuteur.prenom" :rules="prenomRules"
                                                        label="Prénom" required></v-text-field>
                                                </v-col>

                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="formTuteur.nom" :rules="nomRules" label="Nom"
                                                        required></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-form v-model="valid">
                                                        <v-text-field v-model="formTuteur.login" :rules="emailRules"
                                                            label="E-mail" required></v-text-field>
                                                    </v-form>
                                                </v-col>
                                            </v-row>
                                        </v-col>



                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-select v-model="formTuteur.civilite" :items="sexe"
                                                    :rules="[v => !!v || 'Civilité is required']" label="Civilité"
                                                    required></v-select>
                                            </v-form>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-text-field v-model="formTuteur.password" :rules="passwordRules"
                                                    label="Mot de passe" type="password" required></v-text-field>
                                            </v-form>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-text-field v-model="formTuteur.telephone" label="Téléphone" clearable
                                                    :rules="[v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) || 'Numéro invalide']"
                                                    required></v-text-field>
                                            </v-form>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="formTuteur.dateDeNaissance"
                                                    transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="formTuteur.dateDeNaissance"
                                                            label="Date de naissance" prepend-inner-icon="mdi-calendar"
                                                            readonly v-bind="attrs" v-on="on" outlined
                                                            clearable></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="formTuteur.dateDeNaissance"
                                                        :active-picker.sync="activePicker" locale="fr"
                                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                                        min="1950-01-01"
                                                        @change="$refs.menu.save(formTuteur.dateDeNaissance)">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-form>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-text-field v-model="entreprise" label="Entreprise"></v-text-field>
                                            </v-form>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-text-field v-model="adresse" label="Adresse"></v-text-field>
                                            </v-form>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-form v-model="valid">
                                                <v-select v-model="etudiantId" :items="listEtudiant"
                                                    :rules="[v => !!v || 'Veuillez selectionner un étudiant']"
                                                    label="Etudiant" required></v-select>
                                            </v-form>
                                        </v-col>
                                        <v-col cols="12" class="text-right">
                                            <v-btn class="mr-4" type="submit" color="success">
                                                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'check']" />
                                                Valider
                                            </v-btn>
                                            <v-btn class="mr-4" color="secondary" @click="clear">
                                                <font-awesome-icon class="mr-1  mt-1" :icon="['fas', 'broom']" />
                                                Vider
                                            </v-btn>
                                            <v-btn class="mr-4" color="error" @click="goBack">
                                                <font-awesome-icon class="mr-1  mt-1" :icon="['fas', 'times-circle']" />
                                                Annuler
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-form>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-app>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
    data: () => ({
        formTuteur: {
            prenom: "",
            nom: "",
            login: "",
            civilite: null,
            dateDeNaissance: "",
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
            externalAccount: false,
            active: false
        },
        valid: false,
        menu: false,
        activePicker: null,
        entreprise: "",
        adresse: "",
        listEtudiant: [],
        etudiantId: null,
        password: "",
        passwordRules: [
            (v) => !!v || "Mot de passe est requis",
            (v) => (v && v.length >= 6) || "Mot de passe doit avoir au moins 6 caractères",
            (v) => /[A-Z]/.test(v) || "Mot de passe doit contenir au moins une majuscule",
            (v) => /[^a-zA-Z0-9]/.test(v) || "Mot de passe doit contenir au moins un caractère spécial",
        ],

        sexe: ['Mr', 'Mme'],
        nomRules: [
            (v) => !!v || "Nom est requis",
        ],
        prenomRules: [
            (v) => !!v || "Prénom est requis",
        ],

        emailRules: [
            (v) => !!v || "E-mail est requis",
            (v) => /.+@.+/.test(v) || "E-mail doit être valide",
        ],
    }),
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    created() {
        this.getEtudiant();
    },
    methods: {
        clear() {
            this.entreprise = "";
            this.nom = "";
            this.prenom = "";
            this.email = "";
            this.password = "";
            this.telephone = null;
            this.adresse = "";
            this.dateDeNaissance = null;
            this.select = null;
            this.etudiantId = null;
        },
        goBack() {
            this.$router.go(-1);
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
        addTuteur() {
            // Assurez-vous que etudiantId a une valeur avant de continuer
            if (!this.etudiantId) {
                // Affichez un message d'erreur ou effectuez toute autre logique nécessaire
                console.error("Veuillez sélectionner un étudiant.");
                return;
            }

            // Mettez à jour la propriété etudiantId dans formTuteur
            this.formTuteur.etudiantDto = {
                id: this.etudiantId,
                // Ajoutez d'autres propriétés de l'étudiantDto si nécessaire
            };
            this.formTuteur.adresseDto.id = this.adresseId;
            this.formTuteur.entrepriseDto.id = this.entrepriseId;
            utilisateurApi.addTuteur(this.formTuteur)
                .then(() => (this.clear(), this.$emit('hidden', 'Tuteur ajouté.')))
                .catch((error) => (this.$emit('hidden', error)))
        },
    },
};
</script>

<style scoped lang="scss">
.my-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.v-card-title {
    text-align: center;
}
</style>
