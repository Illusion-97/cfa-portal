<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <router-link :to="{ name: 'admin_entreprise_list' }" class="h5"
      style="cursor:pointer; color:black;text-decoration:none;">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
    <b-form class="form mt-4" @submit="submit">
      <!-- <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Raison Sociale</label>
          <div class="col-5 pr-5">
            <b-form-input v-model="form.raisonSociale" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group> -->
      <div class="form-group row">
        <label for="" class="col-2">Raison Sociale :</label>
        <input type="text" class="form-control col-3" v-model="form.raisonSociale" required />
      </div>
      <div class="form-group row">
        <label for="" class="col-2">Siret :</label>
        <input type="text" class="form-control col-3" v-model="form.siret" required />
      </div>
      <div class="form-group row">
        <label for="" class="col-2">NAF :</label>
        <input type="text" class="form-control col-3" v-model="form.naf" required />
      </div>
      <div class="form-group row">
        <label for="" class="col-2">Effectif Total :</label>
        <input type="text" class="form-control col-3" v-model="form.effectifTotal" required />
      </div>
      <div class="form-group row">
        <label for="" class="col-2">Type d'employeur :</label>
        <input type="text" class="form-control col-3" v-model="form.employeurType" required />
      </div>
       <router-link :to="{ name: 'admin_addEntreprise_adresse' }" class="btn btn-outline-primary float-right px-5">
        Ajouter une Adresse
      </router-link>
      <div class="form-group row">
        <label for="" class="col-1">Adresse :</label>
        <AdresseListComponent v-on:click-list="onClickChildAdresseList" :adresseProp="adresse_input" class="col-11" />
      </div>

      <button type="submit" class="btn btn-outline-primary float-right px-5">{{ btn_form_text }}</button>
    </b-form>
  </div>
</template>

<script>
  import {
    entrepriseApi
  } from "@/_api/entreprise.api.js";
  import BodyTitle from "@/components/utils/BodyTitle.vue";
  import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
  export default {
    name: "AddEntreprise",
    components: {
      BodyTitle,
      AdresseListComponent,
    },
    data() {
      return {
        vue_title: "Ajouter une entreprise",
        btn_form_text: "Ajouter",

        form: {
          id: null,
          raisonSociale: "",
          siret: "",
          naf: "",
          effectifTotal: "",
          employeurType: "",
          adresseSiegeDto: {},
        },
        adresse: null,
      };
    },
    computed: {
      adresse_input() {
        return this.adresse;
      },
    },
    methods: {
      onClickChildAdresseList(adresse) {
        this.form.adresseSiegeDto = adresse;
      },
      submit(e) {
        e.preventDefault();

        entrepriseApi.save(this.form).then(() =>
          this.$router.push({
            name: "admin_entreprise_list",
          })
        );
      },
    },
    created() {
      if (
        this.$route.params.id != null &&
        this.$route.params.id != "" &&
        this.$route.params.id != 0
      ) {
        // console.log(this.$route.params.id);
        entrepriseApi.getById(this.$route.params.id).then((response) => {
          this.form = response;
          this.vue_title = "Modifier une entreprise";
          this.btn_form_text = "Modifier";
          this.adresse = response.adresseSiegeDto;
        });
      }
    },
  };
</script>

<style scoped>
  .header-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5%;
  }

  .header-list>form {
    width: 40%;
  }

  #saisie {
    width: 70%;
    margin-right: 5%;
  }

  .mon-btn {
    width: 80%;
  }
</style>