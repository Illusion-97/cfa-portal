<template>
 
  <div class="container-fluid">
     <BodyTitle :title=vue_title />
     
    <b-form class="form mb-5" @submit="submit">
    
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Prénom</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.prenom"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Nom</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.nom"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Login</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.login"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Password</label>
          <div class="col-5 pr-5">
            <b-form-input
              v-model="form.password"
              required
            ></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <!--<b-form-group>
        <b-form-row class="text-align-left">
          <label class="form-label"
              >Selectionner un Rôle:
            </label>
            <select
              class="custom-select"
              v-model="selected"
              @change="onSelected()"
            >
              <option
                v-for="role in rolesComputed"
                :key="role.id"
                :value="role"
                >{{ role.intitule }}</option
              >
            </select>
            </b-form-row>
      </b-form-group>-->

      <AdresseListComponent
        v-on:click-list="onClickChildAdresseList"
        :adresseProp="adresse_input"
      />

      <EntrepriseListComponent
        v-on:click-list="onClickChildEntrepriseList"
        :entrepriseProp="entreprise_input"
      />

    
      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">{{btn_form_text}}</button>
      </div>
    </b-form>

    <router-link
      :to="{ name: 'admin_dashboard' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    </div>
    
</template>

<script>
import {utilisateurApi} from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
export default {
  name: "AddUser",
  components: {
    BodyTitle,
    AdresseListComponent,
    EntrepriseListComponent,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Création d'un utilisateur",

      roles: null,

      selected: null,

      form: {
        id: null,
        prenom: "",
        nom: "",
        login: "",
        password: "",
        adresseDto: {},
        entrepriseDto: {},
      },

      adresse: null,
      entreprise: null,
    };
  },
  computed: {
    rolesComputed() {
      return this.roles;
    },
    adresse_input(){
      return this.adresse;
    },
    entreprise_input(){
      return this.entreprise;
    },
  },
  methods: {
    onClickChildAdresseList(adresse) {
      this.form.adresseDto = adresse;
    },
    onClickChildEntrepriseList(entreprise) {
      this.form.entrepriseDto = entreprise;
    },
    submit(e) {
      e.preventDefault();

      utilisateurApi
      .save(this.form)
      .then(() => this.$router.push({ name: 'admin_dashboard'}));
    },
  },
  onSelected() {
      utilisateurApi
        .getRoleById(this.selected.id)
        .then((response) => (this.roles = response));
    },
  created() {
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      console.log(this.$route.params.id);
      utilisateurApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Modification d'un utilisateur";
        this.btn_form_text = "Modifier";
        this.adresse = response.adresseDto;
        this.entreprise = response.entrepriseDto;
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

.header-list > form {
  width: 40%;
}

#saisie {
  width: 70%;
  margin-right: 5%;
}

.mon-btn{
  width: 80%;
}
</style>