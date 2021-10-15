<template>
    <section>
        <!-- TODO : changer le chemin de retour en fonction du role. Si ADMIN => lst ADMIN sinn Si REF => lst REF -->
        <router-link :to="{ name: 'admin_formation_list' }" class="h5"
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
                            <b-form-input v-model="form.titre" id="formation" class="form-control"
                                placeholder="Ex : Java Init., Photoshop Init.">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group label="Description :">
                            <b-form-textarea v-model="form.contenu" rows="3" max-rows="6"
                                placeholder="Description de la formation" id="desc">
                            </b-form-textarea>
                        </b-form-group>

                        <div class="d-flex justify-content-between" v-if="formationId == null">
                            <b-button type="reset" variant="outline-danger">Annuler</b-button>
                            <b-button type="submit" variant="outline-info" class=" px-3">Envoyer</b-button>
                        </div>
                        <div class="d-flex justify-content-end" v-else>
                            <b-button type="submit" variant="outline-info" class=" px-3">Envoyer</b-button>
                        </div>
                    </b-form>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { formationApi } from "@/_api/formation.api.js";
    export default {
        name: "formation-form",
        components: {},
        data() {
            return {
                form: {
                    id: "",
                    titre: "",
                    contenu: "",
                },
                items: {},
                formationId: this.$route.params.id,
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
                    .then((data) => {
                        if (data.status === 200)
                            this.$router.push({ name: "admin_formation_list" });
                    });
            },
            onReset(event) {
                event.preventDefault();
                // Reset our form values
                this.form.titre = ""
                this.form.contenu = "";
                // this.form.cursusLstDto = [];
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            },
        },
        created() {
            if (this.formationId != null && this.formationId != "" && this.formationId != 0) {
                formationApi
                    .getFormationById(this.formationId)
                    .then((data) => {
                        this.items = data;
                        this.form = this.items;
                    });
            }
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