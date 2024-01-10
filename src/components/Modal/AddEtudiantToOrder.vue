<template>
    <b-modal hide-footer v-model="showModal" title="Ajouter un Etudiant à l'éxamen" size="lg">

        <!-- SELECT ETUDIANT-->
        <v-app class="w-50">
            <span v-if="modifier">Etudiant : {{ soutenance.etudiant.utilisateurDto.fullName }}</span>
            <b-form-group v-if="etudiants.length > 0 && !modifier" label="Veuillez sélectionner un étudiant* :">
                <v-select :items="etudiants" v-model="soutenance.etudiant.id" @change="onItemSelected" outlined clearable />
            </b-form-group>
            <div v-if="etudiants.length === 0 && !modifier">Aucun étudiant à ajouter</div>
        </v-app>

        <!-- FORMULAIRE DATE HEURE -->
        <b-form v-if="showForm">
            <b-form-group label="Choisir la date et l'heure d'examen* :">
                <div class="w-100 d-flex justify-content-center">
                    <b-form-input v-model="soutenance.jour" type="date" class="" required />
                    <b-form-input v-model="soutenance.heure" type="time" class="" required />
                </div>
                <div>
                    <span>Accueil Candidat :</span>
                    <b-form-input label="Acceuil Candidat" v-model="soutenance.minAccueil" type="time" class="mt-1 mb-3" />
                    <span>Entretien Technique :</span>
                    <b-form-input v-model="soutenance.minEntretien" type="time" class="mt-1 mb-3" />
                    <span>Questionnaire à partir de production :</span>
                    <b-form-input v-model="soutenance.minQuestion" type="time" class="mt-1 mb-3" />
                    <span class="pb-5">Entretien Final :</span>
                    <b-form-input v-model="soutenance.minEntretienFinal" type="time" class="mt-1 mb-3" />
                    <span>Déliberation du Jury :</span>
                    <b-form-input v-model="soutenance.minDeliberation" type="time" class="mt-1" />
                </div>
            </b-form-group>
        </b-form>
        <span v-if="etudiants.length > 0" style="display: block; font-size: small;"><i>*Champs requis.</i></span>

        <!-- MESSAGE D'ALERT -->
        <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
            {{ message }}
        </b-alert>

        <!-- BUTTON -->
        <div class="d-flex">
            <b-button v-if="showForm && !modifier" variant="outline-success" class="m-4"
                @click="addEtudiant">Ajouter</b-button>
            <b-button v-if="showForm && modifier" variant="outline-primary" class="m-4"
                @click="addEtudiant">Modifier</b-button>
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
            modifier: false,
            dismissCountDown: null,
            idPromotion: this.$route.params.id,
            message: "",
            color: "",
            etudiants: [],
            lstSoutenances: [],
            soutenance: {
                id: 0,
                version: 0,
                etudiant: {
                    id: 0
                },
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
        async getEtudiantByPromotionId() {
            // RECUPERATION DES ETUDIANTS
            this.etudiants = [];
            await etudiantApi.getEtudiantByPromotionId(this.idPromotion).then((response) => (
                this.etudiants = response.map((element) => ({ text: element.utilisateurDto.fullName, value: element.id }))
            ));

            console.log("ETUDIANTS")
          console.log(this.etudiants)
            //RECUPERATION DES SOUTENANCES
            await this.getLstSoutenance();

            // ENLEVER LES ETUDIANT QUI ONT DES SOUTENANCES
            this.etudiants = this.etudiants.filter(item => {
                return !this.lstSoutenances.some(itemB => item.value === itemB.etudiant.id)
            })
        },
        //RECUPERATION DES SOUTENANCES
        async getLstSoutenance() {
            this.lstSoutenances = [];
            await soutenanceApi.getSoutenanceByPromotionId(this.idPromotion)
                .then((response) => this.lstSoutenances = response);
        },
        // ON SELECT ITEM
        onItemSelected(selectedItem) {
            if (selectedItem)
                this.showForm = true;
            else
                this.showForm = false;
        },
        // AJOUT DATE D'EXAMEN
        addEtudiant() {
            if (this.soutenance.jour && this.soutenance.heure && this.soutenance.etudiant.id) {

                soutenanceApi.saveSoutenance(this.soutenance).then(() => {
                    this.closeModal();
                    if (this.modifier)
                        this.$emit('childEtudiantAdd', this.soutenance.etudiant.utilisateurDto.fullName);
                    else
                        this.$emit('childEtudiantAdd');

                }).catch(() => {
                    this.color = "danger";
                    this.dismissCountDown = 8;
                    this.message = "Erreur lors de l'enregistrement veuillez resayer.";
                });
            } else {
                this.color = "danger";
                this.dismissCountDown = 8;
                this.message = "Veuillez renseigner tous les champs.";
            }
        },
        // OPEN / CLOSE / CLEAR MODAL
        async openModal(IdEtudiantmodif) {
            this.modifier = false;
            console.log(IdEtudiantmodif)
            if (IdEtudiantmodif) {
                await this.clearFormulaire(IdEtudiantmodif);
                await this.getLstSoutenance();
                await this.completeForm(IdEtudiantmodif);
            } else {
                await this.clearFormulaire();
                await this.getEtudiantByPromotionId();
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.clearFormulaire();
        },
        clearFormulaire(item) {
            if (item)
                this.onItemSelected(item);
            else
                this.onItemSelected();
            this.soutenance.id = 0;
            this.soutenance.etudiant.id = null;
            this.soutenance.jour = null;
            this.soutenance.heure = null;
            this.soutenance.minAccueil = null;
            this.soutenance.minEntretien = null;
            this.soutenance.minQuestion = null;
            this.soutenance.minEntretienFinal = null;
            this.soutenance.minDeliberation = null;
        },
        // REMPLIR LE FORMULAIRE AVEC LA SOUTENANCE DE L'ETUDIANT
        completeForm(idEtudiant) {
            this.lstSoutenances.forEach(element => {
                if (element.etudiant.id == idEtudiant)
                    this.soutenance = element
            });
            this.modifier = true;
        },
    },
};
</script>
<style scoped></style>
