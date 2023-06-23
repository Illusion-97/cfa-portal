<template>
<div id="container-fluid">
  <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0" class="m-2">
    {{ message }}
  </b-alert>

  <div class="d-flex flex-row align-items-end justify-content-between m-3">
    <form class="form-inline form" @submit="submit">
      <input id="saisie" name="saisie" type="text" placeholder="Rechercher" class="form-control" v-model="saisie" />
      <button class="btn-submit" type="submit">
        <font-awesome-icon :icon="['fas', 'search']" class="icon" />
      </button>
    </form>

    <div>
      <button @click="openClick()" class="btn btn-outline-info">
        <span v-if="!visible">
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter une entreprise
        </span>
        <span v-else>
          <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
        </span>

      </button>
    </div>
    
  </div>

  <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
    <b-card>
      <b-card-body class="d-flex justify-content-center">
        <v-app class="w-50">
          <form>
            <v-text-field rows="2" v-model="entreprise.raisonSociale" :error-messages="raisonSocialeErrors"
              label="Raison Sociale" required @input="$v.entreprise.raisonSociale.$touch()"
              @blur="$v.entreprise.raisonSociale.$touch()"></v-text-field>

            <v-text-field rows="2" v-model="entreprise.siret" :error-messages="siretErr" label="Siret" required
              @input="$v.entreprise.siret.$touch()" @blur="$v.entreprise.siret.$touch()" :rules="[v => /^\d{14}$/.test(v) || '14 chiffres requis']"></v-text-field>

            <v-text-field rows="2" v-model="entreprise.naf" :error-messages="nafErr" label="NAF" required
              @input="$v.entreprise.naf.$touch()" @blur="$v.entreprise.naf.$touch()" :rules="[v => /^\d{4}[A-Z]$/.test(v) || '4 chiffres et une lettre requis']"></v-text-field>

            <v-text-field rows="2" v-model="entreprise.effectifTotal" :error-messages="effectifTotalErr"
              label="Effectif total" required type="number" @input="$v.entreprise.effectifTotal.$touch()"
              @blur="$v.entreprise.effectifTotal.$touch()"></v-text-field>

            <v-select :items="type" rows="2" v-model="entreprise.employeurType" :error-messages="employeurTypeErr"
              label="Employeur Type" required @input="$v.entreprise.employeurType.$touch()"
              @blur="$v.entreprise.employeurType.$touch()"></v-select>

              <v-autocomplete
                  rounded
                  solo
                  label="Adresse"
                  :items="itemsAdresse"
                  placeholder="ville : libelle"
                  v-model="entreprise.adresseSiegeId" :error-messages="adresseSiegeErr"
                  @input="$v.entreprise.adresseSiegeId.$touch()" @blur="$v.entreprise.adresseSiegeId.$touch()"
                  required
                ></v-autocomplete> 

            <v-btn class="mr-4" :color="modifier ? 'warning' : 'success'" @click="edit">

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
          </form>
        </v-app>
      </b-card-body>
    </b-card>
  </b-collapse>
<b-table :items="items" :fields="fields" striped responsive="sm" class="m-3">
  <!--Description -->
  <template #row-details="row">
    <b-card>
      <b-row class="mb-2">
        <b-col sm="2" class="text-sm-right"><b>Adresse:</b></b-col>
        <b-col> {{ row.item.adresseSiegeDto.libelle }}, {{ row.item.adresseSiegeDto.ville }}, {{ row.item.adresseSiegeDto.codePostal }} </b-col>
      </b-row>
    </b-card>
  </template>
  <template #cell(action)="row">
    <v-app>
      <div class="d-flex align-items-center justify-content-between">
        <v-btn size="sm" @click="row.toggleDetails" class="m-0 widthBtn" color="primary">
          <span tooltip="Afficher / Masquer" flow="down">
            <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" />
          </span>
        </v-btn>

        <v-btn class="m-0 widthBtn" color="error" @click="supprimer(row.item)">
          <span tooltip="Supprimer" flow="down"> 
            <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />
          </span>
        </v-btn>

        <v-btn class="m-0 widthBtn" color="warning" dark @click="update(row.item)">
          <span tooltip="Modifier" flow="down">
            <font-awesome-icon class="mr-1" :icon="['fas', 'pen']" /> 
          </span>
        </v-btn>
      </div>
    </v-app>
  </template>
