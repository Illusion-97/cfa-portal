<template>
    <div>
        <v-app>
            <form @submit="addEntreprise">
                <!-- ENTREPRISE -->
                <v-row>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.raisonSociale" label="Nom de l'entreprise*" outlined
                                clearable :rules="[ v => !!v || 'Le champ est requis']" required></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select :items="type" v-model="entrepriseDto.employeurType" label="Type de l'entreprise" outlined
                            clearable>
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.effectifTotal" label="Effectif de l'entreprise" outlined
                                clearable :rules="requireChiffre"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.naf" label="code d’activité principale exercée* (naf)"
                                outlined clearable :rules="requiredNaf" required></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="w-100 d-flex justify-content-center">
                            <v-text-field v-model="entrepriseDto.siret"
                                label="identification du répertoire de l'entreprises* (siret)" outlined clearable
                                :rules="requiredSiret" required></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <!-- ADRESSE -->
                <v-row>
                    <v-col cols="12" md="12">
                        <v-select :items="listAdresse" v-model="adresseId" label="Adresse*" outlined clearable
                            :rules="required" required @click="getAdresse()">
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
                </v-row>
                <small>*indique les champs requis</small>
                <b-button type="submit" class="mt-3" variant="success" block>
                    Ajouter</b-button>
            </form>
        </v-app>
        <b-modal size="lg" hide-footer :ref="'modal-Adresse'">
            <template #modal-title>
                <div class="text-center">Ajout d'une adresse</div>
            </template>
            <addAdresse />
            <b-button class="mt-3" variant="danger" block @click="hideModal">
                Annuler</b-button>
        </b-modal>
    </div>
</template>
<script>
import { entrepriseApi } from "@/_api/entreprise.api.js";
import { adresseApi } from "@/_api/adresse.api.js";
import addAdresse from "@/components/Modal/AddAdresse.vue";
export default {
    name: "AddAdresse",
    components: {
        addAdresse,
    },
    data() {
        return {
            entrepriseDto: {
                raisonSociale: "",
                siret: "",
                naf: "",
                effectifTotal: "",
                employeurType: "",
                adresseSiegeDto: {
                    id: 0,
                },
                adresseSiegeId: 0
            },
            libelle: "",
            ville: "",
            codePostal: "",
            country: "",
            listAdresse: [],
            adresseId: 0,
            pays: ['BE', 'EL', 'LT', 'PT', 'BG', 'ES', 'LU', 'RO', 'CZ', 'FR', 'HU', 'SI', 'DK', 'HR', 'MT', 'SK', 'DE', 'IT', 'NL', 'FI', 'EE', 'CY', 'AT', 'SE', 'IE', 'LV', 'PL'].sort(),
            type: ['PUBLIC', 'PRIVER'],
            requiredSiret: [
                v => !!v || 'Le champ est requis',
                v => /^\\d{12}$/.test(v) || '12 chiffres requis',
            ],
            requiredNaf: [
                v => !!v || 'Le champ est requis',
                v => /^\\d{5}$/.test(v) || '5 chiffres requis',
            ],
            requireChiffre: [
                v => /^\\d+$/.test(v) || 'Insérer que des chiffres',
            ],
        }
    },
    methods: {
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
        addEntreprise() {
            this.entrepriseDto.adresseSiegeDto.id = this.adresseId;
            entrepriseApi.save(this.entrepriseDto);
        },
        showModal(value) {
            if (value == "Adresse")
                this.$refs["modal-Adresse"].show();
            else {
                this.$refs["modal-Adresse"].hide();
            }
        },
        hideModal() {
            this.showModal();
        },
    }
}          
</script>
<style scoped></style>