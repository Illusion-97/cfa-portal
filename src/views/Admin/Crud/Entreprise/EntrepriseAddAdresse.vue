<template>
    <b-card>
        <b-card-body class="d-flex justify-content-center">
            <v-app>
                <form @submit="addAdresse">
                    <v-row>
                        <v-col cols="12" md="2">
                            <v-select :items="pays" v-model="adresseDto.countryCode" label="Pays*" outlined clearable
                                :rules="required" required>
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="w-100 d-flex justify-content-center">
                                <v-text-field v-model="adresseDto.ville" label="Ville*" outlined clearable :rules="required"
                                    required></v-text-field>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="w-100 d-flex justify-content-center">
                                <v-text-field v-model="adresseDto.codePostal" label="Code postal*" outlined clearable
                                    :rules="required" required></v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="w-100 d-flex justify-content-center">
                                <v-text-field v-model="adresseDto.libelle" label="Complément d'adresse" outlined
                                    clearable></v-text-field>
                            </div>
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
                        <font-awesome-icon class="mr-1  mt-1" :icon="['fas', 'trash']" />
                        Annuler
                    </v-btn>
                </form>
            </v-app>
        </b-card-body>
    </b-card>
</template>
<script>
import { adresseApi } from "@/_api/adresse.api.js";
export default {
    name: "AddAdresse",
    data() {
        return {
            adresseDto: {
                libelle: "",
                ville: "",
                codePostal: "",
                idDg2: 0,
                countryCode: "",
            },
            pays: ['BE', 'EL', 'LT', 'PT', 'BG', 'ES', 'LU', 'RO', 'CZ', 'FR', 'HU', 'SI', 'DK', 'HR', 'MT', 'SK', 'DE', 'IT', 'NL', 'FI', 'EE', 'CY', 'AT', 'SE', 'IE', 'LV', 'PL'].sort(),
            required: [
                v => !!v || 'Le champ est requis',
            ],
        };
    },
    methods: {
        hideComponent() {
            this.clear();
            this.$emit('hidden');
        },
        clear() {
            this.adresseDto.libelle = "";
            this.adresseDto.ville = "";
            this.adresseDto.codePostal = "";
            this.adresseDto.countryCode = "";
        },
        addAdresse() {
            adresseApi
                .save(this.adresseDto)
                .then((data) => {
                    if (data) {
                        this.$emit('hidden', 'Adresse ajouter.');
                        this.clear();
                    }
                });
        },
    }
}          
</script>
<style scoped></style>