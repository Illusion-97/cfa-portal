<template>
  <div class="container-fluid">
    <router-link :to="{ name: 'admin_dashboard' }" class="h5" style="cursor:pointer; color:black;text-decoration:none;">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

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
          <input type="date" name="birthdate"  class="form-control"
            v-model="form.dateDeNaissance" />
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
        </div>
          <div class="form-group col-6">
          <label for="nom">Mot de passe</label>
          <input type="password" name="password" id="password" class="form-control" placeholder="******************"
            v-model="form.password" />
        </div>
        


      </div>
      <div class="d-flex">
        <div class="form-group col-6">
          <label for="">Roles : </label>
          <a class="" @click="showModal()" href="#"> Ajouter un role</a>
          <div class="mon-group d-flex" v-if="rolesComputed" id="role">
            <div class="alert alert-secondary mr-2 py-1 px-2" role="alert" v-for="(role, index) in rolesComputed"
              :key="role.id">
              {{ role.intitule }}
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span class="close" @click="removeFromlist(index)">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group col-6">
          <label for="">Adresse</label>
          <div class="d-flex justify-content-between">
            <input type="number" name="num" class="form-control col-1" placeholder="N°" v-model="form.adresseDto.numero" />
            <input type="text" name="rue" class="form-control col-4" placeholder="rue" v-model="form.adresseDto.rue" />
            <input type="text" name="ville" class="form-control col-3" placeholder="ville" v-model="form.adresseDto.ville" />
            <input type="text" name="zipcode" class="form-control col-3" maxlength="5" placeholder="code postale" v-model="form.adresseDto.codePostal" />
          </div>
        </div>
      </div>
       <!-- <div>
            <div class ="form-group col-6">
              <label for="">Contrat</label>
                <div class="col-sm-4">
                 <label for="">Date de début : </label>
                 <input type="date" name="mode" class="" placeholder="" v-model="contrat.dateDebut"/>
                </div>
                 <div class="col-sm-4">
                 <label for="">Date de fin : </label>
                 <input type="date" name="mode" class="" placeholder="" v-model="contrat.dateFin"/>
                </div>
            </div>
      </div> -->
      <div v-for="r in rolesComputed" :key="r.id">
        <div class=""  v-if="r.intitule== 'ETUDIANT'" >
            <label for="">Contrat</label>
            <div class="col-sm-4">
              <label for="">Date de début : </label>
              <input type="date" name="mode" class="" placeholder="" v-model="contrat.dateDebut"/>
            </div>
            <div class="col-sm-4">
              <label class="" for="">Date de fin : </label>
              <input type="date" name="mode" class="" placeholder="" v-model="contrat.dateFin"/>
            </div>
            <label class="col-2">Maitre d'Apprentissage</label>
            <div class="col-sm-4">
              <input v-model="contrat.maitreApprentissageDto" disabled="disabled" required />
              <a class="btn btn-primary " @click="showUtilisateurModal('maitreApprentissage')">Maitre d'Apprentissage</a>
            </div>
          </div>
        </div>
      <div>
        <input type="submit" value="Envoyer" class="btn btn-outline-success float-right" />
    </div>
  </form>
   
    <RoleModal v-show="isModalVisible" @close="closeModal" :rolesProp="rolesComputed" v-on:close="onClickClose" />
    
          <UtilisateurModal
            v-show="isUtilisateurModalVisible"
            @close="closeUtilisateurModal"
            v-on:close="onClickUtilisateurClose"
            :roleProp="UtilisateurModal_role"
            :utilisateursProp="UtilisateurModale_utilisateur" />

  </div>
</template>

<script>
  // import moment from "moment-timezone";
  import { utilisateurApi } from "@/_api/utilisateur.api.js";
  import BodyTitle from "@/components/utils/BodyTitle.vue";
  // import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
  //import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
  import RoleModal from "@/components/Modal/RoleModal.vue";
