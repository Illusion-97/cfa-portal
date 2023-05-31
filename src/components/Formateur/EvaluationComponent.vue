<template>
    <div class="container-fluid">
        <!-- <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0"
            class="m-2">
            {{ message }}
        </b-alert> -->

        <!--  AJOUT EVALUATION -->
        <button @click="colspanClick()" class="btn btn-outline-info mt-4 mb-4">
            <span v-if="!visible">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter evaluation
            </span>
            <span v-else>
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>

        </button>
        <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
            <b-card>
                <b-card-body class="d-flex justify-content-center">
                    <v-app class="w-50">

                        <form>
                            <v-row>

                                <v-col cols="12" lg="12">
                                    <vue-editor v-model="evaluationFormation.contenu" :editor-toolbar="customToolbar" />
                                </v-col>
                                <v-col cols="12" lg="12">

                                    <v-autocomplete :items="itemsCP" rounded solo label="Compétences professionnelles"
                                        placeholder="Numéro fiche : Compétence professionnelle"
                                        v-model="evaluationFormation.competencesEvalueesId" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" lg="12" align-self="center">
                                    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="evaluationFormation.dateEvaluation"
                                                label="Date de l'évaluation" prepend-icon="mdi-calendar" readonly
                                                v-bind="attrs" v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="evaluationFormation.dateEvaluation"
                                            @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" lg="12">

                                    <v-btn class="mr-4" :color="modifier ? 'warning' : 'success'" @click="submit">

                                        <span v-if="!modifier">
                                            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" />
                                        </span>
                                        <span v-else>
                                            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
                                        </span>
                                        {{ modifier ? 'Modifier' : 'Ajouter' }}
                                    </v-btn>
                                    <v-btn color="secondary" @click="clear">
                                        <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'broom']" />
                                        Vider
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </form>
                    </v-app>
                </b-card-body>
            </b-card>
        </b-collapse>

        <!-- LIST EVALUATIONS -->
        <b-table :items="evaluationFormations" :fields="fields" striped responsive="sm">
            <template #cell(contenu)="row">
                <div class=" m-4" v-html="row.item.contenu"></div>
            </template>
            <template #cell(action)="row">
                <v-app>


                    <v-btn class="m-0  widthBtn" color="error" @click="supprimer(row.item)">
                        <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />

                        Supprimer
                    </v-btn>
                    <v-btn class="m-0 widthBtn mt-4" color="warning" dark @click="update(row.item)">
                        <font-awesome-icon class="mr-1" :icon="['fas', 'pen']" /> Modifier
                    </v-btn>

                </v-app>
            </template>
        </b-table>
    </div>
</template>
<script>
import { activiteTypeApi } from "@/_api/activiteType.api.js";
import EvaluationFormation from "../../models/EvaluationFormation";
import { evaluationFormationApi } from "@/_api/evaluationFormation.api";
import { VueEditor } from "vue2-editor";

export default {
    name: "EvaluationComponent",
    components: { VueEditor },
    data() {

        return {
            customToolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ["bold", "italic", "underline"],
                [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
            ],
            items: [],
            menu: false,
            modal: false,
            visible: false,
            message: "",
            color: "success",
            dismissCountDown: 0,
            modifier: false,
            itemsCP: [],
            evaluationFormations: [],
            evaluationFormation: new EvaluationFormation(0, 0, 0, "<p>Description de l'évaluation. </p>", new Array, (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), this.$route.params.id),
            fields: [
                {
                    key: "contenu",
                    label: "Contenu ",
                },
                {
                    key: "dateEvaluation",
                    label: "Date évaluation",
                    class: "text-center",
                },
                {
                    key: "Action",
                    label: "Action",
                    thStyle: { width: "20%" },
                    thClass: "text-center",
                },
            ]
        }
    },
    created() {
        this.$root.$on("promoId", (data) => {
            this.getActiviteType(data)
        })
        this.getEvaluationFormation()
    },
    methods: {
        // EVALUATION
        getEvaluationFormation() {
            evaluationFormationApi.getAllByInterventionId(this.$route.params.id).then(response => {
                this.evaluationFormations = response;
            })
        },

        // ACTIVITER TYPE
        getActiviteType(promoId) {
            activiteTypeApi
                .getAllByIdPromotion(promoId)
                .then((response) => {
                    let competences = []
                    response.forEach(e => {
                        Array.prototype.push.apply(competences, e.competencesProfessionnellesDto)
                    });
                    competences.forEach(e => {
                        let item = { text: e.numeroFiche + " : " + e.libelle, value: e.id }
                        this.itemsCP.push(item)
                    })
                });
        },

        // OTHER
        submit() {
            // console.log("dans le submit");
            if (this.modifier) {
                // console.log("dans le if");
                evaluationFormationApi.update(this.evaluationFormation).then(response => {
                    // console.log(this.evaluationFormation);
                    this.color = "success";
                    this.dismissCountDown = 6;
                    this.message = "L'Evaluation du " + response.dateEvaluation + " a été modifier avec succès"
                    this.visible = false;
                    this.getEvaluationFormation()
                    // console.log(response)
                }).catch(err => {
                    this.color = "danger";
                    this.dismissCountDown = 8;
                    this.message = err;
                })
            }
            else {
                // console.log("dans le else");
                evaluationFormationApi.save(this.evaluationFormation).then(response => {
                    this.color = "success";
                    this.dismissCountDown = 6;
                    this.message = "L'Evaluation du " + response.dateEvaluation + " a été ajouté avec success"
                    this.visible = false;
                    this.getEvaluationFormation()
                    // console.log(response)
                }).catch(err => {
                    this.color = "danger";
                    this.dismissCountDown = 8;
                    this.message = err;
                })
            }

        },
        clear() {
            this.evaluationFormation = new EvaluationFormation(0, 0, 0, "<p>Description de l'évaluation. </p>", new Array, (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), this.$route.params.id)
        },
        colspanClick() {
            this.visible = !this.visible
            if (this.visible == false) {
                this.clear()
                this.modifier = false;
            }
        },
        update(evaluationFormation) {
            this.evaluationFormation = evaluationFormation;
            this.modifier = true
            this.visible = true;
        },
        supprimer(evaluationFormation) {
            evaluationFormationApi.deleteEF(evaluationFormation.id).then(() => {
                this.getEvaluationFormation()
            })
        }
    }
}
</script>
