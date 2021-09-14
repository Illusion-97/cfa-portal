<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_dashboard' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5 offset-2" @submit="submit" id="form">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Prénom :</label>
          <div class="col-7 pr-5">
            <b-form-input v-model="form.prenom" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Nom :</label>
          <div class="col-7 pr-5">
            <b-form-input v-model="form.nom" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-aling-left">
          <label class="col-2">Civilité :</label>
        <div class="col-7 pr-5">
          <b-form-radio v-model="form.civilite"  name="some-radios" value="Mr">Mr</b-form-radio>
          <b-form-radio v-model="form.civilite"  name="some-radios" value="Mme">Mme</b-form-radio>
        </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
        <!-- Dates Fin -->
        <label class="col-2">Date de naissance</label>
        <div class="col-7 pr-5">
          <b-form-datepicker
            locale="fr"
            v-model="form.dateDeNaissance"
            :required="true"
          ></b-form-datepicker>
        </div>
      </b-form-row>
      </b-form-group>

       <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Téléphone :</label>
          <div class="col-7 pr-5">
            <b-form-input v-model="form.telephone" required id="telephone" type="tel"></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Login :</label>
          <div class="col-7 pr-5">
            <b-form-input v-model="form.login" required id="login" type="email" oninput="this.setCustomValidity('')"></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Password :</label>
          <div class="col-7 pr-5">
            <b-form-input v-model="form.password" required id="password" oninput="this.setCustomValidity('')"></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <!-- Roles -->
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Roles :</label>
          <div class="col-7">
            <div class="mon-group" v-if="rolesComputed">
              <div
                class="d-inline p-2 border border-dark rounded mr-1"
                v-for="(role, index) in rolesComputed"
                :key="role.id"
              >
                {{ role.intitule }}
                <span @click="removeFromlist(index)" class="croix-delete"
                  >x</span
                >
              </div>
            </div>
          </div>
          <a class="btn btn-primary col-1" @click="showModal()">Ajouter</a>
        </b-form-row>
      </b-form-group>

      <!-- Adresse -->
      <b-form-group>
        <div class="mb-4 row">
          <label class="col-2">Adresse :</label>
          <!-- <a class="btn btn-primary offset-5 col-1" @click="setAdresseVisibility()">{{btn_adresse}}</a> -->
        </div>

        <div :class="{ collapse: !isAdresseNew }">
          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Numero</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="form.adresseDto.numero"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>

          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Rue</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="form.adresseDto.rue"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>

          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Ville</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="form.adresseDto.ville"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>

          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Code Postal</label>
              <div class="col-7 pr-5">
                <b-form-input
                  v-model="form.adresseDto.codePostal"
                ></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>
        </div>

        <AdresseListComponent
          v-on:click-list="onClickChildAdresseList"
          :adresseProp="adresse_input"
          :class="{ collapse: isAdresseNew }"
        />
      </b-form-group>



       <!-- Entreprise -->
      <b-form-group>
        <!-- <div class="mb-4 row">
          <label class="col-2">Entreprise :</label>
          <a class="btn btn-primary offset-7 col-1" @click="setEntrepriseVisibility()">{{btn_entreprise}}</a>
        </div> -->

        <div :class="{ collapse: !isEntrepriseNew }">
          <!-- <b-form-group>
           <b-form-row class="text-align-left">
              <label class="col-2">Raison Sociale</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="form.entrepriseDto.raisonSociale"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group> -->

          <!-- <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Numero</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="adresseEntreprise.numero"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group> -->

          <!-- <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Rue</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="adresseEntreprise.rue"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group> -->

          <!-- <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Ville</label>
              <div class="col-7 pr-5">
                <b-form-input v-model="adresseEntreprise.ville"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group> -->

          <!-- <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-2">Code Postal</label>
              <div class="col-7 pr-5">
                <b-form-input
                  v-model="adresseEntreprise.codePostal"
                ></b-form-input>
              </div>
            </b-form-row>
          </b-form-group> -->
        </div>

        <!-- <EntrepriseListComponent
        class="col-11"
        v-on:click-list="onClickChildEntrepriseList"
        :entrepriseProp="entreprise_input"
        :class="{ collapse: isEntrepriseNew }"
        /> -->
      </b-form-group>

      

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    <RoleModal
      v-show="isModalVisible"
      @close="closeModal"
      :rolesProp="rolesComputed"
      v-on:close="onClickClose"
    />
  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