</b-table>


  <paginate class="customPagination" :page-count="pageCount" :page-range="1" :margin-pages="2" :click-handler="pageChange" :prev-text="'Prev'"
    :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'"
    :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
    :next-link-class="'page-link'" :active-class="'active'">
    >
  </paginate>
</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { entrepriseApi } from "@/_api/entreprise.api.js";
import { adresseApi } from "@/_api/adresse.api.js";
import { fieldsEntreprise } from "@/assets/js/fields.js";
import Entreprise from "../../models/Entreprise"
export default {
name: "EntrepriseListComponent",
mixins: [validationMixin],
validations: {
  entreprise: {
    raisonSociale: { required },
    siret: { required },
    naf: { required },
    effectifTotal: { required },
    employeurType: { required },
    adresseSiegeId: { required }
  },

},
components: {},
props: {
  isAction: {
    type: Boolean,
    default: false,
  },
  entrepriseProp: {
    default: null,
  }
},
data() {
  return {
    message: "",
    color: "success",
    visible: false,
    items: [
    ],
    itemsAdresse: [
    ],
    entreprise: new Entreprise(0, 0, '', '', '', '', '', '', ''),
    perPage: 7,
    pageCount: 0,
    saisie: "",
    entreprise_input: "",
    fields: fieldsEntreprise,
    dismissCountDown: 0,
    modifier: false,
    type: ['PRIVE', 'PUBLIC'],
  };
},
watch: {
  entrepriseProp() {
    if (this.entrepriseProp != null)
      this.entreprise_input = `${this.entrepriseProp.raisonSociale}`;
  }
},
computed: {
  entreprisesComputed() {
    return this.entreprises;
  },
  nbPageComputed() {
    return this.pageCount;
  },
  raisonSocialeErrors() {
    const errors = []

    if (!this.$v.entreprise.raisonSociale.$dirty) return errors
    !this.$v.entreprise.raisonSociale.required && errors.push('Raison sociale is required.')
    return errors
  },
  siretErr() {
    const errors = []
    if (!this.$v.entreprise.siret.$dirty) return errors
    !this.$v.entreprise.siret.required && errors.push('Siret is required.')
    return errors
  },
  nafErr() {
    const errors = []
    if (!this.$v.entreprise.naf.$dirty) return errors
    !this.$v.entreprise.naf.required && errors.push('Naf is required.')
    return errors
  },
  effectifTotalErr() {
    const errors = []
    if (!this.$v.entreprise.effectifTotal.$dirty) return errors
    !this.$v.entreprise.effectifTotal.required && errors.push('EffectifTotal is required.')
    return errors
  },
  employeurTypeErr() {
    const errors = []
    if (!this.$v.entreprise.employeurType.$dirty) return errors
    !this.$v.entreprise.employeurType.required && errors.push('EmployeurType is required.')
    return errors
  },
  adresseSiegeErr() {
    const errors = []
    if (!this.$v.entreprise.adresseSiegeId.$dirty) return errors
    !this.$v.entreprise.adresseSiegeId.required && errors.push('Adresse is required.')
    return errors
  },
},
created() {
  this.getList();
  adresseApi.getAllAdresses().then(response => {
    let items = [];

    response.forEach(e => {
      let item = { text: e.ville + " : " + e.libelle, value: e.id }
      items.push(item);
    });
    this.itemsAdresse = items
  });
},

methods: {
  submit(e) {
    e.preventDefault();
    this.getList();
  },
  getList() {
    entrepriseApi
      .getAllByPage(0, this.perPage, this.saisie)
      .then((response) => (this.items = response));
    entrepriseApi
      .getCount(this.saisie)
      .then((response) => (this.pageCount = Math.ceil(response / this.perPage)));
  },
  update(entreprise) {
    this.modifier = true;
    this.visible = true;
    this.entreprise = entreprise;
  },
  edit() {
    this.$v.$touch()
    if (this.modifier) {
      entrepriseApi.update(this.entreprise).then(response => {
        this.color = "success";
        this.dismissCountDown = 6;
        this.message = "L'entreprise " + response.raisonSociale + " a été modifier avec succès"
        this.visible = false;
        this.getList()
      }).catch(err => {
        this.color = "danger";
        this.dismissCountDown = 8;
        this.message = err;
      })
    }
    else {
      entrepriseApi.save(this.entreprise).then(response => {
        this.color = "success";
        this.dismissCountDown = 6;
        this.message = "L'entreprise " + response.raisonSociale + " a été ajouté avec succès"
        this.visible = false;
        this.getList()
      }).catch(err => {
        this.color = "danger";
        this.dismissCountDown = 8;
        this.message = err;
      })
    }

  },
  clear() {
    this.$v.$reset()
    this.entreprise = new Entreprise(0, 0, '', '', '', '', '', '');
  },
  openClick() {
    this.visible = !this.visible
    if (this.visible == false) {
      this.clear()
      this.modifier = false;
    }
  },
  supprimer(item) {
    const h = this.$createElement;
    const titleVNode = h("div", {
      domProps: {
        innerHTML: "<h4 style='color: red'>Suppression de l'entreprise</h4>",
      },
    });
    const messageVNode = h("div", { class: ["foobar"] }, [
      h("h5", { class: [] }, [
        "Voulez-vous supprimer l'entreprise : ",
      ]),
      h("h5", { class: [] }, [
        item.raisonSociale
      ])
    ]);
    this.$bvModal
      .msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        centered: true,
        size: "md",
      })
      .then((value) => {
        if (value) {
          entrepriseApi.deleteEntreprise(item.id).then((response) => {
            if (response === "suppression effectuée") {
              this.color = "success";
              this.dismissCountDown = 6;
              this.message = "L'engtreprise " + item.raisonSociale + " a été supprimé avec succès"
              this.visible = false;
              this.getList()
            }
            else {
              this.color = "danger";
              this.dismissCountDown = 8;
              this.message = response;
            }
          });
        }
      })
      .catch((err) => {
        this.color = "danger";
        this.dismissCountDown = 8;
        this.message = err;
      });
  },
  pageChange(pageNum) {
    entrepriseApi
      .getAllByPage(pageNum - 1, this.perPage)
      .then((response) => (this.items = response));
  },
  refreshList() {
    entrepriseApi
      .getAllByPage(0, this.perPage)
      .then((response) => (this.entreprises = response));
    entrepriseApi
      .getCount()
      .then(
        (response) => (this.pageCount = Math.ceil(response / this.perPage))
      );
  },
  deleteEntreprise(entrepriseId) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) {
      entrepriseApi.deleteEntreprise(entrepriseId).then(() => this.refreshList());
    }
  },
  clickList(entreprise) {
    this.entreprise_input = entreprise.raisonSociale;
    this.$emit('click-list', entreprise);
  },
  dblClick(entreprise) {
    let route = this.$route.path.split("/").splice(1);

    if (route[0] == 'admin') this.$router.push({ name: 'admin_entreprise_detail', params: { id: entreprise.id } });
    // else if(route[0]== 'referent')  this.$router.push({name:'referent_entreprise_detail', params: { id: entreprise.id }});
    // else if(route[0]== 'formateur') this.$router.push({name:'formateur_entreprise_detail', params: { id: entreprise.id }});
    // else if(route[0]== 'cef') this.$router.push({name:'cef_entreprise_detail', params: { id: entreprise.id }});
    // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_entreprise_detail', params: { id: entreprise.id }});

  },

},
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
