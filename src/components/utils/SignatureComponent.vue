<template>
    <section>

        <!-- AFFICHAGE DE LA SIGNATURE SI EXISTANTE -->
        <div class="m-4" v-if="(modifier == false)">

            <h3 class="pr-4">Votre signature :</h3>
            <div>
                <img :src="src" class="border border-dark mt-2" alt="">

            </div>

            <b-button variant="warning" @click="modifierSig" class="mt-4">
                <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
                Modifier</b-button>
        </div>

        <!-- CREATION D'UNE SIGNATURE SI NON EXISTANTE -->
        <div v-else>
            <div class="m-4">

                <VPerfectSignature width="50%" class="border border-dark" ref="signaturePad"
                    :stroke-options="strokeOptions" />
                <div v-if="alertsignature == true" class="my-invalid-feedback">
                    {{ errorMessage }}
                </div>
            </div>

            <!-- ACTIONS -->
            <div class="m-4">
                <span style="display: block; font-size: small;"><i>*taille de fichier maximale pour l'import : 100Ko</i></span>
                <b-button @click="toDataURL()" class="mr-2" variant="outline-primary">Sauvegarder</b-button>
                <input type="file" @change="convertImage" ref="fileRef" style="display: none">
                <b-button @click="openFileInput()" class="mr-2" variant="outline-primary" title="Taille max ">Importer*</b-button>
                <b-button @click="clear()" class="mr-2" variant="outline-primary">Vider</b-button>
                <b-button variant="warning" @click="AnnulerModif">
                    <font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                    Annuler</b-button>

            </div>
        </div>
    </section>
</template>
<script>
import VPerfectSignature from 'v-perfect-signature';
import {signatureApi} from "@/_api/signature.api.js";
import {signatureContent} from "../../assets/img/signatureContent.js"

export default {
    name: "SignatureComponent",
    components: {
        VPerfectSignature
    },
    watch: {
        signature(val) {
            if (val) {
                this.src = val.pieceJointe
            }
        },
    },
    data() {
        return {
            strokeOptions: {
                size: 10,
                thinning: 0.75,
                smoothing: 0.5,
                streamline: 0.5
            },
            errorMessage: "",
            alertsignature: false,
            signature: null,
            src: null,
            modifier: false,
        }
    },
    created() {
        // SIGNATURE
        signatureApi.getByUtilisateurId(this.$store.getters.getUtilisateur.id).then(response => {
            if (response) {
                this.modifier = false
                this.signature = response
            }
        })
        this.src = signatureContent.srcImg();
    },
    methods: {
        openFileInput() {
            this.$refs.fileRef.click();
        },

        convertImage(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/') && file.size <= 100 * 1024) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.$refs.signaturePad.fromDataURL(reader.result);
                }
                reader.readAsDataURL(file);
                this.errorMessage = null;
                this.alertsignature = false;
            } else {
                this.alertsignature = true;
                this.errorMessage = "Taille de fichier ou format non accepté, veuillez séléctionnée une image.";
            }
        },

        // RECUPERATION DES DONNEE DANS L'URL
        toDataURL() {
            const dataURL = this.$refs.signaturePad.toDataURL();
            if (dataURL != undefined) {
                if (this.signature != null) {
                    let signature = this.signature;
                    signature.pieceJointe = dataURL;
                    signatureApi.update(signature).then(response => {
                        this.signature = response
                        this.AnnulerModif()
                    }).catch(err => {
                        console.log(err)
                    })
                }
                else {
                    let signature = {
                        pieceJointe: dataURL,
                        utilisateurId: this.$store.getters.getUtilisateur.id
                    }
                    signatureApi.save(signature).then(response => {
                        this.signature = response
                        this.AnnulerModif()

                    }).catch(err => {
                        console.log(err)
                    })
                }
                this.modifier = false;
                this.alertsignature = false;
            }
            else {
                this.errorMessage = "Entrer une signature !";
                this.alertsignature = true;
            }

        },
        // OTHER
        clear() {
            this.$refs.signaturePad.clear();
            this.errorMessage = null;
            this.alertsignature = false;
        },
        modifierSig() {
            this.modifier = true;
        },
        AnnulerModif() {
            this.modifier = false;
            this.alertsignature = false;
        }
    },
}
</script>

<style>
.my-invalid-feedback {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 100%;
    color: #dc3545;
    font-weight: bolder;
}
</style>