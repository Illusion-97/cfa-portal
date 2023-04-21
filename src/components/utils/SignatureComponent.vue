<template>
    <section>

        <!-- AFFICHAGE DE LA SIGNATURE SI EXISTANTE -->
        <div class="m-4" v-if="(modifier == false)">

            <h3 class="pr-4">Votre signature :</h3>
            <div>
                <img :src="src" class="border border-dark mt-2" alt="">

            </div>

            <b-button variant="primary" @click="modifierSig" class="mt-4">
                <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
                Modifier</b-button>
        </div>

        <!-- CREATION D'UNE SIGNATURE SI NON EXISTANTE -->
        <div v-else>
            <div class="m-4">

                <VPerfectSignature width="50%" class="border border-dark" ref="signaturePad"
                    :stroke-options="strokeOptions" />

            </div>

            <!-- ACTIONS -->
            <div class="m-4">
                <b-button @click="toDataURL()" class="mr-2" variant="outline-primary">Sauvegarder</b-button>
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
import { signatureApi } from "@/_api/signature.api.js";
import { signatureContent } from "../../assets/img/signatureContent.js"
export default {
    name: "SignatureComponent",
    components: {
        VPerfectSignature
    },
    watch: {
        signature(val) {
            if (val != null || val != "") {

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
            signature: null,
            src: null,
            modifier: false,
        }
    },
    created() {
        // SIGNATURE
        signatureApi.getByUtilisateurId(this.$store.getters.getUtilisateur.id).then(response => {
            if (response != "") {
                this.modifier = false
                this.signature = response
            }
        })
        this.src = signatureContent.srcImg();
    },
    methods: {
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
            }
            else {
                alert("Entrer une signature");
            }

        },
        // OTHER
        clear() {
            this.$refs.signaturePad.clear();
        },
        modifierSig() {
            this.modifier = true;
        },
        AnnulerModif() {
            this.modifier = false;
        }
    },
}
</script>