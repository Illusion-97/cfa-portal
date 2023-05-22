<template>
    <div>
        <v-app>
            <form @submit="addAdresse">
                <v-row>
                    <v-col cols="12" md="2">
                        <v-select :items="pays" v-model="adresseDto.country" label="Pays*" outlined clearable :rules="required" required>
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="adresseDto.ville" label="Ville*" outlined clearable :rules="required" required></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="adresseDto.codePostal" label="Code postal*" outlined
                                clearable :rules="required" required></v-text-field>
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
                <small>*indique les champs requis</small>
                <b-button type="submit" class="mt-3" variant="success" block>
                    Ajouter</b-button>
            </form>
        </v-app>
    </div>
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
                country: "",
            },
            pays: ['BE', 'EL', 'LT', 'PT', 'BG', 'ES', 'LU', 'RO', 'CZ', 'FR', 'HU', 'SI', 'DK', 'HR', 'MT', 'SK', 'DE', 'IT', 'NL', 'FI', 'EE', 'CY', 'AT', 'SE', 'IE', 'LV', 'PL'].sort(),
            required: [
                v => !!v || 'Le champ est requis',
            ],
        };
    },
    methods: {
        addAdresse() {
            console.log(this.adresseDto)
            adresseApi.save(this.adresseDto);
        },
    }
}          
</script>
<style scoped></style>