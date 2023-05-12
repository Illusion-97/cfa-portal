<template>
    <div>
        <v-app>
            <form @submit="addEntreprise">
                <!-- ENTREPRISE -->
                <v-row>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.raisonSociale" label="Nom de l'entreprise*" outlined clearable :rules="required"
                                required></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.naf" label="code d’activité principale exercée* (naf)" outlined clearable
                                :rules="required" required></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.siret" label="identification du répertoire de l'entreprises (siret)*" outlined clearable
                                :rules="required" required></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-select :items="type" v-model="entrepriseDto.employeurType" label="Type de l'entreprise" outlined clearable
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.effectifTotal" label="Effectif de l'entreprise" outlined clearable
                            ></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <!-- ADRESSE -->
                <v-row>
                    <v-col cols="12" md="2">
                        <v-select :items="pays" v-model="country" label="Pays*" outlined clearable
                            :rules="required" required>
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="ville" label="Ville*" outlined clearable :rules="required"
                                required></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="codePostal" label="Code postal*" outlined clearable
                                :rules="required" required></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="libelle" label="Complément d'adresse" outlined
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
import { entrepriseApi } from "@/_api/entreprise.api.js";
export default {
    name: "AddAdresse",
    data() {
        return {
            entrepriseDto: {
                raisonSociale: "",
                siret: "",
                naf: "",
                effectifTotal: 0,
                employeurType: "",
                adresseDto: {
                    libelle: "",
                    ville: "",
                    codePostal: "",
                    idDg2: 0,
                    country: "",
                },
                adresseSiegeId: 0
            },
            libelle: "",
            ville: "",
            codePostal: "",
            country: "",
            pays: ['BE', 'EL', 'LT', 'PT', 'BG', 'ES', 'LU', 'RO', 'CZ', 'FR', 'HU', 'SI', 'DK', 'HR', 'MT', 'SK', 'DE', 'IT', 'NL', 'FI', 'EE', 'CY', 'AT', 'SE', 'IE', 'LV', 'PL'].sort(),
            type: ['PUBLIC', 'PRIVER'],
            required: [
                v => !!v || 'Le champ est requis',
            ],
        }
    },
    methods: {
        addEntreprise() {
            this.entrepriseDto.adresseDto.libelle = this.libelle;
            this.entrepriseDto.adresseDto.ville = this.ville;
            this.entrepriseDto.adresseDto.codePostal = this.codePostal;
            this.entrepriseDto.adresseDto.country = this.country;
            console.log(this.entrepriseDto)
            entrepriseApi/*.save(this.entrepriseDto)*/;
        },
    }
}          
</script>
<style scoped></style>