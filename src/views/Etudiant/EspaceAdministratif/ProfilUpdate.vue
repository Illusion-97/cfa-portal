<template>
  <div class="container-fluid">
    <span class="h5" style="cursor:pointer; color:black;text-decoration:none;" @click="goBack">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </span>
    <BodyTitle :title="vue_title" />

    <form @submit="submit">
      <!-- Civilite -->
      <div class="form-group">
        <div class="row">
          <label class="civilite">Civilité : </label>
          <div class="form-check col-1">
            <input class="form-check-input" type="radio" name="gridRadios" id="monsieur" value="M" checked
              v-model="form.civilite" autocomplete="honorific-prefix" />
            <label class="form-check-label" for="monsieur">
              Monsieur
            </label>
          </div>
          <div class="form-check col-1">
            <input class="form-check-input" type="radio" name="gridRadios" id="madame" value="Mme"
              v-model="form.civilite" autocomplete="honorific-prefix" />
            <label class="form-check-label" for="madame">
              Madame
            </label>
          </div>
          <div class="form-check col-1">
            <input class="form-check-input" type="radio" name="gridRadios" id="mademoiselle" value="Mlle"
              v-model="form.civilite" autocomplete="honorific-prefix" />
            <label class="form-check-label" for="mademoiselle">
              Mademoiselle
            </label>
          </div>
        </div>
      </div>

      <!-- Nom / Prenom -->
      <div class="d-flex justify-content-center">
        <div class="form-group col-6">
          <label for="nom">Nom</label>
          <input type="text" name="nom" id="nom" class="form-control" placeholder="Michel" v-model="form.nom"
            autocomplete="family-name"/>
        </div>
        <div class="form-group col-6">
          <label for="nom">Prénom</label>
          <input type="text" name="prenom" class="form-control" placeholder="Jean" v-model="form.prenom"
            autocomplete="given-name"/>
        </div>
      </div>
      <!-- Date de naissance / Telephone -->
      <div class="d-flex justify-content-center">
        <div class="form-group col-6">
          <label for="nom">Date de naissance</label>
          <input type="text" name="birthdate" id="birth" class="form-control" placeholder="jj/mm/aaaa"
            v-model="form.dateDeNaissance" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" autocomplete="bday"/>
        </div>
        <div class="form-group col-6">
          <label for="nom">Telephone</label>
          <input type="tel" name="phone" class="form-control" placeholder="0000000000" v-model="form.telephone"
            pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" maxlength="10" autocomplete="tel" />
        </div>
      </div>
      <!-- Email -->
      <div class="d-flex justify-content-center">
        <div class="form-group col-6">
          <label for="nom">Email</label>
          <input type="email" name="email" id="login" class="form-control" placeholder="jmichel@dawan.fr"
            v-model="form.login" autocomplete="email" />
          <!-- {{form.prenom[0]+form.nom | lowercase}} -->
        </div>

        <div class="form-group col-6">
          <label for="nom">Mot de passe</label>
          <input type="password" name="password" class="form-control" placeholder="Mot de passe"
            v-model="form.password" autocomplete="new-password" @input="this.setCustomValidity('')"/>
        </div>
      </div>
      <div class="d-flex">
        <div class="form-group col-6">
          <label for="">Adresse</label>
          <div class="d-flex justify-content-between">
            <input type="number" name="num" class="form-control col-1" placeholder="N°"
              v-model="form.adresseDto.numero" />
            <input type="text" name="rue" class="form-control col-4" placeholder="rue" v-model="form.adresseDto.rue" />
            <input type="text" name="ville" class="form-control col-3" placeholder="ville"
              v-model="form.adresseDto.ville" />
            <input type="text" name="zipcode" class="form-control col-3" maxlength="5" placeholder="code postale"
              v-model="form.adresseDto.codePostal" />
          </div>
        </div>
      </div>
      <div>
        <input type="submit" value="Envoyer" class="btn btn-outline-success float-right px-5" />
      </div>
    </form>

    <!-- <EntrepriseListComponent
        class="col-11"
        v-on:click-list="onClickChildEntrepriseList"
        :entrepriseProp="entreprise_input"
        :class="{ collapse: isEntrepriseNew }"
        /> -->
 
  </div>
</template>

<script>
  import moment from "moment-timezone";
  import { utilisateurApi } from "@/_api/utilisateur.api.js";
  import BodyTitle from "@/components/utils/BodyTitle.vue";
  // import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
  // import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
  //import RoleModal from "@/components/Modal/RoleModal.vue";

  export default {
    name: "AddUser",
    components: {
      BodyTitle,
      // AdresseListComponent,
      // EntrepriseListComponent,
      //RoleModal,
    },
    data() {
      return {
        btn_form_text: "Ajouter",
        vue_title: "Nouvel utilisateur",

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
          etudiantDto:{},
          formateurDto:{},
          cefDto:{},
          maitreApprentissageDto:{},
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
        // adresseEntreprise: {
        //   id: null,
        //   numero: "",
        //   rue: "",
        //   ville: "",
        //   codePostal: "",
        // },

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
        let login = document.getElementById("login");
        // let role = document.getElementById("role");
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
        // if (
        //   this.adresseEntreprise.numero != "" ||
        //   this.adresseEntreprise.rue != "" ||
        //   this.adresseEntreprise.ville != "" ||
        //   this.adresseEntreprise.codePostal != ""
        // ) {
          // this.form.entrepriseDto.adresseSiegeDto = this.adresseEntreprise;
          // console.log("j'ai une entreprise");
        // }

        // ON SUBMIT =>  conversion jj/mm/aaaa vers aaaa-mm-jj
        this.form.dateDeNaissance = this.backEndDateFormat(
          this.form.dateDeNaissance
        );
        utilisateurApi
          .save(this.form)
          .then(() =>
            this.$router.push({name: "etudiant_profil"}))
          .catch((error) => {
            // console.log(error.response.data);
            if (
              error.response.data ==
              "Un utilisateur utilise déjà cette adresse mail"
            ) {
              login.setCustomValidity("Cette adresse mail est déjà utilisée");
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
      testPassword(password) {
        const regex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
        );
        // console.log("regex.test() : ", regex.test(password));
        return regex.test(password);
      },
      frontEndDateFormat(date) {
        return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
      },
      backEndDateFormat(date) {
        return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
      },
    },
    created() {
      //Pour etre sur, dans le doute, on fait les 3 tests
      if (
        this.$route.params.id != null &&
        this.$route.params.id != "" &&
        this.$route.params.id != 0
      ) {
        utilisateurApi.getById(this.$route.params.id).then((response) => {
          this.vue_title = "Modifier mes informations";
          this.btn_form_text = "Modifier";
          this.form = response;

          // Si id existant => conversion aaaa-mm-jj vers jj/mm/aaaa
          this.form.dateDeNaissance = this.frontEndDateFormat(response.dateDeNaissance);

          // if (response.entrepriseDto.adresseSiegeDto != null)
          //   this.adresseEntreprise = response.entrepriseDto.adresseSiegeDto;
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

  .civilite {
    font-weight: bold;
    margin-left: 1.7em;
    margin-right: 3em;
  }

  label {
    font-weight: bold;
  }

  .form-check label {
    font-weight: inherit;
  }


</style>