import UtilisateurModal from "@/components/Modal/UtilisateurModal.vue";
import { etudiantApi } from "../../../../_api/etudiant.api";
import { contratApi } from "../../../../_api/contrat.api";

  export default {
    name: "AddUser",
    components: {
      BodyTitle,
      // AdresseListComponent,
      //EntrepriseListComponent,
      RoleModal,
      UtilisateurModal,
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
          etudiantDto:null,
          formateurDto:null,
          cefDto:null,
          maitreApprentissageDto:null,
        },
        contrat : {
          id: "",
          dateDebut: "",
          dateFin: "",
          maitreApprentissageDto : "",
          etudiantDto: ""

        },
        isUtilisateurModalVisible: false,
        UtilisateurModal_role: null,
        UtilisateurModale_utilisateur: null,

        //On a des soucis si l'adresse de l'entreprise est null
        //D'ou l'utilisation de cet objet
        // adresseEntreprise: {
        //   id: null,
        //   numero: "",
        //   rue: "",
        //   ville: "",
        //   codePostal: "",
        // },
        entrepriseDto: "",

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
      //Utilisateur Modal
    showUtilisateurModal(role) {
      switch (role) {
        default:
          this.UtilisateurModal_role = "MAITREAPPRENTISSAGE";
          break;
      }
      this.isUtilisateurModalVisible = true;
    },
    closeUtilisateurModal() {
      this.isUtilisateurModalVisible = false;
    },
    onClickUtilisateurClose(utilisateur) {
      this.contrat.maitreApprentissageDto = utilisateur;
    },
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

        // ON SUBMIT =>  conversion jj/mm/aaaa vers aaaa-mm-jj
        // this.form.dateDeNaissance = this.backEndDateFormat(
        //   this.form.dateDeNaissance
        // );
        
        console.log("form : ", this.form);

        utilisateurApi
          .save(this.form)
          .then(() =>{
            this.$router.push({name: "admin_dashboard"});
          })
          .catch((error) => {
             console.log(error.response.data);
            if (
              error.response.data ==
              "Un utilisateur utilise déjà cette adresse mail"
            ) {
              login.setCustomValidity("Cette adresse mail est déjà utilisée");
              login.reportValidity();
            }
          });
            if( !(this.contrat.dateDebut == "" && this.contrat.dateFin == "" && this.contrat.maitreApprentissageDto == "")){
                utilisateurApi.getByLogin(this.form.login).then(response => {
                  utilisateurApi.getById(response.id).then(response1 => {
                  console.log(response1)
                  etudiantApi.getById(response1.etudiantDto.id).then(response2 => this.contrat.etudiantDto = response2)
                  
                });

                }),
                console.log(this.contrat)
                contratApi.save(this.contrat)
            }
          
          
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
      // frontEndDateFormat(date) {
      //   return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
      // },
      // backEndDateFormat(date) {
      //   return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
      // },
      // dateValidity(date){
      //   const maxYear = new Date();
      //   let dateInput = date.split("/");
      //   if(dateInput[0] >= 1 && dateInput <=31 && dateInput[1]>=1 && dateInput[1]<=12 && dateInput[1]>=1950 && dateInput[1]<= maxYear.getFullYear.toString() ) {
      //     console.log("OK");
      //     console.log(date);
      //     // date = this.backEndDateFormat(date);
      //   }
      // }
    },
    created() {
      //Pour etre sur, dans le doute, on fait les 3 tests
      if (
        this.$route.params.id != null &&
        this.$route.params.id != "" &&
        this.$route.params.id != 0 
      ) {
        utilisateurApi.getById(this.$route.params.id).then((response) => {
          this.vue_title = "Modifier l'utilisateur";
          this.btn_form_text = "Modifier";
          this.form = response;

          // Si id existant => conversion aaaa-mm-jj vers jj/mm/aaaa
          this.form.dateDeNaissance = this.frontEndDateFormat(response.dateDeNaissance);
          
        contratApi.getContratByEtudiant(response.etudiantDto.id).then(response1 => this.contrat = response1)
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

  #saisie {
    width: 70%;
    margin-right: 5%;
  }

  .croix-delete:hover {
    cursor: pointer;
  }
</style>