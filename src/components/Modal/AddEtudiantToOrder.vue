<template>
    <b-modal hide-footer v-model="showModal" title="Ajouter un Etudiant à l'éxamen" size="lg">

        <!-- SELECT ETUDIANT-->
        <v-app class="w-50">
            <b-form-group label="Veuillez sélectionner un étudiant :">               
                <v-select :items="etudiants" v-model="idEtudiant" @change="onItemSelected" outlined clearable />
            </b-form-group>
        </v-app>

        <!-- FORMULAIRE DATE HEURE -->
        <b-form v-if="showForm">
            <b-form-group label="Choisir la date et l'heure d'examen :">
                <div class="w-100 d-flex justify-content-center">
                    <b-form-input v-model="soutenance.joure" type="date" class="" required />
                    <b-form-input v-model="soutenance.date" type="time" class="" required />
                </div>
                <div>
                    <b-form-input v-model="soutenance.minAccueil" type="time" class=""/>
                    <b-form-input v-model="soutenance.minEntretien" type="time" class=""/>
                    <b-form-input v-model="soutenance.minQuestion" type="time" class=""/>
                    <b-form-input v-model="soutenance.minEntretienFinal" type="time" class=""/>
                    <b-form-input v-model="soutenance.minDeliberation" type="time" class=""/>
                </div>
            </b-form-group>
        </b-form>

        <!-- MESSAGE D'ALERT -->
        <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
            {{ message }}
        </b-alert>

        <!-- BUTTON -->
        <div class="d-flex">
            <b-button v-if="showForm" variant="outline-success" class="m-4" @click="addEtudiant">Ajouter</b-button>
            <b-button variant="outline-danger" class="m-4" @click="closeModal">Annuler</b-button>
        </div>
    </b-modal>
</template>
<script>
import { etudiantApi } from "@/_api/etudiant.api";
import { soutenanceApi } from "@/_api/soutenance.api";

export default {
    data() {
        return {
            showModal: false,
            showForm: false,
            dismissCountDown: null,
            message: "",
            color: "",
            idPromotion: this.$route.params.id,
            etudiants: [],
            idEtudiant: null,
            soutenance: {
                etudiantDto: null,
                jour: null,
                heure: null,
                minAccueil: null,
                minEntretien: null,
                minQuestion: null,
                minEntretienFinal: null,
                minDeliberation: null,
            },
        };
    },
    methods: {
        // RECUPERATION DES ETUDIANT 
        getEtudiantByPromotionId() {
            etudiantApi.getEtudiantByPromotionId(this.idPromotion).then((response) => (
                response.forEach(element => {
                    let item = { text: element.utilisateurDto.fullName, value: element.utilisateurDto.id }
                    this.etudiants.push(item)
                })
            ));
        },
        // ON SELECT ITEM
        onItemSelected(selectedItem) {
            if (selectedItem)
                this.showForm = true
            else {
                this.showForm = false
            }
        },
        // AJOUT DATE D'EXAMEN
        addEtudiant() {
            if (this.soutenance.date && this.soutenance.time && this.idEtudiant) {

                this.soutenance.etudiantDto = this.idEtudiant;
                console.log(this.soutenance);

                soutenanceApi.saveSoutenance(this.soutenance);

                this.$emit("childEtudiantAdd");
                this.closeModal();
            } else {
                this.color = "danger";
                this.dismissCountDown = 8;
                this.message = "Veuillez renseigner tout les champs";
            }
        },
        // OPEN / CLOSE MODAL 
        openModal() {
            this.showModal = true;
            this.getEtudiantByPromotionId();
        },
        closeModal() {
            this.showModal = false;
            this.onItemSelected();
        },
    },
};
</script>
<style scoped></style>