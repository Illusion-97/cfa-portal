<template>
    <section>
        <!-- TODO : changer le chemin de retour en fonction du role. Si ADMIN => lst ADMIN sinn Si REF => lst REF -->
        <router-link :to="{ name: 'all-intervention' }" class="h5"
            style="cursor:pointer; color:black;text-decoration:none;">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
            Precedent
        </router-link>
        <h1 class="text-center">Ajouter une formation</h1>
        <div class="container">
            <div class="row">
                <div class=" col-md-12 div-form">
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group label="Nom de la formation :" label-for="formation">
                            <b-form-input v-model="form.titre" id="formation" class="form-control">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group label="Description :">
                            <b-form-textarea v-model="form.contenu" rows="3" max-rows="6"
                                placeholder="Description du cours" id="desc">
                            </b-form-textarea>
                        </b-form-group>

                        <b-form-group label="Cursus :" label-for="cursus">
                            <b-form-select id="cursus" v-model="form.cursusLstDto" multiple required>
                                <template #first>
                                    <b-form-select-option disabled :value="null" class="select-title">
                                        Selectionnez un cursus
                                    </b-form-select-option>
                                </template>
                                <template>
                                    <b-form-select-option v-for="opt in opts" :key="opt.id" :value="opt">
                                        {{ opt.titre }}
                                    </b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                        <div class="d-flex justify-content-between">
                            <b-button type="reset" variant="outline-danger">Annuler</b-button>
                            <b-button type="submit" variant="outline-info" class=" px-3">Envoyer</b-button>
                        </div>
                    </b-form>
                    <b-card class="mt-3" header="Form Data Result" v-if="show">
                        <pre class="m-0">{{ form }}</pre>
                    </b-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    import {
        formationApi
    } from "@/_api/formation.api.js";

    export default {
        data() {
            return {
                opts: [],
                courses: [],
                form: {
                    // id: "",
                    titre: "",
                    contenu: "",
                    cursusLstDto: [],
                },
                items: [],
                show: true,
            };
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            onSubmit(event) {
                event.preventDefault();
                // a modifier : ajout pour l'admin et ajout pour le referent
                formationApi
                    .insertFormation(this.form)
                    .then((data) =>
                        data.status === 200 ?
                        (window.location = "/intervention") :
                        (window.location = "/ajouter-formation")
                    );
            },
            onReset(event) {
                event.preventDefault();
                // Reset our form values
                this.form.name = "";
                this.form.contenu = "";
                this.form.cursusLstDto = [];
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            },
        },
        created() {
            axios
                .get("http://localhost:8080/AppliCFABack/cursus")
                .then((response) => (this.opts = response.data))
                .catch((err) => console.error(err));
        },
    };
</script>

<style scoped>
    /* .div-form {
    text-align: left;
  } */
    #formation,
    #desc,
    #cursus {
        width: 100%;
        margin-bottom: 1em;
        height: auto;
    }

    #formation,
    #cursus,
    .form-control {
        border: 1px solid #767676;
        border-radius: 0.2em;
    }

    .form-select {
        /* width: 100%; */
        height: calc(1.5em + 0.5rem + 2px);
        border-radius: 0.2em;
    }

    .select-title {
        background-color: #76767625;
    }
</style>