// import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
import RoleModal from "@/components/Modal/RoleModal.vue";

export default {
  name: "AddUser",
  components: {
    BodyTitle,
    AdresseListComponent,
    // EntrepriseListComponent,
    RoleModal,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Création d'un utilisateur",

      form: {
        id: null,
        prenom: "",
        nom: "",
        civilite: "",
        dateDeNaissance: "",
        telephone: "",
        login: "",
        password: "",
        rolesDto: [],
        adresseDto: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        // entrepriseDto: {
        //   id: null,
        //   raisonSociale: "",
        //   adresseSiegeDto: {
        //     id: null,
        //     numero: "",
        //     rue: "",
        //     ville: "",
        //     codePostal: "",
        //   },
        // },
      },

      //On a des soucis si l'adresse de l'entreprise est null
      //D'ou l'utilisation de cet objet
      adresseEntreprise: {
        id: null,
        numero: "",
        rue: "",
        ville: "",
        codePostal: "",
      },

      isModalVisible: false,

      isAdresseNew: true,
      isEntrepriseNew: true,

      btn_adresse: "Existante",
      btn_entreprise: "Existante",
    };
  },
  computed: {
    rolesComputed() {
      return this.form.rolesDto;
    },
    adresse_input() {
      return this.adresse;
    },
    entreprise_input() {
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

      //Pour custom le message d'erreur
      let login = document.getElementById('login');
      // let password = document.getElementById('password');

      // //On reset le message pour retest
      // login.setCustomValidity("");
      // password.setCustomValidity("");

      // if(!this.testPassword(this.form.password)) {
      //   console.log("je set password custom validity");
      //   password.setCustomValidity("Le mot de passe doit contenir au moins 8 caractères avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial ");
      //   password.reportValidity();
      // }

      //Si on ne donne pas d'entreprise, on la set a null pour ne rien save dans le back
      // if(this.form.entrepriseDto.raisonSociale == "" && this.form.entrepriseDto.rue == "" && this.form.entrepriseDto.ville == "") this.form.entrepriseDto = null;

      //Si on renseigne l'adresse de l'entreprise
      if(this.adresseEntreprise.numero != ""
      || this.adresseEntreprise.rue != "" 
      || this.adresseEntreprise.ville != "" 
      || this.adresseEntreprise.codePostal != "" ){
        // this.form.entrepriseDto.adresseSiegeDto = this.adresseEntreprise;
        console.log("j'ai une entreprise");
      }
      

      console.log("form : ", this.form);

      utilisateurApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_dashboard" }))
        .catch((error) => {
          console.log(error.response.data)
          if(error.response.data == "Un utilisateur utilise déjà cette adresse mail"){            
            login.setCustomValidity("Cette adresse mail est déjà utilisée")
            login.reportValidity();
          } 
        });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    onClickClose(roles) {
      this.form.rolesDto = roles;
    },
    removeFromlist(index) {
      this.form.rolesDto.splice(index, 1);
    },
    setAdresseVisibility() {
      this.isAdresseNew = !this.isAdresseNew;
      if (this.btn_adresse == "Existante") this.btn_adresse = "Nouvelle";
      else this.btn_adresse = "Existante";
    },
    setEntrepriseVisibility() {
      this.isEntrepriseNew = !this.isEntrepriseNew;
      if (this.btn_entreprise == "Existante") this.btn_entreprise = "Nouvelle";
      else this.btn_entreprise = "Existante";
    },
    testPassword(password){
      const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$");
      console.log("regex.test() : ", regex.test(password));
      return regex.test(password);
    }
  },
  created() {
    //Pour etre sur, dans le doute, on fait les 3 tests
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      utilisateurApi.getById(this.$route.params.id).then((response) => {
        this.vue_title = "Modification d'un utilisateur";
        this.btn_form_text = "Modifier";
        
        this.form = response;

        if(response.entrepriseDto.adresseSiegeDto != null) 
          this.adresseEntreprise = response.entrepriseDto.adresseSiegeDto;
        
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

.mon-btn {
  width: 80%;
}

.croix-delete:hover {
  cursor: pointer;
}
</style>
